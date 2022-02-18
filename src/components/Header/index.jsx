import React, { useState } from 'react';
import { Link, withRouter, useLocation} from 'react-router-dom';
import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiSuperSelect,
  EuiHeaderSectionItemButton
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
              <span>智能检索</span>
              )
          }
        ],

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

  changeSearchType = (op) =>{
    
    if(op != this.state.currentOption){
      this.setState({currentOption : op})
      if(op == 'basic_search'){
        this.props.history.push({pathname:'/basicSearch'})
      }else if(op == 'advanced_search'){
        this.props.history.push({pathname:'/advancedSearch'})
      }else if(op == 'neural_search'){
        this.props.history.push({pathname:'/neuralSearch'})
      }
    }
  }

  render(){
    return (
      <>
        <EuiHeader>
        <EuiHeaderSection side='left'>
          <EuiHeaderSectionItem border="right">
            <EuiCustomLink to='/basicSearch'>
              <EuiHeaderLogo iconType='\images\bit_logo.png' >专利智能检索</EuiHeaderLogo>
            </EuiCustomLink>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
        <EuiHeaderSection side='right'>
          <EuiHeaderSectionItem border="right">
            <EuiSuperSelect
              options={this.state.options}
              valueOfSelected={this.state.currentOption}
              onChange={(value) => this.changeSearchType(value)}
            />
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
        {/* <EuiHeaderSectionItem>
          <EuiHeaderLinks aria-label="App navigation links example"> */}
              {/* <Link to="/homepage">
                <EuiHeaderLink>首页</EuiHeaderLink>
              </Link> */}
          
              {/* <Link to="/searchResults">
                <EuiHeaderLink>结果页</EuiHeaderLink>
              </Link>
  
              <Link to="/detailPage">
                <EuiHeaderLink>详情页</EuiHeaderLink>
              </Link> */}
  
            {/* <EuiHeaderLink>历史记录</EuiHeaderLink> */}
          {/* </EuiHeaderLinks>
        </EuiHeaderSectionItem> */}
      </EuiHeader>
      </>
    );
  }
};

export default withRouter(Header)