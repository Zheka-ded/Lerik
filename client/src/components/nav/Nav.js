import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'

import './Nav.scss';

export default function Nav () {

    const auth = useContext(AuthContext);

    return (
        <nav className="Nav">
            <ul>
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/delivery-and-payment">Доставка и оплата</Link></li>
                <li><Link to="/sewing">Пошив штор</Link></li>
                <li><Link to="/dimension">Замер</Link></li>
                <li><Link to="/articles">Статьи</Link></li>
                <li><Link to="/contacts">Контакты</Link></li>

                {auth.isAuthenticated && <>
                    <li><Link to="/admin">Админ панель</Link></li>
                    <li><Link to="/auth">Авторизация</Link></li>
                </>}
                
                {/* <li><Link to="/detail/:id">Детальнее</Link></li> */}
            </ul>
        </nav>
    )
}