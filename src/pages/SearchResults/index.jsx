import React, { Component } from 'react'
import {
    EuiPage,
    EuiPageBody,
    EuiPageSection,
    EuiPanel,
    EuiBasicTable,
    EuiTitle,
    EuiSpacer,
    EuiFlexGroup,
    EuiFlexItem,
    EuiButton,
    EuiModal,
    EuiModalHeader,
    EuiModalBody,
    EuiModalFooter,
    EuiModalHeaderTitle,
    EuiButtonEmpty,
    EuiFormRow,
    EuiSuperSelect,
    EuiFlyout,
    EuiFlyoutHeader,
    EuiHorizontalRule,
    EuiText,
    EuiFlyoutBody,
    EuiResizableContainer,
    EuiLink,
    useEuiTheme,
    useEuiBackgroundColor,
    EuiScreenReaderOnly,
    EuiButtonIcon,
    EuiFieldText
} from '@elastic/eui';
import BasicSearchBox from '../../components/BasicSearchBox';
import { Link, useLocation} from 'react-router-dom'
import { basicSearch, neuralSearch, proSearch, advancedSearch, uploadSearch} from '../../utils/SearchUtils';
import { getAnalysisCollection, getReport2gen, getSignorysByPatentId, insertAnalysisCollection, insertCollectionItems, insertSearchResults, noveltyCompare } from '../../utils/DataSource';
import './index.css'
import { Button } from 'antd';


class SearchResults extends Component {

    state = {
        // 检索返回结果
        pageIndex : 0,
        pageSize : 20,
        searchType: "",
        query: "",
        field: "",
        resultsCount : 0,
        searchResults : [],
        conditionMap : null,
        expression : "",
        // 检索结果列表相关
        selectedSearchResults : [],
        // 加入统计分析集
        isAnaModalVisible : false,
        collectionList : [],
        selectedAnaCollection : null,
        // 加入分析报告集
        isReportModalVisible : false,
        reportList : [],
        selectedReport : null,
        // 专利一对一比对
        isFlyoutVisible: false,
        // 原专利要求列表 [string...]
        signoryList : [],
        //[{signoryId, signory }, ...]
        comparePatent : {},
        compareSignoryList : [],
        // 专利一对一比对结果
        isFlyoutRightResult : false,
        noveltyResults : [],
        selectedNoveltyResults : [],
        focusSigory : "",
        itemIdToExpandedRowMap : {},
        newCollectionName : ""
    }

    constructor(props){
        super(props)
        this.basicSearch = basicSearch.bind(this)
        this.proSearch = proSearch.bind(this)
        this.advancedSearch = advancedSearch.bind(this)
        this.neuralSearch = neuralSearch.bind(this)
        this.uploadSearch = uploadSearch.bind(this)
    }

    componentDidMount(){
        const {searchArgs} = this.props.location.state
        const {searchType, query, field, conditionMap, expression, formdata, uploadres} = searchArgs
        if(searchType == 'basic'){
            this.basicSearch(query, field, this.state.pageIndex, this.state.pageSize).then(
                (res) => {
                    const {curPage, pageNum, perPage, results, query, field, searchType} = res
                    this.setState({
                        searchType: searchType,
                        query: query,
                        field: field,
                        searchResults : results,
                        resultsCount: pageNum * perPage,
                    })
                }
            )
        }else if(searchType == "advanced"){
            this.advancedSearch(conditionMap, this.state.pageIndex, this.state.pageSize).then(
                (res) => {
                    const {curPage, pageNum, perPage, results, query, field, searchType, conditionMap} = res
                    this.setState({
                        searchType: searchType,
                        conditionMap: conditionMap,
                        searchResults : results,
                        resultsCount: pageNum * perPage,
                    })
                }
            )
        }else if(searchType == "pro"){
            this.proSearch(expression, this.state.pageIndex, this.state.pageSize).then(
                (res) => {
                    const {curPage, pageNum, perPage, results, query, field, searchType, conditionMap} = res
                    this.setState({
                        searchType: searchType,
                        searchResults : results,
                        resultsCount : pageNum * perPage,
                        expression : expression
                    })
                }
            )
        }else if(searchType == "neural"){
            this.neuralSearch(query, field, this.state.pageIndex, this.state.pageSize).then(
                (res) => {
                    const {curPage, pageNum, perPage, results, query, field, conditionMap} = res
                    this.setState({
                        searchType: searchType,
                        query: query,
                        field: field,   
                        searchResults : results,
                        resultsCount : pageNum * perPage,
                    })
                }
            )
        }else if(searchType == "upload"){
            const {curPage, pageNum, perPage, results, signoryList} = uploadres
            this.setState({
                searchType : searchType,
                searchResults : results,
                resultsCount : pageNum * perPage,
                signoryList : signoryList
            })
        }
    }

