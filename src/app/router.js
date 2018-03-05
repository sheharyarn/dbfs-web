import React from 'react'
import Home  from 'app/home'
import Block from 'app/block'

import {Switch, Route} from 'react-router-dom'


class AppRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/'            component={Home}  />
        <Route exact path='/block/:hash' component={Block} />
      </Switch>
    );
  }
}


export default AppRouter;
