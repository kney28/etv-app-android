import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/IndexPage.vue') },
      { path: 'encuestalarvaria', name: 'encuestalarvaria', component: () => import('pages/encuesta-larvaria/EncuestaPage.vue') },
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
