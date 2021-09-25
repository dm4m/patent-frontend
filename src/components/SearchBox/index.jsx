import { EuiFieldSearch} from '@elastic/eui'
import React, { Component } from 'react'
import './index.css'

export default class SearchBox extends Component {
    render() {
        return (
            <div className='search-box'>
                <EuiFieldSearch 
                    placeholder='Search this'
                />
            </div>
        )
    }
}
