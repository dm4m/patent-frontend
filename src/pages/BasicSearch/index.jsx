import React, { Component } from 'react'
import BasicSearchBox from '../../components/BasicSearchBox'
import Title from '../../components/Title'
import './index.css'

export default class BasicSearch extends Component {
    render() {
        return (
            <div className='basic_search'>
                <Title title='简单检索'/>
                <BasicSearchBox/>     
            </div>
        )
    }
}
