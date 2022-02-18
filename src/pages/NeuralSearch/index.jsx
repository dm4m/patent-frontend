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
import { neuralSearch } from '../../utils/SearchUtils';

export default class NeuralSearch extends Component {

    constructor(props){
        super(props)
        this.neuralSearch = neuralSearch.bind(this)
    }

    inputRef = React.createRef()

    render() {
        return (
            <div className='basic_search'>
                <Title/>
                <div className='neural-search-box'>
                <EuiTextArea maxLength={500}
                    inputRef={this.inputRef}
                    placeholder="请输入一段不长于500字的文本"
                    aria-label="Use aria labels when no actual label is in use"
                    style={{width: '80%', height: '100%', 'max-width': 'none'}}
                />
                </div>
                <EuiButton
                    fill
                    onClick={() => {
                        console.log(this.inputRef)
                        this.neuralSearch(this.inputRef.current.value, 0, 20)}}
                    style={{position:'absolute', right: '10%'}}
                >
                    检索
                </EuiButton>
            </div>
        )
    }
}
