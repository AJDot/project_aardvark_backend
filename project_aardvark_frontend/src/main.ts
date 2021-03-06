import Vue from 'vue'
import './vue/global'
import App from '@/app.vue'
import router from '@/router'
import VueAxios from 'vue-axios'
import { securedAxiosInstance, plainAxiosInstance } from '@/backend/axios'
import '@/styles/index.css'
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
  store,
  render: h => h(App),
})
