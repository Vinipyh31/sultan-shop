import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from 'redux-mock-store';
import App from '../App';
import ProductCartListItem from '../components/ProductCartListItem';
import ProductList from '../components/ProductList';
import MyFooter from "../components/UI/footer/MyFooter";
import MyHeader from "../components/UI/header/MyHeader";
import CartPage from "../components/pages/CartPage";
import Catalog from "../components/pages/CatalogPage";
import { store } from "../components/store/store";
import jsonFile from "../data/goods.json";
import { ICheckbox } from '../types';


describe('Test App', () => {
    test('check cartPage checkout btn', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CartPage />
                </BrowserRouter>
            </Provider>
        );
        const checkoutBtn = screen.getByText('Оформить заказ');

        expect(checkoutBtn).toBeInTheDocument();
    })
    test('check header buttons', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <MyHeader />
                </BrowserRouter>
            </Provider>
        );
        const catalogBtn = screen.getByText('Каталог');
        const priceListBtn = screen.getByText('Прайс-лист');

        expect(catalogBtn).toBeInTheDocument();
        expect(priceListBtn).toBeInTheDocument();
    })
    test('check footer main elements', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <MyFooter />
                </BrowserRouter>
            </Provider>
        );
        const adminBtn = screen.getByText('Админка');
        const priceListBtn = screen.getByText('Прайс-лист');

        expect(adminBtn).toBeInTheDocument();
        expect(priceListBtn).toBeInTheDocument();
    })
    test('check catalog main elements', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Catalog />
                </BrowserRouter>
            </Provider>
        );
        const sortBtn = screen.getByText(/сортировка/i);
        const filter = screen.getByText(/подбор по параметрам/i);

        expect(sortBtn).toBeInTheDocument();
        expect(filter).toBeInTheDocument();
    })
    test('check if sorting works correctly', () => {
        const filters = {
            startPrice: 0,
            endPrice: 9999,
            branList: [],
            typeOfBodyCare: [],
        };
        const sort = 'price-reverse';

        const mockStore = configureStore();
        const store = mockStore({
            products: { items: jsonFile },
        })



        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductList sort={sort} filters={filters} />
                </BrowserRouter>
            </Provider>
        );

        const productElements = screen.getAllByTestId('product-item');

        expect(productElements[0]).toHaveTextContent('OPI Гель-лак для ногтей');
        expect(productElements[1]).toHaveTextContent('Natura Siberica Крем для лица');
    })
    test('check if filtering is working', () => {
        const filters = {
            startPrice: 100,
            endPrice: 120,
            branList: ['Fa', 'Colgate', 'Nivea', 'Sensodyne'],
            typeOfBodyCare: [],
        };
        const sort = 'price';

        const mockStore = configureStore();
        const store = mockStore({
            products: { items: jsonFile },
        })



        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductList sort={sort} filters={filters} />
                </BrowserRouter>
            </Provider>
        );

        const productElements = screen.getAllByTestId('product-item');

        expect(productElements).toHaveLength(2);
        expect(productElements[0]).toHaveTextContent('Fa Жидкое мыло');
        expect(productElements[1]).toHaveTextContent('Nivea Дезодорант');
    })
    test('check that filtering and sorting work together', () => {
        const filters = {
            startPrice: 100,
            endPrice: 120,
            branList: ['Fa', 'Colgate', 'Nivea', 'Sensodyne'],
            typeOfBodyCare: [],
        };
        const sort = 'alphabet-reverse';

        const mockStore = configureStore();
        const store = mockStore({
            products: { items: jsonFile },
        })



        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductList sort={sort} filters={filters} />
                </BrowserRouter>
            </Provider>
        );

        const productElements = screen.getAllByTestId('product-item');

        expect(productElements).toHaveLength(2);
        expect(productElements[0]).toHaveTextContent('Nivea Дезодорант');
        expect(productElements[1]).toHaveTextContent('Fa Жидкое мыло');
    })
    test('increment decrement in counter', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductCartListItem item={{ count: 1, ...jsonFile[0] }} />
                </BrowserRouter>
            </Provider>
        )

        const increment = screen.getByTestId('counter-increment')
        const decrement = screen.getByTestId('counter-decrement')
        expect(screen.getByTestId('counter-count')).toHaveTextContent('1')
        fireEvent.click(increment)
        expect(screen.getByTestId('counter-count')).toHaveTextContent('2')
        fireEvent.click(decrement)
        expect(screen.getByTestId('counter-count')).toHaveTextContent('1')
    })
    test('Checking for the appearance of additional brands when pressing the button show more (in filters)', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Catalog/>
                </BrowserRouter>
            </Provider>
        )

        const showMoreBrandsBtn = screen.getByTestId('checkboxes-show-more')
        
        expect(screen.getAllByTestId('checkbox')).toHaveLength(4)
        fireEvent.click(showMoreBrandsBtn)
        expect(screen.getAllByTestId('checkbox')).toHaveLength(9)
    })
    test('Router test', () => {

        const mockStore = configureStore();
        const store = mockStore({
            products: { items: jsonFile },
            cart: { items: [{}] },
        })

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        )
        const adminLink = screen.getByTestId('admin-link')
        const cartLink = screen.getByTestId('cart-link')
        const catalogLink = screen.getByTestId('catalog-link')

        expect(screen.getByTestId('catalog-page')).toBeInTheDocument();
        const productLink = screen.getAllByTestId('product-link')[0]
        fireEvent.click(productLink)
        expect(screen.getByTestId('product-page')).toBeInTheDocument();
        fireEvent.click(cartLink)
        expect(screen.getByTestId('cart-page')).toBeInTheDocument();
        fireEvent.click(adminLink)
        expect(screen.getByTestId('admin-page')).toBeInTheDocument();
        fireEvent.click(catalogLink)
        expect(screen.getByTestId('catalog-page')).toBeInTheDocument();
    })
})

export { };

