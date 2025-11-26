import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // كل منتجات الكارت
  totalQty: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const exist = state.items.find((item) => item._id === product._id);

      if (exist) {
        exist.qty += product.qty || 1;
      } else {
        state.items.push({ ...product, qty: product.qty || 1 });
      }

      // تحديث العدد الإجمالي والسعر الكلي
      state.totalQty = state.items.reduce((acc, item) => acc + item.qty, 0);
      state.totalPrice = state.items.reduce(
        (acc, item) =>
          acc + item.qty * (item.price - (item.price * item.discount) / 100),
        0
      );
    },

    // 🟢 تحديث الكمية مباشرة
    updateQty: (state, action) => {
      const { productId, qty } = action.payload;
      const item = state.items.find((i) => i._id === productId);
      if (item) item.qty = qty;

      state.totalQty = state.items.reduce((acc, item) => acc + item.qty, 0);
      state.totalPrice = state.items.reduce(
        (acc, item) =>
          acc + item.qty * (item.price - (item.price * item.discount) / 100),
        0
      );
    },

    // 🟢 زيادة الكمية
    incrementQty: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((i) => i._id === productId);
      if (item) item.qty += 1;

      state.totalQty += 1;
      state.totalPrice = state.items.reduce(
        (acc, item) =>
          acc + item.qty * (item.price - (item.price * item.discount) / 100),
        0
      );
    },

    // 🟢 تقليل الكمية
    decrementQty: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((i) => i._id === productId);
      if (item && item.qty > 1) item.qty -= 1;

      state.totalQty = state.items.reduce((acc, item) => acc + item.qty, 0);
      state.totalPrice = state.items.reduce(
        (acc, item) =>
          acc + item.qty * (item.price - (item.price * item.discount) / 100),
        0
      );
    },

    // 🧹 تفريغ الكارت
    clearCart: (state) => {
      state.items = [];
      state.totalQty = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  updateQty,
  incrementQty,
  decrementQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
