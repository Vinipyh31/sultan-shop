import React from 'react'
import '../../styles/footer.scss'
import logo from '../../images/logo-white.svg'
import MyInput from '../search/MyInput'
import searchSvg from '../../images/search.svg'
import YellowButton from '../yellowBtn/YellowButton'
import downloadSvg from './../../images/download.svg'
import whatsappLogo from './../../images/whatsapp.svg'
import telegramLogo from './../../images/telegram.svg'
import visa from './../../images/visa.svg'
import mastercard from './../../images/mastercard.svg'
import { Link } from 'react-router-dom'



const MyFooter = () => {
  return (
    <footer className='footer'>
      <div className='footer__row'>
        <img className='logo--white' src={logo} alt="logo" />
        <p className='company-description'>Компания «Султан» — снабжаем розничные магазины товарами
          "под ключ" в Кокчетаве и Акмолинской области</p>
      <span className='small-text'>Подпишись на скидки и акции</span>
      <MyInput text={'Введите ваш E-mail'}>
          <img src={searchSvg} alt="searchImg" />
      </MyInput>
      </div>
      <div className='footer__row'>
        <span className='footer__row__title'>Меню сайта:</span>
        <ul className='footer__row__list'>
          <li>О компании</li>
          <li>Доставка и оплата</li>
          <li>Возврат</li>
          <li>Контакты</li>
          <Link to='/admin' style={{textDecoration: 'none', color: 'white'}}><li>Админка</li></Link>
        </ul>
      </div>
      <div className='footer__row'>
        <span className='footer__row__title'>Категории:</span>
        <ul className='footer__row__list'>
          <li>Бытовая химия</li>
          <li>Косметика и гигиена</li>
          <li>Товары для дома</li>
          <li>Товары для детей и мам</li>
          <li>Посуда</li>
        </ul>
      </div>
      <div className='footer__row'>
        <span className='footer__row__title'>Скачать прайс-лист:</span>
        <YellowButton text="Прайс-лист">
          <img src={downloadSvg} alt="download" />
        </YellowButton>
        <span className='social-media-text'>Связь в мессенджерах:</span>
        <div className='social-media'>
          <img className='social-media__item' src={whatsappLogo} alt="whatsappLogo" />
          <img className='social-media__item' src={telegramLogo} alt="telegramLogo" />
        </div>
      </div>
      <div className='footer__row'>
        <span className='footer__row__title'>Контакты:</span>
        <div className='call-info for-footer'>
          <a href="tel:+77774900091">+7 (777) 490-00-91</a>
          <span className='work-time'>время работы: 9:00-20:00</span>
          <span className='request-call'>Заказать звонок</span>
        </div>
          <div className='contacts__item'>
            <div className='contacts__item__text'>
              <span className='contacts__item__text--title'>
                opt.sultan@mail.ru
              </span>
              <span className='contacts__item__text--description'>
                На связи в любое время
              </span>
            </div>
          </div>
        <div className='payment-systems'>
          <img src={visa} alt="visa" />
          <img src={mastercard} alt="mastercard" />
        </div>
      </div>
    </footer>
  )
}

export default MyFooter