import React, { Component } from 'react'
import { 
    EuiButton,
    EuiTextArea
 } from '@elastic/eui';
import Title from '../../components/Title';
import './index.css'
import { goSearch} from '../../utils/SearchUtils';

export default class ProSearch extends Component {

    constructor(props){
        super(props)
        this.goSearch = goSearch.bind(this)
    }

    inputRef = React.createRef()

    render() {
        return (
            <div className='basic_search'>
                <Title 
                    title='专业检索'
                    height='40%'
                />
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
                        this.goSearch({
                            searchType : "pro",
                            expression : this.inputRef.current.value
                        })
                    }}
                    style={{position:'absolute', right: '10%'}}
                >
                    检索
                </EuiButton>
            </div>
        )
    }
}
