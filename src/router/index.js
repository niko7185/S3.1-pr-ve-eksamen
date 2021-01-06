import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/activities/Home.vue'
import Activities from '../views/activities/Activities.vue'
import AddActivity from '../views/activities/AddActivity.vue'
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
    path: "/activities",
    component: Activities,
    beforeEnter(to, _, next) {
      next(to.fullPath.slice("/activities".length, to.fullPath.length).length >= 2);
    },
    children: [
      {
        path: "add",
        component: AddActivity,
      }
    ]
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
