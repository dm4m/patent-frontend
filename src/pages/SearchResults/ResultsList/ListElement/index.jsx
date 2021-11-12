import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

export default class ListElement extends Component {

    render() {
        const {patent} = this.props
        console.log(patent)
        return (
            <div className='list-element'>
                <div className="title-area">
                    <span className='index'>1.</span>
                    <Link to={{
                                pathname:'detailPage',
                                state:{patent:patent}
                                }}>
                        <span className='title'>{patent.title}</span>
                    </Link>
                </div>
                <div className="author-area">
                    <span>{patent.patent_code}</span>
                    <span className='not-first'>{patent.applicant_list}</span>
                    <span className='not-first'>{patent.publication_date}</span>
                </div>
                <div className="abstract-area">
                    <span className='abstract-text'>
                        {patent.abstract}
                    </span>
                </div>
                {/* <div className="button-area"></div> */}
            </div>
        )
    }
}
