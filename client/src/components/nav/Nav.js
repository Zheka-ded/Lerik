import './Nav.scss';
import { Link } from 'react-router-dom';

export default function Nav () {

    return (
        <nav className="Nav">
            <ul>
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/delivery-and-payment">Доставка и оплата</Link></li>
                <li><Link to="/sewing">Пошив штор</Link></li>
                <li><Link to="/dimension">Замер</Link></li>
                <li><Link to="/articles">Статьи</Link></li>
                <li><Link to="/contacts">Контакты</Link></li>
                {/* <li><Link to="/detail/:id">Детальнее</Link></li> */}
            </ul>
        </nav>
    )
}