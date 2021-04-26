import { useCallback, useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../context/ProductsContext'

import './ProductsNav.scss';

export default function ProductsNav () {

    const { products, setSelectProducts, setSelectedCategoryName } = useContext(ProductsContext);
    // const [productList, setProductList] = useState(null);
    // категория продуктов
    const [categoryProducts, setCategoryProducts] = useState(null);
    // категория продуктов по которой был клик
    // для проверки на вложенность третьего уровня
    const [prevCategoryProduct, setPrevCategoryProduct] = useState(null);
    // подкатегория третьего уровня
    const [subcategoryThirdLevel, setSubcategoryThirdLevel] = useState([]);
    /**
     * initial category, начальные/основные категории
     * "mainProductCategories" это основные категории товаров
     */
    const initialCategory = useCallback((products) => {
        /**
         * Спасло? 
         * https://ru.stackoverflow.com/questions/575435/%D0%98%D0%B7-%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2%D0%B0-%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BE%D0%B2-javascript-%D1%81%D0%BE%D1%85%D1%80%D0%B0%D0%BD%D0%B8%D1%82%D1%8C-%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D1%8B-%D1%81-%D0%BD%D0%B5%D0%BF%D0%BE%D0%B2%D1%82%D0%BE%D1%80%D1%8F%D1%8E%D1%89%D0%B8%D0%BC%D0%B8%D1%81%D1%8F-%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8
         * Посмотрим...
         */
        let category = products?.reduce((acc, prod) => {
            if (acc.map[prod.product]) // если данный товар-категория уже был
              return acc; // ничего не делаем, возвращаем уже собранное
        
            acc.map[prod.product] = true; // помечаем товар, как обработанный
            acc.category.push(prod); // добавляем объект в массив товаров
            return acc; // возвращаем собранное
          }, {
            map: {}, // здесь будут отмечаться обработанные товары
            category: [] // здесь конечный массив уникальных товаров
          })
          .category; // получаем конечный массив
        
        setCategoryProducts(category);
        // console.log(category)
        // // обнуляем значения выбраной категории
        setPrevCategoryProduct(null)
        setSubcategoryThirdLevel([])
        setSelectedCategoryName('Все категории')
        setSelectProducts(products)

    }, [setSelectProducts, setSelectedCategoryName]);

    /**
     * Фильтр по категориям товаров
     * "filteredProducts" фильтрованные продукты
     *  подкатегории/вложенность второго уровня
     */
    const filterProducts = useCallback((selectedProduct) => {

        const filteredProducts = products.filter((item) => item.product === selectedProduct.product);
        // console.log('смотрим что покажет', filteredProducts)
        
        let category = filteredProducts?.reduce((acc, prod) => {
            if (acc.map[prod.category])
              return acc;
        
            acc.map[prod.category] = true;
            acc.category.push(prod);
            return acc;
          }, {
            map: {},
            category: []
          })
          .category;
        
        setCategoryProducts(category)
        // console.log(category)

        setPrevCategoryProduct(selectedProduct)


    }, [products])

    // Перебираем массив "products" и показываем товары у которых есть категория третьего уровня вложенности
    function showSubcategoryThirdLevel (selectedProduct) {
        /**
         * Сравниваю элемент по которому был клик с элементом основной категории, с элементом подкатегории
         * и проверяю есть ли у него категория третьего уровня вложенности
         * setSubcategoryThirdLevel
         */
        const filteredProducts = products.filter(
            (item) => item.product === prevCategoryProduct.product && item.subcategory && item.category === selectedProduct.category
        );
        // console.log('смотрим что покажет', filteredProducts)
        
        let category = filteredProducts?.reduce((acc, prod) => {
            if (acc.map[prod.subcategory])
              return acc;
        
            acc.map[prod.subcategory] = true;
            acc.category.push(prod);
            return acc;
          }, {
            map: {},
            category: []
          })
          .category

        setSubcategoryThirdLevel(category);
        // console.log(category)

    }
    // Закрываем подменю третей категории
    function closeSubcategoryThirdLevel () {
        setSubcategoryThirdLevel([])
    }

    function showProduct(item){

        // console.log(products)

        const prod = products.filter((elem) => elem.product === item);

        console.log('prod ',prod)
        console.log('item ', item)
        // setProductList(prod)
        // console.log(productList)
        setSelectedCategoryName(item)
        setSelectProducts(prod)
    }

    
    function showCategory(item){

        // console.log(products)

        const prod = products.filter((elem) => elem.category === item);

        console.log('category ',prod)
        console.log('item ', item)
        // setProductList(prod)
        // console.log(productList)
        setSelectedCategoryName(item)
        setSelectProducts(prod)
    }
    function showSubCategory(item){

        // console.log(products)

        const prod = products.filter((elem) => elem.subcategory === item);

        console.log('subcategory ',prod)
        console.log('item ', item)
        // setProductList(prod)
        // console.log(productList)
        setSelectedCategoryName(item)
        setSelectProducts(prod)
    }

    useEffect(() => {
        initialCategory(products)
    },[initialCategory, products])


    // console.log(productList)
    return (
        <div className="ProductsNav">
            <p className="ProductsNav__title"> Категории товаров </p>

            <ul className="ProductsNav__list">
                
                {categoryProducts !== null && categoryProducts?.map(categoryName => (
                    /**
                     * onClick передаем в "filterProducts" имя/название категории по которой мы отфильтруем
                     * нужные нам товары
                     * onMouseEnter/onMouseMoveCapture если выбрана подкатегория "prevCategoryProduct" то показываем подменю
                     */
                    prevCategoryProduct === null ? (
                        <li key={categoryName._id} >
                            <button onClick={() => {
                                showProduct(categoryName.product)
                                filterProducts(categoryName)}} >{categoryName.product}</button>
                        </li>
                    ) : (
                        // если есть 3-й уровень вложенности выводим меню
                        categoryName.subcategory ? (
                            <li key={categoryName._id} className="ProductsNav__subCategory">
                                <button onClick={() => showCategory(categoryName.category)} onMouseEnter={() => showSubcategoryThirdLevel(categoryName)} >{categoryName.category}</button>
                            {/* Если совпадают имена категорий то выводим меню третьего уровня нужной нам категории */}
                            {categoryName.category === subcategoryThirdLevel[0]?.category && (
                                <ul className="ProductsNav__sublist"  onMouseLeave={closeSubcategoryThirdLevel} >
                                    {subcategoryThirdLevel.map(elem => (
                                        <li key={[elem.__id,elem.title,elem.subcategory]}> <button onClick={() => showSubCategory(elem.subcategory)}> {elem.subcategory} </button> </li>
                                    ))}
                                </ul>
                            )}
                            </li>
                        ) : (
                            <li key={categoryName._id} onMouseEnter={closeSubcategoryThirdLevel} >
                                <button onClick={() => showCategory(categoryName.category)}>{categoryName.category}</button>
                            </li>
                        )
                    )
                ))}
                <li onMouseEnter={closeSubcategoryThirdLevel} >
                    {/* Обнуляем значения "initialCategory"  */}
                    <button onClick={() => initialCategory(products)} >Все категории</button>
                </li>
            </ul>

        </div>
    )
}
