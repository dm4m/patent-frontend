import '@elastic/eui/dist/eui_theme_amsterdam_light.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiHeaderLink,
  EuiHeaderLinks
} from '@elastic/eui';

export default function Header() {

  return (
    <>
      <EuiHeader>
      <EuiHeaderSectionItem border="right">
        <Link to="/homepage">
          <EuiHeaderLogo iconType='\images\bit_logo.png' >专利智能检索系统</EuiHeaderLogo>
        </Link>
      </EuiHeaderSectionItem>

      <EuiHeaderSectionItem>
        <EuiHeaderLinks aria-label="App navigation links example">
          
            <Link to="/homepage">
              <EuiHeaderLink>首页</EuiHeaderLink>
            </Link>
        
            <Link to="/searchResults">
              <EuiHeaderLink>结果页</EuiHeaderLink>
            </Link>

            <Link to="/detailPage">
              <EuiHeaderLink>详情页</EuiHeaderLink>
            </Link>

          <EuiHeaderLink>历史记录</EuiHeaderLink>
        </EuiHeaderLinks>
      </EuiHeaderSectionItem>
    </EuiHeader>
    </>
  );
};