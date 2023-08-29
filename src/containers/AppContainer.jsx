import React, { useEffect, useContext } from 'react';
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

import UserRoute from '../protectedRoutes/UserRoute';

import './styles/container.scss';
import Navbar from '../components/leftnavbar/Navbar';
import Artists from '../pages/Artists';

import { AuthContext } from '../auth/AuthProvider';

// This component targets mobile / tablets
const AppContainer = ({children}) => {

    const { authMemo } = useContext(AuthContext);
    console.log('====================================');
    console.log(authMemo);
    console.log('====================================');

    // add dark mode class if enabled
    useEffect(() => {
        const container = document.querySelector('.App');
        const darkMode = localStorage.getItem('darkMode');
        // we are getting darkmode value so in if condition we always have a set variable so checking this way
        if(darkMode && darkMode === 'true'){
            container.classList.add('dark');
        }
    }, [])

    return (
        <>
            <Header />

            {/*Since this is a container so it render everything inside it  
            therefore rendering children component
            */}
            <Navbar />
            <div className='main_container'>
                {children}
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/search" component={Search} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/artists" component={Artists} />
                    <Route exact path="/album/:album_name" component={AlbumPage} />
                    <Route exact path="/artist/:artist_name" component={ArtistPage} />

                    {
                        /* React components starts with caps. User route is custom route component
                        which renders a <Component /> only on logged in state. 
                        So Component property is capitalised.
                        The other work around is to pass components as <Comp /> rather than just its name*/
                    }
                    {/* exact param passed in the custom component definition */}
                    <UserRoute path="/profile" Component={Profile} />
                    <UserRoute path="/playlist/:playlist_name" Component={PlaylistPage} />
                    <UserRoute path="/playlists" Component={Playlists} />
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
