import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {PlusCircleFill} from 'react-bootstrap-icons';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Footer from './footer'
import Card from './card'
import { INITIAL_AUTHORED_LIST, editTaskList} from '../redux/listSlice'


class HomeScreen extends Component {
  static propTypes = {
    collection: PropTypes.array,
  }

  render() {
    return (
      <main className={'container-fluid p-0  '} >
        <div id={'display'}  className={'container-lg d-flex flex-row flex-wrap position-relative py-3 g-5 align-items-start justify-content-center '}>

          {/* Create list button */}
          <Link to={'/create-list'} onClick={()=> this.props.editTaskList(INITIAL_AUTHORED_LIST)} >
            <button type={'button'} tabIndex={'0'}
                    className={'create-list-button   p-0'} >
              <PlusCircleFill className={'fs-1 m-0 p-0'} role={'img'} aria-label={'Create a new Todo list'}  />
            </button >
          </Link >

          {/* List of cards */}
          {this.props.collection.map((item, index) => {
            return (
              <Link to={'/create-list'} key={item.id} className={'text-decoration-none'}
                    onClick={()=> this.props.editTaskList(item)} >
                <Card  {...item} />
              </Link >
            )
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
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
