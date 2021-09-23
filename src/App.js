import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

// importing default styles from config
import './configs/colors.scss'

import AppContainer from './containers/AppContainer';

const App = () => {
  return(
    <div className="App">
      <Router>
        <AppContainer />
      </Router>
    </div>
  )
}

export default App;
