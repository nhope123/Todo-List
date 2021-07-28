import {createSlice} from '@reduxjs/toolkit'
import {removeTask} from './helper'

import taskSelection from './todo-sample'

 export const INITIAL_AUTHORED_LIST = {
  id: '',
  title: '',
  creation_date: '',
  task_list: [],
};

/**
* @constant
* @description Initial state of the list reducer
* @type {object}
* @property {array} todo_Collection - Collection of all Task List
* @property {object[]} authored_list - Task list for viewing/editing
*/
const initialState = {
  todo_Collection: [...taskSelection],
  authored_list: INITIAL_AUTHORED_LIST,
}


const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {

    deleteTaskList: {
      reducer: (state, action) =>{
        const collection = removeTask(state.todo_Collection, action.payload);
        localStorage.setItem('task-collection', JSON.stringify(collection))
        state.todo_Collection = collection;
      },
      prepare: id => {
        return {payload: id}
      }
    },

    editTaskList: {
      reducer: (state, action) =>{
        state.authored_list = action.payload;
      },
      prepare: tasklist =>{
        return { payload: tasklist }
      }
    }


  },
  extraReducers:{

  }
})

export const { deleteTaskList, editTaskList } = listSlice.actions;
export default listSlice.reducer;
