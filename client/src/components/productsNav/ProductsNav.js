import { useCallback, useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../context/ProductsContext'

import './ProductsNav.scss';

export default function ProductsNav () {

    const { category, subCategory, products, subProducts } = useContext(ProductsContext);
    
    const [categoryProducts, setCategoryProducts] = useState(null);
    
    const [selectedProducts, setSelectedProducts] = useState(null);
    // подкатегория третьего уровня
    // const [subcategoryThirdLevel, setSubcategoryThirdLevel] = useState([]);
    /**
     * initial category, начальные/основные категории
     * "mainProductCategories" это основные категории товаров
     */

    // console.log(baseCategory)

    const initialCategory = useCallback((category) => {
        setCategoryProducts(category)
        // console.log(categoryProducts)
    }, []);

    const showShota = (shota) => {
        let x = subCategory.filter((elem) => elem.parent === shota._id);
        setCategoryProducts(x)
        x.map(elem => console.log(elem.title))
        console.log(shota)
    }


    useEffect(() => {
        initialCategory(category)
    },[initialCategory, category])


    return (
        <div className="ProductsNav">
            <p className="ProductsNav__title"> Категории товаров </p>

            <ul className="ProductsNav__list">
                {categoryProducts !== null && categoryProducts?.map(elem => (
                    <li key={elem._id}>
                        <button onClick={() => showShota(elem)}> {elem.title} </button>
                    </li>
                ))}
                
                <li>
                    <button onClick={() => initialCategory(category)} >Все категории</button>
                </li>
            </ul>

        </div>
    )
}
