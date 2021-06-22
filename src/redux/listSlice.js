import {createSlice} from '@reduxjs/toolkit'
import {capitalize, addTask} from './helper'

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
