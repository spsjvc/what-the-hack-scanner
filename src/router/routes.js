
import Login from 'Components/auth/login.component';
import Register from 'Components/auth/register.component';
import Home from 'Components/home.component';
import Welcome from 'Components/welcome.component';

export const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome,
    meta: {
      guest: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      guest: true,
    },
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      logged: true,
    },
  },
];
