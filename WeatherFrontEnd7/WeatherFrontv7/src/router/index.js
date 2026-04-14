import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

import HomeView from '../views/HomeView.vue';
import PronosticosView from '../views/PronosticosView.vue';
import LugarDetalleView from '../views/LugarDetalleView.vue';
import NewsView from '../views/NewsView.vue';
import AboutView from '../views/AboutView.vue';

// nuevas vistas para auth
import LoginView from '../views/LoginView.vue';
import FavoritesView from '../views/FavoritesView.vue';
import PreferencesView from '../views/PreferencesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/pronosticos',
      name: 'pronosticos',
      component: PronosticosView,
    },
    {
      path: '/pronosticos/:country/:city',
      name: 'lugar-detalle',
      component: LugarDetalleView,
      props: true,
    },
    {
      path: '/news',
      name: 'news',
      component: NewsView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },

    // ---------- auth ----------
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/favoritos',
      name: 'favoritos',
      component: FavoritesView,
      meta: { requiresAuth: true },
    },
    {
      path: '/preferencias',
      name: 'preferencias',
      component: PreferencesView,
      meta: { requiresAuth: true },
    },
  ],
});

// guard global para rutas protegidas
router.beforeEach((to, from) => {
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth);
  const isAuth = store.getters['auth/isAuthenticated'];

  if (requiresAuth && !isAuth) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }

  // si no devolvemos nada, la navegación continúa
  return true;
});

export default router;