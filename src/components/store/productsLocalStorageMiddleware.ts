import { Middleware } from '@reduxjs/toolkit';

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);

    if (action.type.endsWith('/setProducts') || action.type.endsWith('/addProduct') || action.type.endsWith('/removeProduct')) {
        const state = store.getState();        
        localStorage.setItem('products', JSON.stringify(state.products.items));
    }

    return result;
};

export default localStorageMiddleware;
