import React, { Component } from 'react'
import BasicSearchBox from '../../components/BasicSearchBox'
import Title from '../../components/Title'
import AdvancedSearchBox from '../../components/AdvancedSearchBox'
import './index.css'

export default class AdvancedSearch extends Component {
    render() {
        return (
            <div className='advanced_search'>
                <Title/>
                <AdvancedSearchBox/>     
            </div>
        )
    }
}
