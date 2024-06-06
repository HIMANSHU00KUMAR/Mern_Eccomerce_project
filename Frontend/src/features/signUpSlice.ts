import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface signUpState{
    name:string,
    email:string,
    password:string
} 

const signUpSlice = createSlice({
    name: 'signUp',
    initialState: {
      name: '',
      email: '',
      password: ''
    },
    reducers: {
      setName: (state, action:PayloadAction<string>) => {
        state.name = action.payload;
      },
      setEmail: (state, action:PayloadAction<string>) => {
        state.email = action.payload;
      },
      setPassword: (state, action:PayloadAction<string>) => {
        state.password = action.payload;
      },
      resetForm: (state) => {
        state.name = '';
        state.email = '';
        state.password = '';
      }
    }
  });
  
  export const { setName, setEmail, setPassword, resetForm } = signUpSlice.actions;
  
  export default signUpSlice.reducer;