import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '../components/Home.vue';
import LoginComponent from '../components/login/login.vue';
import PreviewComponent from '../components/utils/PreviewComponent.vue';


const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent
  },
  {
    path: '/preview/:id',
    name: 'Preview',
    component: PreviewComponent
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: HomeComponent,
    meta: { requiresAuth: true }
  },
  // Agrega más rutas aquí
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('accessToken');
  console.log('isAuthenticated: ', to.meta.requiresAuth && !isAuthenticated);
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});



export default router;
