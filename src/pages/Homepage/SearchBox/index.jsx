import { EuiFieldSearch, EuiButton, EuiSuperSelect, EuiHealth} from '@elastic/eui'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import './index.css'
import { ipList } from '../../../configs/ipConfig'

class SearchBox extends Component {
    state = {
        isPopoverOpen: false,
        searchField: '标题',
        options : [
            {
              value: 'title',
              inputDisplay: '标题'
            },
            {
              value: 'abstract',
              inputDisplay: '摘要'
            },
            {
              value: 'signory_item',
              inputDisplay: '权利要求'
            }
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
        const query = this.inputRef.current.state.value 
        console.log(query)
        axios.get(ipList.BACKEND_SOCKET + `/patent`, {
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
                                onClick={this.searchAndJump} 
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

export default withRouter(SearchBox)