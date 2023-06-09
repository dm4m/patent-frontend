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
  EuiSpacer,
  EuiFieldText
} from '@elastic/eui';
import axios from "axios"
import { ipList } from '../../configs/ipConfig';
import { getAnalysisCollection, insertNoveltyResults, getReport2gen, insertAnalysisCollection, insertCollectionItems, addPatentInfo2Report} from '../../utils/DataSource';
import { Link, useLocation} from 'react-router-dom'

class NoveltyResults extends Component {

  state = {
    isFlyoutVisible : true,
    flyoutType : 'search',
    focusSigory : "",
    noveltyAnalysisResult: [],
    selectedNovelResults : [],
    itemIdToExpandedRowMap : {},
    patentIdToExpandedRowMap : {},
    selectedSearchResults : [],
    isSaveModalVisible : false,
    selectedReport : null,
    reportList : [],
    isLoadingModalVisable : false,
    newResultName : "",
    // 检索结果加入统计分析集合
    isAnaModalVisible : false,
    collectionList : [],
    selectedAnaCollection : null,
    reportList : [],
    selectedReportId : null,
    isReportModalVisible : false
  }

  noveltyAnalysis(signory, patentIds){
    this.openLoadingModal()
    axios.post(ipList.FLASK_SOCKET + `/noveltyAnalysis`, {
        'signory': signory,
        'patentIds' : patentIds
      },
      {
          headers: {'Context-Type': 'application/json'}
      }
    )
    .then(
        response => {
            this.closeLoadingModal()
            this.setState({
              focusSigory : signory,
              noveltyAnalysisResult : response.data,
              flyoutType: 'novelty'
              // isFlyoutVisible : true
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

  setPatentIdToExpandedRowMap(map){
    this.setState({
      patentIdToExpandedRowMap : map
    })
  }

  setSelectedNovelResults(items){
    this.setState({
      selectedNovelResults : items
    }, () => {console.log(this.state.selectedNovelResults)})
  }

  setSelectedSearchResults(searchResults){
    this.setState({
        selectedSearchResults : searchResults
    }, () => {console.log(this.state.selectedSearchResults)})
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

  togglePatentDetails = (result) => {
    const patentIdToExpandedRowMapValues = { ...this.state.patentIdToExpandedRowMap };
    if (patentIdToExpandedRowMapValues[result.id]) {
      delete patentIdToExpandedRowMapValues[result.id];
    } else {
      patentIdToExpandedRowMapValues[result.id] = (
        <EuiText style={{whiteSpace: 'pre-wrap'}}>
            {result.abstract}
        </EuiText>
        
      );
    }
    this.setPatentIdToExpandedRowMap(patentIdToExpandedRowMapValues);
  };

  closeSaveModal(){
    this.setState({
        isSaveModalVisible : false
    })
  }

  openSaveModal(){
    this.setState({
        isSaveModalVisible : true
    }, ()=>{})
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

  setSelectedAnaCollection = (value) => {
    this.setState({
        selectedAnaCollection : value,
        newCollectionName : ""
    })
  };

  closeReportModal(){
    this.setState({
        isReportModalVisible : false
    })
  }

  openReportModal(contentType){
      this.setState({
          isReportModalVisible : true,
          reportAddContent : contentType
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

  setSelectedReportId = (value) => {
    this.setState({
        selectedReportId : value
    })
  };

  render() {

    const {response} = this.props.location.state
    const {signoryList, results, totalHits} = response 
    const searchResults = results
    const patentIds = searchResults.map(searchResult => (searchResult.id))

    const noveltyResultsColumns = [
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
          const patentIdToExpandedRowMapValues = { ...this.state.patentIdToExpandedRowMap }; 
          return (
            <EuiButtonIcon
              onClick={() => this.togglePatentDetails(result)}
              aria-label={
                patentIdToExpandedRowMapValues[result.id] ? 'Collapse' : 'Expand'
              }
              iconType={
                patentIdToExpandedRowMapValues[result.id] ? 'arrowDown' : 'arrowRight'
              }
            />
          );
        },
      }
    ]

    const  renderButtons = () => {
      if (this.state.selectedSearchResults.length === 0) {
          return;
      }
      return (
          <div>
              <EuiFlexGroup>
                  <EuiFlexItem grow={false}>
                      <EuiButton fill onClick={() => {this.openAnaModal()}}>
                          保存选中检索结果
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

    let flyout

    let searchResFlyout = (
      <EuiFlyout
        type="push"
      >
        <EuiFlyoutHeader hasBorder>
          <EuiFlexGroup responsive={false} gutterSize="s" justifyContent='spaceBetween'>
            <EuiFlexItem grow={false}>
              <EuiTitle size="m">
                <h2>相关专利</h2>
              </EuiTitle>
            </EuiFlexItem>
            <EuiFlexItem grow={false} style={{marginRight: '2em'}}>
              {buttons}
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiHorizontalRule />
          <EuiText>
            <p>
              以下为系统检索得到的相关专利，从中比对分析对象，点击页面左侧权利要求进行分析
            </p>
          </EuiText>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
        <EuiBasicTable
          tableCaption="Demo of EuiBasicTable"
          items={searchResults}
          itemIdToExpandedRowMap={this.state.patentIdToExpandedRowMap}
          isExpandable={true}
          rowHeader="patentName"
          itemId="id"
          columns={searchReColumns}
          isSelectable={true}
          selection={searchReSelection}
          tableLayout="auto"
        />
        </EuiFlyoutBody>
      </EuiFlyout>
    )

    let noveltyResFlyout = (
      <EuiFlyout
        type="push"
        onClose={() => {
          this.setState({
            flyoutType : 'search'
          })
        }}
      >
        <EuiFlyoutHeader hasBorder>
          <EuiFlexGroup responsive={false} gutterSize="s" justifyContent='spaceBetween'>
            <EuiFlexItem grow={false}>
              <EuiTitle size="m">
                <h2>权利要求新颖性分析结果</h2>
              </EuiTitle>
            </EuiFlexItem>
            <EuiFlexItem grow={false} style={{marginRight: '2em'}}>
              <EuiButton
                    iconType='inspect'
                    onClick={() => {
                      this.openSaveModal()
                  }}
              >
                  保存选中分析结果
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiHorizontalRule />
          <EuiText>
            <p>
              原权利要求文本：{this.state.focusSigory}
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
          tableLayout="auto"
        />
        </EuiFlyoutBody>
      </EuiFlyout>
    )

    if (this.state.flyoutType == 'search') {
      flyout = searchResFlyout
    }else if(this.state.flyoutType == 'novelty'){
      flyout = noveltyResFlyout
    }

    let saveModal

    if (this.state.isSaveModalVisible) {
        saveModal = (
          <EuiModal onClose={() => {this.closeSaveModal()}}>
          <EuiModalHeader>
              <EuiModalHeaderTitle>
                  <h1>保存新颖性创造性分析结果</h1>
              </EuiModalHeaderTitle>
          </EuiModalHeader>
  
          <EuiModalBody>
              <EuiFormRow label="请为分析结果命名">
                  <EuiFieldText
                      placeholder="Placeholder text"
                      value={this.state.newResultName}
                      onChange={(e) => {
                              this.setState({
                                  newResultName : e.target.value
                              }, () => {})
                      }}
                      aria-label="Use aria labels when no actual label is in use"
                  />
              </EuiFormRow>
          </EuiModalBody>

          <EuiModalFooter>
              <EuiButtonEmpty onClick={() => {this.closeSaveModal()}}>Cancel</EuiButtonEmpty>
              <EuiButton 
                  type="submit" 
                  onClick={() => {
                    insertNoveltyResults(this.state.newResultName, this.state.focusSigory, this.state.selectedNovelResults)
                    this.closeSaveModal()
                  } }
                  fill
              >
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
                            addPatentInfo2Report(this.state.selectedReportId, signoryList)
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
        {/* <EuiPanel> */}
          <EuiPageHeader
            paddingSize="l"
            pageTitle="新颖性分析结果"
            bottomBorder={true}
            description={"专利"  + this.state.focusSigory + "共提取出 " + signoryList.length + " 条权利要求片段如下，点击其中一条可对其进行新颖性分析"}
            rightSideItems={[
              <EuiButton
                  onClick={() => {
                      this.openReportModal("searchResults")
                  }}
              >
                  保存权利要求
              </EuiButton>
            ]}
          />
          <EuiPageSection 
            bottomBorder={true}
            color="subdued">
            <EuiPanel >
              <EuiFlexGroup direction="column">
                {signoryList.map((signory, index)=>{
                  let order = index + 1
                  return (
                    <EuiFlexItem grow={false} 
                    >
                      <EuiText 
                        style={{ padding: '10px', backgroundColor: this.props.bgColor}}
                      > 
                        <EuiLink 
                          onClick={
                            () => {
                              let selectedIds = this.state.selectedSearchResults.map((res) => {return res.id})
                              console.log(selectedIds)
                              if(selectedIds.length > 0)
                              this.noveltyAnalysis(signory, selectedIds)
                            }
                          } 
                          color='text'
                        >
                          { order  + '、' + signory}
                        </EuiLink>
                      </EuiText>
                    </EuiFlexItem>
                )})}
              </EuiFlexGroup>
            </EuiPanel>
            {flyout}
            {saveModal}
            {loadingModal}
            {anaModal}
            {reportModal}
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