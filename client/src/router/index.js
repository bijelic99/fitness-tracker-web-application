import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { needsAuth: false } 
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue'),
    meta: { needsAuth: false,
      needsToBeSignedOut: true }
  },
  {
    path: '/SignIn',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue'),
    meta: { needsAuth: false,
      needsToBeSignedOut: true  }
  },
  {
    path: '/AccountSettings',
    name: 'AccountSettings',
    component: ()=> import('../views/AccountSettings.vue'),
    meta: { needsAuth: true }
  },
  {
    path: '/About',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: { needsAuth: false }
  },
  {
    path: '/BmiCalculator',
    name: 'BmiCalculator',
    component: ()=> import('../views/BmiCalculator.vue'),
    meta: { needsAuth: true }
  },
  {
    path: '/FindPeople',
    name: 'FindPeople',
    component: ()=> import('../views/FindPeople.vue'),
    meta: { needsAuth: false }
  },
  {
    path: '/MyInputs',
    name: 'MyInputs',
    component: ()=> import('../views/MyInputs.vue'),
    meta: { needsAuth: true }
  },
  {
    path: '/FriendList',
    name: 'FriendList',
    component: ()=> import('../views/FriendList.vue'),
    meta: { needsAuth: true }
  },
  {
    path: '/User/:username',
    name: 'UserProfile',
    component: ()=> import('../views/UserProfile.vue'),
    props: true,
    meta: { needsAuth: false }
  }

]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//used for limiting users access on the website,
//it makes it so user cant access some pages while not logged in
router.beforeEach(async ( to, from, next )=>{
  if(to.meta.needsAuth) {
    if(await store.getters.isLoggedIn) next()
    else next({name: 'SignIn'})
  }
  else{
    if(to.meta.needsToBeSignedOut && await store.getters.isLoggedIn) next({path: '/'})
    else next()
  }
})

export default router
