// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import adapt from './assets/js/adapt'
import WXConfig from './assets/js/wx.jsapi' // 微信分享
import './assets/css/reset.css'

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.axios.defaults.baseURL = 'http://zhibo.pxjy.com/';
Vue.prototype.WXConfig = WXConfig;
Vue.prototype.qs = qs;
Vue.prototype.bus = new Vue;

Vue.use(adapt)

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App},
  template: '<App/>'
})
