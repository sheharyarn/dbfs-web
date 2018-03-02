import React  from 'react'
import Router from 'app/router'
import {Link} from 'react-router-dom';


class App extends React.Component {
  renderHeader() {
    return (
      <section className='hero is-primary'>
        <div className='hero-body'>
          <div className='container'>

            <Link to='/'>
              <h1 className='title'>DBFS</h1>
            </Link>

          </div>
        </div>
      </section>
    );
  }

  render() {
    return (
      <div className="dbfs-app">
        { this.renderHeader() }

        <section className='section'>
          <div className='container'>
            <Router/>
          </div>
        </section>

      </div>
    );
  }
}

export default App;
