import React, { Component } from 'react'
import axios from 'axios'
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

    searchAndJump = (query, cur_page, per_page) =>{
        console.log(query)
        console.log(cur_page)
        console.log(per_page)
        axios.get(`http://10.1.0.88:8080/patent`, {
            params: {
                        'query': query,
                        'cur_page': cur_page,
                        'per_page': per_page
                    }
        })
        .then(
            response => {
                console.log(response.data)
                console.log(typeof(response.data))
                // this.props.history.push(`/searchResults?query=${this.inputRef.current.state.value}
                //                                             response=${response.data}`)
                this.props.history.push({pathname:'/searchResults',state:{response: response.data}})
            },
            error => { 
            }
        )
    }

    render() {
        const {response} = this.props.location.state
        const {curPage, totalHits, pageNum, perPage, results, query} = response
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
                            <ResultsList results={results}/>
                            <EuiFlexGroup justifyContent="spaceAround">
                                <EuiFlexItem grow={false}>
                                    <EuiPagination
                                        aria-label="Centered pagination example"
                                        pageCount={pageNum}
                                        activePage={curPage}
                                        onPageClick={(activePage) => {
                                            this.searchAndJump(query, activePage, perPage)
                                        }}
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
