import React  from 'react'
import Router from 'app/router'

import 'app/index.css'


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">DBFS</h1>
        </header>

        <Router/>
      </div>
    );
  }
}

export default App;
