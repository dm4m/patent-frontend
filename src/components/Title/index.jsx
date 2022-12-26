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
            <div 
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '40%'
                }}
            >
                <h1 style={{fontSize: 'xx-large'}}>
                    {this.props.title}
                </h1>
                {descBlock}
            </div>
        )
    }
}