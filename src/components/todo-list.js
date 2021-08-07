import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

import TaskList from './tasklist'
import Header from './header'
import HomeScreen from './home'

class App extends Component {

  render() {
    return (
      <Router basename={'/todo-manager/'} >
        <div className={'container-fluid px-0 d-block vw-100 max-vh-100 m-0'}>
          <Header />
          <Switch >
            <Route  path={'/'} exact  component={ HomeScreen } />
              {/*<HomeScreen />*/}
            
            <Route path={'/create-list'}  component={ TaskList } />
              {/*<TaskList />*/}
            
          </Switch >
        </div >
      </Router >
    )
  }
}

export default App
