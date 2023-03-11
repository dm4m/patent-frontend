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

export async function deleteRCItemsByIds(itemIds){
    let response =  await axios.delete(ipList.BACKEND_SOCKET + `/report/reportContentItem`, 
                                        {data :{itemIds}}
                                        )
}

export async function insertReport2gen(reportName){
    let response =  await axios.post(ipList.BACKEND_SOCKET + `/report/report2gen`, {
        'reportName' : reportName
    })
}

export async function insertSearchResults(patentIds, reportId){
    let response =  await axios.post(ipList.BACKEND_SOCKET + `/report/searchResults`, 
                                        { 
                                            'patentIds': patentIds,
                                            'reportId': reportId
                                        }
                                    )
}

export async function insertNoveltyResults(reportId, focusSigory, noveltyAnalysisResult){
    let response =  await axios.post(ipList.BACKEND_SOCKET + `/report/noveltyResults`, 
                                        { 
                                            'reportId': reportId,
                                            'focusSigory': focusSigory,
                                            'noveltyAnalysisResult': noveltyAnalysisResult
                                        }
                                    )
}

export async function insertStatsResults(reportId, options){
    let response =  await axios.post(ipList.BACKEND_SOCKET + `/report/statsResults`, 
                                        { 
                                            'reportId': reportId,
                                            'options': options
                                        }
                                    )
}

export async function getSignorysByPatentId(patentId){
    let response =  await axios.get(ipList.BACKEND_SOCKET + `/report/signory`, {
        params: {
            'patentId': patentId,
        }
    })
    // [{signoryId, signory }, ...]
    return response.data
}

export async function noveltyCompare(oriSig, compareSigs){
    let response =  await axios.post(ipList.FLASK_SOCKET + `/noveltyCompare`, 
        { 
            'oriSig': oriSig,
            'compareSigs': compareSigs
        }
    )
    return response.data
}

export async function generateReport(reportId){
    axios.post(ipList.FLASK_SOCKET + `/reportGen`, {
        'reportId': reportId,
    })
}