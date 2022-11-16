import { 
  EuiFieldText,
  EuiSuperSelect,
  EuiButton,
  EuiButtonIcon
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
    currentMatchOption : 'exact',
    fieldOptions : [
      {
        value: 'title',
        inputDisplay: (
          <span className='option_list_item'>标题</span>
          )
      },
      {
        value: 'abstractText',
        inputDisplay: (
          <span className='option_list_item'>摘要</span>
          )
      },
      {
        value: 'signoryItem',
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
          value: 'agent',
          inputDisplay: (
            <span className='option_list_item'>代理人</span>
            )
      },
      {
          value: 'agency',
          inputDisplay: (
            <span className='option_list_item'>代理机构</span>
            )
      },  
      {
        value: 'mainClassNo',
        inputDisplay: (
          <span className='option_list_item'>主分类号</span>
          )
      },
      {
        value: 'classNo',
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
    ],
    matchOptions : [
      {
        value: 'exact',
        inputDisplay: (
          <span className='option_list_item'>精确</span>
          )
      },
      {
        value: 'fuzzy',
        inputDisplay: (
          <span className='option_list_item'>模糊</span>
          )
      }
    ]
  }
  
  inputRef = React.createRef()

  handleRef = r => {
    this.inputRef.current = r;
  };

  setFieldOption = (op) =>{
      this.setState({currentFieldOption : op}, () => {
        this.setCondition()})
  }

  setLogicOption = (op) =>{
    this.setState({currentLogicOption : op}, () => {
      this.setCondition()})
  }

  setMatchOption = (op) =>{
    this.setState({currentMatchOption : op}, () => {
      this.setCondition()})
  }

  deleteSelf = () => {
    this.props.deleteCondition(this.props.id)
  }

  setCondition = () => {
    this.props.setCondition(this.props.id, this.state.currentLogicOption, 
      this.state.currentFieldOption, this.state.currentMatchOption, this.inputRef.current.value)
  }
    render() {

      let logicOpPanel 
      if(this.props.id == 1){
        logicOpPanel = 
          <div style={{
            flex: '0 0 6em',
            margin: '0 5px'
          }}>
          </div>
      }else{
        logicOpPanel = 
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
      }

      let deletePanel
      if(this.props.id == 1){
        deletePanel = 
            <EuiButtonIcon
              display="base"
              iconType="trash"
              aria-label="Delete"
              color="danger"
              isDisabled="true"
            />
      }else{
        deletePanel = 
            <EuiButtonIcon
              display="base"
              iconType="trash"
              aria-label="Delete"
              color="danger"
              onClick={() => this.deleteSelf()}
            />
      }
      return (
        <div className='advanced-search-row'>
          {logicOpPanel}
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
            <EuiFieldText  
              inputRef={this.inputRef} 
              fullWidth={true}
              onChange={() => this.setCondition()}
            />
          </div>
          <div style={{
            flex: '0 0 3em',
            margin: '0 5px'
          }}>
            <EuiSuperSelect
              options={this.state.matchOptions}
              valueOfSelected={this.state.currentMatchOption}
              onChange={(value) => this.setMatchOption(value)}
              popoverProps={{
                panelClassName: 'fieldSelect'
              }}
              fullWidth={true}
            /> 
          </div>
          {deletePanel}
        </div>
      )
    }

}

export default withRouter(AdvancedSearchRow)