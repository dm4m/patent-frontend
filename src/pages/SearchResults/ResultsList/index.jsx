import React, { Component } from 'react'
import { EuiFlexGrid, EuiFlexItem, EuiCard, EuiFlexGroup, EuiTitle, EuiText } from '@elastic/eui'
import ListElement from './ListElement'

export default class ResultsList extends Component {

    data_list = [
        {
            title: "title",
            author: "author",
            abstract: "abstract",
            published_time: "time"
        },
        {
            title: "title",
            author: "author",
            abstract: "abstract",
            published_time: "time"
        },
        {
            title: "title",
            author: "author",
            abstract: "abstract",
            published_time: "time"
        },
        {
            title: "title",
            author: "author",
            abstract: "abstract",
            published_time: "time"
        },
        {
            title: "title",
            author: "author",
            abstract: "abstract",
            published_time: "time"
        },
        {
            title: "title",
            author: "author",
            abstract: "abstract",
            published_time: "time"
        }
    ]

    render() {
        var list = []
        for (let index = 0; index < 20; index++) {
            list.push(<ListElement/>);
        }
        return (
            <div>
                {list}            
                {/* <ListElement/> */}
            </div>
        )
    }
}
