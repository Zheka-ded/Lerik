import {useContext} from 'react'
import './MainPage.scss';
import { ProductsContext } from '../../context/ProductsContext'

export default function MainPage () {

    
    const { selectProducts, selectedCategoryName } = useContext(ProductsContext);

    return (
        <div className="MainPage">
            <h1>Главная</h1>
            <h2> {selectedCategoryName} </h2>
            <br/>
            <ul>
                { selectProducts?.map(item => <li key={item._id}>{item.title}<span> - {item.category}</span> <br/><br/></li>)}
            </ul>
        </div>
    )
}