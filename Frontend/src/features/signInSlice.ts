import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface signInState{
    email:string,
    password:string
} 


const signInSlice = createSlice({
    name: 'signIn',
    initialState: {
      email: '',
      password: ''
    },
    reducers: {
      setEmail: (state, action:PayloadAction<string>) => {
        state.email = action.payload;
      },
      setPassword: (state, action:PayloadAction<string>) => {
        state.password = action.payload;
      },
      resetForm: (state) => {
        state.email = '';
        state.password = '';
      }
    }
  });
  
  export const { setEmail, setPassword, resetForm } = signInSlice.actions;
  
  export default signInSlice.reducer;
