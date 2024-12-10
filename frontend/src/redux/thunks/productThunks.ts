import { createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "@/services/productService";
import { getStoredToken } from "@/utils/auth";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = getStoredToken();
      if (!token) throw new Error("No token found");
      return await productService.fetchAll(token);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const token = getStoredToken();
      if (!token) throw new Error("No token found");
      return await productService.create(token, formData);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (
    { id, formData }: { id: number; formData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const token = getStoredToken();
      if (!token) throw new Error("No token found");
      return await productService.update(token, id, formData);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const token = getStoredToken();
      if (!token) throw new Error("No token found");
      return await productService.delete(token, id);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
