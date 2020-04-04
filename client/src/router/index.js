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
    path: '/AccountSettings',
    name: 'AccountSettings',
    component: ()=> import('../views/AccountSettings.vue')
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
  {
    path: '/MyInputs',
    name: 'MyInputs',
    component: ()=> import('../views/MyInputs.vue')
  },
  {
    path: '/FriendList',
    name: 'FriendList',
    component: ()=> import('../views/FriendList.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
