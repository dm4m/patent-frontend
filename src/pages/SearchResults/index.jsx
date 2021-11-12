import React, { Component } from 'react'
import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
  } from '@elastic/eui';
  import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiPagination,
  } from '@elastic/eui';
import SearchArea from '../../components/SearchArea';
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
                    {/* <EuiPageSideBar style={{backgroundColor:'green'}}>侧边检索栏</EuiPageSideBar> */}
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
                            <ResultsList response={this.props.location.state}/>
                            <EuiFlexGroup justifyContent="spaceAround">
                                <EuiFlexItem grow={false}>
                                    <EuiPagination
                                        aria-label="Centered pagination example"
                                        pageCount={10}
                                        activePage={0}
                                    />
                                </EuiFlexItem>
                            </EuiFlexGroup>                            
                        </EuiPageContentBody>
                    </EuiPageContent>
                    </EuiPageBody>
                </EuiPage>
            </div>
        )
    }
}
