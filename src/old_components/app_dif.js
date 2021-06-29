import React, { Component } from 'react'
import moment from 'moment'

import ListItem from './item_dif'
import {addTask, removeTask} from '../redux/helper'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      creation_date: moment().format('ddd, Do MMMM, YYYY'),
      title: '',
      task_list: [],

    }
    this.updateTask = this.updateTask.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
  }

  updateTask = (process,value) =>{
    console.log(`value: ${JSON.stringify(value)}`);
    //console.log(`value: ${JSON.stringify(addTask(this.state.task_list,value))}`);

    this.setState({task_list: (process === 'add')?
                              addTask(this.state.task_list,value):
                              removeTask(this.state.task_list,value)
                            })

  }
  updateTitle = value =>{
    this.setState({title: value})
  }

  render() {
    //console.log(`list ${JSON.stringify(this.state.task_list)}`);
    const createdlist = this.state.task_list.map((item,index) => {
      return (<ListItem key={index} {...item} callback={this.updateTask} new_input={false} />);
   })
   console.log(` list: ${JSON.stringify(this.state.task_list)}`);
    return (
      <div className={'container-fluid d-flex flex-column justify-content-start align-items-center bg-info min-vh-100 '} >
        <div id={'item-list'} className={'container border border-1 border-primary border-radius-6 m-5 p-0 bg-white'}  >

          {/* Todo date header */}
          <div className={'header text-center align-middle text-black'}>{this.state.creation_date}</div >

          {/* Todo title */}
          <div id={'item-title'} className={'w-100 mt-3 px-4 py-2'} >
            <input id={'title-input'} className={'w-100 text-center '} type={'text'} tabIndex={'0'} value={this.state.title}
                   placeholder={'Title'} onChange={(event) =>{this.updateTitle(event.target.value)}}/>
          </div >

          {/* Todo list */}
          <div >
            { createdlist }

          </div >


            <ListItem autoFocus {...{task:'',id:'',complete: false,callback: this.updateTask,new_input: true}} />


        </div >
      </div>
    )
  }
}

export default App
