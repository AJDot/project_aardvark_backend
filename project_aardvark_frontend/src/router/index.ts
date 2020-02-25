import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'
import NotFound from '@/components/not-found.vue'
import Slates from '@/components/slates/index.vue'
import store from '@/store'
import { Routes } from '@/router/routes'

Vue.use(Router)

const router: Router = new Router({
  mode: 'history',
  routes: [
    {
      path: Routes.Path.Home,
      name: Routes.Name.Home,
      component: Home,
      beforeEnter: (to, from, next) => {
        if (store.state.signedIn) next({ name: Routes.Name.Slates })
        else next()
      },
    },
    {
      path: Routes.Path.Slates,
      name: Routes.Name.Slates,
      component: Slates,
    },
    {
      path: Routes.Path.NotFound,
      name: Routes.Name.NotFound,
      component: NotFound,
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (!store.state.signedIn && to.name !== Routes.Name.Home) next({ name: Routes.Name.Home })
  else next()
})

export default router
