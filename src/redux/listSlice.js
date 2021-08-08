import {createSlice} from '@reduxjs/toolkit'
import { updateCollection,initializeCollection, INITIAL_AUTHORED_LIST } from '../resources/helper'


/**
* @constant
* @description Initial state of the list reducer
* @type {object}
* @property {array} todo_Collection - Collection of all Task List
* @property {object[]} authored_list - Task list for viewing/editing
*/
const initialState = {
  todo_Collection: initializeCollection(),
  authored_list: INITIAL_AUTHORED_LIST,
  isButtonVisible: true,
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
        state.authored_list = JSON.parse( action.payload );
      },
      prepare: tasklist =>{
        console.log(typeof tasklist );
        
        return { payload: JSON.stringify( tasklist )}
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
    },

    setCreationButton:{
      reducer: (state, action)=>{
        state.isButtonVisible = action.payload
      },
      prepare:(bool)=> ({payload: bool})
    }



  },
  extraReducers:{

  }
})

export const { deleteTaskList, editTaskList, updateTaskList, setCreationButton } = listSlice.actions;
export default listSlice.reducer;
