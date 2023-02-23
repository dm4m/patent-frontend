import React, { Component } from 'react'
import Title from '../../components/Title'
import {    
            EuiPage,
            EuiResizableContainer,
            EuiListGroup,
            EuiPanel,
            EuiTitle,
            EuiSpacer,
            EuiText,
            EuiListGroupItem
        } from '@elastic/eui'
import AnalysisCollectionBox from '../../components/AnalysisCollectionBox'


export default class AnalysisHome extends Component {

    render() {
        
        return (
            <div style={{
                height: '100%'
            }}>
                <Title 
                    title='统计分析' 
                    describe='在下方管理待分析专利集，并对专利集进行统计分析'
                    height='25%'
                />
                <AnalysisCollectionBox/>
            </div>
        )
    }
}
