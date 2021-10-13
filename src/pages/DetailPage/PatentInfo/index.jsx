import React, { Component } from 'react'
import { EuiPageTemplate, EuiEmptyPrompt } from '@elastic/eui';

// import './index.css'

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
            <div className='container'>
                <EuiPageTemplate style={{backgroundColor: 'green'}}
                    template="centeredBody"
                    pageContentProps={{ paddingSize: 'none' }}
                    >
                    <div className='content'>
                        
                    </div>
                </EuiPageTemplate>              
            </div>
        )
    }
}
