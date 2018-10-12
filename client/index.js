import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from './app.vue'

import createRouter from './config/router'
import createStore from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  router,
  store,
  render: c => c(App)
}).$mount(root)
