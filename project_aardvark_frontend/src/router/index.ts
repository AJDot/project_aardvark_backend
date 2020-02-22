import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/components/not-found.vue'
import SlatesIndex from '@/components/slates/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
    },
    {
      path: '/slates',
      name: 'slates-index',
      component: SlatesIndex,
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound,
    },
  ],
})
