import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home.vue'
import NotFound from '@/components/not-found.vue'
import SlatesIndex from '@/components/slates/index.vue'
import store from '@/store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (store.state.signedIn) {
          next({ name: 'slates-index' })
        } else {
          next()
        }
      },
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
