import { 
  EuiButton
}from '@elastic/eui'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { advancedSearch } from '../../utils/SearchUtils'
import AdvancedSearchRow from '../AdvancedSearchRow'
import './index.css'

class AdvancedSearchBox extends Component {

    constructor(props){
        super(props)
        this.advancedSearch = advancedSearch.bind(this)
    }
    
    state = {
      nextId : 4,
      ids : [1, 2, 3],
      conditionMap : new Map()
    }
    
    inputRef = React.createRef()

    appendRow = () =>{
      this.setState({
        ids: [...this.state.ids, this.state.nextId],
        nextId: this.state.nextId + 1
      })
      console.log(this.state.ids.length)
    }

    deleteCondition = (id) => {
      var tmpIds = this.state.ids;
      // s.splice(s.indexOf('dd'), 1)、
      console.log("删除" + id)
      tmpIds.splice(tmpIds.indexOf(id), 1)
      this.setState({
        ids: tmpIds
      })
      //在 conditionMap 中也删除
      this.state.conditionMap.delete(id)
      console.log(this.state.conditionMap)
      console.log(this.state.ids.length)
    }

    setCondition = (id, currentLogicOption, currentFieldOption, currentMatchOption, text) => {
      this.state.conditionMap.set(id, {currentFieldOption, currentLogicOption, currentMatchOption, text})
      console.log(this.state.conditionMap)
    }

    render() {
      let searchRowList = this.state.ids.map((id) => 
        <AdvancedSearchRow key={id} id={id} deleteCondition={this.deleteCondition} setCondition={this.setCondition}/>
      )
        return (
            <div className='advanced-search-box'>
              <div ref = {this.inputRef}>
                {
                  searchRowList
                }
              </div>
              <div style={{
                margin: "10px",
                display: "flex",
                justifyContent: 'space-between'
              }}>
                <EuiButton onClick={() => this.appendRow()}>
                  + 添加字段
                </EuiButton>
                <EuiButton
                    fill
                    onClick={() => {this.advancedSearch(this.state.conditionMap, 0, 20)}}
                    // style={{position:'absolute', right: '10%'}}
                >
                    检索
                </EuiButton>
              </div>
            </div>
        )
    }
}

export default withRouter(AdvancedSearchBox)