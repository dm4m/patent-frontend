import React, { Component } from 'react'
import './index.css'
export default class SearchTitle extends Component {
    render() {
        return (
            <div className="title-image">
                {/* <img src='/images/title.png'></img> */}
                <h1>{this.props.title}</h1>
            </div>
        )
    }
}
