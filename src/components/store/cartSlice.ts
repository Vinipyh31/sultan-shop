import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CosmeticProduct } from '../../types';

interface CartState {
    items: CosmeticProduct[];
}

const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CosmeticProduct>) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<CosmeticProduct>) => {
            const index = state.items.findIndex((item) => item.barcode === action.payload.barcode);
            if (index !== -1) {
                state.items.splice(index, 1);
            }
        },
        removeAllSimilar: (state, action: PayloadAction<CosmeticProduct>) => {
            state.items = state.items.filter( (item) => item.barcode !== action.payload.barcode);
        },
        removeAll: (state) => {
            state.items = [];
        }

    },
});

export const { addItem, removeItem, removeAllSimilar, removeAll } = cartSlice.actions;

export default cartSlice.reducer;
