import {useState, useEffect, useContext} from 'react';
import { useHttp } from '../../../hooks/http.hook';
import { ProductsContext } from '../../context/ProductsContext';

import './AdminPage.scss';

export default function AdminPage () {

    const { category, showCategory, subCategory, showSubCategory, products, showProducts } = useContext(ProductsContext);

    const { loading, request, error } = useHttp();

    const [categoryName, setCategoryName] = useState({
        'title': ''
    })

    const [subCategoryName, setSubCategoryName] = useState({
        'title': ''
    })

    const [product, setProduct] = useState({
        'parent': '', 'title': '', 'cod': '', 'price': '', 'sale': '', 'img': '', 'description': '', 'date': new Date().toLocaleString('ua-UA'),
    })
    
    const [subProduct, setSubProduct] = useState({
        'parent': '', 'title': '', 'cod': '', 'price': '', 'sale': '', 'img': '', 'description': '', 'date': new Date().toLocaleString('ua-UA'),
    })
    

    function changeHandlerCategory (e) {
        setCategoryName({ ...categoryName, [e.target.name]: e.target.value });
    }

    
    async function createCategory (e) {
        // e.preventDefault();
        try {
            const data = await request('/api/category/createCategory', 'POST', {...categoryName});
            console.log('Data', data)
            console.log('categoryName', categoryName)
            showCategory()
        } catch (e) {

        }
    }
    

    function changeHandlerSubCategory (e) {
        setSubCategoryName({ ...subCategoryName, [e.target.name]: e.target.value });
    }

    
    async function createSubCategory (e) {
        // e.preventDefault();
        try {
            const data = await request('/api/subCategory/createSubCategory', 'POST', {...subCategoryName});
            console.log('Data', data)
            console.log('subCategoryName', subCategoryName)
            showSubCategory()
        } catch (e) {

        }
    }


    function changeHandlerProduct (e) {
        setProduct({ ...product, [e.target.name]: e.target.value})
    }

    async function createProduct (e) {
        // e.preventDefault();
        try {
            const data = await request('/api/products/createProduct', 'POST', {...product});
            console.log('Data', data)
            console.log('product', product)
            showProducts()
        } catch (e) {

        }
    }

    function changeHandlerSubProduct (e) {
        setSubProduct({ ...subProduct, [e.target.name]: e.target.value})
    }

    async function createSubProduct (e) {
        // e.preventDefault();
        try {
            const data = await request('/api/subProducts/createSubProduct', 'POST', {...subProduct});
            console.log('Data', data)
            console.log('SUBProduct', subProduct)
        } catch (e) {

        }
    }
    
    useEffect(() => {
        
    }, [error])

    return (
        <div className="AdminPage">
            <div className="AdminPage__form-wrap">

                <form>
                    <h3> Название категории </h3>
                    <input type="text" name="title" placeholder="Основная категория" onChange={changeHandlerCategory} />
                    <button type="submit" onClick={createCategory} disabled={loading} >Добавить категорию</button>
                </form>

                <form>
                    <h3> Название подкатегории </h3>
                    <select name="parent" id="" onChange={changeHandlerSubCategory}>
                        <option value="default">Выберите категорию</option>
                        {category !== null && category?.map(elem => (
                            <option key={elem._id} value={elem._id}>{elem.title}</option>
                        ))}
                    </select>
                    <input type="text" name="title" placeholder="Название подкатегории" onChange={changeHandlerSubCategory} />
                    <button type="submit" onClick={createSubCategory} disabled={loading} >Добавить подкатегорию</button>
                </form>
                
                <form encType="multipart/form-data">
                    <h3> Описание товара </h3>
                    <select name="parent" id="" onChange={changeHandlerProduct}>
                        <option value="default">Выберите категорию</option>
                        {subCategory !== null && subCategory?.map(elem => (
                            <option key={elem._id} value={elem._id}>{elem.title}</option>
                        ))}
                    </select>

                    <input type="text" name="title" placeholder="title" onChange={changeHandlerProduct} />
                    <input type="text" name="cod" placeholder="cod" onChange={changeHandlerProduct} />
                    <input type="text" name="price" placeholder="price" onChange={changeHandlerProduct} />
                    <input type="number" name="sale" placeholder="sale" onChange={changeHandlerProduct} />
                    <input type="text" name="img" placeholder="img" onChange={changeHandlerProduct} />
                    <input type="text" name="description" placeholder="description" onChange={changeHandlerProduct} />
                    <button type="submit" onClick={createProduct} disabled={loading} >Добавить товар</button>
                </form>

                
                <form encType="multipart/form-data">
                    <h3> Описание подтовара </h3>

                    <select name="parent" id="" onChange={changeHandlerSubProduct}>
                        <option value="default">Выберите товар</option>
                        {products !== null && products?.map(elem => (
                            <option key={elem._id} value={elem._id}>{elem.title}</option>
                        ))}
                    </select>

                    <input type="text" name="title" placeholder="title" onChange={changeHandlerSubProduct} />
                    <input type="text" name="cod" placeholder="cod" onChange={changeHandlerSubProduct} />
                    <input type="text" name="price" placeholder="price" onChange={changeHandlerSubProduct} />
                    <input type="number" name="sale" placeholder="sale" onChange={changeHandlerSubProduct} />
                    <input type="text" name="img" placeholder="img" onChange={changeHandlerSubProduct} />
                    <input type="text" name="description" placeholder="description" onChange={changeHandlerSubProduct} />
                    <button type="submit" onClick={createSubProduct} disabled={loading} >Добавить товар</button>
                </form>

            </div>
        </div>
    )
}