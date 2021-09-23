import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

import Player from '../components/player/Player';

import Home from '../pages/Home';
import Search from '../pages/Search';

import './styles/container.scss'

// This component targets mobile / tablets
const AppContainer = ({children}) => {
    return (
        <>
            <Header />

            {/*Since this is a container so it render everything inside it  
            therefore rendering children component
            */}
            <div style={{margin: '0 1rem', paddingTop: '60px', paddingBottom: '150px'}}>
                {children}
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/search" component={Search} />
                </Switch>
            </div>

            {/* A global music player here so that it stays rendered on each page*/}
            <Player />

            {/* footer contains routing links */}
            <Footer />
        </>
    )
}

export default AppContainer
