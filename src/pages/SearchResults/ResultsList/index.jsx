import React, { Component } from 'react'

import ListElement from './ListElement'

export default class ResultsList extends Component {

    render() {
        const {results} = this.props
        return (
            <div>
                {results.map((patentObj)=>{
                    return (
                        <ListElement patent={patentObj}/>
                    )
                })}
            </div>
        )
    }
}
