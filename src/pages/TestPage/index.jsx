import React, { Component } from 'react'
import { Link, withRouter, useLocation} from 'react-router-dom';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { EuiSpacer } from '@elastic/eui';

class TestPage extends Component {
    render() {

        let option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [
                {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
                }
            ]
        }

        return (
            <div>
                <ReactECharts
                    option={option}
                />
                <EuiSpacer />
                <ReactECharts
                    option={option}
                />
                <EuiSpacer />
                <ReactECharts
                    option={option}
                />
                <EuiSpacer />
            </div>
        )
    }
}

export default withRouter(TestPage)