import {useContext, useEffect, useState} from 'react';
import { useHttp } from '../../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';

import './AuthPage.scss';

export default function AuthPage () {
    const auth = useContext(AuthContext);
    
    // TODO: check setHelloName
    // const [helloName, setHelloName] = useState('')
    
    const { loading, request, error, clearError} = useHttp();
    
    const [form, setForm] = useState({
        'name': '', 'email':'', 'tel':'', 'password': '',
    });

    useEffect(() => {

        // Выводит конкретные ошибки в консоль
        // console.log(error)
        clearError()
    }, [error, clearError])

    function changeHandler (e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // Регистрация
    async function registerHandler () {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});

            console.log('Data', data)
        } catch (e) {

        }
    }

    // Выход
    async function logoutHandler () {
        auth.logout()
    }

    // Вход
    async function loginHandler () {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            // console.log('Data', data);

            auth.login(data.token, data.adminId)
            // TODO: check setHelloName
            // setHelloName(form.name)
        } catch (e) {
            
        }
    }


    return (
        <div className="AuthPage">
            {/* {auth.isAuthenticated ? <h1>Привет {helloName}</h1> : <h1>Вы точно админ?</h1>} */}
            {auth.isAuthenticated ? <h1>Привет</h1> : <h1>Вы точно админ?</h1>}
            
            <div className="AuthPage__form-wrap">
                <form>
                    <input type="text" name="name" placeholder="Имя" onChange={changeHandler} />
                    <input type="email" name="email" placeholder="Почта" onChange={changeHandler} />
                    <input type="tel" name="tel" placeholder="Номер телефона" onChange={changeHandler} />
                    <input type="password" name="password" placeholder="Пароль" onChange={changeHandler} />
                    <button type="submit" onClick={loginHandler} disabled={loading} >Вход</button>
                    {auth.isAuthenticated && <>
                        <button type="submit" onClick={logoutHandler} disabled={loading} >Выход</button>
                        <button type="submit" onClick={registerHandler} disabled={loading} >Регистрация</button>
                    </>}
                </form>
            </div>
        </div>
    )
}