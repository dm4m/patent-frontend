import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {EuiIcon} from '@elastic/eui'
import './index.css'

export default class ListElement extends Component {

    render() {
        const {patent} = this.props
        return (
                <div className="normal-list">
                <div  className="title-area">
                    {/* <div  title="" className="wf-checkbox checkbox">
                        <label>
                            <input type="checkbox" style={{display: 'none', userSelect:'auto'}} />
                            <div className="checkbox">
                                <span className="check-item hide">✓</span>
                            </div>
                            <div className="checkbox-label"></div>
                        </label>
                    </div> */}
                    <div  className="ajust">
                        <span  className="index">{patent.index}.</span>
                        <span  className="title">{patent.title}</span>
                        <Link to={{
                                pathname:'detailPage',
                                state:{patent:patent}
                                }}>
                            
                            <span  className="title">{patent.title}</span>
                        </Link>
                    </div>
                </div>
                <div  className="author-area">
                    <span><span>[</span><span  className="essay-type">专利</span><span>]</span></span>
                    <span  className="t-ML6">{patent.patent_type}</span>
                    <span  className="t-ML6">{patent.patent_code}</span>
                    <span  className="authors">{patent.applicant_list}</span>
                    <span>{patent.publication_date}</span>
                </div>
                <div className="abstract-area">
                    <span >摘要：</span>
                    <span style={{wordBreak: 'break-all', userSelect: 'auto'}}>{patent.abstract}</span>
                </div>
                <div  className="button-area t-CLF">
                <div  className="button-list">
                    <div >
                        <div className="t-DIB">
                            <div className="wf-list-button">
                                <EuiIcon type={`inspect`} />
                                <span>进行新颖性分析</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div  className="quote"></div>
                </div>
                </div>
        )
    }
}
