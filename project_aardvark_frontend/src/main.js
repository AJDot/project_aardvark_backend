import Vue from 'vue'
import App from '@/app'
import router from '@/router'
import VueAxios from 'vue-axios'
import { securedAxiosInstance, plainAxiosInstance } from '@/backend/axios'
import '@/main.css'
import store from '@/store'

Vue.config.productionTip = false

Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance,
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  securedAxiosInstance,
  plainAxiosInstance,
  render: h => h(App),
})
