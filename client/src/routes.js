import { Switch, Route, Redirect } from 'react-router-dom';
import AdminPage from './components/pages/adminPage/AdminPage';
// import DetailPage from './components/pages/detailPage/DetailPage';
import MainPage from './components/pages/mainPage/MainPage';
import DeliveryPaymentPage from './components/pages/deliveryPaymentPage/DeliveryPaymentPage';
import SewingPage from './components/pages/sewingPage/SewingPage';
import AuthPage from './components/pages/authPage/AuthPage';
import DimensionPage from './components/pages/dimensionPage/DimensionPage';
import ArticlesPage from './components/pages/articlesPage/ArticlesPage';
import ContactsPage from './components/pages/contactsPage/ContactsPage';



export const useRoutes = isAuthenticated => {
    
    if (isAuthenticated) {
        
        return (
            <Switch>
                
                <Route path="/" exact>
                    <MainPage />
                </Route>

                <Route path="/delivery-and-payment" exact>
                    <DeliveryPaymentPage />
                </Route>

                <Route path="/sewing" exact>
                    <SewingPage />
                </Route>
                
                <Route path="/dimension" exact>
                    <DimensionPage />
                </Route>

                <Route path="/articles" exact>
                    <ArticlesPage />
                </Route>
                
                <Route path="/contacts" exact>
                    <ContactsPage />
                </Route>

                {/* <Route path="/detail/:id">
                    <DetailPage />
                </Route> */}
                
                <Route path="/auth" exact>
                    <AuthPage />
                </Route>

                <Route path="/admin" exact>
                    <AdminPage />
                </Route>
                
                {/* <Redirect to="/" /> */}
                <Redirect to="/admin" />

            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <MainPage />
            </Route>

            <Route path="/delivery-and-payment" exact>
                <DeliveryPaymentPage />
            </Route>

            <Route path="/sewing" exact>
                <SewingPage />
            </Route>
            
            <Route path="/dimension" exact>
                <DimensionPage />
            </Route>

            <Route path="/articles" exact>
                <ArticlesPage />
            </Route>

            <Route path="/contacts" exact>
                <ContactsPage />
            </Route>

            {/* <Route path="/detail/:id">
                <DetailPage />
            </Route> */}
            
            <Route path="/auth" exact>
                <AuthPage />
            </Route>

            <Redirect to="/" />

        </Switch>
    )
}
