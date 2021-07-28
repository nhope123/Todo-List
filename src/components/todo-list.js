import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

import TaskList from './tasklist'
import Header from './header'
import HomeScreen from './home'

class App extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <Router >
        <div className={'container-fluid px-0 d-block vw-100 min-vh-100 border border-secondary'}>
          <Header />
          <Switch >
            <Route exact path={'/'} >
              <HomeScreen />
            </Route >
            <Route path={'/create-list'} >
              <TaskList />
            </Route >
          </Switch >
        </div >
      </Router >
    )
  }
}

export default App
