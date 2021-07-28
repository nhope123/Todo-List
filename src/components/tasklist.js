import React, { Component } from 'react';
import moment from 'moment';
import {v4 as uuidv4} from 'uuid';
import Task from './task';
import {capitalize, addTask, removeTask} from '../redux/helper';
import ColorSelection from './color_selection';
import colorwheel from '../resources/colorwheel3.png';
import fontcolor from '../resources/font-color.png';

class TaskList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      creation_date: moment().format('ddd, Do MMMM, YYYY'),
      title: '',
      task_list: [],
      list_color: 'rgba( 255 , 255 , 255 , 1 )',
      font_color: 'rgba( 0 , 0 , 0 , 1 )',
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
  /*  let stateColor = this.state.list_color;
    let bgColor = `rgba(${stateColor[0]},${stateColor[1]},${stateColor[2]},${stateColor[3]})`;
    console.log('rgba('+ stateColor[0] + ','+ stateColor[1] + ',' + stateColor[2] + ',' + stateColor[3] +')'); */
    return (
      <div id={'task-list'} className={'container-fluid d-flex flex-column justify-content-center align-items-center  '} >
        <div id={'item-list'} style={{backgroundColor: this.state.list_color, color: this.state.font_color}}
            className={'container border  border-radius-6 m-5 p-0 '}
            data-testid={'list container'}>

          {/* Todo title header */}
          <div id={'item-title'} className={'header w-100  '} >
            <input id={'title-input'} className={'w-100 text-center fs-3 '}
                   type={'text'} tabIndex={'0'} value={this.state.title}
                   placeholder={'Title'} data-testid={'list-title'} title={'title'}
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
               aria-label={'creation date'} role={'document'} title={'creation'}>
              {this.state.creation_date}
          </div >

          {/* Todo list */}
          <div >
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
      </div >
    )
  }
}




export default TaskList
