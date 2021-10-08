import { EuiFieldSearch, EuiButton} from '@elastic/eui'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import './index.css'


class SearchBox extends Component {

    inputRef = React.createRef()
    
    render() {
        return (
            <div className='search-box'>
                <EuiFieldSearch 
                    ref= {this.inputRef} 
                    placeholder='Search this'
                    append={
                        // <Link to='/searchResults' >
                            <EuiButton  
                                onClick={
                                    ()=>{
                                        axios.get(`http://localhost:8080/test`).then(
                                            response => {
                                                console.log(response.data)
                                            },
                                            error => {
                                                
                                            }
                                        )
                                        console.log(this.inputRef.current.state.value)
                                        this.props.history.push(`/searchResults?input=${this.inputRef.current.state.value}`)
                                    }
                                } 
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