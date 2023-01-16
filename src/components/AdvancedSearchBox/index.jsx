import { 
  EuiButton
}from '@elastic/eui'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { goSearch } from '../../utils/SearchUtils'
import AdvancedSearchRow from '../AdvancedSearchRow'
import './index.css'

class AdvancedSearchBox extends Component {

    constructor(props){
        super(props)
        this.goSearch = goSearch.bind(this)
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
    }

    deleteCondition = (id) => {
      var tmpIds = this.state.ids;
      tmpIds.splice(tmpIds.indexOf(id), 1)
      this.setState({
        ids: tmpIds
      })
      this.state.conditionMap.delete(id)
    }

    setCondition = (id, currentLogicOption, currentFieldOption, currentMatchOption, text) => {
      this.state.conditionMap.set(id, {currentFieldOption, currentLogicOption, currentMatchOption, text})
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
                    onClick={() => {
                      this.goSearch({
                        searchType : "advanced",
                        conditionMap: this.state.conditionMap
                      })
                    }}
                >
                    检索
                </EuiButton>
              </div>
            </div>
        )
    }
}

export default withRouter(AdvancedSearchBox)