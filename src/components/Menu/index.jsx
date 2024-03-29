import React, { Component } from 'react'
import { Link, withRouter, useLocation} from 'react-router-dom';
import { EuiCard, EuiIcon, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import './index.css'

class Menu extends Component {

    render() {
        return (
            <div className="menu">
                <EuiFlexGroup justifyContent="spaceEvenly"
                    // style={{height: '100%'}}
                    >
                    <EuiFlexItem 
                        style={{
                            margin: '0 10px'
                        }}
                    >
                        <EuiCard title={"专利检索"}
                             icon={<EuiIcon size="xxl" type={`search`} color="primary" />}
                             description="使用简单检索、专业检索、高级检索或者语义检索来检索相关专利"
                             onClick={()=>{this.props.history.push({pathname:'/basicSearch'})}}
                             display="primary"
                        />
                    </EuiFlexItem>
                    <EuiFlexItem
                        style={{
                            margin: '0 10px'
                        }}
                    >
                        <EuiCard title={"新颖性创造性分析"}
                            icon={<EuiIcon size="xxl" type={`inspect`} color="primary"/>}
                            description="对专利的权利要求进行抽取、比较"
                            onClick={()=>{this.props.history.push({pathname:'/noveltyHome'})}}
                            display="primary"
                        />
                        
                    </EuiFlexItem>
                    <EuiFlexItem
                        style={{
                            margin: '0 10px'
                        }}
                    >
                        <EuiCard title={"统计分析"}
                            icon={<EuiIcon size="xxl" type={`visBarVertical`} color="primary"/>}
                            description="对专利集进行地域分析、趋势分析..."
                            onClick={()=>{this.props.history.push({pathname:'/analysisHome'})}}
                            display="primary"
                        />
                    </EuiFlexItem>
                    <EuiFlexItem
                        style={{
                            margin: '0 10px'
                        }}
                    >
                        <EuiCard title={"报告生成"}
                            icon={<EuiIcon size="xxl" type={`document`} color="primary"/>}
                            description="自动生成专利新颖性分析报告"
                            onClick={()=>{this.props.history.push({pathname:'/reportHome'})}}
                            display="primary"
                        />
                    </EuiFlexItem>
                </EuiFlexGroup>
            </div>
        )
    }
}

export default withRouter(Menu)