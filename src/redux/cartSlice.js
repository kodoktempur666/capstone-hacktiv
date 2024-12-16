import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';




const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    reduceQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } 
        else if (item.quantity === 1) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
      state.total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    
    addMoreQuantity(state, action) {
      const cartData = JSON.parse(localStorage.getItem('cart')) || {}; 
      const itemFromStorage = cartData[action.payload]; 
      const maxQuantity = itemFromStorage?.quantity || 0; 
    
      const item = state.items.find((item) => item.id === action.payload); 
      if (item) {
        if (item.quantity < maxQuantity) {
          item.quantity += 1;
        } else {
          toast.warn("Cannot add more, maximum quantity reached.");
        }
      }
      state.total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },

    deleteAll(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, removeItem, reduceQuantity, addMoreQuantity, deleteAll } = cartSlice.actions;
export default cartSlice.reducer;
