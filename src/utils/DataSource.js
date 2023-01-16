import axios from "axios"
import { ipList } from "../configs/ipConfig"

export async function getAnalysisCollection(){
    let response =  await axios.get(ipList.BACKEND_SOCKET + `/patent/analysisCollection`, {
    })
    return response.data
}

export async function deleteCollectionById(collectionId){
    let response =  await axios.delete(ipList.BACKEND_SOCKET + `/patent/analysisCollection`, 
                                        {
                                            params: {
                                                'collectionId': collectionId,
                                            }
                                        })
}

export async function getACItemByCollectionId(collectionId, pageIndex, pageSize){
    let response =  await axios.get(ipList.BACKEND_SOCKET + `/patent/analysisCollectionItem`, {
        params: {
            'collectionId': collectionId,
            'pageIndex' : pageIndex,
            'pageSize' : pageSize,
        }
    })
    return response.data
}

export async function deleteCollectionItemsByIds(itemIds){
    let response =  await axios.delete(ipList.BACKEND_SOCKET + `/patent/analysisCollectionItem`, 
                                        {data :{itemIds}})
}


