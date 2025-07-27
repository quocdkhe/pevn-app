import { createWebHistory, createRouter } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

const routes = [
  {
    name: 'Home page',
    path: '/',
    component: HomeView,
  },
  {
    name: 'Login page',
    path: '/login',
    component: Login,
  },
  {
    name: 'Register page',
    path: '/register',
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
