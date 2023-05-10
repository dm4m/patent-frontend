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
    return response.data
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

// （原逻辑，已废弃），把新颖性分析结果保存至待分析报告，附带插入新颖性结果数据
// 保存新颖性结果，不再直接加入待生成报告
export async function insertNoveltyResults(resultName, focusSigory, noveltyAnalysisResult){
    let response =  await axios.post(ipList.BACKEND_SOCKET + `/report/noveltyResults`, 
                                        { 
                                            'resultName': resultName,
                                            'focusSigory': focusSigory,
                                            'noveltyAnalysisResult': noveltyAnalysisResult
                                        }
                                    )
}

export async function addNoveltyResult2Report(reportId, noveltyAnaId, noveltyAnaName){
    let response =  await axios.post(ipList.BACKEND_SOCKET + `/report/addNoveltyResult2Report`, 
                                        { 
                                            'noveltyAnaId': noveltyAnaId,
                                            'reportId': reportId,
                                            'noveltyAnaName': noveltyAnaName,
                                        }
                                    )
}

export async function insertStatsResults(reportId, options, collectionId){
    let response =  await axios.post(ipList.BACKEND_SOCKET + `/report/statsResults`, 
                                        { 
                                            'reportId': reportId,
                                            'options': options,
                                            'collectionId' : collectionId
                                        }
                                    )
}

export async function saveAndAddNoveltyStats(reportId, options, noveltyResId){
    let response =  await axios.post(ipList.BACKEND_SOCKET + `/report/noveltyStatus`, 
                                        { 
                                            'reportId': reportId,
                                            'options': options,
                                            'noveltyResId' : noveltyResId
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

export async function getReportFile(pdfFilePath){
    let response =  await axios.get(ipList.FLASK_SOCKET + `/reportFile`, {
        params: {
            'pdfFilePath': pdfFilePath
        }
    })
    return response.data
}

export async function getReportContentDetail(itemType, corrId){
    let response =  await axios.get(ipList.BACKEND_SOCKET + `/report/RCDetail`, {
        params: {
            'itemType': itemType,
            'corrId': corrId,
        }
    })
    return response.data
}

export async function getNoveltyAnaResult(){
    let response =  await axios.get(ipList.BACKEND_SOCKET + `/stats/noveltyAnaResult`, {
    })
    return response.data
}

export async function getNAItemByNAId(noveltyAnaId, pageIndex, pageSize){
    let response =  await axios.get(ipList.BACKEND_SOCKET + `/stats/noveltyAnaResultItem`, {
        params: {
            'noveltyAnaId': noveltyAnaId,
            'pageIndex' : pageIndex,
            'pageSize' : pageSize,
        }
    })
    return response.data
}

export async function deleteNoveltyResAndItems(noveltyResId){
    let response =  await axios.delete(ipList.BACKEND_SOCKET + `/stats/NoveltyRes`, 
                                        {
                                            params: {
                                                'noveltyResId': noveltyResId,
                                            }
                                        })
}

export async function addSearchResults2Report(reportId, collectionId, collectionName){
    let response =  await axios.post(ipList.BACKEND_SOCKET + `/report/addSearchResults2Report`, 
                                        { 
                                            'collectionId': collectionId,
                                            'reportId': reportId,
                                            'collectionName': collectionName,
                                        }
                                    )
}

