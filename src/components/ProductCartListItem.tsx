import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { cartListProduct } from '../types';
import Counter from './UI/counter/Counter';
import YellowButton from './UI/yellowBtn/YellowButton';
import bottle from './images/bottle.svg';
import boxOpen from './images/box-open.svg';
import deleteSvg from './images/delete.svg';
import { addItem, removeAllSimilar, removeItem } from './store/cartSlice';

interface Props {
    item: cartListProduct;
}

const ProductCartListItem: React.FC<Props> = ({ item }) => {

    const [counter, setCounter] = useState(item.count);
    const dispatch = useDispatch();

    return (
        <div className='cart-list__item'>
            <div className='cart-list__item__image-container'>

                <img className='cart-list__item__image' src={item.image_url} alt="itemImg" />
            </div>
            <div className='cart-list__item__info'>
                <div className='product-item__row'>
                    {
                        item.size_type === 'volume' ?
                            <img className='product-item__size__image' src={bottle} alt="bottle" />
                            :
                            <img className='product-item__size__image' src={boxOpen} alt="boxOpen" />

                    }
                    <span className='product-item__size'>{item.size}</span>
                </div>
                <div className='product-item__title'>
                    <span>{item.brand} {item.name}</span>
                </div>
                <p className='cart-list__item__description'>
                    {item.description}
                </p>
            </div>
            <div className='cart-list__item__product-management'>
                <div className='dashed-line--medium' />
                <Counter
                    counter={counter}
                    setCounter={setCounter}
                    increment={() => {
                        dispatch(addItem(item));
                    }}
                    decrement={() => {
                        if (counter > 1) {
                            dispatch(removeItem(item));
                        }
                    }} />
                <div className='dashed-line--medium' />
                <span className='cart-list__item__price'>{item.price * counter} ₸</span>
                <div className='dashed-line--medium' />
                <YellowButton
                    isCircle={true}
                    onClick={() => {
                        dispatch(removeAllSimilar(item))
                    }}
                >
                    <img src={deleteSvg} alt="deleteSvg" />
                </YellowButton>
            </div>
        </div>
    )
}

export default ProductCartListItem