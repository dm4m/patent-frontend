import React, { Component } from 'react'
import axios from "axios"
import { EuiFilePicker } from '@elastic/eui'
import Title from '../../components/Title'
import './index.css'

export default class NoveltyHome extends Component {

    onChange = (files) => {
        let formData = new FormData()
        formData.append("file", files[0])
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
        console.log(files);
      };

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
                />
                </div>
                
            </div>
        )
    }
}
