import React, { useState, Component } from 'react';
import { Link, withRouter, useLocation} from 'react-router-dom';
import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiButtonEmpty,
} from '@elastic/eui';
import EuiCustomLink from '../../router/EuiCustomLink';
import HeaderMenu from './HeaderMenu'

class Header extends Component {

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

    const menuList = [
      {
        title : '专利检索',
        titlePath : '/basicSearch',
        items : [
          {name : '简单检索', path : '/basicSearch'},
          {name : '高级检索', path : '/advancedSearch'},
          {name : '专业检索', path : '/proSearch'},
          {name : '语义检索', path : '/neuralSearch'},
          {name : '整篇检索', path : '/uploadSearch'}
        ]
      }, 
      {
        title : '新颖性分析',
        titlePath : '/noveltyHome',
        items : [
          
        ]
      },
      {
        title : '统计分析',
        titlePath : '/analysisHome',
        items : []
      },
      {
        title : '报告生成',
        titlePath : '/basicSearch',
        items : []
      },
  ]

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
          {menuList.map((menu)=>{
              return (
                  <EuiHeaderSectionItem border="right">
                      <HeaderMenu menuValue = {menu}/>
                  </EuiHeaderSectionItem>
              )
          })}
        </EuiHeaderSection>
      </EuiHeader>
      </>
    );
  }
};

export default withRouter(Header)