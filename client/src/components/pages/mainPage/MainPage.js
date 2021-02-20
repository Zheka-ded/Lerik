import './MainPage.scss';
import useHttp from '../../../hooks/http.hook';
import { useState } from 'react';

// import { Link } from 'react-router-dom';

export default function MainPage () {

    const { request } = useHttp();

    const [data, setData] = useState(null)

    useState(() => {
        allProducts();
    }, [])

    async function allProducts () {
        try {
            const data = await request('/api/product/loading', 'GET');
            setData(data);
        } catch (e) {
            
        }
    }

    // product()


    console.log(data)

    

    return (
        <div className="MainPage">
            <h1>MainPage</h1>
            
            {/* <ul>
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/category-goods">Категории товаров</Link></li>
                <li><Link to="/goods">Товары</Link></li>
                <li><Link to="/detail/:id">Детальнее</Link></li>
            </ul> */}
        </div>
    )
}