import './Nav.scss';
import { Link } from 'react-router-dom';

export default function Nav () {

    return (
        <nav className="Nav">
            <ul>
                <li><Link to="/">Главная</Link></li>
                {/* <li><Link to="/category-goods">Категории товаров</Link></li>
                <li><Link to="/goods">Товары</Link></li> */}
                <li><Link to="/detail/:id">Детальнее</Link></li>
            </ul>
        </nav>
    )
}