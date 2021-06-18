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
    inputChange: {
      reducer: (state,action) =>{
        state.[action.payload[0]] = (action.payload[0] === 'title' && action.payload[1].length < 25)?
                                      capitalize(action.payload[1]) : action.payload[1]
      },
      prepare: value =>{
        return {payload: value};
      },
    },
    updateTask: {
      reducer: (state,action)=>{
        state.todo_list = addTask(state.todo_list,action.payload)
      },
      prepare: (value)=>{
        console.log(JSON.stringify(value));
        return {payload: value};
      },
    }
  },
  extraReducers:{

  }
})

export const {inputChange,updateTask} = listSlice.actions;
export default listSlice.reducer;
