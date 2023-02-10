import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import { 
    EuiListGroupItem,
    EuiPage,
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
    EuiSelect
} from '@elastic/eui';
import { getAnalysisCollection, getACItemByCollectionId, deleteCollectionItemsByIds, deleteCollectionById, insertAnalysisCollection} from '../../utils/DataSource';
import { doAnalysis } from '../../utils/AnalysisUtils';
import { getReport2gen, deleteReport2genById, getRCItemsByReportId } from '../../utils/DataSource'; 

class ReportCollectionBox extends Component {

    constructor(props){
        super()
        this.initReport2genList()
    }

    state = {
        report2genList : [],
        currentReportId: 1,
        currentReportName: 'First Report',
        currentReportContentItemList : [],
        currentReportContentItemCount : 0,
        pageIndex : 0,
        pageSize : 10,
        selectedItems : [],
        isCreateModalVisible : false,
        isAnalysisModalVisible : false,
        isFlyoutVisible : false,
        newCollectionName : "",
        selectedAnaType : '',
        selectedFigType : '',
        analysisResult : [],
    }

    anaTypeOption = [
        { value: 'area', text: '地域分析' },
        { value: 'trend', text: '趋势分析' },
        { value: 'author', text: '发明人分析' }
    ];

    figTypeOption = [
        { value: 'pie', text: '饼状图' },
        { value: 'bar', text: '柱状图' },
        { value: 'line', text: '折线图' }
    ];

    figTypeOptionMap = {
        'trend' : [
            { value: 'bar', text: '柱状图' },
            { value: 'line', text: '折线图' },
            { value: 'pie', text: '饼状图' }
        ],
        'author' : [
            { value: 'bar', text: '柱状图' },
            { value: 'pie', text: '饼状图' }
        ],
        'area' : [
            { value: 'pie', text: '饼状图' },
            { value: 'bar', text: '柱状图' },
        ],
    }


    setSelectedAnaType(anaType){
        this.setState({
            selectedAnaType : anaType
        })
    }

    setSelectedFigType(figType){
        this.setState({
            selectedFigType : figType
        }, () => {console.log(this.state.selectedFigType)})
    }

