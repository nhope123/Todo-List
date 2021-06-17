import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import moment from 'moment'

import './App.css';
import {creationDate, inputChange} from './redux/listSlice'
import ListItem from './components/list-item'


class App extends Component {

  componentDidMount(){
    const time = moment().format('ddd, Do MMMM, YYYY')
    this.props.creationDate(time)
  }
  static propTypes = {
    creation_date: PropTypes.string,
    creationDate: PropTypes.func,
    inputChange: PropTypes.func,

  }

  render() {
  /*  const createdlist = this.props.todo_list.map((item) => {

  })*/
    return (
      <div className={'container-fluid d-flex flex-column justify-content-center align-items-center bg-info min-vh-100 '} >
        <div className={'container-md border-'} style={{padding:20}}>
          {/* Todo date header */}
          <div >
          {this.props.creation_date}
          </div >
          {/* Todo title */}
          <div >
            <input id={'todo-title'} type={'text'} tabIndex={'0'} value={this.props.title}
                   placeholder={'title'} onChange={(event) =>{this.props.inputChange(event.target.value)}}/>
          </div >
          {/* Todo list */}
          <div >
            <ListItem {...{task:'cook food',key:1}} />
          </div >
          {/* Item input *}
          <div >
            <input id={'todo-title'} type={'text'} tabIndex={'0'} value={this.props.title}
                   placeholder={'title'} onChange={(event) =>{this.props.inputChange(event.target.value)}}/>
          </div > */}
        </div >
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  creation_date: state.todolist.creation_date,
  title: state.todolist.title,

})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    creationDate,
    inputChange,
  },dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
