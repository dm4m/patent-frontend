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
        return (
            <div>
                <ListElement/>
                {/* {
                  this.data_list.map((data)=>{
                      return (
                          <div>
                              <h1>{data.title}</h1>
                          </div>
                      )
                  })  
                }         */}
            </div>
        )
    }
}
