import { useSelector } from 'react-redux'
import { CosmeticProduct, RootState } from '../types'
import ProductCartListItem from './ProductCartListItem'
import { useEffect, useState } from 'react';



interface cartListProduct extends CosmeticProduct {
    count: number;
}

const ProductCartList = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items)
    const [newProducts, setNewProducts] = useState([] as cartListProduct[]);

    useEffect(() => {
        const updatedProducts = [] as cartListProduct[];

        const checkAvailability = (item: CosmeticProduct) => {
            for (const product of updatedProducts) {
                if (product.barcode === item.barcode) return true;
            }
            return false;
        }

        const incrementCount = (item: CosmeticProduct) => {
            for (const product of updatedProducts) {
                if (product.barcode === item.barcode) ++product.count
            }
        }

        for (const item of cartItems) {
            if (checkAvailability(item)) {
                incrementCount(item);
            } else {
                updatedProducts.push({ count: 1, ...item });
            }
        }

        setNewProducts(updatedProducts);
    }, [cartItems]);


    return (
        <div className='cart-list'>
            <div className='cart-list__dashed-line--horizontal' />
            {
                [...newProducts].sort((a, b) => a.name.localeCompare(b.name)).map((cartItem, i) => <div key={+cartItem.barcode} className='item-container'>
                    <ProductCartListItem item={cartItem} />
                    <div className='cart-list__dashed-line--horizontal'/>
                </div>)
            }
        </div>
    )
}

export default ProductCartList;
