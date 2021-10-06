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
        <EuiHeaderLogo iconType='\images\bit_logo.png'>专利智能检索系统</EuiHeaderLogo>
      </EuiHeaderSectionItem>

      <EuiHeaderSectionItem>
        <EuiHeaderLinks aria-label="App navigation links example">
          <EuiHeaderLink>
            <Link to="/homepage">首页</Link>
          </EuiHeaderLink>

          <EuiHeaderLink>
            <Link to="/searchResults">结果页</Link>
          </EuiHeaderLink>

          <EuiHeaderLink>历史记录</EuiHeaderLink>
        </EuiHeaderLinks>
      </EuiHeaderSectionItem>
    </EuiHeader>
    </>
  );
};