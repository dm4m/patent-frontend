import React, { Component } from 'react'
import {Route,Redirect,Switch} from 'react-router-dom'
import { EuiProvider } from '@elastic/eui';
import Header from  './components/Header'
import Homepage from './pages/Homepage'
import SearchResults from './pages/SearchResults'
import DetailPage from './pages/DetailPage'
import '@elastic/eui/dist/eui_theme_light.css';
import './App.css'


export default class App extends Component {
    render() {
        return (
            <EuiProvider colorMode='light'>
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
