import { Link } from 'react-router-dom'
import ProductCartList from '../ProductCartList'
import '../styles/CartPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../types'
import YellowButton from '../UI/yellowBtn/YellowButton'
import { useState } from 'react'
import MyModal from '../UI/modal/MyModal'
import allGoodSvg from '../images/allGood.svg'
import closeSvg from '../images/close.svg'
import { removeAll } from '../store/cartSlice'


const Cart = () => {
  const cartSum = useSelector((state: RootState) => state.cart.items.reduce((sum, item) => sum + item.price, 0))
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const onCheckout = () => {
    setIsModalOpen(true);
    dispatch(removeAll())
  }

  return (
    <div data-testid='cart-page' className='cart-page'>
      <div className='cart-page__content'>
        <nav className='breadcrumb'>
          <ul>
            <Link to='/catalog'><li>Главная</li></Link>
            <div className='breadcrumb__line' />
            <Link to='/cart'><li>Корзина</li></Link>
          </ul>
        </nav>
        <ProductCartList />
        <div className='cart-page__last-row'>
          <YellowButton text='Оформить заказ' onClick={onCheckout} />
          <span className='cart-list__item__price'>{cartSum} ₸</span>
        </div>
      </div>
      <MyModal active={isModalOpen} setActive={setIsModalOpen}>
        <div className='modal'>
          <img className='modal__close' src={closeSvg} alt="closeSvg" onClick={() => setIsModalOpen(false)} />
          <YellowButton isCircle={true}
            btnStyle={{ margin: '0 auto', cursor: 'default' }}
          >
            <img src={allGoodSvg} alt="allGoodSvg" />
          </YellowButton>
          <h1>Спасибо за заказ</h1>
          <span className='modal__'>Наш менеджер свяжется с вами в ближайшее время</span>
        </div>
      </MyModal>
    </div>
  )
}

export default Cart