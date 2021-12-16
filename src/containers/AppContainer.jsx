import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

import Player from '../components/player/Player';

import Home from '../pages/Home';
import Search from '../pages/Search';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Playlists from '../pages/Playlists';
import Profile from '../pages/Profile';

import AlbumPage from '../pages/AlbumPage';
import ArtistPage from '../pages/ArtistPage';
import PlaylistPage from '../pages/PlaylistPage';

import './styles/container.scss';

// This component targets mobile / tablets
const AppContainer = ({children}) => {

    // add dark mode class if enabled
    useEffect(() => {
        const container = document.querySelector('.App');
        const darkMode = localStorage.getItem('darkMode');
        if(darkMode){
            container.classList.add('dark');
        }
    }, [])

    return (
        <>
            <Header />

            {/*Since this is a container so it render everything inside it  
            therefore rendering children component
            */}
            <div style={{margin: '0 1rem', paddingTop: '60px', paddingBottom: '150px'}}>
                {children}
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/search" component={Search} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/playlists" component={Playlists} />
                    <Route exact path="/album/:album_name" component={AlbumPage} />
                    <Route exact path="/playlist/:playlist_name" component={PlaylistPage} />
                    <Route exact path="/artist/:artist_name" component={ArtistPage} />
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
