import React, { Component } from 'react'
import axios from 'axios'
import { Collapse } from 'antd';
import {
    EuiPage,
    EuiPageBody,
    EuiFlexGroup,
    EuiFlexItem,
    EuiPagination,
    EuiPageContent,
    EuiPageContentBody,
  } from '@elastic/eui';
import SearchBox from '../../components/SearchBox';
import ResultsList from './ResultsList';
import { ipList } from '../../configs/ipConfig';
import './index.css'

const { Panel } = Collapse;

function callback(key) {
    console.log(key);
  }

export default class SearchResults extends Component {

    searchAndJump = (query, field, cur_page, per_page) =>{
        console.log(query)
        console.log(cur_page)
        console.log(per_page)
        axios.get(ipList.BACKEND_SOCKET + `/patent`, {
            params: {
                        'query': query,
                        'field': field,
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
        const {curPage, totalHits, pageNum, perPage, results, query, field} = response
        return (
            <div>
                {/* <SearchArea/> */}
                <div className='search-area'>
                    <SearchBox/>
                </div>
                <EuiPage>
                    {/* <EuiPageSideBar>
                        <EuiCollapsibleNavGroup
                            background="light"
                            title="专利分类"
                            isCollapsible={true}
                            iconType="logoElastic"
                            initialIsOpen={true}
                            >
                            <EuiFacetGroup style={{ maxWidth: 200 }}>
                                <EuiFacetButton quantity={6}>物理</EuiFacetButton>
                                <EuiFacetButton quantity={6}>化学</EuiFacetButton>
                            </EuiFacetGroup>
                        </EuiCollapsibleNavGroup>
                        <EuiCollapsibleNavGroup
                            background="light"
                            title="发明人"
                            isCollapsible={true}
                            iconType="logoElastic"
                            initialIsOpen={true}
                            >
                            <EuiFacetGroup style={{ maxWidth: 200 }}>
                                <EuiFacetButton quantity={6}>张三</EuiFacetButton>
                                <EuiFacetButton quantity={6}>李四</EuiFacetButton>
                                <EuiFacetButton quantity={6}>王五</EuiFacetButton>
                            </EuiFacetGroup>
                        </EuiCollapsibleNavGroup>
                    </EuiPageSideBar> */}
                    <EuiPageBody>
                    {/* <EuiPageHeader
                        iconType="logoElastic"
                        pageTitle="Page title"
                        rightSideItems={[
                        <EuiButton fill>Add something</EuiButton>,
                        <EuiButton>Do something</EuiButton>,
                        ]}
                    /> */}
                    <EuiPageContent verticalPosition="center"
                                    horizontalPosition="center"
                                    paddingSize="none">
                        {/* <EuiTitle></EuiTitle> */}
                        <EuiPageContentBody>
                            <ResultsList results={results}/>
                            <div className='flexGroup'>
                                <EuiFlexGroup justifyContent="center" alignItems="center"> 
                                    <EuiFlexItem grow={false}>
                                        <EuiPagination
                                            aria-label="Centered pagination example"
                                            pageCount={pageNum}
                                            activePage={curPage}
                                            onPageClick={(activePage) => {
                                                this.searchAndJump(query, field, activePage, perPage)
                                            }}
                                        />
                                    </EuiFlexItem>
                                </EuiFlexGroup> 
                            </div>                  
                        </EuiPageContentBody>
                    </EuiPageContent>
                    </EuiPageBody>
                </EuiPage>
            </div>
        )
    }
}
