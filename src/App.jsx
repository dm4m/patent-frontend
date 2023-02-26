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
import UploadSearch from './pages/UploadSearch';
import HomePage from './pages/HomePage';
import NoveltyHome from './pages/NoveltyHome';
import NoveltyResults from './pages/NoveltyResults';
import AnalysisHome from './pages/AnalysisHome';
import ReportHome from './pages/ReportHome';
import TestPage from './pages/TestPage';

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
                        <Route path='/uploadSearch' component={UploadSearch}/>
                        <Route path='/searchResults' component={SearchResults}/>
                        <Route path='/detailPage' component={DetailPage}/>
                        <Route path='/noveltyHome' component={NoveltyHome}/>            
                        <Route path='/noveltyResults' component={NoveltyResults}/>           
                        <Route path='/analysisHome' component={AnalysisHome}/> 
                        <Route path='/reportHome' component={ReportHome}/>   
                        <Route path='/testPage' component={TestPage}/>   
                        <Redirect to='/homePage'/>
                    </Switch>
                </div>
            </EuiProvider>
            
        )
    }
}
