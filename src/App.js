import React, { Component } from 'react';
import './App.css';
import ToolBar from './components/Toolbar'
import MessageList from './components/MessageList'
class App extends Component {
  render() {
    return (
      <div className="App">
        <ToolBar />
        <MessageList />
      </div>
    );
  }
}

export default App;
