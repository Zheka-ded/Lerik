// import { useEffect, useState } from 'react';
import './ProductsNav.scss';

export default function ProductsNav (props) {

    const { products } = props;

    // const [cat, setCat] = useState(null)

    console.log(products);

    let productsSet = new Set();

    products?.map(elem => productsSet.add(elem.product));

    console.log(productsSet);
    productsSet = [...productsSet];
    
    // setCat(productsSet)

    // useEffect(() => {
    // },[])

    console.log(productsSet);

    return (
        <div className="ProductsNav">
            <p className="ProductsNav__title"> Категории товаров </p>

            <ul>
                {productsSet && productsSet.map(elem => (
                    <li key={elem} ><button>{elem}</button></li>
                ))}
            </ul>

            {/* <ul>
                {cat !== null && cat.map(elem => (
                    <li key={elem} ><button>{elem}</button></li>
                ))}
            </ul> */}


        </div>
    )
}