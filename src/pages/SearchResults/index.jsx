import React, { Component } from 'react'
import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiPageHeader,
    EuiPageSideBar,
    EuiTitle,
    EuiButton,
    EuiSpacer,
  } from '@elastic/eui';
import SearchArea from './SearchArea';
import ResultsList from './ResultsList';

export default class SearchResults extends Component {

    data = {
        title : 'title',
        abstract : 'this is the abstract',
        author : 'author',
        publish_time : 'publish_time'
    }

    render() {
        return (
            <div>
                <SearchArea/>
                <EuiPage>
                    <EuiPageSideBar>SideBar nav</EuiPageSideBar>
                    <EuiPageBody>
                    {/* <EuiPageHeader
                        iconType="logoElastic"
                        pageTitle="Page title"
                        rightSideItems={[
                        <EuiButton fill>Add something</EuiButton>,
                        <EuiButton>Do something</EuiButton>,
                        ]}
                    /> */}
                    <EuiPageContent>
                        {/* <EuiTitle></EuiTitle> */}
                        <EuiPageContentBody>
                            {this.props.location.search}
                            {/* <ResultsList/> */}
                        </EuiPageContentBody>
                    </EuiPageContent>
                    </EuiPageBody>
                </EuiPage>
            </div>
        )
    }
}
