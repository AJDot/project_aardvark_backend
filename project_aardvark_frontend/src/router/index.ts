import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/sign-in.vue'
import Signup from '@/components/sign-up.vue'
import NotFound from '@/components/not-found.vue'
import SlatesIndex from '@/components/slates/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: { name: 'signIn' },
    },
    {
      path: '/sign_in',
      name: 'signIn',
      component: Signin,
    },
    {
      path: '/sign_up',
      name: 'signUp',
      component: Signup,
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
