import Vue from 'vue'
import vFocus from '@/directives/vFocus'
import Icon from '@/components/icons/icon.vue'

Vue.directive('focus', vFocus)
Vue.component('icon', Icon)
