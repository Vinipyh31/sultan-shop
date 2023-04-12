import React from 'react'
import YellowButton from './UI/yellowBtn/YellowButton';
import { CosmeticProduct } from '../types';
import { useDispatch } from 'react-redux';
import { addItem } from './store/cartSlice';
import cartSvg from './images/cart-white.svg'
import bottle from './images/bottle.svg'
import boxOpen from './images/box-open.svg'
import { useNavigate } from 'react-router-dom';


interface Props {
    item: CosmeticProduct;
}

const ProductListItem: React.FC<Props> = ({ item }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onAddInCart = (e: React.MouseEvent<HTMLDivElement>) => {
        dispatch(addItem(item))
    }

    function onTitleClick(event: React.MouseEvent<HTMLDivElement>) {
        navigate(`/catalog/${item.barcode}`);
    }

    return (
        <div data-testid="product-item" className='product-item'>
            <img
                className='product-item__image'
                src={item.image_url}
                alt="productImg"
            />
            <div className='product-item__row'>
                {
                    item.size_type === 'volume' ?
                        <img className='product-item__size__image' src={bottle} alt="bottle" />
                        :
                        <img className='product-item__size__image' src={boxOpen} alt="boxOpen" />

                }
                <span className='product-item__size'>{item.size}</span>
            </div>
            <div
                data-testid='product-link'
                className='product-item__title'
                onClick={onTitleClick}
            >

                <b>{item.brand}</b> {item.name}
            </div>
            <div className='product-item__info'>
                <span className='product-item__info__name'>Штрихкод: </span>
                <span className='product-item__info__value'>
                    {item.barcode}
                </span>
            </div>
            <div className='product-item__info'>
                <span className='product-item__info__name'>Производитель: </span>
                <span className='product-item__info__value'>
                    {item.manufacturer}
                </span>
            </div>
            <div className='product-item__info'>
                <span className='product-item__info__name'>Бренд: </span>
                <span className='product-item__info__value'>
                    {item.brand}
                </span>
            </div>
            <div className='product-item__row last'>
                <span className='product-item__price'>{`${item.price} ₸`}</span>
                <YellowButton
                    onClick={onAddInCart}
                    text='В КОРЗИНУ'
                    btnStyle={{ width: '153px', height: '45px' }}
                    textStyle={{ fontSize: '10px', fontWeight: '500' }}
                >
                    <img src={cartSvg} alt="in cart" draggable="false" />
                </YellowButton>
            </div>
        </div>
    )
}

export default ProductListItem