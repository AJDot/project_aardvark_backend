import Vue from 'vue'
import { VueRouter } from 'vue-router/types/router'
import { AxiosInstance } from 'axios'
import { Store } from 'vuex'

declare module '*.vue' {
  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    $http: { secured: AxiosInstance, plain: AxiosInstance }
    $router: VueRouter
    $store: Store<any>
  }

  interface VueConstructor {
    axios: { secured: AxiosInstance, plain: AxiosInstance }
  }
}