    setCurrentReport(reportId, reportName){
        getRCItemsByReportId(reportId, this.state.pageIndex, this.state.pageSize).then(
            res => {
                this.setState(
                    {   
                        currentReportName : reportName,
                        currentReportContentItemList : res.itemList,
                        currentReportContentItemCount : res.totalItemCount
                    },
                    () => {}
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
    
    onTableChange = ({ page = {} }) => {
        const { index: pageIndex, size: pageSize } = page;
        this.setPageIndex(pageIndex);
        this.setPageSize(pageSize);
        getRCItemsByReportId(this.state.currentReportId, pageIndex, pageSize).then(
            res => {
                this.setState(
                    { 
                        currentReportContentItemList : res.itemList,
                        currentReportContentItemCount : res.totalItemCount,
                        pageIndex : pageIndex,
                        pageSize : pageSize
                    },
                    () => {}
                )
            }
        ) 
        
    };

    setSelectedItems(items){
        this.setState({
            selectedItems : items
        }, () => {})
    }

    initReport2genList(){
        getReport2gen().then(
            res => {
                this.setState(
                    {
                        report2genList : res
                    },
                    () => {
                        this.setCurrentReport(this.state.report2genList[0].reportId, this.state.report2genList[0].reportName)
                    }
                )
            }
        )
    }

    deleteCollection(collectionId){
        deleteCollectionById(collectionId).then(
            res => {
                this.initCollectionList()
            }
        )
    }

    deleteSelectedItems(){
        let ids = this.state.selectedItems.map(
            (item, index) => {return item.itemId}
        )
        deleteCollectionItemsByIds(ids).then(
            res => {
                this.setCurrentReport(this.state.currentcollectionId, this.state.currentCollectionName)
            }
        )
        
    }

    closeCreateModal(){
        this.setState({
            isCreateModalVisible : false
        })
    }

    openCreateModal(){
        this.setState({
            isCreateModalVisible : true
        })
    }

    closeAnalysisModal(){
        this.setState({
            isAnalysisModalVisible : false
        })
    }

    openAnalysisModal(){
        this.setState({
            selectedAnaType : '',
            selectedFigType : '',
            isAnalysisModalVisible : true
        })
    }

    render() {

        const reports2gen = this.state.report2genList.map((report, index) => (
            <EuiListGroupItem
                key={index}
                // onClick={() => {this.setCurrentReport(collection.collection_id, collection.name)}}
                label={report.reportName}
                size="m"
                extraAction={{
                    color: 'text',
                    onClick: () => {
                        deleteReport2genById(report.reportId).then(
                            res => {
                                this.initReport2genList()
                            }
                        )
                    },
                    iconType: 'trash',
                    iconSize: 's',
                    alwaysShow: false
                  }}
            />
        ));

        const columns = [
            {
                field: 'itemType',
                name: '内容类型',
                truncateText: false
            }
        ]

        const pagination = {
            pageIndex : this.state.pageIndex,
            pageSize : this.state.pageSize,
            totalItemCount : this.state.currentReportContentItemCount,
            pageSizeOptions: [this.state.pageSize],
        };  

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

        const renderControllArea = () => {
            return (
                <div>
                    <EuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
                        <EuiFlexItem grow={false}>
                            <EuiButton
                                 iconType='visLine'
                                 onClick={() => {
                                    this.openAnalysisModal()
                                }}
                            >
                                分析集合
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
                    <EuiSpacer/>
                </div>
            );
        };

        const controlArea = renderControllArea();

        let createModal

        if (this.state.isCreateModalVisible) {
            createModal = (
                <EuiModal onClose={() => {this.closeCreateModal()}}>
                <EuiModalHeader>
                    <EuiModalHeaderTitle>
                        <h1>新建待分析集</h1>
                    </EuiModalHeaderTitle>
                </EuiModalHeader>
        
                <EuiModalBody>
                    <EuiFormRow label="请输入新建待分析集合名">
                        <EuiFieldText
                            placeholder="Placeholder text"
                            value={this.state.newCollectionName}
                            onChange={(e) => {
                                    this.setState({
                                        newCollectionName : e.target.value
                                    }, () => {})
                            }}
                            aria-label="Use aria labels when no actual label is in use"
                        />
                    </EuiFormRow>
                </EuiModalBody>

                <EuiModalFooter>
                    <EuiButtonEmpty onClick={() => {this.closeCreateModal()}}>Cancel</EuiButtonEmpty>
                    <EuiButton 
                        type="submit" 
                        onClick={
                            () => {
                                insertAnalysisCollection(this.state.newCollectionName).then(
                                    (res) => {
                                        this.initCollectionList()
                                        this.closeCreateModal()
                                    }
                                )
                            }
                        } 
                        fill>
                     Save
                    </EuiButton>
                </EuiModalFooter>
                </EuiModal>
            );
        }

        let analysisModal

        if (this.state.isAnalysisModalVisible) {
            analysisModal = (
                <EuiModal onClose={() => {this.closeAnalysisModal()}}>
                <EuiModalHeader>
                    <EuiModalHeaderTitle>
                        <h1>请选择分析类型</h1>
                    </EuiModalHeaderTitle>
                </EuiModalHeader>
        
                <EuiModalBody>
                    <EuiFormRow label="选择分析类型">
                        <EuiSelect
                            options={this.anaTypeOption}
                            value={this.state.selectedAnaType}
                            hasNoInitialSelection = {true}
                            onChange={(e) => {this.setSelectedAnaType(e.target.value)}}
                            aria-label="Use aria labels when no actual label is in use"
                        />
                    </EuiFormRow>
                    <EuiFormRow label="选择展现形式">
                        <EuiSelect
                            options={this.figTypeOptionMap[this.state.selectedAnaType]}
                            hasNoInitialSelection = {true}
                            value={this.state.selectedFigType}
                            onChange={(e) => {this.setSelectedFigType(e.target.value)}}
                            aria-label="Use aria labels when no actual label is in use"
                        />
                    </EuiFormRow>
                </EuiModalBody> 

                <EuiModalFooter>
                    <EuiButtonEmpty onClick={() => {this.closeAnalysisModal()}}>Cancel</EuiButtonEmpty>
                    <EuiButton 
                        type="submit" 
                        onClick={
                            () => {
                                let ids = this.state.currentReportContentItemList.map(
                                    (item, index) => {return item.itemId}
                                )
                                doAnalysis(this.state.selectedAnaType, this.state.selectedFigType, ids).then(
                                    (res) => {
                                        this.setState({
                                            analysisResult : res,
                                            isAnalysisModalVisible : false,
                                            isFlyoutVisible : true
                                        })
                                    }
                                )
                            }
                        } 
                        fill>
                     进行分析
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
                onClose={() => this.setIsFlyoutVisible(false)}
              >
                <EuiFlyoutHeader hasBorder>
                  <EuiTitle size="m">
                    <h2>分析结果</h2>
                  </EuiTitle>
                </EuiFlyoutHeader>
                <EuiFlyoutBody>
                    {
                        this.state.analysisResult.map((fig)=>{
                            return (
                                <EuiImage
                                    size="l"
                                    hasShadow
                                    allowFullScreen
                                    alt="统计分析结果"
                                    src= {"data:image/png;base64," + fig}
                                />
                            )
                        })
                    }
                </EuiFlyoutBody>
              </EuiFlyout>
            );
        }
      

        return (
            <div style={{display: 'flex', flexDirection: 'column', width : '90%', height : '55%', margin: '0 auto'}}>
                <EuiPanel>
                        <EuiResizableContainer style={{ height: '100%' }}>
                            {(EuiResizablePanel, EuiResizableButton) => (
                                <>
                                <EuiResizablePanel
                                    mode="collapsible"
                                    initialSize={20}
                                    minSize="10%"
                                >
                                    <EuiPanel style={{ minHeight: '100%' }}> 
                                        <EuiTitle size="s">
                                            <p>待生成报告条目</p>
                                        </EuiTitle>
                                        <EuiSpacer/>
                                        <EuiListGroup flush> {reports2gen}</EuiListGroup>
                                        <EuiSpacer/>
                                        <EuiButton onClick={() => {this.openCreateModal()}}>
                                            + 新建待生成报告条目
                                        </EuiButton>
                                    </EuiPanel>
                                </EuiResizablePanel>
                                <EuiResizableButton />
                                <EuiResizablePanel mode="main" initialSize={80} minSize="50px">
                                    <EuiPanel paddingSize="l" style={{ minHeight: '100%' }}>
                                        <EuiTitle size="s">
                                            <p>{this.state.currentCollectionName}</p>
                                        </EuiTitle>
                                        <EuiSpacer />
                                        {controlArea}
                                        <EuiBasicTable
                                            tableCaption="Demo of EuiBasicTable"
                                            items={this.state.currentReportContentItemList}
                                            rowHeader="itemType"
                                            itemId="reportItemId"
                                            columns={columns}
                                            pagination={pagination}
                                            onChange={this.onTableChange}
                                            isSelectable={true}
                                            selection={selection}
                                        />
                                    </EuiPanel>
                                </EuiResizablePanel>
                                </>
                            )}
                        </EuiResizableContainer>
                </EuiPanel>
                {createModal}
                {analysisModal}
                {flyout}
            </div>
        )
    }

}

export default withRouter(ReportCollectionBox)