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
import NoveltyCollectionBox from '../../components/NoveltyCollectionBox'

export default class AnalysisHome extends Component {

    state = {
        // '检索'，'新颖性'
        anaType : '新颖性', 
    }

    render() {
        
        let collectionBox = <AnalysisCollectionBox/>
        if(this.state.anaType == '新颖性'){
            collectionBox = <NoveltyCollectionBox/>
        }

        return (
            <div style={{
                height: '100%'
            }}>
                <Title 
                    title='统计分析' 
                    describe='在下方管理待分析专利集，并对专利集进行统计分析'
                    height='25%'
                />
                {collectionBox}
            </div>
        )
    }
}
