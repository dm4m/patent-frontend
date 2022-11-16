import { EuiFieldSearch, EuiButton, EuiSuperSelect, EuiHealth} from '@elastic/eui'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './index.css'
import { basicSearch } from '../../utils/SearchUtils'

class BasicSearchBox extends Component {

    constructor(props){
        super(props)
        this.basicSearch = basicSearch.bind(this)
    }

    state = {
        isPopoverOpen: false,
        searchField: '标题',
        options : [
            {
              value: 'title',
              inputDisplay: (
                <span className='option_list_item'>标题</span>
                )
            },
            {
              value: 'abstractText',
              inputDisplay: (
                <span className='option_list_item'>摘要</span>
                )
            },
            {
              value: 'signoryItem',
              inputDisplay: (
                <span className='option_list_item'>主权项</span>
                )
            },
            {
              value: 'patentCode',
              inputDisplay: (
                <span className='option_list_item'>申请号/专利号</span>
                )
            },
            {
              value: 'publicationNo',
              inputDisplay: (
                <span className='option_list_item'>公开号/公告号</span>
                )
            },
            {
              value: 'applicant',
              inputDisplay: (
                <span className='option_list_item'>申请人/专利权人</span>
                )
            },
            {
                value: 'inventor',
                inputDisplay: (
                <span className='option_list_item'>发明人</span>
                )
            },
            {
                value: 'agent',
                inputDisplay: (
                  <span className='option_list_item'>代理人</span>
                  )
            },
            {
                value: 'agency',
                inputDisplay: (
                  <span className='option_list_item'>代理机构</span>
                  )
            },  
            {
              value: 'mainClassNo',
              inputDisplay: (
                <span className='option_list_item'>主分类号</span>
                )
            },
            {
              value: 'classNo',
                inputDisplay: (
                <span className='option_list_item'>分类号</span>
                )
            },
          ],
        currentOption : 'title'
    }
    
    inputRef = React.createRef()
    
    setOption = (op) =>{
        this.setState({currentOption : op})
    }

    render() {

        return (
            <div className='search-box'>
                <EuiFieldSearch 
                    fullWidth={true}
                    ref={this.inputRef} 
                    placeholder='Search this'
                    onKeyDown={
                        (e)=>{
                            if(e.key == 'Enter'){
                                this.basicSearch(this.inputRef.current.state.value, this.state.currentOption, 0, 20)
                            }
                        }
                    }
                    isClearable={true}
                    append={
                        // <Link to='/searchResults' >
                            <EuiButton  
                                onClick={() => {this.basicSearch(this.inputRef.current.state.value, this.state.currentOption, 0, 20)}} 
                                fill={true} 
                                children='搜索'
                            />
                        // </Link>
                    }
                    prepend={
                        <EuiSuperSelect
                            options={this.state.options}
                            valueOfSelected={this.state.currentOption}
                            onChange={(value) => this.setOption(value)}
                            popoverProps={{
                                panelClassName: 'fieldSelect'
                            }}
                        />
                    }
                />
            </div>
        )
    }
}

export default withRouter(BasicSearchBox)