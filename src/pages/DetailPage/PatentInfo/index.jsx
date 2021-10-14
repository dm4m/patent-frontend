import React, { Component } from 'react'
import { EuiPageTemplate, EuiEmptyPrompt } from '@elastic/eui';

import './index.css'

export default class PatentInfo extends Component {
    patent_data = {
        title: '',
        abstract: '',
        type: '',
        applicationDate: '',
        publicationNo: '',
        publicationDate: '',
        mainClassCode: '',
        applicant: '',
        inventor: '',
        applicantAddress: '',
        agency: '',
        agent: '',
        applicantArea: '',
        signory: ''
    }
    render() {
        return (
            <div className='wrapper'>
                <div className='main'>
                    <div className='container'>
                        <div className='doc'>
                            <div>
                                <div className="wx-tit">
                                    <h1>一种基于变异的FPGA逻辑综合工具模糊测试方法</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
