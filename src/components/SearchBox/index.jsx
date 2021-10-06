import { EuiFieldSearch, EuiButton} from '@elastic/eui'
import React, { Component } from 'react'
import './index.css'

export default class SearchBox extends Component {

    inputRef = React.createRef()
    
    render() {
        return (
            <div className='search-box'>
                <EuiFieldSearch 
                    ref= {this.inputRef} 
                    placeholder='Search this'
                    append={
                        <EuiButton  
                            onClick={
                                ()=>{
                                    console.log(this.inputRef.current.state.value)
                                }
                            } 
                            fill={true} 
                            children='搜索'
                        />
                    }
                />

            </div>
        )
    }
}
