import { PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/types/index";

export const authHandlers = {
  clearError: (state: AuthState) => {
    state.error = null;
  },
  logout: (state: AuthState) => {
    state.user = null;
    state.token = null;
    state.error = null;
  },
};

export const pendingHandler = (state: AuthState) => {
  state.loading = true;
  state.error = null;
};

export const rejectedHandler = (
  state: AuthState,
  action: PayloadAction<string>
) => {
  state.loading = false;
  state.error = action.payload;
};
