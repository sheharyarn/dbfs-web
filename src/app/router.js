import React from 'react'
import Home  from 'app/home'

import {Switch, Route} from 'react-router-dom'


class AppRouter extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          { /* <Route path='/roster' component={Roster}/> */ }
          { /* <Route path='/schedule' component={Schedule}/> */ }
        </Switch>
      </main>
    );
  }
}

export default AppRouter;
