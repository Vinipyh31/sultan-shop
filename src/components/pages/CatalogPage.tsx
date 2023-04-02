import React, { useState } from 'react'
import '../styles/CatalogPage.scss'
import { Link } from 'react-router-dom'
import ProductList from '../ProductList'
import { ICheckbox, IFilters, sortType } from '../../types'
import MyInput from '../UI/search/MyInput'
import searchSvg from '../images/search.svg'
import Checkbox from '../UI/checkbox/CheckboxGroup'
import YellowButton from '../UI/yellowBtn/YellowButton'
import deleteSvg from '../images/delete.svg'

const initialCheckboxes: ICheckbox[] = [
  { label: "Fa", value: "Fa" },
  { label: "Colgate", value: "Colgate" },
  { label: "Nivea", value: "Nivea" },
  { label: "Sensodyne", value: "Sensodyne" },
  { label: "Maybelline", value: "Maybelline" },
  { label: "Adidas", value: "Adidas" },
  { label: "Pantene", value: "Pantene" },
  { label: "Gillette", value: "Gillette" },
  { label: "OPI", value: "OPI" },
]

const initialFilters: IFilters = {
  branList: [],
  endPrice: 999999,
  startPrice: 0,
  typeOfBodyCare: [],
}

const Catalog = () => {

  const [sort, setSort] = useState('price' as sortType)
  const [checkboxList, setCheckboxList] = useState<ICheckbox[]>([...initialCheckboxes]);
  const [checkboxes, setCheckboxes] = useState<string[]>([]);
  const [filters, setFilters] = useState<IFilters>({ ...initialFilters })
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(9999);
  const [brandName, setBrandName] = useState('')
  const [typeOfBodyCare, setTypeOfBodyCare] = useState<string[]>([])


  const onChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as sortType);
  }

  const onFilterBtn = () => {
    setFilters({
      branList: checkboxes,
      endPrice: endPrice,
      startPrice: startPrice,
      typeOfBodyCare: typeOfBodyCare,

    })
  }
  const onResetFilters = () => {
    setFilters({ ...initialFilters });
    setCheckboxList([...initialCheckboxes]);
    setStartPrice(0);
    setEndPrice(9999);
    setBrandName('');
    setTypeOfBodyCare([]);
    setCheckboxes([]);
  }

  const onBrandSearch = () => {
    if (brandName) {
      setCheckboxList(initialCheckboxes.filter(item => item.label.toLocaleLowerCase().includes(brandName)));
    } else {
      setCheckboxList(initialCheckboxes)
    }
  }

  const onBodyCareFilter = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const text = target.innerText.split('\n').join(' ');
    if (text === "Уход за телом") {
      typeOfBodyCare.includes("body") ? setTypeOfBodyCare(v => v.filter(i => i !== "body")) : setTypeOfBodyCare(v => [...v, "body"]);
    }
    if (text === "Уход за руками") {
      typeOfBodyCare.includes("hands") ? setTypeOfBodyCare(v => v.filter(i => i !== "hands")) : setTypeOfBodyCare(v => [...v, "hands"]);
    }
  }

  return (
    <div className='catalog-page'>
      <div className='catalog-page__content'>
        <nav className='breadcrumb'>
          <ul>
            <Link to='/catalog'><li>Главная</li></Link>
            <div className='breadcrumb__line' />
            <Link to='/catalog'><li>Каталог</li></Link>
          </ul>
        </nav>
        <div className='catalog-row'>
          <h1 className='catalog-title'>Косметика и гигиена</h1>
          <div className='sort-container'>
            <span className='sort-title'>Сортировка:</span>
            <select className='sort-select' value={sort} onChange={onChangeSort}>
              <option value="price">Цена</option>
              <option value="price-reverse">Цена (Убывание)</option>
              <option value="alphabet">Алфавит</option>
              <option value="alphabet-reverse">Алфавит (Убывание)</option>
            </select>
          </div>
        </div>
        <div className='catalog-page__sort-list'>
          <div
            className={`${typeOfBodyCare.includes('body') ? 'active' : ''}`}
            onClick={onBodyCareFilter}
          >Уход<br />за телом</div>
          <div
            className={`${typeOfBodyCare.includes('hands') ? 'active' : ''}`}
            onClick={onBodyCareFilter}
          >Уход<br />за руками</div>
          <div>Уход<br />за ногами</div>
          <div>Уход<br />за лицом</div>
          <div>Уход<br />за волосами</div>
          <div>Средства<br />для загара</div>
          <div>Средства<br />для бритья</div>
          <div>Подарочные<br />наборы</div>
          <div>Гигиеническая<br />продукция</div>
          <div>Гигиена<br />полости рта</div>
          <div>Бумажная<br />продукция</div>
        </div>
        <div className='catalog-page__main'>
          <div className='catalog-page__main__filters'>
            <span className='filter-title'>Подбор по параметрам</span>
            <div className='price-title-container'><span className='price-title'>Цена <b>₸</b> </span></div>
            <div className='filter-row'>
              <input className='price-input' type="number" value={startPrice} onChange={e => setStartPrice(+e.target.value)} />
              -
              <input className='price-input' type="number" value={endPrice} onChange={e => setEndPrice(+e.target.value)} />
            </div>
            <div className='filter-title-container'><span className='filter-title' >Бренд</span></div>
            <MyInput text='Поиск...' value={brandName} setValue={setBrandName} onClick={onBrandSearch}>
              <img src={searchSvg} alt="searchSvg" />
            </MyInput>
            <Checkbox checkboxes={checkboxList} checkedValues={checkboxes} setCheckboxes={setCheckboxes} />
            <div className='filter__main-btns'>
              <YellowButton text='Показать' onClick={onFilterBtn} />
              <YellowButton isCircle onClick={onResetFilters}>
                <img src={deleteSvg} alt="" />
              </YellowButton>
            </div>
            <div className='catalog-page__sort-list'>
              <div
                className={`${typeOfBodyCare.includes('body') ? 'active' : ''}`}
                onClick={onBodyCareFilter}
              >Уход за телом</div>
              <div
                className={`${typeOfBodyCare.includes('hands') ? 'active' : ''}`}
                onClick={onBodyCareFilter}
              >Уход за руками</div>
            </div>
          </div>
          <div className='product-list-column'>
            <ProductList sort={sort} filters={filters} />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo, vestibulum sagittis iaculis iaculis. Quis mattis vulputate feugiat massa vestibulum duis. Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris venenatis. Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Catalog