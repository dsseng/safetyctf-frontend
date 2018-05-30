// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios'
import lscache from 'lscache'
import App from './App'
import router from './router'
import i18n from './i18n'
import 'vuetify/dist/vuetify.min.css'
import VueClipboard from 'vue-clipboard2'
import 'animate.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueClipboard)
Vue.use(Vuetify)

let instance = axios.create({
  baseURL: '/api'
})
// before a request is made start the nprogress
instance.interceptors.request.use(config => {
  NProgress.start()
  return config
})

// before a response is returned stop nprogress
instance.interceptors.response.use(response => {
  NProgress.done()
  return response
})
Vue.prototype.$http = instance

Vue.prototype.$ls = lscache
Vue.prototype.$getToken = () => {
  return lscache.get('token')
}
Vue.prototype.$getAuth = () => {
  return lscache.get('token') != null
}
Vue.prototype.$getTokenExp = () => {
  return lscache.get('token-exp') == null
}
Vue.config.productionTip = false

/* eslint-disable no-new */
window.vm /* For easy console access */ = new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: { App }
})
