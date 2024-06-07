// src/features/adminProduct/adminProductSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../utilis';

interface Product {
  _id:string;
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
}

interface AdminProductState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AdminProductState = {
  products: [],
  status: 'idle',
  error: null,
};

export const fetchAdminProducts = createAsyncThunk('adminProduct/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/products/product`);
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
});

export const updateAdminProduct = createAsyncThunk(
  'adminProduct/updateProduct',
  async ({ id, productData }: { id: string; productData: Partial<Product> }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/products/updateproduct/${id}`, productData);
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

export const deleteAdminProduct = createAsyncThunk(
  'adminProduct/deleteProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${BASE_URL}/api/products/deleteproduct/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
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

const adminProductSlice = createSlice({
  name: 'adminProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateAdminProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateAdminProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(deleteAdminProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = state.products.filter(product => product.id !== action.payload.id);
        state.error = null;
      })
      .addCase(deleteAdminProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default adminProductSlice.reducer;
