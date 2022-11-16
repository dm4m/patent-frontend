import React, { Component } from 'react'
import BasicSearchBox from '../../components/BasicSearchBox'
import SearchTitle from '../../components/SearchTitle'
import './index.css'

export default class BasicSearch extends Component {
    render() {
        return (
            <div className='basic_search'>
                <SearchTitle/>
                <BasicSearchBox/>     
            </div>
        )
    }
}
