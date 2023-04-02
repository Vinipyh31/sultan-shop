import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import './components/styles/App.scss';
import MyFooter from './components/UI/footer/MyFooter';
import MyHeader from './components/UI/header/MyHeader';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts } from './components/store/productsSlice';
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
    <BrowserRouter>
      <div className='App'>
        <MyHeader />
        <div className='App__content'>
          <AppRouter />
        </div>
        <MyFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
