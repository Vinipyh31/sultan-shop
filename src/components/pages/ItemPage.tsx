import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { CosmeticProduct, RootState } from '../../types';
import Counter from '../UI/counter/Counter';
import YellowButton from '../UI/yellowBtn/YellowButton';
import bottle from '../images/bottle.svg';
import boxOpen from '../images/box-open.svg';
import cartSvg from '../images/cart-white.svg';
import share from "../images/share.svg";
import { addItem } from '../store/cartSlice';
import '../styles/ItemPage.scss';
import downloadSvg from "../images/download-black.svg";
import triangle from "../images/triangle.svg";

const ItemPage = () => {

  const [item, setItem] = useState({} as CosmeticProduct);
  const [counter, setCounter] = useState(1);
  const products = useSelector((state: RootState) => state.products.items)
  const params = useParams()
  const dispatch = useDispatch()


  const onAddInCart = () => {
    for (let i = 0; i < counter; i++) {
      dispatch(addItem(item))
    }
  }

  useEffect(() => {
    const newItem = products.filter((item) => item.barcode === params.id)[0]

    setItem(products.filter((item) => item.barcode === params.id)[0])
  }, [item, params.id, products])


  return (
    <div className='item-page'>
      <div className='item-page__content'>
        <nav className='breadcrumb'>
          <ul>
            <Link to='/catalog'><li>Главная</li></Link>
            <div className='breadcrumb__line' />
            <Link to='/catalog'><li>Каталог</li></Link>
            <div className='breadcrumb__line' />
            <span className=''>{item.brand} {item.name}</span>
          </ul>
        </nav>
        <div className='item-page__info'>
          <div className='item-page__info__column'>
            <img className='item-page__info__image' src={item.image_url} alt="itemImg" />
          </div>
          <div className='item-page__info__column info'>
            <span className='item-page__info__availability'>В наличии</span>
            <span className='item-page__info__name'>
              <span className='item-page__info__name__brand'>{item.brand}</span> {item.name}
            </span>
            <div className='product-item__row'>
              {
                item.size_type === 'volume' ?
                  <img className='product-item__size__image' src={bottle} alt="bottle" />
                  :
                  <img className='product-item__size__image' src={boxOpen} alt="boxOpen" />

              }
              <span className='product-item__size'>
                {item.size}
              </span>
            </div>

            <div className='product-item__buy'>
              <span className='product-item__buy__price'>{item.price} ₸</span>
              <Counter counter={counter} setCounter={setCounter} />
              <YellowButton
                text='В корзину'
                onClick={onAddInCart}
                btnStyle={{ padding: '21px 40px' }}
                textStyle={{ fontSize: 14 }}
              >
                <img src={cartSvg} alt="" />
              </YellowButton>
            </div>

            <div className='product-item__row white-buttons'>
              <div className='white-btn share'>
                <img src={share} alt="share" />
              </div>
              <div className='white-btn promotion '>
                <span>При покупке от <b>10 000 ₸</b> бесплатная <br />доставка по Кокчетаву и области</span>
              </div>
              <div className='white-btn price-list '>
                <span>Прайс-лист</span>
                <img src={downloadSvg} alt="" />
              </div>
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
            <div className='product-item__info'>
              <span className='product-item__info__name'>Артикул: </span>
              <span className='product-item__info__value'>460404</span>
            </div>
            <div className='product-item__info'>
              <span className='product-item__info__name'>Штрихкод: </span>
              <span className='product-item__info__value'>
                {item.barcode}
              </span>
            </div>
            <div className='product-item__info--with-title'>
              <div className='title-row'>
                <span className='title'>Описание</span>
                <img src={triangle} alt="open-info" /></div>
              <p>{item.description}</p>
            </div>
            <div className='horizontal-dashed-line' />
            <div className='product-item__info--with-title'>
              <div className='title-row'>
                <span className='title'>Характеристики</span>
                <img src={triangle} alt="open-info" /></div>
              <div className='product-item__info'>
                <span className='product-item__info__name'>Назначение: </span>
                <span className='product-item__info__value'>
                  {item.brand}
                </span>
              </div>
              <div className='product-item__info'>
                <span className='product-item__info__name'>Тип: </span>
                <span className='product-item__info__value'>
                  {item.brand}
                </span>
              </div>
              <div className='product-item__info'>
                <span className='product-item__info__name'>Производитель: </span>
                <span className='product-item__info__value'>{item.manufacturer}</span>
              </div>
              <div className='product-item__info'>
                <span className='product-item__info__name'>Бренд: </span>
                <span className='product-item__info__value'>
                  {item.brand}
                </span>
              </div>
              <div className='product-item__info'>
                <span className='product-item__info__name'>Артикул: </span>
                <span className='product-item__info__value'>
                  {item.barcode}
                </span>
              </div>
              <div className='product-item__info'>
                <span className='product-item__info__name'>Штрихкод: </span>
                <span className='product-item__info__value'>
                  {item.barcode}
                </span>
              </div>
              <div className='product-item__info'>
                <span className='product-item__info__name'>Вес: </span>
                <span className='product-item__info__value'>
                  {item.size}
                </span>
              </div>
              <div className='product-item__info'>
                <span className='product-item__info__name'>Объем: </span>
                <span className='product-item__info__value'>
                  {item.size}
                </span>
              </div>
              <div className='product-item__info'>
                <span className='product-item__info__name'>Кол-во в коробке: </span>
                <span className='product-item__info__value'>
                  {item.size}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemPage