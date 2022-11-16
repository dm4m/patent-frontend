import React, { useState } from 'react';
import { Link, withRouter, useLocation} from 'react-router-dom';
import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiSuperSelect,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiHeaderSectionItemButton,
  EuiPopover,
  EuiContextMenuPanel,
  EuiButton,
  EuiButtonEmpty,
  EuiCollapsibleNavGroup,
  EuiPinnableListGroup,
  EuiListGroupItem,
  EuiListGroup
} from '@elastic/eui';
import EuiCustomLink from '../../router/EuiCustomLink';
import { Component } from 'react';

class Header extends Component {

  constructor(props){
    super(props)
    this.state = {
      options : [
          {
            value: 'basic_search',
            inputDisplay: (
              <span>简单检索</span>
              )
          },
          {
            value: 'advanced_search',
            inputDisplay: (
              <span>高级检索</span>
              )
          },
          {
            value: 'neural_search',
            inputDisplay: (
              <span>语义检索</span>
              )
          }
        ],
      isPopoverOpen : false,
      isOnButton: false,
      isOnPopover: false
    }
    const {pathname} = this.props.location
    if(pathname == '/basicSearch'){
      this.state.currentOption = 'basic_search'
    }else if(pathname == '/advancedSearch'){
      this.state.currentOption = 'advanced_search'
    }else if(pathname == '/neuralSearch'){
      this.state.currentOption = 'neural_search'
    }else{
      this.state.currentOption = 'basic_search'
    }
  
  }

  setCurrentOp = (op) => {
    this.setState({currentOption: op})
  }

  buttonOnMouseOver = () => {
    this.setState({
      isPopoverOpen: true,
      isOnButton: true,
    }, ()=>{
      // console.log("isPopOpen" + this.state.isPopoverOpen)
    });
  };

  popOnMouseOver = () => {
    this.setState({
      isPopoverOpen: true,
      isOnPopover: true,
    }, ()=>{
      // console.log("isPopOpen" + this.state.isPopoverOpen)
    });
  };

  buttonOnMouseOut = () => {
    this.setState({
      isOnButton : false
    }, ()=>{
      setTimeout(() => {
        if(!this.state.isOnButton && !this.state.isOnPopover){
          this.setState({
            isPopoverOpen : false
          },()=>{
            // console.log("isPopOpen" + this.state.isPopoverOpen)
          });
        }
      },500)
    }); 
  };

  popOnMouseOut = () => {
    this.setState({
      isOnPopover : false
    }, ()=>{
      setTimeout(() => {
        if(!this.state.isOnButton && !this.state.isOnPopover){
          this.setState({
            isPopoverOpen : false
          },()=>{
            // console.log("isPopOpen" + this.state.isPopoverOpen)
          });
        }
      },500)
    }); 
  };

  render(){

    const button = (
      <EuiButtonEmpty
        color='text'
        onClick={() => {this.props.history.push({pathname:'/basicSearch'})}}
        onMouseOver={() => this.buttonOnMouseOver()}
        onMouseOut={() => this.buttonOnMouseOut()}
      >
        专利检索
      </EuiButtonEmpty>
    );

    return (
      <>
        <EuiHeader>
        <EuiHeaderSection side='left'>
          <EuiHeaderSectionItem border="right">
            <EuiCustomLink to='/homePage'>
              <EuiHeaderLogo iconType='searchProfilerApp' >
                专利预评估系统
              </EuiHeaderLogo>
            </EuiCustomLink>
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem border="right">
            <EuiPopover
                button={button}
                panelPaddingSize="s"
                anchorPosition="downLeft"
                isOpen={this.state.isPopoverOpen}
              >
              <EuiListGroup 
                onMouseOver={() => this.popOnMouseOver()}
                onMouseOut={() => this.popOnMouseOut()}>
                <EuiListGroupItem onClick={() => {this.props.history.push({pathname:'/basicSearch'})}} label="简单检索" />
                <EuiListGroupItem onClick={() => {this.props.history.push({pathname:'/advancedSearch'})}} label="高级检索" />
                <EuiListGroupItem onClick={() => {this.props.history.push({pathname:'/neuralSearch'})}} label="语义检索"/>
              </EuiListGroup>
            </EuiPopover>
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem border="right">
            <EuiHeaderLinks aria-label="App navigation dark theme example">
                <EuiHeaderLink>新颖性分析</EuiHeaderLink>
                <EuiHeaderLink>统计分析</EuiHeaderLink>
                <EuiHeaderLink>报告生成</EuiHeaderLink>
            </EuiHeaderLinks>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
      </>
    );
  }
};

export default withRouter(Header)