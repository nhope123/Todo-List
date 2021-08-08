import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {v4 as uuidv4} from 'uuid';
import {TrashFill, CheckCircleFill, Circle } from 'react-bootstrap-icons';
import { capitalize } from '../resources/helper';

class Task extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.id,
      complete: this.props.complete,
      task: this.props.task,
      user_input: this.props.user_input,
      style: this.props.style,
    }
  }

  static propTypes = {
    /** Unique number */
    id: PropTypes.string,
    /** Task completion value */
    complete: PropTypes.bool,
    /** Task value */
    task: PropTypes.string,
    /** User input focus value */
    user_input: PropTypes.bool,
    /** New or edited task input value */
    new_input: PropTypes.bool,
    /** Updates the collection of tasks */
    callback: PropTypes.func,
  }

  shouldComponentUpdate(nextProps,nextState){    
    return (this.props !== nextProps || this.state !== nextState )? true : false;
  }

  /**
  * @function changeTask
  * @description This function updates the task according to user input.
  * @param {string} task - The update task string to a maxt length 0f 20 chars.  *
  */
  changeTask = event =>{
    if (event.keyCode === 13) { this.submitChanges(event,'add')  }
    else if(event.target.value.length < 30) this.setState(() => ({ task: capitalize(event.target.value) }))
  }

  /**
  * @function submitChanges
  * @description This function update the state and send the state values to the task list.
  * @param {object} event - The element action listener event.
  * @param {string} process - A string of value 'add' or 'remove' to update the task list.
  */
  submitChanges = async (event, process) =>{
    event.preventDefault()

    if (this.state.task.length >= 1) {
      if ((event.keyCode === 13 || process === 'add' || process === 'remove' || process === 'complete')  ) {
        if(process === 'remove'){
          await this.props.callback(process,this.state.id);
        }
        else {

          await  this.props.callback('add', {
                                              ...this.state,
                                              [ (process === 'complete')? 'complete': event.target.name]:
                                                 (process === 'complete')? (!this.props.complete ) : this.state.task,
                                              user_input: false,
                                            });

          (!this.props.new_input)?
            (this.setState( ()=>({
                                  id: this.props.id,
                                  complete: this.props.complete,
                                  task:this.props.task,
                                  user_input: this.props.user_input,
                                }))):
            (this.setState(()=>({
                                 id: uuidv4(),
                                 complete: false,
                                 task:'',user_input: true
                               })))
        }
      }
    }    
  }

  /**
  * @function changeElement
  * @description -This function toggles the task from input to display.
  */
  changeElement = () =>{
    this.setState(()=>({user_input: true}))
  }

  render() {
    let decoration = (this.state.complete)? {textDecoration: 'line-through'}:
                                              {textDecoration: 'none'};
    let optionDisplay = (this.state.task.length >= 1 || !this.state.user_input)?
                              {visibility: 'visible'} : {visibility: 'hidden'};

    return (
      <div id={this.state.id} data-testid={'task-component'}
          className={ `task container-fluid  rounded-pill  w-100 mb-1 `}
          style={{ color: this.state.style}}
           >

        {/* Task cotainer */}
        <form className={'row d-flex justify-content-center py-0 px-2 w-100'}
              tabIndex={'0'} data-testid={'task-form'} aria-label={'task-form'}
               onBlur={event => this.submitChanges(event, 'add')}
              onSubmit={(event)=> this.submitChanges(event, 'add') }              
              >

          {/* Completed task checkbox */}
          <div className={'col-1 d-flex justify-content-evenly align-items-center '} >
            
            < span role={'button'} tabIndex={'0'} title={''} style={ optionDisplay } name={ 'complete' } 
                   data-testid={ 'task-complete' } 
                   onClick={event=> this.submitChanges(event,'complete')} >
              {
                (this.props.complete)? <CheckCircleFill className={'fake-checkbox'} /> : <Circle className={'fake-checkbox'} />
              }
            </span> 
            
          </div >

          {/* Task input */}
          <div className={'col-9 p-0 mx-0 '} >
            { (this.state.user_input)?
              (<input  type={'text'} tabIndex={'0'} value={this.state.task}
                    name={'task'} placeholder={'Task'} className={'fs-6'}
                    title={'Input task'} data-testid={'Input task'}
                    style={ decoration }
                    onChange={(event) =>{this.changeTask(event)}}
                    onKeyPress={(event)=>{
                      if(event.keyCode === 13){
                        this.submitChanges(event, 'add')
                      }
                    }}
                  />):

              (<div tabIndex={'0'} onClick={this.changeElement} data-testid={'input-display'}
                    role={'document'} id={'input-display'} aria-label={'Input display'}
                    style={ decoration }
              >{this.state.task} </div >)
                  }
          </div >


          <div className={'col-1'} >
            <span role={'button'} title={'Delete task'} data-testid={'delete-task'}
                  style={ optionDisplay }
                  onClick={event => this.submitChanges(event,'remove')}
                  
                  >
              <TrashFill className={'trash'} role={'img'} aria-label={'Delete task'}  />
            </span >
          </div >
        </form >
      </div>
    )
  }
}

export default Task
