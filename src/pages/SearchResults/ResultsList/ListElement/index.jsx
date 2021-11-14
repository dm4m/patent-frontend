import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {ReadOutlined, DownloadOutlined} from '@ant-design/icons'
import './index.css'

export default class ListElement extends Component {

    render() {
        const {patent} = this.props
        return (
            // <div className="body">
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
                                {/* <i className="list-button-icon read-icon"></i> */}
                                <ReadOutlined className="list-button-icon read-icon"/>
                                <span>在线阅读</span>
                            </div>
                        </div>
                        <div className="t-DIB">
                            <div className="wf-list-button">
                                {/* <i className="list-button-icon download-icon"></i> */}
                                <DownloadOutlined className="list-button-icon download-icon"/>
                                <span>下载</span>
                            </div>
                        </div>
                        {/* <div className="wf-list-button">
                            <i className="list-button-icon export-icon"></i>
                            <span>导出</span>
                        </div> */}
                    </div>
                </div>
                <div  className="quote"></div>
                </div>
                </div>
            // </div>
            
        )
    }
}
