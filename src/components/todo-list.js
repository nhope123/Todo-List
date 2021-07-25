import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TaskList from './tasklist'

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
      <div >
        <div >{'Todo List'}</div >
        <div >{'New List'}</div >
        <div >



        </div >
        <div >{'Footer'}</div >
        




      </div >
    )
  }
}

export default App
