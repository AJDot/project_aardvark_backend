import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
import { AxiosInstance } from 'axios'

declare module '*.vue' {
  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    $http: { secured: AxiosInstance, place: AxiosInstance }
  }
}
