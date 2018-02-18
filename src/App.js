import React, { Component } from 'react';
import AppRouter from './app-router';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">DBFS</h1>
        </header>

        <AppRouter/>
      </div>
    );
  }
}

export default App;
