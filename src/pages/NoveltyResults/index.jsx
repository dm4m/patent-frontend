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
  EuiButtonEmpty,
  EuiPanel, 
  useEuiTheme,
  useEuiBackgroundColor,
  EuiLink,
  EuiLoadingSpinner,
  EuiSpacer
} from '@elastic/eui';
import axios from "axios"
import { ipList } from '../../configs/ipConfig';
import { insertNoveltyResults, getReport2gen } from '../../utils/DataSource';
import { useLocation } from 'react-router-dom';

class NoveltyResults extends Component {

  state = {
    isFlyoutVisible : false,
    focusSigory : "",
    noveltyAnalysisResult: [],
    selectedNovelResults : [],
    itemIdToExpandedRowMap : {},
    isReportModalVisible : false,
    selectedReport : null,
    reportList : [],
    isLoadingModalVisable : false
  }

  noveltyAnalysis(signory){
    this.openLoadingModal()
    axios.get(ipList.FLASK_SOCKET + `/noveltyAnalysis`, {
        params: {
                    'signory': signory,
                }
    })
    .then(
        response => {
            this.closeLoadingModal()
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

  closeLoadingModal = () => {
    this.setState(
        {
            isLoadingModalVisable : false
        }
    )
  }

  openLoadingModal = () => {
      this.setState(
          {
              isLoadingModalVisable : true
          }
      )
  }

  render() {

    const {response} = this.props.location.state
    const {signory_list} = response 
    let signoryList = signory_list

    const noveltyResultsColumns = [
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
            columns={noveltyResultsColumns}
            isSelectable={true}
            selection={noveltyResultSelection}
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

    let loadingModal

    if(this.state.isLoadingModalVisable){
        loadingModal = 
        <EuiModal maxWidth='false' onClose={this.closeLoadingModal}>
            <EuiModalHeader>
                <EuiModalHeaderTitle>请稍候</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody >
                <EuiText>
                  新颖性分析可能需要一些时间
                </EuiText>
                <EuiSpacer />
                <div style={{display:'flex', justifyContent:'center'}}>
                    <EuiLoadingSpinner size='xxl'/>
                </div>
            </EuiModalBody> 
        </EuiModal>
    }

    return(
      <>
        {/* <EuiPanel> */}
          <EuiPageHeader
            paddingSize="l"
            pageTitle="新颖性分析结果"
            bottomBorder={true}
            description={"专利"  + this.state.focusSigory + "共提取出 " + signoryList.length + " 条主权项片段如下，点击其中一条可对其进行新颖性分析"}
          />
          <EuiPageSection
            bottomBorder={true}
            color="subdued">
            <EuiPanel style={{width: '90%'}}>
              <EuiFlexGroup direction="column">
                {signoryList.map((signory, index)=>{
                  let order = index + 1
                  return (
                    <EuiFlexItem grow={false} 
                    >
                      <EuiText 
                        style={{ padding: '10px', backgroundColor: this.props.bgColor}}
                      > 
                        <EuiLink onClick={() => {this.noveltyAnalysis(signory)}} color='text'>
                          { order  + '、' + signory}
                        </EuiLink>
                      </EuiText>
                    </EuiFlexItem>
                )})}
              </EuiFlexGroup>
            </EuiPanel>
            {flyout}
            {reportModal}
            {loadingModal}
          </EuiPageSection>
          {/* </EuiPanel> */}
      </>
    )
  }
}

export default function(props){
  const { euiTheme } = useEuiTheme()
  const location = useLocation() 
  const bgColor = useEuiBackgroundColor('primary')
  return <NoveltyResults theme={euiTheme} location={location} bgColor={bgColor}/>
}