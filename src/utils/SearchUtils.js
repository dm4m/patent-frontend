import axios from "axios"
import { ipList } from "../configs/ipConfig"

export function goSearch(searchArgs){
    this.props.history.push(
        {
            pathname:'/searchResults',
            state:{
                searchArgs: searchArgs
            }
        }
    )
}

export async function basicSearch(query, field, cur_page, per_page){
    let response = await axios.get(ipList.BACKEND_SOCKET + `/search/basicSearch`, {
        params: {
                    'query': query,
                    'field': field,
                    'cur_page': cur_page,
                    'per_page': per_page
                }
    })
    return response.data
}

export async function advancedSearch(conditions, cur_page, per_page){ 
    if(conditions instanceof Map){
        conditions = Object.fromEntries(conditions)
    }
    let response = await axios.post(ipList.BACKEND_SOCKET + '/search/advancedSearch', 
        {
            conditions,
            cur_page,
            per_page
        },
        {
            headers: {'Context-Type': 'application/json'}
        }
    )
    return response.data
}

export async function proSearch(expression, cur_page, per_page){
    let response = await axios.get(ipList.BACKEND_SOCKET + `/search/proSearch`, {
        params: {
                    'expression': expression,
                    'cur_page': cur_page,
                    'per_page': per_page
                }
    })
    return response.data
}

export async function neuralSearch(query, field, cur_page, per_page){
    let response = await axios.get(ipList.BACKEND_SOCKET + `/search/neuralSearch`, {
        params: {
                    'query': query,
                    'field': field,
                    'cur_page': cur_page,
                    'per_page': per_page
                }
    })
    return response.data
}

export async function uploadSearch(formData){
    formData.append('limit', 10)
    let response = axios.post(ipList.BACKEND_SOCKET + `/search/uploadSearch`, 
        formData, 
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )
    return response.data
}



