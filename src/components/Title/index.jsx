import React, { Component } from 'react'
import './index.css'
export default class Title extends Component {
    render() {

        let descBlock = null
        if(this.props.describe != null){
            descBlock = <div>
                <br/>
                <p>{this.props.describe}</p>
            </div>
        }

        return (
            <div className="title">
                <h1>{this.props.title}</h1>
                {descBlock}
            </div>
        )
    }
}