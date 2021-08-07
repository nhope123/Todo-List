import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Footer from './footer'
import Card from './card'
import { editTaskList, setCreationButton } from '../redux/listSlice'



class HomeScreen extends Component {
  static propTypes = {
    collection: PropTypes.array,
  }

  componentDidMount(){
    if( ! window.location.href.includes('create-list')){
      this.props.setCreationButton(true)
    }
    
  }

  render() {

    return (
      <main className={'container-fluid p-0  '} >
        <div id={'display'}  className={'container-lg d-flex flex-row flex-wrap position-relative py-3 g-5 align-items-start justify-content-center '}>

          {/* List of cards */}
          {this.props.collection.map((item, index) => {
            return ( <Card key={item.id} {...item} />  )
          })}

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
    editTaskList,
    setCreationButton,
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
