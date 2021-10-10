import React, { Component } from 'react'
import { EuiFieldSearch, EuiButton} from '@elastic/eui'
import './index.css' 
export default class SearchArea extends Component {
    render() {
        return (
            <div className='search-area'>
                {/* 
                    利用一个外部wapper控制field宽度 
                */}
                <div id='search-box-wrapper'>
                    <EuiFieldSearch 
                        ref={this.inputRef} 
                        placeholder='Search this'
                        isClearable={true}
                        fullWidth={true}
                        append={
                                <EuiButton  
                                    // onClick={this.searchAndJump} 
                                    fill={true} 
                                    children='搜索'
                                />
                        }
                    />
                </div>
            </div>
        )
    }
}
