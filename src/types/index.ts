export interface CosmeticProduct {
    image_url: string;
    name: string;
    size_type: string;
    size: string;
    barcode: string;
    manufacturer: string;
    brand: string;
    description: string;
    price: number;
    care_type: string[];
}

export interface RootState {
    products: {
        items: CosmeticProduct[];
        loading: boolean;
        error: string | null;
    };
    cart: {
        items: CosmeticProduct[];
    };
}

export interface Option {
    value: string;
    label: string;
}

export interface cartListProduct extends CosmeticProduct {
    count: number;
}

export interface IFilters {
    startPrice: number;
    endPrice: number;
    branList: string[];
    typeOfBodyCare: string[];
}

export interface ICheckbox { label: string; value: string }

export type sortType = 'price' | 'price-reverse' | 'alphabet' | 'alphabet-reverse'
