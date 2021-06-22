import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import moment from 'moment'

import './App.css';
import {inputChange} from './redux/listSlice'
import ListItem from './components/list-item'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      tasks: this.props.task_list,
    }
  }

  componentDidMount(){
    const time = moment().format('ddd, Do MMMM, YYYY')
    this.props.inputChange(['creation_date',time])
  }
  shouldComponentUpdate(nextProps,nextState){
    //console.log(`new list: ${JSON.stringify(nextProps.task_list)} -- old list: ${JSON.stringify(this.props.task_list)} , equal: ${nextProps.task_list !== this.props.task_list}`);
    return this.state.tasks !== this.props.task_list
  }
  static propTypes = {
    creation_date: PropTypes.string,
    inputChange: PropTypes.func,
    task_list: PropTypes.array,

  }

  render() {
    console.log(JSON.stringify(this.props.task_list));
   const createdlist = this.props.task_list.map((item,index) => {
     return (<ListItem key={index} {...item} />);
  })
console.log(JSON.stringify(this.props.task_list));

    return (
      <div className={'container-fluid d-flex flex-column justify-content-start align-items-center bg-info min-vh-100 '} >
        <div id={'item-list'} className={'container border border-1 border-primary border-radius-6 m-5 p-0 bg-white'}  >

          {/* Todo date header */}
          <div className={'header text-center align-middle text-black'}>{this.props.creation_date}</div >

          {/* Todo title */}
          <div id={'item-title'} className={'w-100 mt-3 px-4 py-2'} >
            <input id={'title-input'} className={'w-100 text-center '} type={'text'} tabIndex={'0'} value={this.props.title}
                   placeholder={'Title'} onChange={(event) =>{this.props.inputChange(['title',event.target.value])}}/>
          </div >

          {/* Todo list */}
          <div >
            { createdlist }
            {/*

              this.props.task_list.map((item,index) => {
                return (<ListItem key={index} {...item} />);
              })
            */}
          </div >


            <ListItem autoFocus {...{task:'',id:'',complete:''}} />

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
  task_list: state.todolist.todo_list,

})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    inputChange,
  },dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
