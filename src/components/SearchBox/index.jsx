import { EuiFieldSearch, EuiButton} from '@elastic/eui'
import React, { Component } from 'react'
import './index.css'

export default class SearchBox extends Component {

    render() {
        return (
            <div className='search-box'>
                <EuiFieldSearch 
                    placeholder='Search this'
                    append={<EuiButton fill={true} children='搜索'/>}
                />
            </div>
        )
    }
}
