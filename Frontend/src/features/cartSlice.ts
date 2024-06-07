import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../utilis';

interface CartItem {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface CartState {
  userId: string;
  items: CartItem[];
  bill: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  userId: '',
  items: [],
  bill: 0,
  status: 'idle',
  error: null,
};

export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async ({ userId, productId, quantity }: { userId: string; productId: string; quantity: number }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/carts/addcart/${userId}`, { productId, quantity });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/carts/cart/${userId}`);
      console.log("fetchcart ka data", response.data);
      return response.data;
    } catch (error: unknown) {
      console.log("error in fetching cart items");
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async ({ userId, productId }: { userId: string; productId: string }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/carts/deletecart/${userId}/${productId}`);
      console.log("delete cART Ka data ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: (state) => {
      state.userId = '';
      state.items = [];
      state.bill = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCartItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.bill = action.payload.bill;
        state.error = null;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.bill = action.payload.bill;
        state.error = null;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.bill = action.payload.bill;
        state.error = null;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer;
