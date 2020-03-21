import Vue from 'vue'
import Vuex from 'vuex'
import currentUserModule from './modules/currentUserModule'
import postsModule from './modules/postsModule'
import usersModule from './modules/usersModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    currentUserModule, postsModule, usersModule
  }
})
