import React, { Component } from 'react'
import { EuiButton, EuiPageTemplate, EuiEmptyPrompt } from '@elastic/eui';

import './index.css'

export default class PatentInfo extends Component {
    render() {
        const {patent} = this.props
        return (
            <div className='wrapper'>
                <div className='main'>
                    <div className='container'>
                        <div className='doc'>
                            <div className='brief'>
                                <div className="wx-tit">
                                    <h1>{patent.title}</h1>
                                </div>
                                <div className="row">
                                    <span className="rowtit">专利类型：</span>
                                    <p className="funds">{patent.patent_type}</p>
                                </div>
                                <div className="row">
                                    <div className="row-1">
                                        <span className="rowtit">申请(专利)号：</span>
                                        <p className="funds">{patent.patent_code}</p>
                                    </div>
                                    <div className="row-2">
                                        <span className="rowtit2">申请日：</span>
                                        <p className="funds">{patent.application_date}</p>
                                    </div>
                                </div> 
                                <div className="row">
                                    <div className="row-1">
                                        <span className="rowtit"> 申请公布号：</span>
                                        <p className="funds">{patent.publication_no}</p>
                                    </div>
                                    <div className="row-2">
                                        <span className="rowtit"> 公开公告日：</span>
                                        <p className="funds">{patent.publication_date}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <span className="rowtit">申请人：</span>
                                    <p className="funds">{patent.applicant_list}</p>
                                </div>
                                <div className="row">
                                    <span className="rowtit">地址：</span>
                                    <p className="funds">{patent.applicant_address}</p>
                                </div>
                                <div className="row">
                                    <span className="rowtit">发明人：</span>
                                    <p className="funds">{patent.inventor_list}</p>
                                </div>
                                <div className="row">
                                    <span className="rowtit">分类号：</span>
                                    <p className="funds">{patent.display_class_list}</p>
                                </div>
                                <div className="row">
                                    <div className="row-1">
                                        <span className="rowtit">主分类号：</span>
                                        <p className="funds">{patent.display_mainclass_code}</p>
                                    </div>
                                    <div className="row-2">
                                        <span className="rowtit">国省代码：</span>
                                        <p className="funds">{patent.applicant_area}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <span className="rowtit">页数：</span>
                                    <p className="funds">{patent.page_num}</p>
                                </div>
                                <div className="row">
                                    <div className="row-1">
                                        <span className="rowtit">代理机构：</span>
                                        <p className="funds">{patent.agency}(普通合伙)</p>
                                    </div>
                                    <div className="row-2">
                                        <span className="rowtit2">代理人：</span>
                                        <p className="funds">{patent.agent}</p>
                                    </div>
                                </div>
                                <div className="zl-yzwx">
                                    <div className="row claim">
                                        <h5>主权项：</h5>
                                        <div className="claim-text">
                                            {patent.signory_item}
                                        </div>
                                    </div>
                                    <div className="row abstract">
                                        <h5>摘要：</h5>
                                        <div className="abstract-text">
                                            {patent.abstract}
                                        </div>
                                    </div>
                                    {/* <div className="law-state">
                                        <h5 className="state-tit">
                                            法律状态 
                                            <i className="icon"></i>
                                        </h5>
                                        <div id="divlawstate">
                                            <table className="zl-table">
                                            <thead>
                                                <tr>
                                                <th className="col-1">法律状态公告日</th>
                                                <th className="col-2">法律状态</th>
                                                <th className="col-3">法律状态信息</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                <td className="col-1">2021-09-24</td>
                                                <td className="col-2">公开</td>
                                                <td className="col-3">公开</td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="operate operate2" id="DownLoadParts">
                                    <EuiButton fill>下载 PDF</EuiButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
