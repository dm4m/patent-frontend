import React, { Component } from 'react'
import {
    EuiPage,
    EuiPageBody,
    EuiFlexGroup,
    EuiFlexItem,
    EuiPagination,
    EuiPageSection,
    EuiPanel,
  } from '@elastic/eui';
import BasicSearchBox from '../../components/BasicSearchBox';
import ResultsList from './ResultsList';
import { basicSearch, neuralSearch, proSearch, advancedSearch } from '../../utils/SearchUtils';
import './index.css'


export default class SearchResults extends Component {

    constructor(props){
        super(props)
        this.basicSearch = basicSearch.bind(this)
        this.proSearch = proSearch.bind(this)
        this.advancedSearch = advancedSearch.bind(this)
    }

    render() {
        const {response} = this.props.location.state
        const {curPage, pageNum, perPage, results, query, field, searchType, conditionMap} = response
        console.log(conditionMap)
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
                            }else if(searchType == "advanced"){
                                this.advancedSearch(conditionMap, activePage, perPage);
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
                {/* <div className='search-area'>
                    <BasicSearchBox/>
                </div> */}
                <EuiPage>
                    <EuiPageBody>
                    <EuiPageSection>
                        <EuiPanel>
                            <ResultsList results={results}/>
                            {pageArea}
                        </EuiPanel>
                    </EuiPageSection>
                    </EuiPageBody>
                </EuiPage>
            </div>
        )
    }
}
