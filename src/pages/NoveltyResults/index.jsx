import React, { Component } from 'react'
import { 
  EuiPageHeader,
  EuiPageSection,
  EuiListGroup,
  EuiListGroupItem,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiTitle,
  EuiText,
  EuiHorizontalRule,
  EuiBasicTable,
  EuiButtonIcon,
  EuiScreenReaderOnly,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiFormRow,
  EuiSuperSelect,
  EuiModalFooter,
  EuiButtonEmpty
} from '@elastic/eui';
import axios from "axios"
import { ipList } from '../../configs/ipConfig';
import { insertNoveltyResults, getReport2gen } from '../../utils/DataSource';


export default class NoveltyResults extends Component {

  state = {
    isFlyoutVisible : false,
    focusSigory : "",
    noveltyAnalysisResult: [],
    selectedNovelResults : [],
    itemIdToExpandedRowMap : {},
    isReportModalVisible : false,
    selectedReport : null,
    reportList : []
  }

  noveltyAnalysis(signory){
    console.log(signory)
    axios.get(ipList.FLASK_SOCKET + `/noveltyAnalysis`, {
        params: {
                    'signory': signory,
                }
    })
    .then(
        response => {
            console.log(response.data)
            this.setState({
              focusSigory : signory,
              noveltyAnalysisResult : response.data,
              isFlyoutVisible : true
            }, () => {})
        },
        error => { 
        }
    )
  } 

  setIsFlyoutVisible = (isVisible) =>{
    this.setState({isFlyoutVisible : isVisible})
  }

  setItemIdToExpandedRowMap(map){
    this.setState({
      itemIdToExpandedRowMap : map
    })
  }

  setSelectedNovelResults(items){
    this.setState({
      selectedNovelResults : items
    }, () => {console.log(this.state.selectedNovelResults)})
  }

  toggleDetails = (result) => {
    const itemIdToExpandedRowMapValues = { ...this.state.itemIdToExpandedRowMap };
    console.log(result)
    console.log(result.relevant_sig_id)
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

  setSelectedReport = (value) => {
    this.setState({
        selectedReport : value
    })
  };

  render() {

    const {response} = this.props.location.state
    const {signory_list} = response 
    let signoryList = signory_list

    const columns = [
      {
          field: 'relevant_sig',
          name: '相关主权项',
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

    const onSelectionChange = (selectedNovelResults) => {
        this.setSelectedNovelResults(selectedNovelResults);
    };        

    const selection = {
        selectable: (item) => true,
        selectableMessage: (selectable) =>
            !selectable ? 'User is currently offline' : undefined,
        onSelectionChange: onSelectionChange,
        initialSelected: []
    };

    let flyout

    if (this.state.isFlyoutVisible) {
      flyout = (
        <EuiFlyout
          type="push"
          onClose={() => this.setIsFlyoutVisible(false)}
        >
          <EuiFlyoutHeader hasBorder>
            <EuiFlexGroup responsive={false} gutterSize="s" justifyContent='spaceBetween'>
              <EuiFlexItem grow={false}>
                <EuiTitle size="m">
                  <h2>主权项新颖性分析结果</h2>
                </EuiTitle>
              </EuiFlexItem>
              <EuiFlexItem grow={false} style={{marginRight: '2em'}}>
                <EuiButton
                      iconType='inspect'
                      onClick={() => {
                        this.openReportModal()
                    }}
                >
                    保存分析结果
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiHorizontalRule />
              <EuiText>
                <p>
                  原主权项文本：{this.state.focusSigory}
                </p>
              </EuiText>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
          <EuiBasicTable
            tableCaption="Demo of EuiBasicTable"
            items={this.state.noveltyAnalysisResult}
            itemIdToExpandedRowMap={this.state.itemIdToExpandedRowMap}
            isExpandable={true}
            rowHeader="relevant_sig"
            itemId='relevant_sig_id'
            columns={columns}
            onChange={this.onTableChange}
            isSelectable={true}
            selection={selection}
          />
          </EuiFlyoutBody>
        </EuiFlyout>
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
                            let patentIds = this.state.selectedNovelResults.map((patent) => {
                                return patent.id
                            })
                            insertNoveltyResults(this.state.selectedReport, this.state.focusSigory, this.state.selectedNovelResults)
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

    return(
      <>
        <EuiPageHeader
          paddingSize="l"
          pageTitle="新颖性分析结果"
          bottomBorder={true}
          description={"专利"  + this.state.focusSigory + "共提取出 " + signoryList.length + " 条主权项片段如下，点击其中一条可对其进行新颖性分析"}
        />
        <EuiPageSection
          bottomBorder={true}
          color="subdued">
          <EuiListGroup maxWidth={false}>
            {signoryList.map((signory)=>{
              return (
                <EuiListGroupItem
                  // onClick={() => {this.setIsFlyoutVisible(!this.state.isFlyoutVisible)}}\
                  onClick={() => {this.noveltyAnalysis(signory)}}
                  wrapText
                  label={signory}
                />
            )})}
          </EuiListGroup>
          {flyout}
          {reportModal}
        </EuiPageSection>
      </>
    )
  }
}
