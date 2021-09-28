import { EuiFieldSearch, EuiButton} from '@elastic/eui'
import React, { Component } from 'react'
import './index.css'

export default class SearchBox extends Component {

	showData = ()=>{
        alert(123);
        console.log(this.value)
	}

    render() {
        return (
            <div className='search-box'>
                <EuiFieldSearch 
                    placeholder='Search this'
                    append={
                    <EuiButton  onClick={this.showData} fill={true} children='搜索'/>
                    }
                />

            </div>
        )
    }
}
