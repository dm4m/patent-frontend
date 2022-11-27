import React, { Component } from 'react'
import axios from "axios"
import { EuiFilePicker, EuiButton } from '@elastic/eui'
import Title from '../../components/Title'
import './index.css'

export default class NoveltyHome extends Component {

    state = {
        files : [],
        filePickerIsInvalid : false
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

    doAnalysis(){
        if(this.state.filePickerIsInvalid){
            alert("请上传合规文件")
        }else if(this.state.files.length == 0){
            alert("请先上传待分析文件")
        }else{
            let formData = new FormData()
            formData.append("file", this.state.files[0])
            axios.post(
                'http://10.108.119.71:5000/upload', 
                formData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
                .then(res => {
                console.log(res.data);
            })
        };
    }

    render() {
        return (
            <div className='basic_search'>
                <Title title='新颖性分析' describe = '您可以在下方上传专利文件，文件需要为 PDF 格式'/>
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
                            this.doAnalysis()
                        }}
                    >
                        进行分析
                    </EuiButton>
                </div>
            </div>
        )
    }
}
