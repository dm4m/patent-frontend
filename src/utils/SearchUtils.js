import axios from "axios"
import { ipList } from "../configs/ipConfig"

export function basicSearch(query, field, cur_page, per_page){
    axios.get(ipList.BACKEND_SOCKET + `/patent/basicSearch`, {
        params: {
                    'query': query,
                    'field': field,
                    'cur_page': cur_page,
                    'per_page': per_page
                }
    })
    .then(
        response => {
            this.props.history.push({pathname:'/searchResults',state:{response: response.data}})
        },
        error => { 
        }
    )
}

export function neuralSearch(query, field, cur_page, per_page){
    axios.get(ipList.BACKEND_SOCKET + `/patent/neuralSearch`, {
        params: {
                    'query': query,
                    'field': field,
                    'cur_page': cur_page,
                    'per_page': per_page
                }
    })
    .then(
        response => {
            this.props.history.push({pathname:'/searchResults',state:{response: response.data}})
        },
        error => { 
        }
    )
}

export function advancedSearch(conditions, cur_page, per_page){ 
    if(conditions instanceof Map){
        conditions = Object.fromEntries(conditions)
    }
    axios.post(ipList.BACKEND_SOCKET + '/patent/advancedSearch', 
    {
        conditions,
        cur_page,
        per_page
    },
    {
        headers: {'Context-Type': 'application/json'}
    }
    )
    .then(
        response => {
            this.props.history.push({pathname:'/searchResults',state:{response: response.data}})
        },
        error => { 
        }
    )      
}

export function proSearch(expression, cur_page, per_page){
    axios.get(ipList.BACKEND_SOCKET + `/patent/proSearch`, {
        params: {
                    'expression': expression,
                    'cur_page': cur_page,
                    'per_page': per_page
                }
    })
    .then(
        response => {
            this.props.history.push({pathname:'/searchResults',state:{response: response.data}})
        },
        error => { 
        }
    )
}