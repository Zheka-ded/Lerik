import { useCallback, useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../context/ProductsContext'

import './ProductsNav.scss';

export default function ProductsNav () {

    const { category, subCategory, products, subProducts} = useContext(ProductsContext);
    
    const [categoryProducts, setCategoryProducts] = useState(null);

    const [showBtnBack, setShowBtnBack] =useState(false);

    // const [selectedProducts, setSelectedProducts] = useState(null);

    const initialCategory = useCallback((category) => {
        setCategoryProducts(category)
        setShowBtnBack(false)
    }, []);

    const selectedCategory = item => {

        setShowBtnBack(true)

        let check;

        showBtnBack ? check = products : check = subCategory

        let categories = check.filter(elem => elem.parent === item._id);
        setCategoryProducts(categories)
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
                        <button onClick={() => selectedCategory(elem)}> {elem.title} </button>
                    </li>
                ))}
                
                {showBtnBack && (
                    <li>
                        <button onClick={() => initialCategory(category)} >Назад</button>
                    </li>
                )}
            </ul>

        </div>
    )
}
