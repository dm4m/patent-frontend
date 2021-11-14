import React, { Component } from 'react'
import axios from 'axios'
import { EuiFieldSearch, EuiButton} from '@elastic/eui'
import './index.css' 
import { Link, withRouter } from 'react-router-dom'
class SearchArea extends Component {

    inputRef = React.createRef()

    searchAndJump = () =>{
        const query = this.inputRef.current.state.value 
        console.log(query)
        axios.get(`http://10.1.0.88:8080/patent`, {
            params: {
                        'query': query,
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
            <div className='search-area'>
                {/* 
                    利用一个外部wapper控制field宽度 
                */}
                <div id='search-box-wrapper'>
                    <EuiFieldSearch 
                        ref={this.inputRef} 
                        placeholder='Search this'
                        isClearable={true}
                        fullWidth={true}
                        onKeyDown={
                            (e)=>{
                                if(e.key == 'Enter'){
                                    this.searchAndJump()
                                }
                            }
                        }
                        append={
                                <EuiButton  
                                    onClick={this.searchAndJump} 
                                    fill={true} 
                                    children='搜索'
                                />
                        }
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(SearchArea)