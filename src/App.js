import React, {Component} from 'react';
import SomeWebsite from './SomeWebsite';
import Chat from './Chat';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <SomeWebsite />
        <Chat />
      </div>
    );
  } 
}

export default App;
