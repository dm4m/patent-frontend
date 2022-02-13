import React, { Component } from 'react'
import { 
    EuiButton,
    EuiTextArea,
    EuiFlexGroup,
    EuiFlexItem
 } from '@elastic/eui';
import BasicSearchBox from '../../components/BasicSearchBox'
import Title from '../../components/Title';
import './index.css'

export default class NeuralSearch extends Component {

    render() {
        return (
            <div className='basic_search'>
                <Title/>
                <div className='neural-search-box'>
                <EuiTextArea maxLength={500}
                    placeholder="请输入一段不长于500字的文本"
                    aria-label="Use aria labels when no actual label is in use"
                    style={{width: '80%', height: '100%', 'max-width': 'none'}}
                />
                </div>
                <EuiButton
                    fill
                    onClick={() => {}}
                    style={{position:'absolute', right: '10%'}}
                >
                    检索
                </EuiButton>
            </div>
        )
    }
}
