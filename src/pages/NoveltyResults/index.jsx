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
  EuiHorizontalRule
} from '@elastic/eui';
import axios from "axios"
import { ipList } from '../../configs/ipConfig';


export default class NoveltyResults extends Component {

  state = {
    isFlyoutVisible : false,
    focusSigory : "",
    noveltyAnalysisResult: []
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

  render() {
    const {response} = this.props.location.state
    const {signory_list} = response 
    let signoryList = signory_list
    let flyout 

    if (this.state.isFlyoutVisible) {
      flyout = (
        <EuiFlyout
          type="push"
          onClose={() => this.setIsFlyoutVisible(false)}
        >
          <EuiFlyoutHeader hasBorder>
            <EuiTitle size="m">
              <h2>主权项新颖性分析结果</h2>
            </EuiTitle>
            <EuiHorizontalRule />
              <EuiText>
                <p>
                  原主权项文本：{this.state.focusSigory}
                </p>
              </EuiText>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            {this.state.noveltyAnalysisResult.map((releSig)=>{
              return (
                <div>
                  <EuiText>
                    <p>
                      相关性主权项文本:
                      <br/>
                      {releSig[0]["signory_seg"]}
                    </p>
                    <p>
                      来自于专利:
                      <br/>
                      {releSig[0]["title"]}
                    </p>
                    <p>
                      抽取结果：
                      <br/>
                      {releSig[1]}
                    </p>
                  </EuiText>
                  <EuiHorizontalRule />
                </div>
            )})}
          </EuiFlyoutBody>
        </EuiFlyout>
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
        </EuiPageSection>
      </>
    )
  }
}
