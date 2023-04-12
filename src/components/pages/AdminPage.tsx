import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CosmeticProduct, Option, RootState } from '../../types';
import { addProduct, removeProduct, setProducts } from '../store/productsSlice';
import '../styles/AdminPage.scss';

interface FormState {
    brand: string;
    name: string;
    manufacturer: string;
    size: string;
    size_type: string;
    price: number;
    barcode: string;
    description: string;
    image_url: string;
    care_type: string[];
}


const initialFirmState = {
    brand: '',
    name: '',
    manufacturer: '',
    size: '',
    size_type: '',
    price: 0,
    barcode: '',
    description: '',
    image_url: '',
    care_type: []
} as FormState;

const careTypes = [
    { value: "body", label: "Уход ща телом" },
    { value: "hands", label: "Уход за руками" }
];

const AdminPage: React.FC = () => {
    const [formState, setFormState] = useState<FormState>({ ...initialFirmState });
    const dispatch = useDispatch()
    const products = useSelector((state: RootState) => state.products.items)
    const [selectedProduct, setSelectedProduct] = useState('create')
    const [item, setItem] = useState({} as CosmeticProduct);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);


    const handleSubmit = () => {
        if (products.filter(item => item.barcode === formState.barcode).length) { 
            dispatch(setProducts(products.map(item => item.barcode === formState.barcode ? formState : item)))
        } else {
            dispatch(addProduct(formState));
        }
    };

    const onDelete = () => {
        setSelectedProduct('create');
        setFormState({...initialFirmState})
        dispatch(removeProduct(formState.barcode));
    }

    const onChangeProduct = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setSelectedProduct(value);
        if (value === 'create') { setFormState({ ...initialFirmState }); return; }
        setFormState(products.filter((item) => item.barcode == value)[0])
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;

        setFormState({ ...formState, [name]: value });
    };

    return (
        <div data-testid='admin-page' className="admin-page">
            <div className="admin-page__form" onSubmit={handleSubmit}>
                <span className='admin-page__form-label'>Выбор продукта / Создание нового</span>
                <select className="image-select" onChange={onChangeProduct} value={selectedProduct}>
                    <option value="create">Создать новый</option>
                    {products.map((product) =>
                        <option value={product.barcode} key={product.barcode}>
                            {product.brand} {product.name}
                        </option>)}
                </select>

                <div className="admin-page__form-group">
                    <span className="admin-page__form-label">Бренд</span>
                    <input className="admin-page__form-input" type="text" name="brand" value={formState.brand} onChange={handleChange} required />
                </div>
                <div className="admin-page__form-group">
                    <span className="admin-page__form-label">Название</span>
                    <input className="admin-page__form-input" type="text" name="name" value={formState.name} onChange={handleChange} required />
                </div>
                <div className="admin-page__form-group">
                    <span className="admin-page__form-label">Производитель</span>
                    <input className="admin-page__form-input" type="text" name="manufacturer" value={formState.manufacturer} onChange={handleChange} required />
                </div>
                <div className="admin-page__form-group">
                    <span className="admin-page__form-label">Размер</span>
                    <input className="admin-page__form-input" type="text" name="size" value={formState.size} onChange={handleChange} required />
                </div>
                <div className="admin-page__form-group">
                    <label className="admin-page__form-label" htmlFor="size_type">Тип размера</label>
                    <select className="admin-page__form-select" name="size_type" id="size_type" value={formState.size_type} onChange={handleChange}>required
                        <option value="volume">Объем</option>
                        <option value="weight">Вес</option>
                    </select>
                </div>
                <div className="admin-page__form-group">
                    <label className="admin-page__form-label" htmlFor="size_type">Тип ухода</label>
                    <select className="admin-page__form-select" name="size_type" id="size_type" value={formState.size_type} onChange={handleChange}>required
                        <option value="body">Уход за телом</option>
                        <option value="hands">Уход за руками</option>
                    </select>
                </div>
                <div className="admin-page__form-group">
                    <span className="admin-page__form-label">Цена</span>
                    <input className="admin-page__form-input" type="number" name="price" value={formState.price} onChange={handleChange} required />
                </div>
                <div className="admin-page__form-group">
                    <span className="admin-page__form-label">Штрих-код</span>
                    <input className="admin-page__form-input" type="text" name="barcode" value={formState.barcode} onChange={handleChange} required />
                </div>
                <div className="admin-page__form-group">
                    <span className="admin-page__form-label">URL изображения</span>
                    <input className="admin-page__form-input" type="text" name="image_url" value={formState.image_url} onChange={handleChange} required />
                </div>
                <div className="admin-page__form-group">
                    <span className="admin-page__form-label">Описание</span>
                    <input className="admin-page__form-input" type="text" name="description" value={formState.description} onChange={handleChange} required />
                </div>
                <div className='admin-page__row'>
                    <button className="admin-page__row__btn" onClick={handleSubmit}>Отправить</button>
                    <button className="admin-page__row__btn" onClick={onDelete}>Удалить</button>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;

