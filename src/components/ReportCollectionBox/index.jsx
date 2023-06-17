import React, { Component } from 'react'
import {withRouter, Link} from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
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
    EuiSelect,
    useEuiTheme,
    EuiHealth,
    EuiLink,
    EuiScreenReaderOnly
} from '@elastic/eui';
import { getAnalysisCollection, getACItemByCollectionId, deleteCollectionItemsByIds, deleteCollectionById, insertAnalysisCollection, generateReport, getReportFile, getReportContentDetail} from '../../utils/DataSource';
import { doAnalysis } from '../../utils/AnalysisUtils';
import { getReport2gen, deleteReport2genById, getRCItemsByReportId, deleteRCItemsByIds, insertReport2gen} from '../../utils/DataSource'; 

class ReportCollectionBox extends Component {

    constructor(props){
        super()
        this.initReport2genList()
    }

    state = {
        report2genList : [],
        currentReport : {},
        currentReportContentItemList : [],
        currentReportContentItemCount : 0,
        pageIndex : 0,
        pageSize : 10,
        selectedItems : [],
        isCreateModalVisible : false,
        isAnalysisModalVisible : false,
        newReportName : "",
        selectedAnaType : '',
        selectedFigType : '',
        analysisResult : [],
        isFlyoutVisible : false,
        // 检索/统计分析/新颖性比对
        flyoutContentType : '',
        flyoutSearchResultItems : [],
        selectedSearchResults : [],
        flyoutStatsAnaItems : [],
        flyoutNoveltyAnaItems : {},
        flyoutNoveltyStatsItems : [],
        flyoutReportSignorys : [],
        selectedNovelResults : [],
        itemIdToExpandedRowMap : {},
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

    setCurrentReport(report){
        getRCItemsByReportId(report.reportId, this.state.pageIndex, this.state.pageSize).then(
            res => {
                this.setState(
                    {   
                        currentReport : report, 
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
        getRCItemsByReportId(this.state.currentReport.reportId, pageIndex, pageSize).then(
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
        }, () => {console.log(this.state.selectedItems)})
    }

    initReport2genList(){
        getReport2gen().then(
            res => {
                this.setState(
                    {
                        report2genList : res
                    },
                    () => {
                        if(res.length > 0){
                            this.setCurrentReport(this.state.report2genList[0])
                        }    
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
            (item, index) => {return item.reportItemId}
        )
        deleteRCItemsByIds(ids).then(
            res => {
                this.setCurrentReport(this.state.currentReport)
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

    openBase64NewTab(base64Pdf){
        var blob = this.base64toBlob(base64Pdf);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, "pdfBase64.pdf");
        } else {
            const blobUrl = URL.createObjectURL(blob);
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = blobUrl;
            a.target = "_blank"
            a.download = this.state.currentReport.reportName;
            a.click();
            // window.open(exportUrl);
            // window.location.assign(exportUrl);
            // URL.revokeObjectURL(blobUrl);
        }
    }
      
    base64toBlob(base64Data) {
        const sliceSize = 1024;
        const byteCharacters = atob(base64Data);
        const bytesLength = byteCharacters.length;
        const slicesCount = Math.ceil(bytesLength / sliceSize);
        const byteArrays = new Array(slicesCount);
        
        for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            const begin = sliceIndex * sliceSize;
            const end = Math.min(begin + sliceSize, bytesLength);
        
            const bytes = new Array(end - begin);
            for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, { type: "application/pdf" });
    }

    showReportContentDetail(contentItem){
        getReportContentDetail(contentItem.itemType, contentItem.corrId).then(
            res => {
                if(contentItem.itemType == '检索结果'){
                    this.setState({
                        isFlyoutVisible : true, 
                        flyoutContentType : '检索',
                        flyoutSearchResultItems : res.searchResults
                    }, () => {})
                }else if(contentItem.itemType == '新颖性比对结果'){
                    this.setState({
                        isFlyoutVisible : true, 
                        flyoutContentType : '新颖性比对',
                        flyoutNoveltyAnaItems : res.noveltyAnaResult
                    }, () => {})
                }else if(contentItem.itemType == '统计分析结果'){
                    this.setState({
                        isFlyoutVisible : true, 
                        flyoutContentType : '统计分析',
                        flyoutStatsAnaItems : res.statsResults
                    }, () => {})
                }else if(contentItem.itemType == '新颖性统计结果'){
                    this.setState({
                        isFlyoutVisible : true, 
                        flyoutContentType : '新颖性统计',
                        flyoutNoveltyStatsItems : res.noveltyStatsResults
                    }, () => {})
                }else if(contentItem.itemType == '专利信息'){
                    this.setState({
                        isFlyoutVisible : true, 
                        flyoutContentType : '专利信息',
                        flyoutReportSignorys : res.reportSignorys
                    }, () => {})
                }
            }
        )
    }

    setSelectedSearchResults(searchResults){
        this.setState({
            selectedSearchResults : searchResults
        }, () => {})
    }

    setSelectedNovelResults(items){
        this.setState({
            selectedNovelResults : items
        }, () => {console.log(this.state.selectedNovelResults)})
    }

    setItemIdToExpandedRowMap(map){
        this.setState({
            itemIdToExpandedRowMap : map
        })
    }

    toggleDetails = (result) => {
        const itemIdToExpandedRowMapValues = { ...this.state.itemIdToExpandedRowMap };
        console.log(result)
        console.log(result.novelty_ana_item_id)
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

        const reports2gen = this.state.report2genList.map((report, index) => (
            <EuiListGroupItem
                key={index}
                onClick={() => {this.setCurrentReport(report)}}
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
                field: 'name',
                name: '内容名称',
                // truncateText: false,
                render: (name, item) => (
                    <EuiLink onClick={() => {this.showReportContentDetail(item)}} >
                        {name}
                    </EuiLink>
                ),  
                textOnly: false
            },
            // {
            //     field: 'itemType',
            //     name: '内容类型',
            //     truncateText: false
            // }
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

        let reportStatsColor = 'subdued'

        if(this.state.currentReport.status == '生成中'){
            reportStatsColor = 'primary'
        }else if(this.state.currentReport.status == '已生成'){
            reportStatsColor = 'success'
        }
        
        const renderControllArea = () => {
            return (
                <div>
                    <EuiFlexGroup responsive={false} gutterSize="s" alignItems="center" justifyContent='spaceBetween'>
                        <EuiFlexItem>
                            <EuiFlexGroup>
                                <EuiFlexItem grow={false}>
                                    <EuiButton
                                        iconType='visLine'
                                        onClick={() => {
                                            generateReport(this.state.currentReport.reportId)
                                        }}
                                    >
                                        {this.state.currentReport.status === '已生成' ? '重新生成报告' : '生成报告'}
                                    </EuiButton>
                                </EuiFlexItem>
                                {
                                    this.state.currentReport.status == '已生成' ? 
                                    <EuiFlexItem grow={false}>
                                        <EuiButton
                                            iconType='search'
                                            onClick={() => {
                                                getReportFile(this.state.currentReport.pdfFilePath).then(
                                                    res => {
                                                        console.log(res) 
                                                        this.openBase64NewTab(res)
                                                        // this.setState(
                                                        //     {
                                                                
                                                        //     },
                                                        //     () => {}
                                                        // )
                                                    }
                                                )
                                            }}
                                        >
                                            下载报告
                                        </EuiButton> 
                                    </EuiFlexItem>
                                    : null 
                                }
                                {
                                    this.state.selectedItems.length === 0 ? null :
                                    <EuiFlexItem grow={false}>
                                        <EuiButton
                                            color='danger'
                                            iconType="trash"
                                            onClick={() => {this.deleteSelectedItems()}}
                                        >
                                            删除选中报告内容
                                        </EuiButton>
                                    </EuiFlexItem>
                                }
                            </EuiFlexGroup>
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiFlexGroup justifyContent='flexEnd' gutterSize="s" alignItems='center'>

                                <EuiFlexItem grow={false}>
                                    <EuiText>报告生成状态：</EuiText>
                                </EuiFlexItem>
                                
                                <EuiFlexItem grow={false}>
                                    <EuiIcon type='stop'></EuiIcon>
                                </EuiFlexItem>
                                
                                <EuiFlexItem grow={false}>
                                    <EuiText>{this.state.currentReport.status}</EuiText>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                        </EuiFlexItem>
                        
                    </EuiFlexGroup>
                    
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
                        <h1>新建待生成报告</h1>
                    </EuiModalHeaderTitle>
                </EuiModalHeader>
        
                <EuiModalBody>
                    <EuiFormRow label="请输入新建待生成报告名">
                        <EuiFieldText
                            placeholder="Placeholder text"
                            value={this.state.newReportName}
                            onChange={(e) => {
                                    this.setState({
                                        newReportName : e.target.value
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
                                insertReport2gen(this.state.newReportName).then(
                                    (res) => {
                                        this.initReport2genList()
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

        // 检索结果表格 
        let searchReColumns = [
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
            // {
            //     field: 'abstract',
            //     name: '摘要',
            //     truncateText: true,
            //     width: '35em'
            // },
            // {
            //     field: 'patent_type',
            //     name: '专利类型',
            //     truncateText: false,
            //     width: '6em'
            // },
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

        //新颖性分析结果表格 
        const noveltyResultsColumns = [
            {
                field: 'index_num',
                name: '序号',
                truncateText: false
            },
            {
                field: 'relevant_sig',
                name: '相关主权项',
                truncateText: false
            },
            {
                field: 'score',
                name: '相关性分数',
                truncateText: false
            },
            {
                field: 'ori_patent_title',
                name: '来自于专利',
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
      
        const onNCSelectionChange = (selectedNovelResults) => {
            this.setSelectedNovelResults(selectedNovelResults);
        };        
    
        const noveltyResultSelection = {
            selectable: (item) => true,
            selectableMessage: (selectable) =>
                !selectable ? 'User is currently offline' : undefined,
            onSelectionChange: onNCSelectionChange,
            initialSelected: []
        };

        let flyoutContent

        if(this.state.flyoutContentType == '检索'){
            flyoutContent = 
            <EuiBasicTable
                tableCaption="Demo of EuiBasicTable"
                items={this.state.flyoutSearchResultItems}
                rowHeader="patentName"
                itemId="search_result_item_id"
                columns={searchReColumns}
                onChange={this.onSearchTableChange}
                // isSelectable={true}
                // selection={searchReSelection}
            />
        }else if(this.state.flyoutContentType == '统计分析'){
            flyoutContent = 
            <div>
                {
                    this.state.flyoutStatsAnaItems.map((item, index)=>{
                        var option = JSON.parse(item.option_json)
                        return (
                            <div>
                                <ReactECharts
                                    option={option}
                                    style={{
                                        width : `500px`,
                                        height : `500px`
                                    }}
                                    notMerge={true}
                                    opts={{renderer: 'svg'}}
                                />
                                <EuiSpacer />
                            </div>
                        )
                    })
                }
            </div>
        }else if(this.state.flyoutContentType == '新颖性比对'){
            flyoutContent =
            <div>
                <EuiBasicTable
                    tableCaption="Demo of EuiBasicTable"
                    items={this.state.flyoutNoveltyAnaItems.anaItems}
                    itemIdToExpandedRowMap={this.state.itemIdToExpandedRowMap}
                    isExpandable={true}
                    rowHeader="relevant_sig"
                    itemId='novelty_ana_item_id'
                    columns={noveltyResultsColumns}
                    tableLayout="auto"
                    // isSelectable={true}
                    // selection={noveltyResultSelection}
                />
            </div>
        }else if(this.state.flyoutContentType == '新颖性统计'){
            flyoutContent = 
            <div>
                {
                    this.state.flyoutNoveltyStatsItems.map((item, index)=>{
                        var option = JSON.parse(item.option_json)
                        return (
                            <div>
                                <ReactECharts
                                    option={option}
                                    style={{
                                        width : `500px`,
                                        height : `500px`
                                    }}
                                    notMerge={true}
                                    opts={{renderer: 'svg'}}
                                />
                                <EuiSpacer />
                            </div>
                        )
                    })
                }
            </div>
        }else if(this.state.flyoutContentType == '专利信息'){
            flyoutContent = 
            <div>
                {
                    this.state.flyoutReportSignorys.map((signory, index)=>{
                    let order = index + 1
                    return (
                    <EuiFlexItem grow={false} 
                    >
                        <EuiText 
                        style={{ padding: '10px', backgroundColor: this.props.bgColor}}
                        > 
                            { order  + '、' + signory}
                        </EuiText>
                        <EuiHorizontalRule/>
                    </EuiFlexItem>
                    
                    )})}
                    
            </div>
            
        }

        let flyout

        if (this.state.isFlyoutVisible) {
            flyout = (
              <EuiFlyout
                type="push"
                size='s'
                onClose={() => this.setIsFlyoutVisible(false)}
              >
                <EuiFlyoutHeader hasBorder>
                  <EuiTitle size="m">
                    <h2>{this.state.flyoutContentType}结果</h2>
                  </EuiTitle>
                </EuiFlyoutHeader>
                <EuiFlyoutBody>
                    <>
                        {flyoutContent}
                    </>
                </EuiFlyoutBody>
              </EuiFlyout>
            );
        }

        return (
            <div style={{display: 'flex', flexDirection: 'column', width : '90%', height : '55%', margin: '0 auto'}}>
                <EuiPanel 
                     style={{
                        backgroundColor: theme.colors.lightestShade
                    }}
                >
                        <EuiResizableContainer style={{ height: '100%' }}>
                            {(EuiResizablePanel, EuiResizableButton) => (
                                <>
                                <EuiResizablePanel
                                    mode="collapsible"
                                    initialSize={20}
                                    minSize="10%"
                                >
                                    <EuiPanel paddingSize="l" style={{ minHeight: '100%' }}> 
                                        <EuiTitle size="s">
                                            <p>待生成报告条目</p>
                                        </EuiTitle>
                                        <EuiHorizontalRule
                                            margin='m'
                                        />  
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
                                        {controlArea}
                                        <EuiHorizontalRule
                                            margin='m'
                                        />
                                        <EuiBasicTable
                                            tableCaption="Demo of EuiBasicTable"
                                            items={this.state.currentReportContentItemList}
                                            rowHeader="name"
                                            itemId="reportItemId"
                                            columns={columns}
                                            pagination={pagination}
                                            onChange={this.onTableChange}
                                            isSelectable={true}
                                            selection={selection}
                                            hasActions={true}
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

export default function(props){
    const { euiTheme } = useEuiTheme()
    return <ReportCollectionBox theme={euiTheme}/>
}