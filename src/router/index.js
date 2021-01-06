import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/activities/Home.vue'
import Activity from '../views/activities/Activity.vue'
import Login from '../views/authorization/Login.vue'
import Register from '../views/authorization/Register.vue'

const routes = [
  {
    path: '/',
    redirect: "/home",
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: "/activity",
    component: Activity,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
