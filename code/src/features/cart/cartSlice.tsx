import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  productsInCart: ProductInCart[];
  subtotal: number;
};

const initialState: CartState = {
  productsInCart: [],
  subtotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addProductToTheCart: (state, action: PayloadAction<ProductInCart>) => {
      const product = state.productsInCart.find(
        (product) => product.id === action.payload.id
      );
      if (product) {
        state.productsInCart = state.productsInCart.map((product) => {
          if (product.id === action.payload.id) {
            const newQuantity = product.quantity + action.payload.quantity;
            // Ensure we don't exceed stock
            const finalQuantity = Math.min(newQuantity, action.payload.stock);
            return {
              ...product,
              quantity: finalQuantity,
            };
          }
          return product;
        });
      } else {
        // Ensure initial quantity doesn't exceed stock
        const finalQuantity = Math.min(action.payload.quantity, action.payload.stock);
        state.productsInCart.push({
          ...action.payload,
          quantity: finalQuantity,
        });
      }
      cartSlice.caseReducers.calculateTotalPrice(state);
    },
    removeProductFromTheCart: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      state.productsInCart = state.productsInCart.filter(
        (product) => product.id !== action.payload.id
      );
      cartSlice.caseReducers.calculateTotalPrice(state);
    },
    updateProductQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      state.productsInCart = state.productsInCart.map((product) => {
        if (product.id === action.payload.id) {
          // Ensure quantity doesn't exceed stock
          const finalQuantity = Math.min(action.payload.quantity, product.stock);
          return {
            ...product,
            quantity: Math.max(1, finalQuantity), // Ensure minimum quantity is 1
          };
        }
        return product;
      });
      cartSlice.caseReducers.calculateTotalPrice(state);
    },
    calculateTotalPrice: (state) => {
      state.subtotal = state.productsInCart.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );
    },
  },
});

export const {
  addProductToTheCart,
  removeProductFromTheCart,
  updateProductQuantity,
  calculateTotalPrice,
} = cartSlice.actions;

export default cartSlice.reducer;
