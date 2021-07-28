import {createSlice} from '@reduxjs/toolkit'
import {removeTaskList} from './helper'

import taskSelection from './todo-sample'

/**
* @constant
* @description Initial state of the list reducer
* @type {object}
* @property {string} creation_date - Date the Todo list was created
* @property {string} title - The title of the Todo list
* @property {object[]} todo_list - An array of task objects
*/
const initialState = {
  todo_Collection: [...taskSelection],
}


const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    deleteTaskList: {
      reducer: (state, action) =>{
        state.todo_Collection = removeTaskList(state.todo_Collection, action.payload)
      },
      prepare: id => {
        return {payload: id}
      }
    }



  },
  extraReducers:{

  }
})

export const { deleteTaskList } = listSlice.actions;
export default listSlice.reducer;
