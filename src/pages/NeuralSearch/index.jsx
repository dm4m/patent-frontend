import React, { Component } from 'react'
import { 
    EuiButton,
    EuiTextArea,
    EuiSuperSelect
 } from '@elastic/eui';
import Title from '../../components/Title';
import { goSearch } from '../../utils/SearchUtils';
import './index.css'

export default class NeuralSearch extends Component {

    constructor(props){
        super(props)
        this.goSearch = goSearch.bind(this)
    }

    state = {
        isPopoverOpen: false,
        searchField: '标题',
        options : [
            {
              value: 'title',
              inputDisplay: (
                <span className='option_list_item'>标题</span>
                )
            },
            {
              value: 'abstract',
              inputDisplay: (
                <span className='option_list_item'>摘要</span>
                )
            },
            {
              value: 'signoryItem',
              inputDisplay: (
                <span className='option_list_item'>主权项</span>
                )
            }
          ],
        currentOption : 'title'
    }

    setOption = (op) =>{
        this.setState({currentOption : op})
    }

    inputRef = React.createRef()

    render() {
        return (
            <div className='basic_search'>
                <Title title='语义检索'/>
                {/* 高度由子元素撑开 */}
                <div style={{ height: 'auto',  margin: '0 auto'}}>
                    {/* 元素定位 */}
                    <div style={{width: '10%', position: 'relative', left: '10%'}}>
                        <EuiSuperSelect
                                    options={this.state.options}
                                    valueOfSelected={this.state.currentOption}
                                    onChange={(value) => this.setOption(value)}
                                    popoverProps={{
                                        panelClassName: 'fieldSelect'
                                    }}
                                    
                                    
                        />
                    </div>
                </div>
                
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
                        this.goSearch({
                            searchType : "neural",
                            query: this.inputRef.current.value,
                            field: this.state.currentOption
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
