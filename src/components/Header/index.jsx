import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiHeaderLink,
  EuiHeaderLinks,
  EuiLink
} from '@elastic/eui';
import EuiCustomLink from '../../router/EuiCustomLink';

export default function Header() {

  return (
    <>
      <EuiHeader>
      <EuiHeaderSectionItem border="right">
        <EuiCustomLink to='/homepage'>
          <EuiHeaderLogo iconType='\images\bit_logo.png' >专利智能检索</EuiHeaderLogo>
        </EuiCustomLink>
      </EuiHeaderSectionItem>

      <EuiHeaderSectionItem>
        <EuiHeaderLinks aria-label="App navigation links example">
          
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
        </EuiHeaderLinks>
      </EuiHeaderSectionItem>
    </EuiHeader>
    </>
  );
};