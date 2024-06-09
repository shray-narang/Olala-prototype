import {createBrowserRouter} from 'react-router-dom';
import Home from '../layouts/home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
]);

export default router;