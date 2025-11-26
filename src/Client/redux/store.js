import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import productReducer from "./Slices/productSlice"
import categoryreducer from"./Slices/categorySlice"
import  useReducer  from "./Slices/UsersSlice";
 import blogReducer from "./Slices/blogSlice";
 import homeSliderReducer from "./Slices/homeSliderSlice";
 import logoReducer from "./Slices/logoSlice";
 import cartReducer from "./Slices/cartSlice";
import wishlistReducer from "./Slices/wishlistSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products:productReducer,
    users:useReducer,
    category:categoryreducer,
     blogs: blogReducer,
      homeSlider: homeSliderReducer,
       logo: logoReducer,
        cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
