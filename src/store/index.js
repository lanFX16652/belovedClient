import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import { cartReducer } from "./cartSlice.js";
import { orderReducer } from "./orderSlice.js";

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        order: orderReducer,
    }
});

export default store;