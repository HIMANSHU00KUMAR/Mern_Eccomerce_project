import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../utilis";

export interface authState{
    user:[],
    token:string
}


const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      token: localStorage.getItem('token'),
      isAuthenticated: !!localStorage.getItem('token'),
      isLoadingUser: false,
    },
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.token); // Store token in localStorage
          },
      clearAuth: (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token'); // Remove token from localStorage
      },
      setLoadingUser: (state, action) => {
        state.isLoadingUser = action.payload;
      },
    },
  });
  
  export const { setAuth, clearAuth ,setLoadingUser} = authSlice.actions;

  export const loadUserDetails = () => async (dispatch: (arg0: { payload: unknown; type: "auth/setAuth" | "auth/clearAuth" | "auth/setLoadingUser"; }) => void, getState: () => { (): unknown; new(): unknown; auth: { (): unknown; new(): unknown; token: unknown; }; }) => {
    dispatch(setLoadingUser(true));
    try {
      const token = getState().auth.token;
      if (token) {
        const decodedToken = jwtDecode(token);
        console.log("decoded token= ",decodedToken)
        const userId = decodedToken.id;
  
        const response = await axios.get(`${BASE_URL}/api/users/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setAuth({ user: response.data, token }));
      }
    } catch (error) {
      console.error('Failed to load user details:', error);
      dispatch(clearAuth());
    } finally {
      dispatch(setLoadingUser(false));
    }
  };
  
  export default authSlice.reducer;