import React, { Component } from 'react'
import './index.css'

export default class ListElement extends Component {
    render() {
        return (
            <div className='list-element'>
                <div className="title-area">
                    <span>1.</span>
                    <span>一种基于深度语义的代码函数味道检测方法</span>
                </div>
                <div className="author-area"></div>
                <div className="abstract-area"></div>
                <div className="button-area"></div>
            </div>
        )
    }
}
