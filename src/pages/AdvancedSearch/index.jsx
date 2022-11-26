import React, { Component } from 'react'
import AdvancedSearchBox from '../../components/AdvancedSearchBox'
import Title from '../../components/Title'
import './index.css'

export default class AdvancedSearch extends Component {
    render() {
        return (
            <div className='advanced_search'>
                <Title title='高级检索'/>
                <AdvancedSearchBox/>     
            </div>
        )
    }
}
