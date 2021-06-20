import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {v4 as uuidv4} from 'uuid'

import {updateTask } from '../redux/listSlice'
import {capitalize} from '../redux/helper'

class ListItem extends Component{
  constructor(props){
    super(props)
    this.state = (this.props.id !== '')? ({id: this.props.id, complete: this.props.complete, task: this.props.task,}):
                                          ({id: uuidv4(), complete:false,task:'',})


  }

  static propTypes = {
    updateTask: PropTypes.func,
  }

  componentDidMount(){
    if(this.props.id !== ''){
      console.log(`componentDidMount: id- ${this.props.id}, complete- ${this.props.complete}, task-${this.props.task}`);
      this.setState({
        id: this.props.id,
        complete: this.props.complete,
        task: this.props.task,
      })
    }else{
      this.setState({id:uuidv4()})
    }
  }

  /* Update the checkbox value */
  setChecked = e =>{
    this.setState({complete: e.target.checked})
  }
  /* Update the task state */
  changeTask = (name,value) =>{
    this.setState({[name]: (name === 'task')? capitalize(value) : value})
  }
  submitChanges = e =>{
    if(e.charCode === 13 && this.state.task.length >= 1){
      //console.log('in kkeypress');
      this.props.updateTask(this.state)
      this.setState({id: uuidv4(),complete:false,task:'',})
    }
  }

  render(){

    /*if(this.props.id !== ''){
      console.log(`componentDidMount: id- ${this.props.id}, complete- ${this.props.complete}, task-${this.props.task}`);
      this.setState(
    }else{
      this.setState({id:uuidv4()})
    }*/





    //console.log(`id: ${this.state.id}`);
    return (
      <div className={' task container-fluid  rounded-pill  w-100'} >

      {/* Task cotainer */}
        <form className={'row d-flex justify-content-center py-0 px-2 w-100'}
              tabIndex={'0'} onKeyPress={event => {this.submitChanges(event)}}
              onSubmit={(event)=> event.preventDefault()}  >

          {/* Completed task checkbox */}
          <div className={'col-1 d-flex justify-content-evenly align-items-center '} >
            <input tabIndex={'0'} type={'checkbox'} name={'complete'}
            checked={this.state.complete} title={'Task completed'}
            style={(this.state.task.length >= 1)? {visibility: 'visible'} : {visibility: 'hidden'} }
            onChange={(event) =>{this.changeTask(event.target.name,event.target.checked)}} />
          </div >

          {/* Task input */}
          <div className={'col-9 p-0 mx-0 '} >
            <input  type={'text'} tabIndex={'0'} value={this.state.task}
                    name={'task'} placeholder={'Task'} className={'fs-6'}
                    title={'Input task'} style={(this.state.complete)? {textDecoration: 'line-through'}:{textDecoration: 'none'}}
                    onChange={(event) =>{this.changeTask(event.target.name,event.target.value)}}
                    onBlur={event => {this.submitChanges(event)}}
                    />
          </div >


          <div className={'col-1'} >
            <span role={'button'}>&#65049;</span >
          </div >
        </form >
      </div>
    )
  }
}

const mapStateToProps = (state) => ({


})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateTask,
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps) (ListItem);
