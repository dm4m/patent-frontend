import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

export default class ListElement extends Component {
    render() {
        return (
            <div className='list-element'>
                <div className="title-area">
                    <span className='index'>1.</span>
                    <Link to='detailPage'><span className='title'>一种基于差异测试的FPGA综合工具缺陷检测方法</span></Link>
                </div>
                <div className="author-area">
                    <span>CN201910705359.1</span>
                    <span className='not-first'>北京理工大学</span>
                    <span className='not-first'>2021-06-11</span>
                </div>
                <div className="abstract-area">
                    <span className='abstract-text'>
                        摘要： 本发明涉及一种基于差异测试的FPGA综合工具缺陷检测方法，属于计算机软件测试技术领域。本发明通过使用可供比较的参考FPGA综合工具，给定一个测试代码，将测试代码生成与其等价的变异代码，这些参考的FPGA综合工具和待测工具将对其执行编译得到各自的执行结果。由于参考综合工具和待测的FPGA综合工具在差异测试中遵循相同规约，其执行结果相同。因此，通过比较待测工具与参考工具的执行结果的一致，能够有效判断
                    </span>
                </div>
                {/* <div className="button-area"></div> */}
            </div>
        )
    }
}
