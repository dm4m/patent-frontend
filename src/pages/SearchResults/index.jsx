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
    EuiSuperSelect
} from '@elastic/eui';
import BasicSearchBox from '../../components/BasicSearchBox';
import { Link } from 'react-router-dom'
import { basicSearch, neuralSearch, proSearch, advancedSearch, uploadSearch} from '../../utils/SearchUtils';
import { getAnalysisCollection, getReport2gen, insertCollectionItems, insertSearchResults } from '../../utils/DataSource';
import './index.css'
import { Button } from 'antd';


export default class SearchResults extends Component {

    state = {
        pageIndex : 0,
        pageSize : 20,
        selectedItems : [20],
        searchType: "",
        query: "",
        field: "",
        resultsCount : 0,
        results : [],
        conditionMap : null,
        expression : "",
        selectedItems : [],
        isAnaModalVisible : false,
        isReportModalVisible : false,
        selectedAnaCollection : null,
        selectedReport : null,
        collectionList : [],
        reportList : []
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
                        results : results,
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
                        results : results,
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
                        results : results,
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
                        results : results,
                        resultsCount : pageNum * perPage,
                    })
                }
            )
        }else if(searchType == "upload"){
            const {curPage, pageNum, perPage, results,} = uploadres
            this.setState({
                searchType : searchType,
                results : results,
                resultsCount : pageNum * perPage,
            })
        }
    }

    onTableChange = ({ page = {} }) => {
        const {query, field, searchType, conditionMap, expression} = this.state
        const { index: pageIndex, size: pageSize } = page;
        if(searchType == "basic"){
            basicSearch(query, field, pageIndex, pageSize).then(
                (res) => {
                    const {curPage, pageNum, perPage, results, query, field, searchType, conditionMap} = res
                    this.setState({
                        results : results,
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
                        results : results,
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
                        results : results,
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

    setSelectedItems(items){
        this.setState({
            selectedItems : items
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
            selectedAnaCollection : value
        })
    };

    setSelectedReport = (value) => {
        this.setState({
            selectedReport : value
        })
    };

    initCollectionList(){
        getAnalysisCollection().then(
            res => { 
                this.setState(
                    {
                        reportList : res
                    }
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
                        console.log(this.state.reportList)
                    }
                )
            }
        )
    }

    render() {

        let columns = [
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
            columns.push(
                {
                    name: 'Actions',
                    actions: [
                        {
                        name: 'NoveltyCompare',
                        description: '进行新颖性对比',
                        type: 'icon',
                        icon: 'inspect',
                        onClick: () => '',
                        },
                    ]
                }
            )
        }

        const pagination = (this.state.searchType === "neural" || this.state.searchType === "upload") ? null : {
            pageIndex : this.state.pageIndex,
            pageSize : this.state.pageSize,
            totalItemCount : this.state.resultsCount,
            pageSizeOptions: [this.state.pageSize]
        }

        const onSelectionChange = (selectedItems) => {
            this.setSelectedItems(selectedItems);
        };        

        const selection = {
            selectable: (item) => true,
            selectableMessage: (selectable) =>
                !selectable ? 'User is currently offline' : undefined,
            onSelectionChange: onSelectionChange,
            initialSelected: []
        };

        const renderButtons = () => {
            if (this.state.selectedItems.length === 0) {
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
                        <EuiFlexItem grow={false}>
                            <EuiButton fill onClick={() => {this.openReportModal()}}>
                                加入报告集合
                            </EuiButton>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                    <EuiSpacer/>
                </div>
            );
        };

        const buttons = renderButtons()


        let  anaCollections = this.state.collectionList.map(
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
                </EuiModalBody>
        
                <EuiModalFooter>
                    <EuiButtonEmpty onClick={() => {this.closeAnaModal()}}>Cancel</EuiButtonEmpty>
        
                    <EuiButton 
                        type="submit" 
                        onClick={
                            () => {
                                let patentIds = this.state.selectedItems.map((patent) => {
                                    return patent.id
                                })
                                insertCollectionItems(patentIds ,this.state.selectedAnaCollection)
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
                                let patentIds = this.state.selectedItems.map((patent) => {
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
                                    items={this.state.results}
                                    rowHeader="patentName"
                                    itemId="index"
                                    columns={columns}
                                    pagination={pagination}
                                    onChange={this.onTableChange}
                                    isSelectable={true}
                                    selection={selection}
                                    hasActions={true}
                                />
                            </EuiPanel>
                        </EuiPageSection>
                    </EuiPageBody>
                </EuiPage>
                {anaModal}
                {reportModal}
            </div>

        )
    }
}
