import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState, LoginCredentials, RegisterCredentials } from "@/types";
import { authService } from "@/services/authService";

export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { getState, dispatch }) => {
    const { auth } = getState() as { auth: AuthState };
    if (auth.token) {
      return dispatch(getProfile(auth.token));
    }
    return null;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      localStorage.setItem("token", response.token);
      document.cookie = `token=${response.token}; path=/`;
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      return await authService.register(credentials);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (token: string, { rejectWithValue }) => {
    try {
      return await authService.getProfile(token);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (
    userData: { name: string; email: string; gender: "male" | "female" },
    { rejectWithValue, getState }
  ) => {
    try {
      const { auth } = getState() as { auth: AuthState };
      return await authService.updateProfile(auth.token!, userData);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  return null;
});
