import "@babel/polyfill";
import Vue from "vue";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import axios from "axios";
import lscache from "lscache";
import VueClipboard from "vue-clipboard2";
import "animate.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import swal from "sweetalert2";
import i18n from "./i18n";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

Vue.use(VueClipboard);

const instance = axios.create({
  baseURL: "/api/"
});
// before a request is made start the nprogress
instance.interceptors.request.use(config => {
  NProgress.start();
  return config;
});

// before a response is returned stop nprogress
instance.interceptors.response.use(response => {
  NProgress.done();
  return response;
});
Vue.prototype.$http = instance;

Vue.prototype.$swal = swal;

Vue.prototype.$getToken = () => {
  return lscache.get("token");
};
Vue.prototype.$getAuth = () => {
  return lscache.get("token") != null;
};
Vue.prototype.$getTokenExp = () => {
  return lscache.get("token-exp") == null;
};

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
