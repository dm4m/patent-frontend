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
import BasicSearchBox from '../../components/BasicSearchBox';
import ResultsList from './ResultsList';
import { basicSearch, neuralSearch } from '../../utils/SearchUtils';
import { ipList } from '../../configs/ipConfig';
import './index.css'

const { Panel } = Collapse;

function callback(key) {
    console.log(key);
  }

export default class SearchResults extends Component {

    constructor(props){
        super(props)
        this.basicSearch = basicSearch.bind(this)
    }

    render() {
        const {response} = this.props.location.state
        const {curPage, totalHits, pageNum, perPage, results, query, field, searchType} = response
        let pageArea;
        if(searchType == "basic"){
            pageArea = <div className='flexGroup'>
            <EuiFlexGroup justifyContent="center" alignItems="center"> 
                {
                    <EuiFlexItem grow={false}>
                    <EuiPagination
                        aria-label="Centered pagination example"
                        pageCount={pageNum}
                        activePage={curPage}
                        onPageClick={(activePage) => {
                            if(searchType == "basic"){
                                this.basicSearch(query, field, activePage, perPage)
                            }else if(searchType == "neural"){
                                // this.neuralSearch(query, activePage, perPage)
                                console.log("暂时不支持neuralSearch分页")
                            }
                        }}
                    />
                </EuiFlexItem>
                }
            </EuiFlexGroup> 
                        </div> 
        }
        return (
            <div>
                <div className='search-area'>
                    <BasicSearchBox/>
                </div>
                <EuiPage>
                    <EuiPageBody>
                    <EuiPageContent verticalPosition="center"
                                    horizontalPosition="center"
                                    paddingSize="none">
                        <EuiPageContentBody>
                            <ResultsList results={results}/>
                            {pageArea}
                        </EuiPageContentBody>
                    </EuiPageContent>
                    </EuiPageBody>
                </EuiPage>
            </div>
        )
    }
}
