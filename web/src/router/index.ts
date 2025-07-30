import { createWebHistory, createRouter } from 'vue-router';
import HomeView from '@/layouts/HomeView.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Dashboard from '@/views/Dashboard.vue';
import Profile from '@/views/Profile.vue';

const routes = [
  {
    name: 'Home page',
    path: '/',
    component: HomeView,
    children: [
      {
        name: 'Dashboard',
        path: '',
        component: Dashboard,
      },
      {
        name: 'Profile',
        path: '/profile',
        component: Profile,
      },
    ],
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
