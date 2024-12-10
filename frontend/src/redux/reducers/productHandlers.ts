import { PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductState } from "@/types";

export const productHandlers = {
  clearError: (state: ProductState) => {
    state.error = null;
  },
  setSelectedProduct: (
    state: ProductState,
    action: PayloadAction<Product | null>
  ) => {
    state.selectedProduct = action.payload;
  },
};

export const pendingHandler = (state: ProductState) => {
  state.loading = true;
  state.error = null;
};

export const rejectedHandler = (
  state: ProductState,
  action: PayloadAction<string>
) => {
  state.loading = false;
  state.error = action.payload;
};
