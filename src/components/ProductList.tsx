import { useSelector } from 'react-redux';
import { CosmeticProduct, IFilters, RootState, sortType } from '../types';
import ProductListItem from './ProductListItem';
import React from 'react';

interface Props {
    sort: sortType;
    filters: IFilters;
}

const ProductList: React.FC<Props> = ({ sort, filters }) => {
    const products = useSelector((state: RootState) => state.products.items)

    const sortCheck = (sortType: sortType) => {
        const sort = {
            'price': (a: CosmeticProduct, b: CosmeticProduct) => a.price - b.price,
            'price-reverse': (a: CosmeticProduct, b: CosmeticProduct) => b.price - a.price,
            'alphabet': (a: CosmeticProduct, b: CosmeticProduct) => b.name.localeCompare(a.name),
            'alphabet-reverse': (a: CosmeticProduct, b: CosmeticProduct) => a.name.localeCompare(b.name),
        }

        return sort[sortType];
    }

    const checkCareType = (careType: string[]) => {
        if (!filters.typeOfBodyCare.length) {
            return true;
        }
        if (!careType.length) return false;
        for (const item of careType) {
            if (filters.typeOfBodyCare.includes(item)) {
                return true;
            } 
        }
        return false;
    }

    return (
        <div className='product-list'>
            {products
                .filter((i) => i.price >= filters.startPrice && i.price <= filters.endPrice) // цена
                .filter((i) => filters.branList.length ? filters.branList.includes(i.brand) : true) // бренд
                .filter((i) => checkCareType(i.care_type)) // тип ухода за телом
                .sort(sortCheck(sort))
                .map((item) => <ProductListItem item={item} key={+item.barcode} />)}
        </div>
    )
}

export default ProductList 