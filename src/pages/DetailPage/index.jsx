import React, { Component } from 'react'
import SearchArea from '../../components/SearchArea'
import PatentInfo from './PatentInfo'

export default class DetailPage extends Component {
    render() {
        return (
            <div>
                <SearchArea/>
                <PatentInfo/>
            </div>
        )
    }
}
