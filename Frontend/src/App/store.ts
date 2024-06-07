import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from '../features/signUpSlice'
import signInReducer from '../features/signInSlice'
import authReducer from '../features/authSlice';
import productReducer from '../features/productSlice';
import cartReducer from '../features/cartSlice';
import adminProductReducer from '../features/adminProductSlice';

export const store=configureStore({
    reducer:{
        signUp: signUpReducer,
        signIn:signInReducer,
        product: productReducer,
        auth:authReducer,
        cart:cartReducer,
        adminProduct:adminProductReducer,
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch