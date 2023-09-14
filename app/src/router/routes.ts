import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/IndexPage.vue') },
      { path: '/etv/F-EV-04', name: 'F-EV-04', component: () => import('pages/etv/F-EV-04Page.vue') },
      { path: '/config/Config', name: 'Config', component: () => import('pages/config/ConfigPage.vue') }
    ],
  },
  { path: '/login', name: 'login',component: () => import('pages/auth/LoginPage.vue') },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
