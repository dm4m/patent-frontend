import React, { Component } from 'react'

import ListElement from './ListElement'

export default class ResultsList extends Component {

    render() {
        const {response} = this.props
        var patentList = response.detail
        return (
            <div>
                {patentList.map((patentObj)=>{
                    return (
                        <ListElement patent={patentObj}/>
                    )
                })}
            </div>
        )
    }
}
