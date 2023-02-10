import axios from "axios"
import { ipList } from "../configs/ipConfig"

export async function getAnalysisCollection(){
    let response =  await axios.get(ipList.BACKEND_SOCKET + `/stats/analysisCollection`, {
    })
    return response.data
}

export async function deleteCollectionById(collectionId){
    let response =  await axios.delete(ipList.BACKEND_SOCKET + `/stats/analysisCollection`, 
                                        {
                                            params: {
                                                'collectionId': collectionId,
                                            }
                                        })
}

export async function insertAnalysisCollection(collectionName){
    let response =  await axios.post(ipList.BACKEND_SOCKET + `/stats/analysisCollection`, {
        'collectionName' : collectionName
    })
}

export async function getACItemByCollectionId(collectionId, pageIndex, pageSize){
    let response =  await axios.get(ipList.BACKEND_SOCKET + `/stats/analysisCollectionItem`, {
        params: {
            'collectionId': collectionId,
            'pageIndex' : pageIndex,
            'pageSize' : pageSize,
        }
    })
    return response.data
}

export async function insertCollectionItems(patentIds, collectionId){
    let response =  await axios.post(ipList.BACKEND_SOCKET + `/stats/analysisCollectionItem`, 
                                        { 
                                            'patentIds': patentIds,
                                            'collectionId': collectionId
                                        }
                                    )
}

export async function deleteCollectionItemsByIds(itemIds){
    let response =  await axios.delete(ipList.BACKEND_SOCKET + `/stats/analysisCollectionItem`, 
                                        {data :{itemIds}}
                                        )
}

export async function getReport2gen(){
    let response =  await axios.get(ipList.BACKEND_SOCKET + `/report/report2gen`, {
    })
    return response.data
}
                    
export async function deleteReport2genById(reportId){
    let response =  await axios.delete(ipList.BACKEND_SOCKET + `/report/report2gen`, 
                                        {
                                            params: {
                                                'reportId': reportId,
                                            }
                                        })
}

export async function getRCItemsByReportId(reportId, pageIndex, pageSize){
    let response =  await axios.get(ipList.BACKEND_SOCKET + `/report/reportContentItem`, {
        params: {
            'reportId': reportId,
            'pageIndex' : pageIndex,
            'pageSize' : pageSize,
        }
    })
    return response.data
}