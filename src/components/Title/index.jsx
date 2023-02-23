import { EuiPanel, EuiTitle } from '@elastic/eui'
import React, { Component } from 'react'

export default class Title extends Component {
    render() {

        let descBlock = null
        if(this.props.describe != null){
            descBlock = <div>
                <br/>
                <p>{this.props.describe}</p>
            </div>
        }

        return (
            <EuiPanel
                hasShadow={false}
                color="transparent"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: this.props.height,
                }}
            >
                <EuiTitle
                    size='l'
                >
                    <h1>
                        {this.props.title}
                    </h1>
                </EuiTitle>
                
                {descBlock}
            </EuiPanel>
        )
    }
}