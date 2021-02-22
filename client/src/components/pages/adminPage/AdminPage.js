import {useState, useEffect} from 'react';
import useHttp from '../../../hooks/http.hook';

import './AdminPage.scss';

export default function AdminPage () {

    const { loading, request, error } = useHttp();

    const [form, setForm] = useState({
        'product': '', 'category':'', 'subcategory':'', 'title': '', 'cod': '', 'price': '', 'sale': '', 'img': [], 'description': [],
    });

    
    console.log(form)

    useEffect(() => {

    }, [error])
    // }, [])

    

    function changeHandler (e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function createProduct (e) {
        // e.preventDefault();
        try {
            const data = await request('/api/product/create', 'POST', {...form});
            console.log('Data', data)
            console.log(form)
        } catch (e) {

        }
    }

    return (
        <div className="AdminPage">
            <h1>Заполняем</h1>
            <div className="AdminPage__form-wrap">
                <form>
                    <input type="text" name="product" placeholder="Наименование" onChange={changeHandler} />
                    <input type="text" name="category" placeholder="Категория" onChange={changeHandler} />
                    <input type="text" name="subcategory" placeholder="Подкатегория" onChange={changeHandler} />
                    <input type="text" name="title" placeholder="Название" onChange={changeHandler} />
                    <input type="text" name="cod" placeholder="Код/Артикул" onChange={changeHandler} />
                    <input type="number" name="price" placeholder="Цена" onChange={changeHandler} />
                    <input type="number" name="sale" placeholder="Скидка" onChange={changeHandler} />
                    <input type="text" name="img" placeholder="Ссылки картинкам" onChange={changeHandler} />
                    <input type="text" name="description" placeholder="Описание" onChange={changeHandler} />
                    {/* <button type="submit" onClick={loginHandler} disabled={loading} >Сбросить все</button> */}
                    <button type="submit" onClick={createProduct} disabled={loading} >Добавить</button>
                    {/* <button type="submit" onClick={createProduct}>Добавить</button> */}
                </form>
            </div>
        </div>
    )
}