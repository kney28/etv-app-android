import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/IndexPage.vue') },
      { path: 'encuestalarvaria', name: 'encuestalarvaria', component: () => import('pages/encuesta-larvaria/EncuestaPage.vue') },
      { path: 'etv/FV-EV-04', name: 'etv-FV-EV-04', component: () => import('pages/etv/FV-EV-04Page.vue') }
    ],
  },
  {
    path: '/auth',
    name: 'login',
    component: () => import('pages/auth/LoginPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
