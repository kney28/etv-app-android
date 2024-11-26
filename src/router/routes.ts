import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Index', component: () => import('pages/IndexPage.vue') },
      { path: '/main', name: 'Main', component: () => import('pages/MainPage.vue') },
      { path: '/config/Config', name: 'Config', component: () => import('pages/config/ConfigPage.vue') },
      { path: '/formats/F-EV-04', name: 'F-EV-04', component: () => import('pages/formats/F-EV-04/F-EV-04Page.vue') },
      { path: '/share', name: 'Share', component: () => import('pages/share/SharePage.vue') },
    ],
  },
  { path: '/login', name: 'login', component: () => import('pages/auth/LoginPage.vue') },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
