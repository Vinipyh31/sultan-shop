import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CosmeticProduct } from '../../types';

interface ProductsState {
    items: CosmeticProduct[];
}

const initialState: ProductsState = {
    items: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<CosmeticProduct>) {
            state.items.push(action.payload);
        },
        removeProduct(state, action: PayloadAction<string>) {
            state.items = state.items.filter((item) => item.barcode !== action.payload);
        },
        setProducts(state, action: PayloadAction<CosmeticProduct[]>) {
            state.items = action.payload;
        },
    },
});

export const { addProduct, removeProduct, setProducts } = productsSlice.actions;

export default productsSlice.reducer;
