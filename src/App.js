import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

// importing default styles from config
import './configs/colors.scss'

import AuthProvider from './auth/AuthProvider';

import MusicProvider from './context/MusicContext';
import AppContainer from './containers/AppContainer';

const App = () => {
  return(
    <div className="App">
      <AuthProvider>
        <Router>
          <MusicProvider>
            <AppContainer />
          </MusicProvider>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App;
