import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import { 
    EuiListGroupItem,
    EuiPage,
    EuiScreenReaderOnly,
    EuiResizableContainer,
    EuiListGroup,
    EuiPanel,
    EuiTitle,
    EuiSpacer,
    EuiText,
    EuiBasicTable,
    EuiButton,
    EuiModal,
    EuiModalHeader,
    EuiModalBody,
    EuiModalFooter,
    EuiModalHeaderTitle,
    EuiButtonEmpty,
    EuiFormRow,
    EuiFieldText,
    EuiIcon,
    EuiFlexGroup,
    EuiFlexItem,
    EuiButtonIcon,
    EuiFlyout,
    EuiFlyoutBody,
    EuiFlyoutHeader,
    EuiHorizontalRule,
    EuiImage,
    EuiSelect,
    useEuiTheme, 
    useEuiBackgroundColor,
    EuiSuperSelect
} from '@elastic/eui';
import { deleteNoveltyResAndItems,getNoveltyAnaResult,getNAItemByNAId, getACItemByCollectionId, deleteCollectionItemsByIds, deleteCollectionById, insertAnalysisCollection, insertStatsResults, getReport2gen, addNoveltyResult2Report, saveAndAddNoveltyStats} from '../../utils/DataSource';
import { doAnalysis, noveltyReStats } from '../../utils/AnalysisUtils';

class NoveltyCollectionBox extends Component {

    constructor(props){
        super()
        this.initNoveltyAnaResults()
    }

    state = {
        noveltyAnaResults : [],
        currentNoveltyResult : {},
        currentAnaResultItemList : [],
        currentAnaResultItemCount : 0,

        selectedNovelResults : [],
        itemIdToExpandedRowMap : {},

        pageIndex : 0,
        pageSize : 10,
        selectedItems : [],
        isReportModalVisible : false,
        isFlyoutVisible : false,
        // novelty/noveltyStats
        reportAddContent : "",

        noveltyStatsResult : {},
        reportList : [],
        selectedReportId : null
    }

    setCurrentNoveltyAnaResult(noveltyAnaId, noveltyAnaRes){
        getNAItemByNAId(noveltyAnaId, this.state.pageIndex, this.state.pageSize).then(
            res => {
                this.setState(
                    {   
                        currentNoveltyResult : noveltyAnaRes,
                        currentAnaResultItemList : res.itemList,
                        currentAnaResultItemCount : res.totalItemCount,
                    },
                    () => {
                           
                    }
                )
            }
        ) 
    }

    setPageIndex(pageIndex){
        this.setState({
            pageIndex : pageIndex
        })
    }

    setPageSize(pageSize){
        this.setState({
            pageSize : pageSize
        })
    }

    setIsFlyoutVisible = (isVisible) =>{
      this.setState({isFlyoutVisible : isVisible})
    }
    
    setSelectedItems(items){
        this.setState({
            selectedItems : items
        }, () => {})
    }

    setSelectedReportId = (value) => {
        this.setState({
            selectedReportId : value
        })
    };

    onTableChange = ({ page = {} }) => {
        const { index: pageIndex, size: pageSize } = page;
        this.setPageIndex(pageIndex);
        this.setPageSize(pageSize);
        getACItemByCollectionId(this.state.currentcollectionId, pageIndex, pageSize).then(
            res => {
                this.setState(
                    { 
                        currentCollectionItemList : res.itemList,
                        currentCollectionItemCount : res.totalItemCount,
                        pageIndex : pageIndex,
                        pageSize : pageSize
                    },
                    () => {}
                )
            }
        ) 
        
    };

    initNoveltyAnaResults(){
        getNoveltyAnaResult().then(
            res => {
                this.setState(
                    {
                        noveltyAnaResults : res
                    },
                    () => {
                        if(res.length > 0){
                            this.setCurrentNoveltyAnaResult(this.state.noveltyAnaResults[0].novelty_ana_id, this.state.noveltyAnaResults[0])
                        }
                    }
                )
            }
        )
    }

    deleteCollectionAndReload(collectionId){
        deleteCollectionById(collectionId).then(
            res => {
                this.initNoveltyAnaResults()
            }
        )
    }

    deleteNoveltyResAndReload(noveltyResId){
        deleteNoveltyResAndItems(noveltyResId).then(
            res => {
                this.initNoveltyAnaResults()
            }
        )
    }

    deleteSelectedItems(){
        let ids = this.state.selectedItems.map(
            (item, index) => {return item.itemId}
        )
        deleteCollectionItemsByIds(ids).then(
            res => {
                this.setCurrentCollection(this.state.currentcollectionId, this.state.currentNoveltyResultName)
            }
        )
        
    }


    closeReportModal(){
        this.setState({
            isReportModalVisible : false
        })
    }

