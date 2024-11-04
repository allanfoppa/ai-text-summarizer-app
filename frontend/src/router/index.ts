import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import i18n from '../i18n'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/pt/home',
  },
  {
    path: '/:lang/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/:lang/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const locale: any = to.params.lang;

  if (!['pt', 'en'].includes(locale)) {
    return next(`/${i18n.global.locale.value}/home`);
  }

  if (i18n.global.locale !== locale) {
    i18n.global.locale = locale;
  }

  return next();
});

export default router
