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
import ReportCollectionBox from '../../components/ReportCollectionBox'


export default class ReportHome extends Component {

    render() {
        return (
            <div style={{
                height: '100%'
            }}>
                <Title title='报告生成' describe='在下方管理待生成报告并进行报告生成'/>
                <ReportCollectionBox/>
            </div>
        )
    }
}
