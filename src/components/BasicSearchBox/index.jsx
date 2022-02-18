import { EuiFieldSearch, EuiButton, EuiSuperSelect, EuiHealth} from '@elastic/eui'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import './index.css'
import { ipList } from '../../configs/ipConfig'
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
              value: 'abstract',
              inputDisplay: (
                <span className='option_list_item'>摘要</span>
                )
            },
            {
              value: 'signory_item',
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
              value: 'main_class',
              inputDisplay: (
                <span className='option_list_item'>主分类号</span>
                )
            },
            {
              value: 'class',
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
    // setOptions = (newOptions) =>{
    //     this.setState({options: newOptions})
    // }

    // setIsPopoverOpen = (flag) =>{
    //     this.setState({isPopoverOpen: flag})
    // }

    // onPopoverButtonClick = () =>{
    //     this.setIsPopoverOpen(!this.state.isPopoverOpen)
    // }
    
    // setSearchField = (field) =>{
    //     this.setState({searchField: field})
    // }

    // closePopover = () => {
    //     this.setIsPopoverOpen(false);
    // }

    searchAndJump = () =>{
        // const query = this.inputRef.current.state.value
        // this.basicSearch(query, this.state.currentOption, 0, 20)
        const query = this.inputRef.current.state.value 
        console.log(query)
        axios.get(ipList.BACKEND_SOCKET + `/patent/basicSearch`, {
            params: {
                        'query': query,
                        'field': this.state.currentOption,
                        'cur_page': 0,
                        'per_page': 20
                    }
        })
        .then(
            response => {
                console.log(response.data)
                console.log(typeof(response.data))
                console.log(this.inputRef.current.state.value)
                // this.props.history.push(`/searchResults?query=${this.inputRef.current.state.value}
                //                                             response=${response.data}`)
                this.props.history.push({pathname:'/searchResults',state:{response: response.data}})
            },
            error => { 
            }
        )
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
                                this.searchAndJump()
                            }
                        }
                    }
                    isClearable={true}
                    append={
                        // <Link to='/searchResults' >
                            <EuiButton  
                                onClick={() => {this.basicSearch(this.inputRef.current.state.value, this.state.currentOption, 0, 20)}} 
                                // onClick={this.searchAndJump}
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
                        // <EuiPopover
                        //     button={
                        //         <EuiButton iconType="arrowDown" iconSide="right" 
                        //             onClick={this.onPopoverButtonClick}>
                        //             {this.state.searchField}
                        //         </EuiButton>
                        //     }
                        //     isOpen = {this.state.isPopoverOpen}
                        //     closePopover={this.closePopover}>
                        //     <EuiSelectable
                        //         style={{width: 200, overflow: 'hidden'}}
                        //         singleSelection={true}
                        //         options={this.state.options}
                        //         onChange={(newOptions) => this.setOptions(newOptions)}
                        //         >
                        //             {(list) => list}
                        //     </EuiSelectable>
                        // </EuiPopover>
                    }
                />
            </div>
        )
    }
}

export default withRouter(BasicSearchBox)