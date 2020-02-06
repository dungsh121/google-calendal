import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';



export const routes = [
    {
        path: '/',
        name: Home,
        component: Home,

    },
    {
        path: '/login',
        name: Login,
        component: Login,
        requiresLogin: true
    },
    {
        path: '/register',
        name: Register,
        component: Register,
    }
];


