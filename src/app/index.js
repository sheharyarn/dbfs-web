import React     from 'react'
import AppRouter from './router'
import './app.css';


class App extends React.Component {
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
