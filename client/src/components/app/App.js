import {BrowserRouter as Router} from 'react-router-dom';
import { useState } from 'react';
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import { useRoutes } from '../../routes';
import { useHttp } from '../../hooks/http.hook';
import { useAuth } from '../../hooks/auth.hook';
import { AuthContext } from '../context/AuthContext';
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
        <AuthContext.Provider value={{
            token, login, logout, adminId, isAuthenticated
        }}>
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
        </AuthContext.Provider>
    )
}