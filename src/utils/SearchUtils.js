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
            // this.props.history.push(`/searchResults?query=${this.inputRef.current.state.value}
            //                                             response=${response.data}`)
            this.props.history.push({pathname:'/searchResults',state:{response: response.data}})
        },
        error => { 
        }
    )
}

export function neuralSearch(query, cur_page, per_page){
    axios.get(ipList.BACKEND_SOCKET + `/patent/neuralSearch`, {
        params: {
                    'query': query,
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