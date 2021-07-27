import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Footer from './footer'

class HomeScreen extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <main className={'container-fluid px-0 min-vh-100'} >
        <div className={'container-lg '}>

        </div >

      <Footer />
      </main >
    )
  }
}

export default HomeScreen
