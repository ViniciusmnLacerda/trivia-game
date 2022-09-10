import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Config from './pages/Settings';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={Login}
        />
        <Route
          exact
          path="/game"
          component={Game}
        />
        <Route
          exact
          path="/settings"
          component={Config}
        />
        <Route
          exact
          path="/feedback"
          component={Feedback}
        />
        <Route
          exact
          path="/ranking"
          component={Ranking}
        />
      </Switch>
    );
  }
}

export default App;
