import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TaskList from './tasklist'
import Header from './header'

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
      <div className={'container-fluid px-0 vw-100 min-vh-100 border border-secondary'}>
        <Header />
        <div >{'New List'}</div >
        <div >



        </div >
        <div >{'Footer'}</div >





      </div >
    )
  }
}

export default App
