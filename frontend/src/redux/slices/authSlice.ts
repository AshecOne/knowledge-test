import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "@/types";
import {
  initializeAuth,
  login,
  register,
  getProfile,
  updateProfile,
  logout,
} from "@/redux/thunks/authThunks";
import { getStoredToken } from "@/utils/auth";
import {
  authHandlers,
  pendingHandler,
  rejectedHandler,
} from "../reducers/authHandlers";

interface LoginPayload {
  user: User;
  token: string;
}

interface UpdateProfilePayload {
  user: User;
}

const initialState: AuthState = {
  user: null,
  token: getStoredToken(),
  loading: false,
  error: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: authHandlers,
  extraReducers: (builder) => {
    const addCommonCases = <T>(
      thunkAction: { pending: any; fulfilled: any; rejected: any },
      fulfillHandler: (state: AuthState, action: PayloadAction<T>) => void
    ) => {
      builder
        .addCase(thunkAction.pending, pendingHandler)
        .addCase(thunkAction.fulfilled, fulfillHandler)
        .addCase(thunkAction.rejected, rejectedHandler);
    };

    // Initialize
    addCommonCases<void>(initializeAuth, (state) => {
      state.loading = false;
      state.initialized = true;
    });

    // Login
    addCommonCases<LoginPayload>(login, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });

    // Register
    addCommonCases<void>(register, (state) => {
      state.loading = false;
      state.error = null;
    });

    // Get Profile
    addCommonCases<User>(getProfile, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });

    // Update Profile
    addCommonCases<UpdateProfilePayload>(updateProfile, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.initialized = false;
    });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
