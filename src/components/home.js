import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {v4 as uuidv4} from 'uuid'

import Footer from './footer'
import Card from './card'
import taskSelection from './helper-list'
import TaskList from './tasklist'


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
      <main className={'container-fluid p-0  '} >
        <div id={'display'}  className={'container-lg d-flex flex-row flex-wrap py-3 g-5 align-items-start justify-content-center '}>
          {taskSelection.map((item, index) => {
            return (<Card key={index} {...item} />)
          })}
          {/*<Card />*/}
          {/*<TaskList />*/}
        </div >

      <Footer />
      </main >
    )
  }
}

export default HomeScreen
