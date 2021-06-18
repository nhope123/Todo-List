import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  creation_date: '',
  title: '',
  todo_list:[],
}

export const capitalize = aString => {
  return (aString.length > 0)?
                    (aString[0].toUpperCase()+ aString.slice(1,)): aString
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
        state.todo_list = [...state.todo_list,action.payload]
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
