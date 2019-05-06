import React, { Component } from 'react'
import './App.scss'
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom'

import LessonCreator from './containers/LessonCreator'
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect exact from="/" to="/lesson-creator" />
          <PrivateRoute exact path="/lesson-creator" component={LessonCreator} />
        </Switch>
      </Router>
    )
  }
}

export default App
