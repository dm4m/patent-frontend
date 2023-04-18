import React, { Component } from 'react'
import axios from "axios"
import { 
    EuiFilePicker, 
    EuiButton, 
    EuiModal, 
    EuiModalBody, 
    EuiLoadingSpinner, 
    EuiText, 
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiSpacer
} from '@elastic/eui'
import Title from '../../components/Title'
import './index.css'
import { ipList } from '../../configs/ipConfig'
import { goSearch } from '../../utils/SearchUtils'


export default class UploadSearch extends Component {

    constructor(props){
        super(props)
        this.goSearch = goSearch.bind(this)
    }

    state = {
        files : [],
        filePickerIsInvalid : false,
        isLoadingModalVisable : false
    }

    checkFileType = (file) => {
        if(file.type != 'application/pdf'){
            alert("请选择.pdf格式文件上传！");
            this.setState({
                filePickerIsInvalid : true
            }, ()=>{})
            return false
        }
        this.setState({
            filePickerIsInvalid : false
        }, ()=>{})
        return true
    }

    onChange = (upfiles) => {
        if(upfiles.length > 0){
            let file = upfiles[0]
            if(this.checkFileType(file)){
                this.setState({files : upfiles, filePickerIsInvalid : false}, ()=>{})
            }else{
                return;
            }
        }else{
            this.setState(
                {
                    files : [],
                    filePickerIsInvalid : false
                }, ()=>{}
            )
        }
    }

    uploadSearch(){
        if(this.state.filePickerIsInvalid){
            alert("请上传合规文件")
        }else if(this.state.files.length == 0){
            alert("请先上传待分析文件")
        }else{
            let formData = new FormData()
            formData.append("file", this.state.files[0])
            this.openLoadingModal()
            axios.post(ipList.BACKEND_SOCKET + `/search/uploadSearch`, 
                formData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
                .then(res => {
                    this.goSearch({
                        searchType : "upload",
                        uploadres: res.data
                    })
                }
            )
        };
    }

    closeLoadingModal = () => {
        this.setState(
            {
                isLoadingModalVisable : false
            }
        )
    }

    openLoadingModal = () => {
        this.setState(
            {
                isLoadingModalVisable : true
            }
        )
    }
    
    render() {

        let loadingModal
        if(this.state.isLoadingModalVisable){
            loadingModal = 
            <EuiModal maxWidth='false' onClose={this.closeLoadingModal}>
                <EuiModalHeader>
                    <EuiModalHeaderTitle>请稍候</EuiModalHeaderTitle>
                </EuiModalHeader>
                <EuiModalBody >
                    <EuiText>
                        整篇检索可能需要一些时间
                    </EuiText>
                    <EuiSpacer />
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <EuiLoadingSpinner size='xxl'/>
                    </div>
                </EuiModalBody> 
            </EuiModal>
        }

        return (
            <div className='basic_search'>
                <Title 
                    title='整篇检索' 
                    describe = '您可以在下方上传 PDF 格式的专利文件，系统依照整篇专利检索相似专利'
                    height='40%'
                />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: 'auto',
                        margin: '0 auto'
                    }}
                >
                <EuiFilePicker
                    name='file'
                    onChange={this.onChange}
                    onEncrypted="multipart/form-data"
                    accept='.pdf'
                    isInvalid={this.state.filePickerIsInvalid}
                />
                </div>
                <br/>
                <div
                    style={{
                        display: 'flex', 
                        justifyContent: 'center',
                        height: 'auto',
                        margin: '0 auto'
                    }}
                >
                    <EuiButton
                        fill
                        onClick={() => {
                            this.uploadSearch()
                        }}
                    >
                        整篇检索
                    </EuiButton>
                </div>
                {loadingModal}
            </div>
        )
    }
}
