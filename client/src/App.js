  
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BubblePage from './components/BubblePage';

import PrivateRoute from './components/PrivateRoute';

import Login from './components/Login';
import './styles.scss';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <PrivateRoute exact path='/BubblePage' component={BubblePage} />
          <Route path='/Login' component={Login} />
          <Route component={Login} />
        </Switch>
        {/* <Route component={Login} /> */}
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
    </Router>
  );
}

export default App;