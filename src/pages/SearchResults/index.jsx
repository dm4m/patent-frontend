import React, { Component } from 'react'
import {
    EuiPage,
    EuiPageBody,
    EuiPageSection,
    EuiPanel,
    EuiBasicTable
  } from '@elastic/eui';
import BasicSearchBox from '../../components/BasicSearchBox';
import { Link } from 'react-router-dom'
import { basicSearch, neuralSearch, proSearch, advancedSearch} from '../../utils/SearchUtils';
import './index.css'


export default class SearchResults extends Component {

    state = {
        pageIndex : 0,
        pageSize : 20,
        selectedItems : [20],
        searchType: "",
        query: "",
        field: "",
        resultsCount : 0,
        results : [],
        conditionMap : null,
        expression : "",
        selectedItems : []
    }

    constructor(props){
        super(props)
        this.basicSearch = basicSearch.bind(this)
        this.proSearch = proSearch.bind(this)
        this.advancedSearch = advancedSearch.bind(this)
        this.neuralSearch = neuralSearch.bind(this)
    }

    componentDidMount(){
        const {searchArgs} = this.props.location.state
        const {searchType, query, field, conditionMap, expression} = searchArgs
        if(searchType == 'basic'){
            this.basicSearch(query, field, this.state.pageIndex, this.state.pageSize).then(
                (res) => {
                    const {curPage, pageNum, perPage, results, query, field, searchType} = res
                    this.setState({
                        searchType: searchType,
                        query: query,
                        field: field,
                        results : results,
                        resultsCount: pageNum * perPage,
                    })
                }
            )
        }else if(searchType == "advanced"){
            this.advancedSearch(conditionMap, this.state.pageIndex, this.state.pageSize).then(
                (res) => {
                    const {curPage, pageNum, perPage, results, query, field, searchType, conditionMap} = res
                    this.setState({
                        searchType: searchType,
                        conditionMap: conditionMap,
                        results : results,
                        resultsCount: pageNum * perPage,
                    })
                }
            )
        }else if(searchType == "pro"){
            this.proSearch(expression, this.state.pageIndex, this.state.pageSize).then(
                (res) => {
                    const {curPage, pageNum, perPage, results, query, field, searchType, conditionMap} = res
                    this.setState({
                        searchType: searchType,
                        results : results,
                        resultsCount : pageNum * perPage,
                        expression : expression
                    })
                }
            )
        }else if(searchType == "neural"){
            this.neuralSearch(query, field, this.state.pageIndex, this.state.pageSize).then(
                (res) => {
                    const {curPage, pageNum, perPage, results, query, field, searchType, conditionMap} = res
                    this.setState({
                        searchType: searchType,
                        query: query,
                        field: field,
                        results : results,
                        resultsCount : pageNum * perPage,
                    })
                }
            )
        }
    }

    onTableChange = ({ page = {} }) => {
        const {query, field, searchType, conditionMap, expression} = this.state
        const { index: pageIndex, size: pageSize } = page;
        if(searchType == "basic"){
            basicSearch(query, field, pageIndex, pageSize).then(
                (res) => {
                    const {curPage, pageNum, perPage, results, query, field, searchType, conditionMap} = res
                    this.setState({
                        results : results,
                        resultsCount : pageNum * perPage,
                        pageIndex : curPage,
                        pageSize : perPage
                    }, () => {})
                }
            )
        }else if(searchType == "advanced"){
            this.advancedSearch(conditionMap, pageIndex, pageSize).then(
                (res) => {
                    const {curPage, pageNum, perPage, results, query, field, searchType, conditionMap} = res
                    this.setState({
                        results : results,
                        resultsCount: pageNum * perPage,
                        pageIndex : curPage,
                        pageSize : perPage
                    })
                }
            )
        }else if(searchType == "pro"){
            this.proSearch(expression, pageIndex, pageSize).then(
                (res) => {
                    const {pageNum, perPage, results, searchType, conditionMap} = res
                    this.setState({
                        searchType: searchType,
                        results : results,
                        resultsCount : pageNum * perPage,
                        expression : expression
                    })
                }
            )
        }else if(searchType == "neural"){
            // this.neuralSearch(query, activePage, perPage)
            console.log("暂时不支持neuralSearch分页")
        }
    };

    setSelectedItems(items){
        this.setState({
            selectedItems : items
        }, () => {console.log(this.state.selectedItems)})
    }

    render() {

        const columns = [
            {
                field: 'index',
                name: '序号',
                truncateText: false,
                width: '4em'
            },
            {
                field: 'title',
                name: '题目',
                truncateText: false,
                render: (title, item) => (
                    <Link to={{
                        pathname:'detailPage',
                        state:{patent: item}
                        }}>
                        {title}
                    </Link>
                ),
                textOnly: true
            },
            {
                field: 'abstract',
                name: '摘要',
                truncateText: true,
                width: '35em'
            },
            {
                field: 'patent_type',
                name: '专利类型',
                truncateText: false,
                width: '6em'
            },
            {
                field: 'patent_code',
                name: '专利号',
                truncateText: false
            },
            {
                field: 'applicant_list',
                name: '发明人',
                truncateText: false
            },
            {
                field: 'publication_date',
                name: '公开（公告）日',
                truncateText: false
            }
        ]

        const pagination = this.state.searchType === "neural" ? null : {
            pageIndex : this.state.pageIndex,
            pageSize : this.state.pageSize,
            totalItemCount : this.state.resultsCount,
            pageSizeOptions: [this.state.pageSize]
        }

        const onSelectionChange = (selectedItems) => {
            this.setSelectedItems(selectedItems);
        };        

        const selection = {
            selectable: (item) => true,
            selectableMessage: (selectable) =>
                !selectable ? 'User is currently offline' : undefined,
            onSelectionChange: onSelectionChange,
            initialSelected: []
        };

        return (
            <div>
                {/* <div className='search-area'>
                    <BasicSearchBox/>
                </div> */}
                <EuiPage>
                    <EuiPageBody>
                        <EuiPageSection>
                            <EuiPanel>
                                <EuiBasicTable
                                    tableCaption="Demo of EuiBasicTable"
                                    items={this.state.results}
                                    rowHeader="patentName"
                                    itemId="index"
                                    columns={columns}
                                    pagination={pagination}
                                    onChange={this.onTableChange}
                                    isSelectable={true}
                                    selection={selection}
                                />
                            </EuiPanel>
                        </EuiPageSection>
                    </EuiPageBody>
                </EuiPage>
            </div>
        )
    }
}
