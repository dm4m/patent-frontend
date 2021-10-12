import React, { Component } from 'react'
import './index.css'

export default class ListElement extends Component {
    render() {
        return (
            <div className='list-element'>
                <div className="title-area">
                    <span className='index'>1.</span>
                    <span className='title'>一种基于深度语义的代码函数味道检测方法</span>
                </div>
                <div className="author-area">
                    <span>CN201910705359.1</span>
                    <span className='not-first'>北京理工大学</span>
                    <span className='not-first'>2019-12-20</span>
                </div>
                <div className="abstract-area">
                    <span className='abstract-text'>
                        摘要： 本发明涉及一种基于深度语义的代码函数味道检测方法，属于自动化软件重构技术领域。通过提取文本信息和结构化信息中的语义特征和数字化特征，包括模型训练以及模型测试；模型训练包括代码函数表示A、结构化特征提取A和代码味道分类A；包括代码函数表示B、结构化特征提取B和代码味道分类B；代码函数表示A和代码函数表示B是基于注意力机制和LSTM神经网络的代码函数表示；结构化特征提取A和结构化特征提取B是基于卷积神经网络的结构化特征提取；代码味道分类A和代码味道分类B是基于多层感知机的代码味道分类提出了一种基于深度学习的函数级代码味道检测方法。在较小的检测时间下，能够保证检测结果具有较高的召回率和精确度。
                    </span>
                </div>
                {/* <div className="button-area"></div> */}
            </div>
        )
    }
}
