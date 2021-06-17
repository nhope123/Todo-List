import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  creation_date: '',
  title: '',
  todo_list:[],
}

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    creationDate: {
      reducer: (state,action)=>{
        state.creation_date = action.payload
      },
      prepare: (value) =>{
        return {payload: value};
      },
    },
    inputChange: {
      reducer: (state,action) =>{
        state.title = (action.payload.length < 25)? action.payload : state.title 
      },
      prepare: value =>{
        return {payload: value};
      },
    },
  },
  extraReducers:{

  }
})

export const {creationDate,inputChange} = listSlice.actions;
export default listSlice.reducer;
