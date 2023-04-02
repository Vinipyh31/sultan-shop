import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsLocalStorageMiddleware from './productsLocalStorageMiddleware';
import productsReducer from './productsSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsLocalStorageMiddleware),
});

