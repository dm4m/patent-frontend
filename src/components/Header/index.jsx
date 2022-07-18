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
            value: 'pro_search',
            inputDisplay: (
              <span>专业检索</span>
              )
          },
          {
            value: 'neural_search',
            inputDisplay: (
              <span>语义检索</span>
              )
          }
        ],

    }
    const {pathname} = this.props.location
    if(pathname == '/basicSearch'){
      this.state.currentOption = 'basic_search'
    }else if(pathname == '/advancedSearch'){
      this.state.currentOption = 'advanced_search'
    }else if(pathname == '/proSearch'){
      this.state.currentOption = '/pro_search'
    }else if(pathname == '/neuralSearch'){
      this.state.currentOption = 'neural_search'
    }else{
      this.state.currentOption = 'basic_search'
    }
  
  }

  setCurrentOp = (op) => {
    this.setState({currentOption: op})
  }

  changeSearchType = (op) =>{
    if(op != this.state.currentOption){
      this.setState({currentOption : op})
      if(op == 'basic_search'){
        this.props.history.push({pathname:'/basicSearch'})
      }else if(op == 'advanced_search'){
        this.props.history.push({pathname:'/advancedSearch'})
      }else if(op == 'pro_search'){
        this.props.history.push({pathname:'/proSearch'})
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
              <EuiHeaderLogo onClick={()=>this.setCurrentOp('basic_search')} iconType='\images\bit_logo.png' >专利智能检索</EuiHeaderLogo>
            </EuiCustomLink>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
        <EuiHeaderSection side='right'>
          <EuiHeaderSectionItem border="right">
            <div style={{
              width: "8em"
            }}>
              <EuiSuperSelect
                options={this.state.options}
                valueOfSelected={this.state.currentOption}
                onChange={(value) => this.changeSearchType(value)}
              />
            </div>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
      </>
    );
  }
};

export default withRouter(Header)