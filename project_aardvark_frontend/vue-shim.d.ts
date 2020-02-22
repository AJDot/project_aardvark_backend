import Vue from 'vue'
import { VueRouter } from 'vue-router/types/router'
// eslint-disable-next-line no-unused-vars
import { AxiosInstance } from 'axios'

declare module '*.vue' {
  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    $http: { secured: AxiosInstance, plain: AxiosInstance }
    $router: VueRouter
  }
}
