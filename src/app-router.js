import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';


class AppRouter extends Component {
  render() {
    return (
      <main>
        <Switch>
          { /* <Route path='/roster' component={Roster}/> */ }
          { /* <Route path='/schedule' component={Schedule}/> */ }
        </Switch>
      </main>
    );
  }
}

export default AppRouter;
