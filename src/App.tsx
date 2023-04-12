import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppRouter from './components/AppRouter';
import MyFooter from './components/UI/footer/MyFooter';
import MyHeader from './components/UI/header/MyHeader';
import { setProducts } from './components/store/productsSlice';
import './components/styles/App.scss';
import jsonFile from "./data/goods.json";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedData = localStorage.getItem('products');
    if (!!storedData) {
      dispatch(setProducts(JSON.parse(storedData)));
    } else {
      localStorage.setItem('products', JSON.stringify(jsonFile));
      dispatch(setProducts(jsonFile));
    }
  }, []);


  return (
    <div className='App'>
      <MyHeader />
      <div className='App__content'>
        <AppRouter />
      </div>
      <MyFooter />
    </div>
  );
}

export default App;
