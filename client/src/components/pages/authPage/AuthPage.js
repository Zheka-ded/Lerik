import './AuthPage.scss';

export default function AuthPage () {

    return (
        <div className="AuthPage">
            <h1>Вы точно админ?</h1>
            <h2>Докажи, пройди семь кругов ада авторизации</h2>
            <div className="AuthPage__form-wrap">
                <form>
                    <input type="text" name="admin-name" placeholder="Имя"/>
                    <input type="email" name="admin-email" placeholder="Почта"/>
                    <input type="tel" name="admin-tel" placeholder="Номер телефона"/>
                    <input type="password" name="admin-password" placeholder="Пароль"/>
                    <button type="submit">Ща проверим</button>
                </form>
            </div>
            <h3>И не забудь прикрепить справку с анализами</h3>
        </div>
    )
}