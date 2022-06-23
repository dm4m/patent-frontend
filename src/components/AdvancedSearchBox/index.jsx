import { 
  EuiButton
}from '@elastic/eui'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import './index.css'
import { ipList } from '../../configs/ipConfig'
import { basicSearch } from '../../utils/SearchUtils'
import AdvancedSearchRow from '../AdvancedSearchRow'

class AdvancedSearchBox extends Component {

    constructor(props){
        super(props)
    }
    
    state = {
      nextId : 4,
      ids : [1, 2, 3]
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
      // s.splice(s.indexOf('dd'), 1)、
      console.log("删除" + id)
      tmpIds.splice(tmpIds.indexOf(id), 1)
      this.setState({
        ids: tmpIds
      })
    }

    render() {
      let searchRowList = this.state.ids.map((id) => 
        <AdvancedSearchRow key={id} id={id} deleteCondition={this.deleteCondition}/>
      )
        return (
            <div className='advanced-search-box'>
              {
                searchRowList
              }
              <div style={{
                margin: "10px"
              }}>
                <EuiButton onClick={() => this.appendRow()}>
                  + 添加字段
                </EuiButton>
              </div>
            </div>
        )
    }
}

export default withRouter(AdvancedSearchBox)