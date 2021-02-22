import {BrowserRouter as Router} from 'react-router-dom';
import useRoutes from '../../routes';
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import { useState } from 'react';
import useHttp from '../../hooks/http.hook';
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

import './App.scss';

import Nav from '../nav/Nav';
import Logo from '../logo/Logo';
import ProductsNav from '../productsNav/ProductsNav';


export default function Appp () {
    
    const routes = useRoutes(true)

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const { request } = useHttp();

    const [products, setProducts] = useState(null);

    async function allProducts () {
        try {
            const fetched = await request('/api/product/loading', 'GET', null);
            setProducts(fetched);
        } catch (e) {
            
        }
    }
    // Не правильно тут
    useState(() => {
        allProducts()
    }, [allProducts])

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return (
        <Router>
            <div className="App">
                <div className="App__wrap">
                    <div className="App__top">
                        <Logo/>
                        <Nav/>
                    </div>
                    <div className="App__center">
                        <ProductsNav products={products} />
                        {routes}
                    </div>
                </div>
            </div>
        </Router>
    )
}