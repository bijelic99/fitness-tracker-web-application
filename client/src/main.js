import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './../node_modules/bulma/css/bulma.css'
import './../node_modules/@fortawesome/fontawesome-free/css/all.css'
import VueGoogleCharts from 'vue-google-charts'
import VueScrollTo from 'vue-scrollto'
import Vuelidate from 'vuelidate'
import VModal from 'vue-js-modal'

Vue.use(VueGoogleCharts)
Vue.use(VueScrollTo)
Vue.use(Vuelidate)
Vue.use(VModal, { dialog: true })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
