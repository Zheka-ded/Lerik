import { useCallback, useEffect, useState } from 'react';
// import ProductsSubNav from '../productsSubNav/ProductsSubNav';
import './ProductsNav.scss';

export default function ProductsNav (props) {

    const { products } = props;

    // категория продуктов
    const [categoryProducts, setCategoryProducts] = useState(null);
    // категория продуктов по которой был клик
    // для проверки на вложенность третьего уровня
    const [prevCategoryProduct, setPrevCategoryProduct] = useState(null);
    // подкатегория третьего уровня
    const [subcategoryThirdLevel, setSubcategoryThirdLevel] = useState([]);
    /**
     *  Все перепроверить и дать нормальные имена 
     */
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
     * initial category, начальные/основные категории
     * "mainProductCategories" это основные категории товаров
     */
    const initialCategory = useCallback((mainProductCategories) => {
        
        // Делаем выборку уникальных значений категорий товаров
        let productsSet = new Set();
     
        mainProductCategories?.map(elem => productsSet.add(elem.product));

        // console.log(productsSet);

        productsSet = [...productsSet];
        // записываем значения в категорию
        setCategoryProducts(productsSet);
        // обнуляем значения выбраной категории
        setPrevCategoryProduct(null)
        setSubcategoryThirdLevel([])

    }, [])
        // console.log(categoryProducts)

    /**
     * Фильтр по категориям товаров
     * "filteredProducts" фильтрованные продукты
     *  подкатегории/вложенность второго уровня
     */
    const filterProducts = useCallback((selectedProduct) => {
        
        const filteredProducts = products.filter((item) => item.product === selectedProduct );

        let productsSet = new Set();
     
        filteredProducts?.map(elem => productsSet.add(elem.category));

        // console.log(productsSet);
        productsSet = [...productsSet];
        
        
        setCategoryProducts(productsSet)

        setPrevCategoryProduct(selectedProduct)
        
        console.log("filteredProducts", filteredProducts);

    }, [products])


    // Перебираем массив "products" и показываем товары у которых есть категория третьего уровня вложенности
    function showSubcategoryThirdLevel (elem) {
        /**
         * Сравниваю элемент по которому был клик с элементом основной категории, с элементом подкатегории
         * и проверяю есть ли у него категория третьего уровня вложенности
         * setSubcategoryThirdLevel
         */
        const filteredProducts = products.filter(
            (item) => item.product === prevCategoryProduct && item.subcategory && item.category === elem
        );

        
        let productsSet = new Set();
     
        filteredProducts?.map(elem => productsSet.add(elem.subcategory));

        productsSet = [...productsSet];
        console.log(filteredProducts)
        setSubcategoryThirdLevel(productsSet)
    }

    useEffect(() => {
        initialCategory(products)
    },[initialCategory, products])

    console.log("categoryProducts", categoryProducts);
    console.log('subcategoryThirdLevel', subcategoryThirdLevel);
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return (
        <div className="ProductsNav">
            <p className="ProductsNav__title"> Категории товаров </p>

            <ul className="ProductsNav__list">
                {categoryProducts !== null && categoryProducts.map(categoryName => (
                    /**
                     * onClick передаем в "filterProducts" имя/название категории по которой мы отфильтруем
                     * нужные нам товары
                     * onMouseEnter/onMouseMoveCapture если выбрана подкатегория "prevCategoryProduct" то показываем подменю
                     */
                    <li key={categoryName} >
                        <button onMouseEnter={() => prevCategoryProduct !== null ? showSubcategoryThirdLevel(categoryName) : null }
                                onClick={() => filterProducts(categoryName)} >{categoryName}</button>
                    </li>
                ))}
                {/* если есть 3-й уровень вложенности выводим меню */}
                {subcategoryThirdLevel.length > 0 ? (
                    <ul className="ProductsNav__sublist">
                        {subcategoryThirdLevel.map(elem => (
                            <li key={elem} > <button> {elem} </button> </li>
                        ))}
                    </ul>
                ) : null }

                {/* Обнуляем значения "initialCategory"  */}
                <li><button onClick={() => initialCategory(products)} >Все категории</button></li>
            </ul>


        </div>
    )
}

// {subcategoryThirdLevel.length > 0 ? (
//                             <ul className="ProductsNav__sublist">
//                                 {subcategoryThirdLevel.map(elem => (
//                                     <li key={elem} > <button> {elem} </button> </li>
//                                 ))}
//                             </ul>
//                         ) : null }