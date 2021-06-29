import React, { Component } from 'react'
import {v4 as uuidv4} from 'uuid'
import {capitalize} from '../redux/helper'

class ListItem extends Component {
  constructor(props) {
    super(props)

    this.state = (this.props.id !== '')?
                ({id: this.props.id, complete: this.props.complete,
                  task: this.props.task, user_input: false, delete: false}):
                ({id: uuidv4(), complete:false,task:'',user_input: true, delete:false})

    this.setChecked = this.setChecked.bind(this)
    this.changeTask = this.changeTask.bind(this)
    this.submitChanges = this.submitChanges.bind(this)
    this.changeElement = this.changeElement.bind(this)
  }



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
      this.props.callback('add',this.state);
      (!this.props.new_input)?
      (this.setState({id: this.state.id,complete: this.state.complete,task:this.state.task,user_input: false})):
      (this.setState({id: uuidv4(),complete: '',task:'',user_input: true}))

    }
  }
  changeElement = () =>{
    this.setState({user_input: true})
  }
  deleteItem = ()=>{
    this.setState({delete: true})
  }

/*
  bug: need an item for updating the task and a separate item for creatingthe task


*/





  render() {
  //  console.log(JSON.stringify(this.state));
    return (
      <div id={this.state.id} className={ `task container-fluid  rounded-pill  w-100 ${(!this.state.delete)?'d-block':'d-none'}`} >

      {/* Task cotainer */}
        <form className={'row d-flex justify-content-center py-0 px-2 w-100'}
              tabIndex={'0'} onKeyPress={event => {this.submitChanges(event)}}
              onSubmit={(event)=> event.preventDefault()}  >

          {/* Completed task checkbox */}
          <div className={'col-1 d-flex justify-content-evenly align-items-center '} >
            <input tabIndex={'0'} type={'checkbox'} name={'complete'}
            checked={this.state.complete} title={'Task completed'}
            style={(this.state.task.length >= 1 || !this.state.user_input)? {visibility: 'visible'} : {visibility: 'hidden'} }
            onChange={(event) =>{this.changeTask(event.target.name,event.target.checked)}} />
          </div >

          {/* Task input */}
          <div className={'col-9 p-0 mx-0 '} >
            { (this.state.user_input)?
              (<input  type={'text'} tabIndex={'0'} value={this.state.task}
                    name={'task'} placeholder={'Task'} className={'fs-6'}
                    title={'Input task'} style={(this.state.complete)? {textDecoration: 'line-through'}:{textDecoration: 'none'}}
                    onChange={(event) =>{this.changeTask(event.target.name,event.target.value)}}
                    onBlur={event => this.submitChanges(event)}  />):
              (<div tabIndex={'0'} onClick={this.changeElement}>{this.state.task} </div >)
                  }
          </div >


          <div className={'col-1'} >
            <span role={'button'}
                  style={(this.state.task.length >= 1 || !this.state.user_input)? {visibility: 'visible'} :
                        {visibility: 'hidden'} }
                  onClick={this.deleteItem}
                  >&#65049;
            </span >
          </div >
        </form >
      </div>
    )
  }
}

export default ListItem
