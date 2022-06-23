import { 
  EuiFieldText,
  EuiSuperSelect,
  EuiButton
}
from '@elastic/eui'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './index.css'

class AdvancedSearchRow extends Component {

  state = {
    isPopoverOpen: false,
    currentLogicOption: 'and',
    currentFieldOption : 'title',
    fieldOptions : [
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
          value: 'signory_item',
          inputDisplay: (
            <span className='option_list_item'>主权项</span>
            )
        },
        {
          value: 'patentCode',
          inputDisplay: (
            <span className='option_list_item'>申请号/专利号</span>
            )
        },
        {
          value: 'publicationNo',
          inputDisplay: (
            <span className='option_list_item'>公开号/公告号</span>
            )
        },
        {
          value: 'applicant',
          inputDisplay: (
            <span className='option_list_item'>申请人/专利权人</span>
            )
        },
        {
          value: 'inventor',
          inputDisplay: (
            <span className='option_list_item'>发明人</span>
            )
        },
        {
          value: 'main_class',
          inputDisplay: (
            <span className='option_list_item'>主分类号</span>
            )
        },
        {
          value: 'class',
            inputDisplay: (
            <span className='option_list_item'>分类号</span>
            )
        },
    ],
    logicOptions : [
      {
        value: 'and',
        inputDisplay: (
          <span className='option_list_item'>AND</span>
          )
      },
      {
        value: 'or',
        inputDisplay: (
          <span className='option_list_item'>OR</span>
          )
      },
      {
        value: 'not',
        inputDisplay: (
          <span className='option_list_item'>NOT</span>
          )
      }
    ]
  }

setFieldOption = (op) =>{
    this.setState({currentFieldOption : op})
}

setLogicOption = (op) =>{
  this.setState({currentLogicOption : op})
}

  deleteSelf = () => {
    this.props.deleteCondition(this.props.id)
  }

    render() {
        return (
            <div className='advanced-search-row'>
              <div style={{
                flex: '0 0 6em',
                margin: '0 5px'
              }}>
                <EuiSuperSelect
                  options={this.state.logicOptions}
                  valueOfSelected={this.state.currentLogicOption}
                  onChange={(value) => this.setLogicOption(value)}
                  popoverProps={{
                    panelClassName: 'logicSelect'
                  }}
                  fullWidth={true}
                />
              </div>
              <div style={{
                flex: '0 0 12em',
                margin: '0 5px'
              }}>
                <EuiSuperSelect
                  options={this.state.fieldOptions}
                  valueOfSelected={this.state.currentFieldOption}
                  onChange={(value) => this.setFieldOption(value)}
                  popoverProps={{
                    panelClassName: 'fieldSelect'
                  }}
                  fullWidth={true}
                /> 
              </div>
              <div style={{
                flex: '1 1 auto',
                margin: '0 5px'
              }}>
                <EuiFieldText fullWidth={true}/>
              </div>
              <div style={{
                flex: '0 0 5em',
                margin: '0 5px'
              }}>
                <EuiButton onClick={() => this.deleteSelf()}>
                  删除条件
                </EuiButton>
              </div>
            </div>
        )
    }

}

export default withRouter(AdvancedSearchRow)