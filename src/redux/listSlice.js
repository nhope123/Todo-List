import {createSlice} from '@reduxjs/toolkit'
import {removeTask, updateCollection,initializeCollection, INITIAL_AUTHORED_LIST} from './helper'

import taskSelection from './todo-sample'



/**
* @constant
* @description Initial state of the list reducer
* @type {object}
* @property {array} todo_Collection - Collection of all Task List
* @property {object[]} authored_list - Task list for viewing/editing
*/
const initialState = {
  todo_Collection: JSON.parse(initializeCollection()),
  authored_list: INITIAL_AUTHORED_LIST,
}

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {

    deleteTaskList: {
      reducer: (state, action) =>{

        state.todo_Collection = updateCollection(state.todo_Collection, action.payload, 'delete-list');
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
    },

    updateTaskList:{
      reducer: (state, action) =>{
        if(action.payload[1] === 'add-list'){

          state.todo_Collection = updateCollection(state.todo_Collection, action.payload[0], action.payload[1]);
        }

        state.authored_list = INITIAL_AUTHORED_LIST;
      },
      prepare: (value, option) =>{
        return {payload: [value, option]}
      }
    }


  },
  extraReducers:{

  }
})

export const { deleteTaskList, editTaskList, updateTaskList } = listSlice.actions;
export default listSlice.reducer;
