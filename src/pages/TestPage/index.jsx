import React, { Component } from 'react'
import { Link, withRouter, useLocation} from 'react-router-dom';
import * as echarts from 'echarts';

  


class TestPage extends Component {
    render() {

        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
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
        });

        return (
            <div>
                
            </div>
        )
    }
}

export default withRouter(TestPage)