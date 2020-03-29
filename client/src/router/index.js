import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/SignIn',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/User',
    name: 'User',
    component: ()=> import('../views/User.vue')
  },
  {
    path: '/About',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/BmiCalculator',
    name: 'BmiCalculator',
    component: ()=> import('../views/BmiCalculator.vue')
  },
  {
    path: '/FindPeople',
    name: 'FindPeople',
    component: ()=> import('../views/FindPeople.vue')
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
