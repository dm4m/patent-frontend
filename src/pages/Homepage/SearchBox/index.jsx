import { EuiFieldSearch, EuiButton} from '@elastic/eui'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import './index.css'


class SearchBox extends Component {

    inputRef = React.createRef()

    
    searchAndJump = () =>{
        console.log(this.inputRef.current.state.value)
        const query = this.inputRef.current.state.value 
        console.log(query)
        axios.get(`http://10.1.0.88:8080/patent`, {
            params: {'query': query}
        })
        .then(
            response => {
                console.log(response.data)
                console.log(typeof(response.data))
                console.log(this.inputRef.current.state.value)
                // this.props.history.push(`/searchResults?query=${this.inputRef.current.state.value}
                //                                             response=${response.data}`)
                this.props.history.push({pathname:'/searchResults',state:{detail: response.data}})
            },
            error => { 
            }
        )
        
    }

    render() {
        return (
            <div className='search-box'>
                <EuiFieldSearch 
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
                />

            </div>
        )
    }
}

export default withRouter(SearchBox)