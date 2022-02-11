import React, { Component } from 'react'
import {Route,Redirect,Switch} from 'react-router-dom'
import { EuiProvider } from '@elastic/eui';
import Header from  './components/Header'
import './App.css'
import Homepage from './pages/Homepage'
import SearchResults from './pages/SearchResults'
import DetailPage from './pages/DetailPage'
import SearchBox from './pages/Homepage/SearchBox'
import Title from './pages/Homepage/Title'
import '@elastic/eui/dist/eui_theme_light.css';


export default class App extends Component {
    render() {
        return (
            <EuiProvider>
                <div className='app'>
                    <Header/> 
                    <Switch>
                        <Route path='/homepage' component={Homepage}/>
                        <Route path='/searchResults' component={SearchResults}/>
                        <Route path='/detailPage' component={DetailPage}/>
                        <Redirect to='/homepage'/>
                    </Switch>
                </div>
            </EuiProvider>
            
        )
    }
}
