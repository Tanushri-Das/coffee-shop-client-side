// src/redux/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // If the item already exists in the cart, increase the quantity
        existingItem.quantity += 1;
      } else {
        // Otherwise, add a new item with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount += action.payload.price; // Update total amount
    },
    increaseQuantity: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity by 1
        state.totalAmount += existingItem.price; // Update total amount
      }
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1; // Decrease quantity by 1
          state.totalAmount -= existingItem.price; // Update total amount
        }
        // If quantity is 1, do nothing (do not remove the item)
      }
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.totalAmount -= state.items[index].price * state.items[index].quantity; // Update total amount
        state.items.splice(index, 1); // Remove item from cart
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0; // Reset total amount
    },
  },
});

export const {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
