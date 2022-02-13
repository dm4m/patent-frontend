import React, { Component } from 'react'
import BasicSearchBox from '../../components/BasicSearchBox'
import PatentInfo from './PatentInfo'

export default class DetailPage extends Component {

    render() {
        return (
            <div>
                <div className='search-area'>
                    <BasicSearchBox/>
                </div>
                <PatentInfo patent={this.props.location.state.patent}/>
            </div>
        )
    }
}
