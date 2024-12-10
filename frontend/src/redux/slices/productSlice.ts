import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductState } from "@/types";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/redux/thunks/productThunks";
import { productHandlers, pendingHandler } from "../reducers/productHandlers";

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

const rejectedHandler = (
  state: ProductState,
  action: PayloadAction<unknown>
) => {
  state.loading = false;
  state.error = action.payload as string;
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: productHandlers,
  extraReducers: (builder) => {
    // Fetch Products
    builder
      .addCase(fetchProducts.pending, pendingHandler)
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, rejectedHandler);

    // Create Product
    builder
      .addCase(createProduct.pending, pendingHandler)
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.products.unshift(action.payload);
        }
      )
      .addCase(createProduct.rejected, rejectedHandler);

    // Update Product
    builder
      .addCase(updateProduct.pending, pendingHandler)
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<{ product: Product }>) => {
          state.loading = false;
          const index = state.products.findIndex(
            (p) => p.id === action.payload.product.id
          );
          if (index !== -1) {
            state.products[index] = action.payload.product;
          }
        }
      )
      .addCase(updateProduct.rejected, rejectedHandler);

    // Delete Product
    builder
      .addCase(deleteProduct.pending, pendingHandler)
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.products = state.products.filter(
            (p) => p.id !== action.payload
          );
        }
      )
      .addCase(deleteProduct.rejected, rejectedHandler);
  },
});

export const { clearError, setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
