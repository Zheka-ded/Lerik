import { useState } from 'react';

import useHttp from '../../../hooks/http.hook';

import './MainPage.scss';

export default function MainPage () {

    const { request } = useHttp();

    const [data, setData] = useState(null);

    async function allProducts () {
        try {
            const fetched = await request('/api/product/loading', 'GET', null);
            setData(fetched);
        } catch (e) {
            
        }
    }
    // Не правильно тут
    useState(() => {
        allProducts()
    }, [allProducts])

    console.log(data);

    return (
        <div className="MainPage">
            <h1>MainPage</h1>

            {data !== null && data.map(elem => (
                <div key={elem._id} ><h2>{elem.title}</h2></div>
            ))}

        </div>
    )
}