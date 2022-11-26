import React, { Component } from 'react'
import {Route,Redirect,Switch} from 'react-router-dom'
import { EuiProvider } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';
import './App.css'
import Header from  './components/Header'
import BasicSearch from './pages/BasicSearch'
import NeuralSearch from './pages/NeuralSearch';
import SearchResults from './pages/SearchResults'
import DetailPage from './pages/DetailPage'
import ProSearch from './pages/ProSearch';
import AdvancedSearch from './pages/AdvancedSearch';
import HomePage from './pages/HomePage';
import NoveltyHome from './pages/NoveltyHome';


export default class App extends Component {
    render() {
        return (
            <EuiProvider colorMode='light'>
                <div className='app'>
                    <Header/> 
                    <Switch>
                        <Route path='/homePage' component={HomePage}/>  
                        <Route path='/basicSearch' component={BasicSearch}/>
                        <Route path='/advancedSearch' component={AdvancedSearch}/>      
                        <Route path='/proSearch' component={ProSearch}/>      
                        <Route path='/neuralSearch' component={NeuralSearch}/>
                        <Route path='/searchResults' component={SearchResults}/>
                        <Route path='/detailPage' component={DetailPage}/>
                        <Route path='/noveltyHome' component={NoveltyHome}/>                    
                        <Redirect to='/homePage'/>
                    </Switch>
                </div>
            </EuiProvider>
            
        )
    }
}
