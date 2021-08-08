import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Footer from './footer'
import Card from './card'
import { setCreationButton } from '../redux/listSlice'



class HomeScreen extends Component {
  static propTypes = {
    /** List of Card component values */
    collection: PropTypes.array,
    /** Toogle CreateList component visibility  */
    callback: PropTypes.func,
  }

  componentDidMount(){
    if( ! window.location.href.includes('create-list')){
      this.props.callback(true)
    }    
  }

  render() {

    return (
      <main className={'container-fluid p-0  '} >
        <div id={'display'}  className={'container-lg d-flex flex-row flex-wrap position-relative py-3 g-5 align-items-start justify-content-center '}>

          {/* List of cards */}
          { this.props.collection.map((item, index) => {
              return ( <Card key={item.id} {...item} />  )
            }) 
          }

        </div >

        <Footer />
      </main >
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    collection: state.todolist.todo_Collection,
  }
}

const mapDispatchToProps = dispatch =>{
  return bindActionCreators({ 
    callback: setCreationButton,
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