    onSearchTableChange = ({ page = {} }) => {
        const {query, field, searchType, conditionMap, expression} = this.state
        const { index: pageIndex, size: pageSize } = page;
        if(searchType == "basic"){
            basicSearch(query, field, pageIndex, pageSize).then(
                (res) => {
                    const {curPage, pageNum, perPage, results, query, field, searchType, conditionMap} = res
                    this.setState({
                        searchResults : results,
                        resultsCount : pageNum * perPage,
                        pageIndex : curPage,
                        pageSize : perPage
                    }, () => {})
                }
            )
        }else if(searchType == "advanced"){
            this.advancedSearch(conditionMap, pageIndex, pageSize).then(
                (res) => {
                    const {curPage, pageNum, perPage, results, query, field, searchType, conditionMap} = res
                    this.setState({
                        searchResults : results,
                        resultsCount: pageNum * perPage,
                        pageIndex : curPage,
                        pageSize : perPage
                    })
                }
            )
        }else if(searchType == "pro"){
            this.proSearch(expression, pageIndex, pageSize).then(
                (res) => {
                    const {pageNum, perPage, results, searchType, conditionMap} = res
                    this.setState({
                        searchType: searchType,
                        searchResults : results,
                        resultsCount : pageNum * perPage,
                        expression : expression
                    })
                }
            )
        }else if(searchType == "neural"){
            // this.neuralSearch(query, activePage, perPage)
            console.log("暂时不支持neuralSearch分页")
        }
    };

    setSelectedSearchResults(searchResults){
        this.setState({
            selectedSearchResults : searchResults
        }, () => {})
    }

    onNoveltyReChange = (selectedItems) => {
        this.setSelectedNoveltyResults(selectedItems);
    }; 

    setSelectedNoveltyResults(noveltyResults){
        this.setState({
            selectedNoveltyResults : noveltyResults
        }, () => {})
    }

    closeAnaModal(){
        this.setState({
            isAnaModalVisible : false
        })
    }

    openAnaModal(){
        this.setState({
            isAnaModalVisible : true
        })
        this.initCollectionList()
    }

    closeReportModal(){
        this.setState({
            isReportModalVisible : false
        })
    }

    openReportModal(){
        this.setState({
            isReportModalVisible : true
        })
        this.initReportList()
    }

    setSelectedAnaCollection = (value) => {
        this.setState({
            selectedAnaCollection : value,
            newCollectionName : ""
        })
    };

    setSelectedReport = (value) => {
        this.setState({
            selectedReport : value
        })
    };

    onFlyoutClose = () =>{
        this.setState({
            isFlyoutVisible : false,
            isFlyoutRightResult : false
        })
    }

    initCollectionList(){
        getAnalysisCollection().then(
            res => { 
                this.setState(
                    {
                        collectionList : res
                    },
                    () => {}
                )
            }
        )
    }

    initReportList(){
        getReport2gen().then(
            res => { 
                this.setState(
                    {
                        reportList : res
                    },
                    () => {
                    }
                )
            }
        )
    }

    setItemIdToExpandedRowMap(map){
        this.setState({
            itemIdToExpandedRowMap : map
        })
    }

    toggleDetails = (result) => {
        const itemIdToExpandedRowMapValues = { ...this.state.itemIdToExpandedRowMap };
        if (itemIdToExpandedRowMapValues[result.relevant_sig_id]) {
          delete itemIdToExpandedRowMapValues[result.relevant_sig_id];
        } else {
          itemIdToExpandedRowMapValues[result.relevant_sig_id] = (
            <EuiText style={{whiteSpace: 'pre-wrap'}}>
                {result.compare_result}
            </EuiText>
          );
        }
        this.setItemIdToExpandedRowMap(itemIdToExpandedRowMapValues);
    };
    
