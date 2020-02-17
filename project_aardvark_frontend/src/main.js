import Vue from 'vue'
import App from './app'
import router from './router'
// import VueAxios from 'vue-axios';
import './main.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
