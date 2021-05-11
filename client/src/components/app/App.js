import {BrowserRouter as Router} from 'react-router-dom';
import { useState } from 'react';
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import { useRoutes } from '../../routes';
import { useHttp } from '../../hooks/http.hook';
import { useAuth } from '../../hooks/auth.hook';
import { AuthContext } from '../context/AuthContext';
import { ProductsContext } from '../context/ProductsContext'
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import Nav from '../nav/Nav';
import Logo from '../logo/Logo';
import ProductsNav from '../productsNav/ProductsNav';

import './App.scss';



export default function App () {

    const {token, login, logout, adminId} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const { request } = useHttp();

    const [category, setCategory] = useState(null);
    const [subCategory, setSubCategory] = useState(null);
    const [products, setProducts] = useState(null);
    const [subProducts, setSubProducts] = useState(null);

    async function showCategory () {
        try {
            const fetched = await request('/api/category/loading', 'GET', null);
            // console.log('Category' ,fetched)
            setCategory(fetched);
        } catch (e) {
            
        }
    }

    async function showSubCategory () {
        try {
            const fetched = await request('/api/subCategory/loading', 'GET', null);
            // console.log('SUBCategory', fetched)
            setSubCategory(fetched);
        } catch (e) {
            
        }
    }

    async function showProducts () {
        try {
            const fetched = await request('/api/products/loading', 'GET', null);
            // console.log('Products', fetched)
            setProducts(fetched);
        } catch (e) {
            
        }
    }

    async function showSubProducts () {
        try {
            const fetched = await request('/api/subProducts/loading', 'GET', null);
            // console.log('SUBProducts', fetched)
            setSubProducts(fetched);
        } catch (e) {
            
        }
    }

    // Не правильно тут
    useState(() => {
        showCategory()
        showSubCategory()
        showProducts()
        showSubProducts()
    }, [showCategory, showSubCategory, showProducts, showSubProducts])

    // console.log(baseCategory)

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return (
        <ProductsContext.Provider value = {{ category, showCategory, subCategory, showSubCategory, 
                                            products, showProducts, subProducts, showSubProducts }}>

            <AuthContext.Provider value={{ token, login, logout, adminId, isAuthenticated }}>
                <Router>
                    <div className="App">
                        <div className="App__wrap">
                            <div className="App__top">
                                <Logo/>
                                <Nav/>
                            </div>
                            <div className="App__center">
                                <ProductsNav />
                                {routes}
                            </div>
                        </div>
                    </div>
                </Router>
            </AuthContext.Provider>
        </ProductsContext.Provider>
    )
}