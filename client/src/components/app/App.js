import {BrowserRouter as Router} from 'react-router-dom';
import useRoutes from '../../routes';
import './App.scss';


export default function Appp () {
    
    const routes = useRoutes(true)

    return (
        <Router>
            <div className="App">
                {routes}
            </div>
        </Router>
    )
}