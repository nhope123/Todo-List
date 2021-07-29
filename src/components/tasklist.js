  import React, { Component } from 'react';
import moment from 'moment';
import {v4 as uuidv4} from 'uuid';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Task from './task';
import ListOptions from './list-option';
import {capitalize, addTask, removeTask} from '../redux/helper';
import ColorSelection from './color_selection';
import colorwheel from '../resources/colorwheel3.png';
import fontcolor from '../resources/font-color.png';

class TaskList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: uuidv4(),
      creation_date: moment().format('ddd, Do MMMM, YYYY'),
      title: '',
      task_list: [],
      list_color: 'rgba( 255 , 255 , 255 , 1 )',
      font_color: 'rgba( 0 , 0 , 0 , 1 )',
    }

  }

  componentDidMount(){
    if(this.props.id !== ''){

      this.setState((state)=>({
        id: this.props.id,
        creation_date: this.props.creation_date,
        title: this.props.title,
        task_list: this.props.task_list,
        list_color: this.props.list_color,
        font_color: this.props.font_color,
      }))

    }
  }

  shouldComponentUpdate(nextProps,nextState){
    return ((this.state.font_color !== nextState.font_color) || (this.state.task_list.length !== nextState.task_list.length) ||this.state !== nextState)? true : false;
  }

  /**
  * @function updateTitle
  * @description This function updates the task title state.
  * @param {string} value A string of less than 20 char.
  */
  updateTitle =(value)=>{
    if (value.length < 21) this.setState(() =>({title: capitalize(value) }))
  }

  /**
  * @function updateTask
  * @description This function updates the task in the task list.
  * @param {object} value
  *
  */
  updateTask =  (process,value) =>{
      if(process === 'add'){
        this.setState( state => ({task_list: addTask(state.task_list,value)}))
      }
      else if (process === 'remove'){
        this.setState( state => ({task_list: removeTask(state.task_list, value)}))
      }
  }

  /**
  * @function colorChange
  * @description This function sets the color of the task sheet background color.
  * @param {string} color - A color value
  */
  backgroundColorChange = (color) =>{
    //console.log(`2. Task list Color - change: ${JSON.stringify(color)}`);
    this.setState(()=>({list_color: color}))
  }
  /**
  * @function colorChange
  * @description This function sets the color of the task sheet background color.
  * @param {string} color - A color value
  */
  fontColorChange = (color) =>{
    //console.log(`2. Task list Color - change: ${JSON.stringify(color)}`);
    this.setState(()=>({font_color: color}))
  }


  render() {

    return (
      <div id={'task-list'} className={'container-fluid d-flex flex-column justify-content-center align-items-center  '} >
        <div id={'item-list'} style={{backgroundColor: this.state.list_color, color: this.state.font_color}}
            className={'container border  border-radius-6 m-5 p-0 '}
            data-testid={'list container'}>

          {/* Todo title header */}
          <div id={'item-title'} className={'header w-100  '} >
            <input id={'title-input'} className={'w-100 text-center fs-3 '}
                   type={'text'} tabIndex={'0'} value={this.state.title}
                   placeholder={'Title'} data-testid={'list-title'} title={'Title'}
                   onChange={(event) =>{this.updateTitle(event.target.value)}}/>

            <div  className={'color-choices'}>
              <ColorSelection {...{callback:this.backgroundColorChange,color: this.state.list_color,
                                 image: colorwheel, alt:'Colorwheel with 6 different colors' }} />
              <ColorSelection {...{callback:this.fontColorChange,color: this.state.font_color,
                                 image: fontcolor, alt:'light blue capital A with red underline' }} />
            </div >
          </div >

          {/* Todo date */}
          <div id={'date'} className={'text-center align-middle mt-1 fst-italic'}
               aria-label={'creation date'} role={'document'} title={'Creation date'}>
              {this.state.creation_date}
          </div >

          {/* Todo list */}
          <div className={'overflow-auto'} >
            {
              this.state.task_list.map((item,index) => {
                  return (
                          <Task key={item.id} {...item} callback={this.updateTask}
                                user_input={false} new_input={false} />
                          );
              })
             }
          </div >

          {/* Intial input task */}
          <Task autoFocus {...{
                                id: uuidv4(), complete: false, task:'',
                                user_input: true, callback: this.updateTask,
                                new_input: true,
                              }} />
        </div >

        <ListOptions list={this.state} />
      </div >
    )
  }
}

const mapStateToProps = state =>{
  return {
    id: state.todolist.authored_list.id,
    creation_date: state.todolist.authored_list.creation_date,
    title: state.todolist.authored_list.title,
    task_list: state.todolist.authored_list.task_list,
    list_color: state.todolist.authored_list.list_color,
    font_color: state.todolist.authored_list.font_color,
  }
}


export default connect(mapStateToProps)(TaskList)