    openReportModal(contentType){
        this.setState({
            isReportModalVisible : true,
            reportAddContent: contentType
        })
        this.initReportList()
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
        if (itemIdToExpandedRowMapValues[result.novelty_ana_item_id]) {
            delete itemIdToExpandedRowMapValues[result.novelty_ana_item_id];
        } else {
            itemIdToExpandedRowMapValues[result.novelty_ana_item_id] = (
            <EuiText style={{whiteSpace: 'pre-wrap'}}>
                {result.compare_result}
            </EuiText>

            );
        }
        this.setItemIdToExpandedRowMap(itemIdToExpandedRowMapValues);
    };

    render() {

        const {theme} = this.props

        const noveltyAnaResults = this.state.noveltyAnaResults.map((noveltyAnaResult, index) => (
            <EuiListGroupItem
                key={index}
                onClick={() => {this.setCurrentNoveltyAnaResult(noveltyAnaResult.novelty_ana_id, noveltyAnaResult)}}
                label={noveltyAnaResult.name}
                size="m"
                extraAction={{
                    color: 'text',
                    onClick: () => {this.deleteNoveltyResAndReload(noveltyAnaResult.novelty_ana_id)},
                    iconType: 'trash',
                    iconSize: 's',
                    alwaysShow: false
                  }}
            />
        ));

        // const columns = [
        //     // {
        //     //     field: 'novelty_ana_item_id',
        //     //     name: '专利名称',
        //     //     truncateText: false
        //     // },
        //     // {
        //     //     field: 'novelty_ana_id',
        //     //     name: '发明人',
        //     //     truncateText: false
        //     // },
        //     {
        //         field: 'relevant_sig',
        //         name: '相关主权项',
        //         truncateText: false
        //     },
        //     {
        //         field: 'compare_result',
        //         name: '对比分析结果',
        //         truncateText: false
        //     },
        //     {
        //         field: 'ori_patent_title',
        //         name: '发明人',
        //         truncateText: false
        //     }
        // ]

        const noveltyResultsColumns = [
            {
                field: 'index_num',
                name: '序号',
                truncateText: false
            },
            {
                field: 'relevant_sig',
                name: '相关权利要求',
                truncateText: false
            },
            {
                field: 'score',
                name: '相关性分数',
                truncateText: false
              },
            {
                field: 'ori_patent_title',
                name: '来自专利',
                truncateText: false
            },
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
                      itemIdToExpandedRowMapValues[result.novelty_ana_item_id] ? 'Collapse' : 'Expand'
                    }
                    iconType={
                      itemIdToExpandedRowMapValues[result.novelty_ana_item_id] ? 'arrowDown' : 'arrowRight'
                    }
                  />
                );
              },
            }
        ]

        const pagination = {
            pageIndex : this.state.pageIndex,
            pageSize : this.state.pageSize,
            totalItemCount : this.state.currentCollectionItemCount,
            pageSizeOptions: [this.state.pageSize],
        };  

        const onSelectionChange = (selectedItems) => {
            this.setSelectedItems(selectedItems);
        };        

        
        // const noveltyResultSelection = {
        //     selectable: (item) => true,
        //     selectableMessage: (selectable) =>
        //         !selectable ? 'User is currently offline' : undefined,
        //     onSelectionChange: onNCSelectionChange,
        //     initialSelected: []
        // };

        const renderControllArea = () => {
            return (
                <div>
                    <EuiFlexGroup responsive={false} gutterSize="s" alignItems="center" justifyContent='spaceBetween'>
                        <EuiFlexItem>
                            <EuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
                                <EuiFlexItem grow={false}>
                                    <EuiButton
                                        iconType='visLine'
                                        onClick={
                                            () => {
                                                noveltyReStats(this.state.currentNoveltyResult.novelty_ana_id).then(
                                                    (res) => {
                                                        console.log(res)
                                                        this.setState({
                                                            noveltyStatsResult : res,
                                                            // isAnalysisModalVisible : false,
                                                            isFlyoutVisible : true
                                                        })
                                                    }
                                                )
                                            }
                                            }
                                    >
                                        对结果进行统计
                                    </EuiButton>
                                </EuiFlexItem>
                                <EuiFlexItem grow={false}>
                                    <EuiButton
                                        iconType='visLine'
                                        onClick={() => {
                                            this.openReportModal('novelty')
                                        }}
                                    >
                                        添加至待生成报告
                                    </EuiButton>
                                </EuiFlexItem>            
                            {/* {this.state.selectedItems.length === 0 ? null :
                                <EuiFlexItem grow={false}>
                                    <EuiButton
                                        iconType='visLine'
                                    >
                                        分析选中专利
                                    </EuiButton>
                                </EuiFlexItem>
                            }      */}
                            {this.state.selectedItems.length === 0 ? null :
                                <EuiFlexItem grow={false}>
                                    <EuiButton
                                        color='danger'
                                        iconType="trash"
                                        onClick={() => {this.deleteSelectedItems()}}
                                    >
                                        删除选中专利
                                    </EuiButton>
                                </EuiFlexItem>
                            }
                            </EuiFlexGroup>
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiFlexGroup justifyContent='flexEnd' gutterSize="s" alignItems='center'>
                            </EuiFlexGroup>
                        </EuiFlexItem>
                        
                    </EuiFlexGroup>
                    
                </div>
            );
        };

        const controlArea = renderControllArea();

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
                            valueOfSelected={this.state.selectedReportId}
                            onChange={(value) => this.setSelectedReportId(value)}
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
                                console.log(this.state.reportAddContent)
                                if(this.state.reportAddContent == 'novelty'){
                                    addNoveltyResult2Report(this.state.selectedReportId, 
                                        this.state.currentNoveltyResult.novelty_ana_id, 
                                        this.state.currentNoveltyResult.name)
                                }else if(this.state.reportAddContent == 'noveltyStats'){
                                    saveAndAddNoveltyStats(this.state.selectedReportId, 
                                        this.state.noveltyStatsResult,
                                        this.state.currentNoveltyResult.novelty_ana_id)
                                }
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

        
        let flyout

        if (this.state.isFlyoutVisible) {
            flyout = (
              <EuiFlyout
                type="push"
                ownFocus={false}
                size
                onClose={() => this.setIsFlyoutVisible(false)}
              >
                <EuiFlyoutHeader hasBorder>
                    <EuiFlexGroup responsive={false} gutterSize="s" justifyContent='spaceBetween'>
                    <EuiFlexItem grow={false}>
                        <EuiTitle size="m">
                            <h2>分析结果</h2>
                        </EuiTitle>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false} style={{marginRight: '2em'}}>
                        <EuiButton
                            iconType='visBarVertical'
                            onClick={() => {
                                this.openReportModal("noveltyStats")
                            }}
                        >
                            保存统计分析结果
                        </EuiButton>
                    </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiFlyoutHeader>
                <EuiFlyoutBody>
                    {
                        this.state.noveltyStatsResult.map((optionStr, index)=>{
                            var option = JSON.parse(optionStr)
                            return (
                                <div>
                                    <ReactECharts
                                        option={option}
                                        style={{
                                            width : `500px`,
                                            height : `500px`
                                        }}
                                        opts={{renderer: 'svg'}}
                                        // ref={(e) => { this.figRefs[index] = e; }}
                                    />
                                    <EuiSpacer />
                                </div>
                            )
                        })
                    }
                </EuiFlyoutBody>
              </EuiFlyout>
            );
        }

        return (
            <div style={{display: 'flex', flexDirection: 'column',  margin: '0 auto'}}>
                <EuiPanel
                    style={{
                        backgroundColor: theme.colors.lightestShade,
                    }}
                >
                        <EuiResizableContainer 
                            style={{
                                height: '100%'
                            }}
                        >
                            {(EuiResizablePanel, EuiResizableButton) => (
                                <>
                                <EuiResizablePanel
                                    mode="collapsible"
                                    initialSize={20}
                                    minSize="10%"
                                >
                                    <EuiPanel paddingSize="l" style={{ minHeight: '100%' }}> 
                                        <EuiTitle size="s">
                                            <p>新颖性创造性分析结果</p>
                                        </EuiTitle>
                                        <EuiHorizontalRule
                                            margin='m'
                                        />    
                                        <EuiListGroup flush> {noveltyAnaResults}</EuiListGroup>
                                        <EuiSpacer/>
                                        {/* <EuiButton onClick={() => {this.openCreateModal()}}>
                                            + 新建待分析集合
                                        </EuiButton> */}
                                    </EuiPanel>
                                </EuiResizablePanel>
                                <EuiResizableButton />
                                <EuiResizablePanel mode="main" initialSize={80} minSize="50px">
                                    <EuiPanel paddingSize="l" style={{ minHeight: '100%' }}>
                                        {/* <EuiTitle size="s">
                                            <p>{this.state.currentCollectionName}</p>
                                        </EuiTitle> */}
                                        {controlArea}
                                        <EuiHorizontalRule
                                            margin='m'
                                        />
                                        <EuiText>{"原权利要求:  " + this.state.currentNoveltyResult.ori_signory}</EuiText>
                                        <EuiHorizontalRule
                                            margin='m'
                                        />
                                        <EuiBasicTable
                                            tableCaption="Demo of EuiBasicTable"
                                            items={this.state.currentAnaResultItemList}
                                            itemIdToExpandedRowMap={this.state.itemIdToExpandedRowMap}
                                            isExpandable={true}
                                            rowHeader="relevant_sig"
                                            itemId='novelty_ana_item_id'
                                            columns={noveltyResultsColumns}
                                            isSelectable={true}
                                            tableLayout="auto"
                                            // selection={noveltyResultSelection}
                                        />
                                    </EuiPanel>
                                </EuiResizablePanel>
                                </>
                            )}
                        </EuiResizableContainer>
                </EuiPanel>
                {flyout}
                {reportModal}
            </div>
        )
    }
}

export default function(props){

    const { euiTheme } = useEuiTheme()

    return <NoveltyCollectionBox theme={euiTheme}/>
}