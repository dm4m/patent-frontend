import React, { Component } from 'react'
import {Route,Redirect,Switch} from 'react-router-dom'
import Header from  './components/Header'
import './App.css'
import Homepage from './pages/Homepage'
import SearchResults from './pages/SearchResults'
import DetailPage from './pages/DetailPage'

export default class App extends Component {
    render() {
        return (
            <div className='app'>
                <Header/>
                {/* <Title/>
                <SearchBox/> */}
                <Switch>
                    <Route path='/homepage' component={Homepage}/>
                    <Route path='/searchResults' component={SearchResults}/>
                    <Route path='/detailPage' component={DetailPage}/>
                    <Redirect to='/homepage'/>
                </Switch>
            </div>
        )
    }
}
