import axios from "axios"
import { ipList } from "../configs/ipConfig"

export async function doAnalysis(anaType, figType, patentIds){
    let response =  await axios.post(ipList.FLASK_SOCKET + `/analysis`, 
                                        { 
                                            'patentIds': patentIds,
                                            'anaType': anaType,
                                            'figType': figType
                                        }
                                    )
    return response.data
}

export async function noveltyReStats(noveltyResId){
    let response =  await axios.post(ipList.FLASK_SOCKET + `/noveltyStats`, 
                                        { 
                                            'noveltyResId': noveltyResId
                                        }
                                    )
    return response.data
}