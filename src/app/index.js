import React  from 'react'
import Router from 'app/router'
import {Link} from 'react-router-dom';

import 'app/index.css'


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to='/'>
            <h1 className="App-title">DBFS</h1>
          </Link>
        </header>

        <Router/>
      </div>
    );
  }
}

export default App;
