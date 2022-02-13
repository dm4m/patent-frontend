import React, { Component } from 'react'
import BasicSearchBox from '../../components/BasicSearchBox'
import Title from '../../components/Title'


export default class AdvancedSearch extends Component {
    render() {
        return (
            <div className='basic_search'>
                <Title/>
                <BasicSearchBox/>     
            </div>
        )
    }
}
