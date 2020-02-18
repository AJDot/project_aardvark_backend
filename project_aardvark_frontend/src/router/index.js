import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/signin.vue'
import Signup from '@/components/signup.vue'
import SlatesIndex from '@/components/slates/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: {name: 'signin'},
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/slates',
      name: 'slates-index',
      component: SlatesIndex,
    },
  ],
})
