import '@elastic/eui/dist/eui_theme_amsterdam_light.css';
import React, { useState } from 'react';
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
          <EuiHeaderLink >我的收藏</EuiHeaderLink>

          <EuiHeaderLink>历史记录</EuiHeaderLink>

          <EuiHeaderLink>账户管理</EuiHeaderLink>
        </EuiHeaderLinks>
      </EuiHeaderSectionItem>
    </EuiHeader>
    </>
  );
};