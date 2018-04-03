// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios'
import lscache from 'lscache'
import App from './App'
import router from './router'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.prototype.$http = axios
Vue.prototype.$apiRoot = 'http://localhost:3000/api/' // modify this, if you have api server at another address
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
  template: '<App/>',
  components: { App }
})
