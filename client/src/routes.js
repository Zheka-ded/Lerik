import { Switch, Route, Redirect } from 'react-router-dom';
import AdminPage from './components/pages/adminPage/AdminPage';
import DetailPage from './components/pages/detailPage/DetailPage';
import MainPage from './components/pages/mainPage/MainPage';
import CategoryPage from './components/pages/categoryPage/CategoryPage';
import GoodsPage from './components/pages/goodsPage/GoodsPage';
import AuthPage from './components/pages/authPage/AuthPage';

export default function useRoutes (isAuthenticated) {
    if (isAuthenticated){
        return (
            <Switch>

                <Route path="/admin" exact>
                    <AdminPage />
                </Route>
                
                <Redirect to="/" />

            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <MainPage />
            </Route>

            <Route path="/category-goods" exact>
                <CategoryPage />
            </Route>

            <Route path="/goods" exact>
                <GoodsPage />
            </Route>

            <Route path="/detail/:id">
                <DetailPage />
            </Route>
            
            <Route path="/auth" exact>
                <AuthPage />
            </Route>

            <Redirect to="/" />

        </Switch>
    )
}





// export default function useRoutes () {

// }