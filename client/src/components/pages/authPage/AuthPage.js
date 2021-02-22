import {useEffect, useState} from 'react';
import useHttp from '../../../hooks/http.hook';

import './AuthPage.scss';

export default function AuthPage () {

    const { loading, request, error } = useHttp();
    
    const [form, setForm] = useState({
        'name': '', 'email':'', 'tel':'', 'password': '',
    });

    useEffect(() => {

    }, [error])

    function changeHandler (e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function registerHandler () {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            console.log('Data', data)
        } catch (e) {

        }
    }

    async function loginHandler () {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            console.log('Data', data)
        } catch (e) {

        }
    }


    return (
        <div className="AuthPage">
            <h1>Вы точно админ?</h1>
            <h2>Докажи, пройди семь кругов ада авторизации</h2>
            <div className="AuthPage__form-wrap">
                <form>
                    <input type="text" name="name" placeholder="Имя" onChange={changeHandler} />
                    <input type="email" name="email" placeholder="Почта" onChange={changeHandler} />
                    <input type="tel" name="tel" placeholder="Номер телефона" onChange={changeHandler} />
                    <input type="password" name="password" placeholder="Пароль" onChange={changeHandler} />
                    <button type="submit" onClick={loginHandler} disabled={loading} >Ща проверим</button>
                    <button type="submit" onClick={registerHandler} disabled={loading} >Регистрация</button>
                </form>
            </div>
            <h3>И не забудь прикрепить справку с анализами</h3>
        </div>
    )
}