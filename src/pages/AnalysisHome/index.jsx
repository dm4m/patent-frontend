import React, { Component } from 'react'
import Title from '../../components/Title'
import { 
    EuiFlexGroup,
            EuiFlexItem,
            EuiSuperSelect,
            EuiText
        } from '@elastic/eui'
import AnalysisCollectionBox from '../../components/AnalysisCollectionBox'
import NoveltyCollectionBox from '../../components/NoveltyCollectionBox'

export default class AnalysisHome extends Component {

    state = {
        // anaObjectType : '新颖性创造性分析结果', 
        anaObjectType : '检索结果'
    }

    render() {  
        
        let anaObejctTypes = [
            '检索结果',
            '新颖性创造性分析结果'
        ]

        let anaObejctTypesOption = anaObejctTypes.map(
            (type) => {
                let option = 
                {
                    value : type,
                    inputDisplay : type
                }
                return option
            }
        )

        let collectionBox = <AnalysisCollectionBox/>
        if(this.state.anaObjectType == '新颖性创造性分析结果'){
            collectionBox = <NoveltyCollectionBox/>
        }else if(this.state.anaObjectType == '检索结果'){
            collectionBox = <AnalysisCollectionBox/>
        }

        return (
            <div style={{
                height: '100%',
                // width: '100%'
            }}>
                <Title 
                    title='统计分析' 
                    describe='在下方管理专利检索或分析结果，并对其进行统计'
                    height='25%'
                />
                <EuiFlexGroup direction='column' alignItems='flexStart' style={{width : '90%', margin: '0 auto'}}> 
                    <EuiFlexItem>
                        <EuiFlexGroup  alignItems='center'>
                            <EuiFlexItem>
                                <EuiText> <b>请选择分析对象：</b></EuiText>
                            </EuiFlexItem>
                            <EuiFlexItem>
                                <EuiSuperSelect
                                    style={{width: '15em'}}
                                    options={anaObejctTypesOption}
                                    valueOfSelected={this.state.anaObjectType}
                                    onChange={(value) => {this.setState({anaObjectType : value})}}
                                    itemLayoutAlign="top"
                                    hasDividers
                                />
                            </EuiFlexItem>
                        </EuiFlexGroup>
                        
                    </EuiFlexItem>
                    <EuiFlexItem>
                        {collectionBox}
                    </EuiFlexItem>
                </EuiFlexGroup>
                
            </div>
        )
    }
}
