import React, { Component } from 'react'
import { Link, withRouter, useLocation} from 'react-router-dom';
import Title from '../../components/Title'
import './index.css'
import Menu from '../../components/Menu';

class HomePage extends Component {
    render() {
        return (
            <div className='basic_search'>
                <Title/>
                <Menu/>
            </div>
        )
    }
}

export default withRouter(HomePage)