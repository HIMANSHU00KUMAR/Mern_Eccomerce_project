import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../utilis";
import { RootState } from "../App/store";

export interface User {
  _id: string;
  email: string;
  isAdmin: boolean;
  name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoadingUser: boolean;
}

interface SetAuthPayload {
  user: User;
  token: string;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoadingUser: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<SetAuthPayload>) => {
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
    setLoadingUser: (state, action: PayloadAction<boolean>) => {
      state.isLoadingUser = action.payload;
    },
  },
});

export const { setAuth, clearAuth, setLoadingUser } = authSlice.actions;

export const loadUserDetails = () => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(setLoadingUser(true));
  try {
    const token = getState().auth.token;
    if (token) {
      const decodedToken: { id: string } = jwtDecode(token);
      console.log("decoded token= ", decodedToken);
      const userId = decodedToken.id;
      console.log("user id from auth = ", userId);

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