import { useNavigate } from 'react-router-dom'
import searchSvg from '../../images/search.svg'
import '../../styles/header.scss'
import Cart from '../cart/Cart'
import MyInput from '../search/MyInput'
import YellowButton from '../yellowBtn/YellowButton'
import catalogSvg from './../../images/catalog-rectangle.svg'
import downloadSvg from './../../images/download.svg'
import logo from './../../images/logo.svg'
import operator from './../../images/operator.png'
import position from './../../images/position.svg'



const MyHeader = () => {

  const navigate = useNavigate();

  const onCatalogClick = () => {
    navigate('/catalog');
  }

  return (
    <header className='header'>
      <div className='header__menu-container'>
        <div className='header__menu-container__content'>
          <div className='contacts'>
            <div className='contacts__item'>
              <img src={position} alt="position" />
              <div className='contacts__item__text'>
                <span className='contacts__item__text--title'>
                  г. Кокчетав, ул. Ж. Ташенова 129Б
                </span>
                <span className='contacts__item__text--description'>
                  (Рынок Восточный)
                </span>
              </div>
            </div>
            <div className='dashed-horizontal-line--small' />
            <div className='contacts__item'>
              <img src={position} alt="position" />
              <div className='contacts__item__text'>
                <span className='contacts__item__text--title'>
                  opt.sultan@mail.ru
                </span>
                <span className='contacts__item__text--description'>
                  На связи в любое время
                </span>
              </div>
            </div>
          </div>
          <div className='header__menu'>
            <span>О компании</span>
            <div className='dashed-horizontal-line--small' />
            <span>Доставка и оплата</span>
            <div className='dashed-horizontal-line--small' />
            <span>Возврат</span>
            <div className='dashed-horizontal-line--small' />
            <span>Контакты</span>
          </div>
        </div>
      </div>
      <div className='header__info'>
        <img
          className='logo'
          src={logo}
          alt="logo"
        />
        <YellowButton text="Каталог" onClick={onCatalogClick}>
          <img src={catalogSvg} alt="" />
        </YellowButton>
        <MyInput text={'Поиск...'}>
          <img src={searchSvg} alt="searchImg" />
        </MyInput>
        <div className='call-info'>
          <a href="tel:+77774900091">+7 (777) 490-00-91</a>
          <span className='work-time'>время работы: 9:00-20:00</span>
          <span className='request-call'>Заказать звонок</span>
        </div>
        <img className='operator' src={operator} alt="operator" />
        <div className='dashed-horizontal-line' />
        <YellowButton text="Прайс-лист">
          <img src={downloadSvg} alt="download" />
        </YellowButton>
        <div className='dashed-horizontal-line' />
        <Cart />
      </div>
    </header>
  )
}

export default MyHeader