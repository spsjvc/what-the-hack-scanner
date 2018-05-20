
import Login from 'Components/auth/login.component';
import Register from 'Components/auth/register.component';
import QRReader from 'Components/qr-reader.component';
import AdminPanel from 'Components/admin-panel.component.vue';

export const routes = [
  {
    path: '/',
    name: 'welcome',
    component: QRReader,
    // meta: {
    //   guest: true,
    // },
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPanel,
    // meta: {
      // guest: true,
    // },
  },
  {
    path: '/read',
    name: 'read',
    component: QRReader,
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
    component: QRReader,
    meta: {
      logged: true,
    },
  },
];
