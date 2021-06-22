import {createSlice} from '@reduxjs/toolkit'
import {capitalize, addTask} from './helper'

/**
* @constant
* @description Initial state of the list reducer
* @type {object}
* @property {string} creation_date - Date the Todo list was created
* @property {string} title - The title of the Todo list
* @property {object[]} todo_list - An array of task objects
*/
const initialState = {
  creation_date: '',
  title: '',
  todo_list:[],
}


const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {

    /**
    * @function inputChange
    * @description An action which takes an array containing a string label and a new value.
    * @param {string[]} value Contains two properties to update the state.
    * @property {string} value[0] - The first element is a string label identifying
    * the state to be updated (creation_date or title state).
    * @property {string} value[1] -The second element is a string value of a title
    * or the creation date of the list.
    * @example
    * inputChange(['creation_date','Thur, 14th Jan, 2021']);
    */
    inputChange: {
      reducer: (state,action) =>{
        state.[action.payload[0]] = (action.payload[0] === 'title' && action.payload[1].length < 25)?
                                      capitalize(action.payload[1]) : action.payload[1]
      },
      prepare: value =>{
        return {payload: value};
      },
    },

    /**
    * @function updateTask
    * @description An action which takes an object containing a task and add it to the list of created tasks.
    * @param {object} value Contains three properties to update the state.
    * @property {number} id - A unique uuid number.
    * @property {bool} complete - The task completion status.
    * @property {string} task - The task to be added to the task list.
    * @example
    * updateTask({id: 2362, complete: true, task: 'Read a book'})
    */
    updateTask: {
      reducer: (state,action)=>{
        state.todo_list = addTask(state.todo_list,action.payload)
      },
      prepare: (value)=>{
        return {payload: value};
      },
    }
  },
  extraReducers:{

  }
})

export const {inputChange,updateTask} = listSlice.actions;
export default listSlice.reducer;
