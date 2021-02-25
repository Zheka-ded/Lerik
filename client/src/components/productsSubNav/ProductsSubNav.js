import { useState, useCallback, useEffect } from 'react';
import './ProductsSubNav.scss';

/**
 * Херня какая-то получается
 * нужно пересмотреть это решение
 */

export default function ProductsSubNav (props) {

    const {product} = props;

    const [categoryThirdLevel, setCategoryThirdLevel] = useState(null);

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const setSubCategory = useCallback((mainProductCategories) => {
            
        // Делаем выборку уникальных значений категорий товаров
        let productsSet = new Set();
        
        mainProductCategories?.map(elem => productsSet.add(elem.subcategory));

            // console.log(productsSet);

        productsSet = [...productsSet];

        setCategoryThirdLevel(productsSet)
    }, []);
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    useEffect(() => {
        setSubCategory(product)
    },[setSubCategory, product])
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log(product)

    return (
        <ul>
            {categoryThirdLevel?.map(elem => <li key={elem} > <button>{elem}</button> </li> )}
        </ul>
    )
}