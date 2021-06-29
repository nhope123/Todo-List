import React, { Component } from 'react'
import PropTypes from 'prop-types';


import { capitalize } from '../redux/helper';

class Task extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props)

    this.state = {
      id: this.props.id,
      complete: this.props.complete,
      task: this.props.task,
      user_input: this.props.user_input,
      //delete: this.props.delete,
    }

    this.changeTask = this.changeTask.bind(this)
    this.submitChanges = this.submitChanges.bind(this)
    this.changeElement = this.changeElement.bind(this)
  }

  /**
  * @function changeTask
  * @description This function updates the task according to user input.
  * @param {string} task - The update task string to a maxt length 0f 20 chars.  *
  */
  changeTask = task =>{
    if(task.length < 30) this.setState({ task: capitalize(task) })
  }

  /**
  * @function submitChanges
  * @description This function update the state and send the state values to the task list.
  * @param {object} event - The element action listener event.
  * @param {string} process - A string of value 'add' or 'remove' to update the task list.
  */
  submitChanges = (event, process) =>{
  /*  console.log(`${event.target.name} ${ (event.target.name === 'complete')?
                        event.target.checked: this.state.task}`); */

    if ((event.charCode === 13 && this.state.task.length >= 1 ) ) {
      if(process === 'remove'){
        this.props.callback(process,this.state.id)
      }else {
        this.props.callback(process,{
          ...this.state,
          [event.target.name]: (event.target.name === 'complete')?
                              event.target.checked: this.state.task,
          user_input: false,
        })
      }
      (!this.props.new_input)?
      (this.setState({id: this.state.id,complete: this.state.complete,task:this.state.task,user_input: this.props.user_input,})):
      (this.setState({id: '',complete: '',task:'',user_input: true}))
    }
  }

  changeElement = () =>{
    this.setState({user_input: true})
  }

  render() {
    console.log(`state: ${JSON.stringify(this.state)}`);
    return (
      <div id={this.state.id} className={ `task container-fluid  rounded-pill  w-100 `} >

        {/* Task cotainer */}
        <form className={'row d-flex justify-content-center py-0 px-2 w-100'}
              tabIndex={'0'} onKeyPress={event => this.submitChanges(event, 'add')}
              onSubmit={(event)=> event.preventDefault()}  >

          {/* Completed task checkbox */}
          <div className={'col-1 d-flex justify-content-evenly align-items-center '} >
            <input tabIndex={'0'} type={'checkbox'} name={'complete'}
            checked={this.state.complete} title={'Task completed'}
            style={(this.state.task.length >= 1 || !this.state.user_input)? {visibility: 'visible'} : {visibility: 'hidden'} }
            onChange={event => this.submitChanges(event, 'add')}
             />
          </div >

          {/* Task input */}
          <div className={'col-9 p-0 mx-0 '} >
            { (this.state.user_input)?
              (<input  type={'text'} tabIndex={'0'} value={this.state.task}
                    name={'task'} placeholder={'Task'} className={'fs-6'}
                    title={'Input task'} style={(this.state.complete)? {textDecoration: 'line-through'}:{textDecoration: 'none'}}
                    onChange={(event) =>{this.changeTask(event.target.value)}}
                    onBlur={event => this.submitChanges(event, 'add')}

                     />):

              (<div tabIndex={'0'} onClick={this.changeElement}>{this.state.task} </div >)
                  }
          </div >


          <div className={'col-1'} >
            <span role={'button'}
                  style={(this.state.task.length >= 1 || !this.state.user_input)? {visibility: 'visible'} :
                        {visibility: 'hidden'} }
                  onClick={event => this.submitChanges(event,'remove')}
                  >&#65049;
            </span >
          </div >
        </form >
      </div>
    )
  }
}

export default Task
