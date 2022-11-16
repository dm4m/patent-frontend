import React, { Component } from 'react'
import { 
    EuiButton,
    EuiTextArea,
    EuiSuperSelect
 } from '@elastic/eui';
import BasicSearchBox from '../../components/BasicSearchBox'
import Title from '../../components/Title';
import './index.css'
import { proSearch } from '../../utils/SearchUtils';
import SearchTitle from '../../components/SearchTitle';

export default class ProSearch extends Component {

    constructor(props){
        super(props)
        this.proSearch = proSearch.bind(this)
    }

    inputRef = React.createRef()

    render() {
        return (
            <div className='basic_search'>
                <SearchTitle title='专业检索'/>
                <div className='neural-search-box'>
                    <EuiTextArea maxLength={500}
                        inputRef={this.inputRef}
                        placeholder="请输入检索式"
                        aria-label="Use aria labels when no actual label is in use"
                        style={{width: '80%', height: '100%', 'max-width': 'none'}}
                    />
                </div>
                <EuiButton
                    fill
                    onClick={() => {
                        this.proSearch(this.inputRef.current.value, 0, 20)}}
                    style={{position:'absolute', right: '10%'}}
                >
                    检索
                </EuiButton>
            </div>
        )
    }
}
