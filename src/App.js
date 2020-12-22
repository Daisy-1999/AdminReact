import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './pages/login/Login.jsx';
import Admin from './pages/admin/Admin.jsx';

import './App.css'

export class App extends Component {

  

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Admin} />
        </Switch>       
      </Router>
    )
  }
}

export default App
