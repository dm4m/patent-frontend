import React, { Component } from 'react'
import SearchBox from '../../components/SearchBox'
import Title from './Title'
import './index.css'

export default class Homepage extends Component {
    render() {
        return (
            <div className='homepage'>
                <Title/>
                <SearchBox/>     
            </div>
        )
    }
}
