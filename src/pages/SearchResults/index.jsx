import React, { Component } from 'react'
import axios from 'axios'
import {
    EuiPage,
    EuiPageBody,
    EuiFlexGroup,
    EuiFlexItem,
    EuiPagination,
    EuiPageContent_Deprecated,
    EuiPageContentBody_Deprecated,
  } from '@elastic/eui';
import BasicSearchBox from '../../components/BasicSearchBox';
import ResultsList from './ResultsList';
import { basicSearch, neuralSearch, proSearch } from '../../utils/SearchUtils';
import './index.css'


function callback(key) {
    console.log(key);
  }

export default class SearchResults extends Component {

    constructor(props){
        super(props)
        this.basicSearch = basicSearch.bind(this)
        this.proSearch = proSearch.bind(this)
    }

    render() {
        const {response} = this.props.location.state
        const {curPage, totalHits, pageNum, perPage, results, query, field, searchType} = response
        let pageArea;
        if(searchType == "basic" || searchType == 'pro' || searchType == 'advanced'){
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
                            }else if(searchType == "pro"){
                                this.proSearch(query, activePage, perPage);
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
                    <EuiPageContent_Deprecated verticalPosition="center"
                                    horizontalPosition="center"
                                    paddingSize="none">
                        <EuiPageContentBody_Deprecated>
                            <ResultsList results={results}/>
                            {pageArea}
                        </EuiPageContentBody_Deprecated>
                    </EuiPageContent_Deprecated>
                    </EuiPageBody>
                </EuiPage>
            </div>
        )
    }
}
