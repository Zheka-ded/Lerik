import {BrowserRouter as Router} from 'react-router-dom';
import useRoutes from '../../routes';

import './App.scss';

import Nav from '../nav/Nav';
import Logo from '../logo/Logo';


export default function Appp () {
    
    const routes = useRoutes(true)

    return (
        <Router>
            <div className="App">
                <div className="App__wrap">
                    <div className="App__top">
                        <Logo/>
                        <Nav/>
                    </div>
                    {routes}
                </div>
            </div>
        </Router>
    )
}