    render() {

        // 检索结果表格相关
        
        let searchReColumns = [
            {
                field: 'index',
                name: '序号',
                truncateText: false,
                width: '4em'
            },
            {
                field: 'title',
                name: '题目',
                truncateText: false,
                render: (title, item) => (
                    <Link to={{
                        pathname:'detailPage',
                        state:{patent: item}
                        }}>
                        {title}
                    </Link>
                ),
                textOnly: true
            },
            {
                field: 'abstract',
                name: '摘要',
                truncateText: true,
                width: '35em'
            },
            {
                field: 'patent_type',
                name: '专利类型',
                truncateText: false,
                width: '6em'
            },
            {
                field: 'patent_code',
                name: '专利号',
                truncateText: false
            },
            {
                field: 'applicant_list',
                name: '发明人',
                truncateText: false
            },
            {
                field: 'publication_date',
                name: '公开（公告）日',
                truncateText: false
            }
        ]

        if(this.state.searchType == "upload"){
            searchReColumns.push(
                {
                    name: 'Actions',
                    actions: [
                        {
                        name: 'NoveltyCompare',
                        description: '进行新颖性对比',
                        type: 'icon',
                        icon: 'inspect',
                        onClick: (item) => {
                            getSignorysByPatentId(item.id).then(
                                res => { 
                                    this.setState(
                                        {
                                            comparePatent : item,
                                            compareSignoryList : res,
                                            isFlyoutVisible : true
                                        }
                                    )
                                }
                            )
                        },
                        },
                    ]
                }
            )
        }

        const searchRePagination = (this.state.searchType === "neural" || this.state.searchType === "upload") ? null : {
            pageIndex : this.state.pageIndex,
            pageSize : this.state.pageSize,
            totalItemCount : this.state.resultsCount,
            pageSizeOptions: [this.state.pageSize]
        }

        const onSelectedSearchReChange = (selectedItems) => {
            this.setSelectedSearchResults(selectedItems);
        };        

        const searchReSelection = {
            selectable: (item) => true,
            selectableMessage: (selectable) =>
                !selectable ? 'User is currently offline' : undefined,
            onSelectionChange: onSelectedSearchReChange,
            initialSelected: []
        };

        const renderButtons = () => {
            if (this.state.selectedSearchResults.length === 0) {
                return;
            }
            return (
                <div>
                    <EuiFlexGroup>
                        <EuiFlexItem grow={false}>
                            <EuiButton fill onClick={() => {this.openAnaModal()}}>
                                加入分析集合
                            </EuiButton>
                        </EuiFlexItem>
                        {/* <EuiFlexItem grow={false}>
                            <EuiButton fill onClick={() => {this.openReportModal()}}>
                                加入报告集合
                            </EuiButton>
                        </EuiFlexItem> */}
                    </EuiFlexGroup>
                    <EuiSpacer/>
                </div>
            );
        };

        const buttons = renderButtons()

        let anaCollections = this.state.collectionList.map(
            (collection) => {
                let option = 
                {
                    value : collection.collection_id,
                    inputDisplay : collection.name
                }
                
                return option
            }
        )

        let anaModal;

        if (this.state.isAnaModalVisible) {
            anaModal = (
                <EuiModal onClose={() => {this.closeAnaModal()}}>
                <EuiModalHeader>
                    <EuiModalHeaderTitle>
                        <h1>添加至待分析集</h1>
                    </EuiModalHeaderTitle>
                </EuiModalHeader>
        
                <EuiModalBody>
                    <EuiFormRow label="请选择要添加至的分析集">
                        <EuiSuperSelect
                            options={anaCollections}
                            valueOfSelected={this.state.selectedAnaCollection}
                            onChange={(value) => this.setSelectedAnaCollection(value)}
                            itemLayoutAlign="top"
                            hasDividers
                        />
                    </EuiFormRow>
                    <EuiFormRow label="或新建集合，请输入名称">
                        <EuiFieldText
                            placeholder="Placeholder text"
                            value={this.state.newCollectionName}
                            onChange={(e) => {
                                    this.setState({
                                        newCollectionName : e.target.value,
                                        selectedAnaCollection : ""
                                    }, () => {})
                            }}
                            aria-label="Use aria labels when no actual label is in use"
                        />
                    </EuiFormRow>
                </EuiModalBody>
        
                <EuiModalFooter>
                    <EuiButtonEmpty onClick={() => {this.closeAnaModal()}}>Cancel</EuiButtonEmpty>
        
                    <EuiButton 
                        type="submit" 
                        onClick={
                            () => {
                                let patentIds = this.state.selectedSearchResults.map((patent) => {
                                    return patent.id
                                })
                                if(this.state.newCollectionName != ""){
                                    insertAnalysisCollection(this.state.newCollectionName).then(
                                        (res) => {
                                            insertCollectionItems(patentIds, res)
                                        } 
                                    )
                                }else{
                                    insertCollectionItems(patentIds, this.state.selectedAnaCollection)
                                }
                                this.closeAnaModal()
                            }
                        } 
                        fill>
                     Save
                    </EuiButton>
                </EuiModalFooter>
                </EuiModal>
            );
        }

        let reportModal;

        let reports = this.state.reportList.map(
            (report) => {
                let option = 
                {
                    value : report.reportId,
                    inputDisplay : report.reportName
                }
                return option
            }
        )

        if (this.state.isReportModalVisible) {
            reportModal = (
                <EuiModal onClose={() => {this.closeReportModal()}}>
                <EuiModalHeader>
                    <EuiModalHeaderTitle>
                        <h1>添加至待生成报告</h1>
                    </EuiModalHeaderTitle>
                </EuiModalHeader>
        
                <EuiModalBody>
                    <EuiFormRow label="请选择要添加至的待生成报告">
                        <EuiSuperSelect
                            options={reports}
                            valueOfSelected={this.state.selectedReport}
                            onChange={(value) => this.setSelectedReport(value)}
                            itemLayoutAlign="top"
                            hasDividers
                        />
                    </EuiFormRow>
                </EuiModalBody>
        
                <EuiModalFooter>
                    <EuiButtonEmpty onClick={() => {this.closeReportModal()}}>Cancel</EuiButtonEmpty>
                    <EuiButton 
                        type="submit" 
                        onClick={
                            () => {
                                let patentIds = this.state.selectedSearchResults.map((patent) => {
                                    return patent.id
                                })
                                insertSearchResults(patentIds, this.state.selectedReport)
                                this.closeReportModal()
                            }
                        } 
                        fill>
                     Save
                    </EuiButton>
                </EuiModalFooter>
                </EuiModal>
            );
        }

        let noveltyResColumns = [
            {
                field: 'relevant_sig',
                name: '相关专利要求',
                truncateText: false
            },
            // {
            //   field: 'ori_patent_title',
            //   name: '来自于专利',
            //   truncateText: false
            // },
            {
              align: 'right',
              width: '40px',
              isExpander: true,
              name: (
                <EuiScreenReaderOnly>
                  <span>Expand rows</span>
                </EuiScreenReaderOnly>
              ),
              render: (result) => {
                const itemIdToExpandedRowMapValues = { ...this.state.itemIdToExpandedRowMap }; 
                return (
                  <EuiButtonIcon
                    onClick={() => this.toggleDetails(result)}
                    aria-label={
                      itemIdToExpandedRowMapValues[result.relevant_sig_id] ? 'Collapse' : 'Expand'
                    }
                    iconType={
                      itemIdToExpandedRowMapValues[result.relevant_sig_id] ? 'arrowDown' : 'arrowRight'
                    }
                  />
                );
              },
            }
        ]
 
        const noveltyReSelection = {
            selectable: (item) => true,
            selectableMessage: (selectable) =>
                !selectable ? 'User is currently offline' : undefined,
            onSelectionChange: this.onNoveltyReChange,
            initialSelected: []
        };

        let flyoutRightSide

        if(this.state.isFlyoutRightResult){
            flyoutRightSide = <>
                <EuiTitle size="m">
                    <h3>专利要求对比结果</h3>
                </EuiTitle>
                <EuiHorizontalRule/>
                <EuiText>
                    {"当前被分析专利要求：" + this.state.focusSigory}
                </EuiText>
                <EuiHorizontalRule/>
                <EuiBasicTable
                    tableCaption="Demo of EuiBasicTable"
                    items={this.state.noveltyResults}
                    rowHeader="relevant_sig"
                    itemId="relevant_sig_id"
                    columns={noveltyResColumns}
                    onChange={this.onNoveltyReChange}
                    isSelectable={true}
                    selection={noveltyReSelection}
                    hasActions={true}
                    itemIdToExpandedRowMap={this.state.itemIdToExpandedRowMap}
                    isExpandable={true}
                />
            </>
        }else{
            flyoutRightSide = <>
                <EuiTitle size="m">
                    <h3>
                        对比专利：
                        <Link 
                            to={{
                                pathname:'detailPage',
                                state:{patent: this.state.comparePatent}
                            }}
                        >
                            {this.state.comparePatent.title}
                        </Link>
                    </h3>
                </EuiTitle>
                {/* <EuiSpacer size="xs"/> */}
                {/* <EuiText>
                    {this.state.comparePatentTitle}
                </EuiText> */}
                <EuiHorizontalRule/>
                <EuiFlexGroup direction="column">
                    {this.state.compareSignoryList.map((signory, index)=>{
                        let order = index + 1
                        return (
                        <EuiFlexItem grow={false} 
                        >
                            <EuiText 
                                style={{ padding: '10px', backgroundColor: this.props.bgColor2}}
                            > 
                                {order + "、" + signory.signory_item}
                            </EuiText>
                        </EuiFlexItem>
                    )})}
                </EuiFlexGroup>
            </>
        }

        let flyout

        if (this.state.isFlyoutVisible) {
          flyout = (
            <EuiFlyout
              onClose={() => this.onFlyoutClose()}
              size = 'l'
            >
              <EuiFlyoutHeader hasBorder>
                <EuiTitle size="m">
                  <h2>专利专利要求对比</h2>
                </EuiTitle>
              </EuiFlyoutHeader>
              <EuiFlyoutBody>
                <EuiResizableContainer>
                    {(EuiResizablePanel, EuiResizableButton) => (
                    <>
                    <EuiResizablePanel initialSize={50} minSize="30%" paddingSize='s'> 
                        <EuiTitle size="m">
                            <h3>输入专利</h3>
                        </EuiTitle>
                        <EuiHorizontalRule/>
                        <EuiFlexGroup direction="column">
                            {this.state.signoryList.map((signory, index)=>{
                                let order = index + 1
                                return (
                                <EuiFlexItem grow={false} 
                                >
                                    <EuiText 
                                        style={{ padding: '10px', backgroundColor: this.props.bgColor1}}
                                    > 
                                    <EuiLink onClick={
                                        () => {
                                            noveltyCompare(signory, this.state.compareSignoryList)
                                            .then(
                                                response => {
                                                    console.log(response)
                                                    this.setState({
                                                      focusSigory : signory,
                                                      noveltyResults : response,
                                                      isFlyoutRightResult : true
                                                    }, () => {})
                                                },
                                                error => { 
                                                }
                                            )
                                        }} 
                                        color='text'
                                    >
                                        {order + "、" + signory}
                                    </EuiLink>
                                    </EuiText>
                                </EuiFlexItem>
                            )})}
                        </EuiFlexGroup>
                    </EuiResizablePanel>

                    <EuiResizableButton />

                    <EuiResizablePanel initialSize={50} minSize="200px" paddingSize='s'>
                        {flyoutRightSide}
                    </EuiResizablePanel>
                    </>
                )}
                </EuiResizableContainer>
              </EuiFlyoutBody>
            </EuiFlyout>
          );
        }

        return (
            <div>
                {/* <div className='search-area'>
                    <BasicSearchBox/>
                </div> */}
                <EuiPage>
                    <EuiPageBody>
                        <EuiPageSection>
                            <EuiPanel>
                                <EuiTitle size="s">
                                    <p>检索结果</p>
                                </EuiTitle>
                                <EuiSpacer />
                                {buttons}
                                <EuiBasicTable
                                    tableCaption="Demo of EuiBasicTable"
                                    items={this.state.searchResults}
                                    rowHeader="patentName"
                                    itemId="index"
                                    columns={searchReColumns}
                                    pagination={searchRePagination}
                                    onChange={this.onSearchTableChange}
                                    isSelectable={true}
                                    selection={searchReSelection}
                                    hasActions={true}
                                />
                            </EuiPanel>
                        </EuiPageSection>
                    </EuiPageBody>
                </EuiPage>
                {anaModal}
                {reportModal}
                {flyout}
            </div>
        )
    }
}

export default function(props){
    const { euiTheme } = useEuiTheme()
    const location = useLocation() 
    const bgColor1 = useEuiBackgroundColor('primary')
    const bgColor2 = useEuiBackgroundColor('warning')
    return <SearchResults theme={euiTheme} location={location} bgColor1={bgColor1} bgColor2={bgColor2}/>
}