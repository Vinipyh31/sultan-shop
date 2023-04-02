import React from 'react'
import cl from './Cart.module.scss'
import cartSvg from './../../images/cart.svg'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../types';



const Cart = () => {
    
    const navigate = useNavigate();
    const countOfCartItems = useSelector((state: RootState) => state.cart.items.length)
    const sumPriceOfCartItems = useSelector((state: RootState) => state.cart.items.reduce((prev, item) => prev + item.price , 0))

    return (
        <div className={cl.cart} onClick={e => navigate('/cart')}>
            <div className={cl.cartContainer}>
                <img className={cl.cartImg} src={cartSvg} alt="cart" />
                <div className={cl.cartCounter}>
                    <div>
                        <span>{countOfCartItems}</span>
                    </div>
                </div>
            </div>
            <div className={cl.cartInfo}>
                <span className={cl.cartName}>Корзина</span>
                <span className={cl.amount}>{sumPriceOfCartItems} ₸</span>
            </div>
        </div>
    )
}

export default Cart