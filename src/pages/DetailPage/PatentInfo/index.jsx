import React, { Component } from 'react'
import { EuiButton, EuiPageTemplate, EuiEmptyPrompt } from '@elastic/eui';

import './index.css'

export default class PatentInfo extends Component {
    patent_data = {
        title: '一种基于变异的FPGA逻辑综合工具模糊测试方法',
        abstract: '',
        type: '',
        applicationDate: '',
        publicationNo: '',
        publicationDate: '',
        mainClassCode: '',
        applicant: '',
        inventor: '',
        applicantAddress: '',
        agency: '',
        agent: '',
        applicantArea: '',
        signory: ''
    }
    render() {
        return (
            <div className='wrapper'>
                <div className='main'>
                    <div className='container'>
                        <div className='doc'>
                            <div className='brief'>
                                <div className="wx-tit">
                                    <h1>{this.patent_data.title}</h1>
                                </div>
                                <div className="row">
                                    <span className="rowtit">专利类型：</span>
                                    <p className="funds">发明公开</p>
                                </div>
                                <div className="row">
                                    <div className="row-1">
                                        <span className="rowtit">申请(专利)号：</span>
                                        <p className="funds">CN202110687838.2</p>
                                    </div>
                                    <div className="row-2">
                                        <span className="rowtit2">申请日：</span>
                                        <p className="funds">2021-06-21</p>
                                    </div>
                                </div> 
                                <div className="row">
                                    <div className="row-1">
                                        <span className="rowtit"> 申请公布号：</span>
                                        <p className="funds">CN113434390A</p>
                                    </div>
                                    <div className="row-2">
                                        <span className="rowtit"> 公开公告日：</span>
                                        <p className="funds">2021-09-24</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <span className="rowtit">申请人：</span>
                                    <p className="funds">
                                        <a className="author" >北京理工大学</a>
                                    </p>
                                </div>
                                <div className="row">
                                    <span className="rowtit">地址：</span>
                                    <p className="funds">100081 北京市海淀区中关村南大街5号</p>
                                </div>
                                <div className="row">
                                    <span className="rowtit">发明人：</span>
                                    <p className="funds">
                                        <a target="_blank">江贺</a>; 
                                        <a target="_blank">张漪</a>; 
                                        <a target="_blank">施重阳</a>;
                                        <a target="_blank">刘辉</a></p>
                                </div>
                                <div className="row">
                                    <span className="rowtit">分类号：</span>
                                    <p className="funds">G06F11/36</p>
                                </div>
                                <div className="row">
                                    <div className="row-1">
                                        <span className="rowtit">主分类号：</span>
                                        <p className="funds">G06F11/36</p>
                                    </div>
                                    <div className="row-2">
                                        <span className="rowtit">国省代码：</span>
                                        <p className="funds">11</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <span className="rowtit">页数：</span>
                                    <p className="funds">9</p>
                                </div>
                                <div className="row">
                                    <div className="row-1">
                                        <span className="rowtit">代理机构：</span>
                                        <p className="funds">北京正阳理工知识产权代理事务所(普通合伙)</p>
                                    </div>
                                    <div className="row-2">
                                        <span className="rowtit2">代理人：</span>
                                        <p className="funds">张利萍</p>
                                    </div>
                                </div>
                                <div className="zl-yzwx">
                                    <div className="row claim">
                                        <h5>主权项：</h5>
                                        <div className="claim-text">1.一种基于变异的FPGA逻辑综合工具模糊测试方法,其特征在于,包括以下步骤：步骤1：构建FPGA逻辑综合工具初始测试用例种子集Q；采用随机生成器,得到初始测试用例程序种子集；步骤2：依次从步骤1中构建的初始测试用例集中选取用例,然后进行步骤3；步骤3：判断测试用例变异的数量是否已达到设定值；若未达到,则执行步骤4,对步骤2所选取用例进行变异操作；若已达到,则进行步骤5；步骤4：执行变异操作,变异初始测试用例程序,得到新的测试用例程序变体集合Q′。步骤5：从集合Q′中选取测试用例q′,作为待测FPGA逻辑综合器的测试输入,并对其进行已使用标记；步骤6：收集保存FPGA工具测试的输出结果,判断检测待测工具是否正常运行,或运行后的综合结果与输入的测试用例程序是否具有等价性；具体为：对于测试用例程序集Q′中的每一个测试用例程序q′,若其中一个测试用例程序令需要测试的FPGA逻辑综合工具不能正常运行,或者工具正常运行后输出的综合网表与输入不具有等价性,则认为该测试用例程序导致FPGA工具出现故障；此时,将导致FPGA综合工具产生故障的测试用例程序进行保存,用于后续分析和约简故障信息；步骤7：判断是否达到测试终止条件；如果达到了测试终止条件,则终止测试,进行步骤8；否则,转到步骤1,继续执行测试；整个FPGA测试的终止条件根据具体测试需求进行设定,包括设定测试迭代次数和测试时间；步骤8：对引发待测逻辑综合器产生故障的测试用例程序进行约减；步骤9：将约简的测试用例程序写入bug报告,提交给FPGA逻辑综合工具发者。</div>
                                    </div>
                                    <div className="row abstract">
                                        <h5>摘要：</h5>
                                        <div className="abstract-text">本发明公开了一种基于变异的FPGA逻辑综合工具模糊测试方法,属于计算机软件测试技术领本发明针对FPGA逻辑综合器的特点,首先构建合适的逻辑综合器的测试用例集；然后,在符合Verilog HDL语法规则的前提下,设定变异算子并对测试用例种子程序执行变异操作,得到更有效的测试用例；之后,执行待测FPGA逻辑综合工具,对测试用例程序进行综合,转换与硬件资源相匹配的综合网表netlist；最后,通过验证网表netlist与综合前Verilog设计的等价性结果来判断FPGA工具是否存在缺陷。本方法通过设计变异算子执行变异产生更多有效的FPGA逻辑综合工具测试的测试用例程序,增加了测试用例的多样性,可以帮助FPGA设计开发者更好的找到检测逻辑综合工具中存在的故障,提高FPGA逻辑综合器的质量。</div>
                                    </div>
                                    <div className="law-state">
                                        <h5 className="state-tit">
                                            法律状态 
                                            <i className="icon"></i>
                                        </h5>
                                        <div id="divlawstate">
                                            <table className="zl-table">
                                            <thead>
                                                <tr>
                                                <th className="col-1">法律状态公告日</th>
                                                <th className="col-2">法律状态</th>
                                                <th className="col-3">法律状态信息</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                <td className="col-1">2021-09-24</td>
                                                <td className="col-2">公开</td>
                                                <td className="col-3">公开</td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="operate operate2" id="DownLoadParts">
                                    <EuiButton fill>下载 PDF</EuiButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
