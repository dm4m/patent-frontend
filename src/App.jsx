import React, { Component } from 'react'
import Header from  './components/Header'
import Title from './components/Title'
import SearchBox from './components/SearchBox'
import './App.css'


export default class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Title/>
                <SearchBox/>
            </div>
        )
    }
}
