import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../utilis';
import { Key } from 'react';

interface Product {
  _id: Key | null | undefined;
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string;
}

interface ProductState {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: File | null;
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  title: '',
  description: '',
  price: 0,
  stock: 0,
  category: '',
  images: null,
  products: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/products/product`);
      console.log("product ka sara chez");
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

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (productData: FormData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/api/products/createproduct`, productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log("addProduct called");
      alert('Product added successfully!');
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

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductData: (state, action) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.price = action.payload.price;
      state.stock = action.payload.stock;
      state.category = action.payload.category;
      state.images = action.payload.images;
    },
    resetProduct: (state) => {
      state.title = '';
      state.description = '';
      state.price = 0;
      state.stock = 0;
      state.category = '';
      state.images = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setProductData, resetProduct } = productSlice.actions;

export default productSlice.reducer;
