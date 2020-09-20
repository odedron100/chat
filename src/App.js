import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import SomeWebsite from './SomeWebsite';
import AgentSystem from './AgentSystem';
import LoginForm from './LoginForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/agents" component={AgentSystem}>
            </Route>
            <Route path="/" component={SomeWebsite}>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  } 
}

export default App;
