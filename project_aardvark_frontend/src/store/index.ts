import Vue from 'vue'
import Vuex from 'vuex'
import modals from './modules/modals'
import slates from './modules/slates'
import slateItems from './modules/slateItems'
import createLogger from 'vuex/dist/logger'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    modals,
    slates,
    slateItems,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  state: {
    signedIn: localStorage.getItem('signedIn') === 'true',
    csrf: localStorage.getItem('csrf'),
  },
  mutations: {
    signIn (state, csrf: string) {
      state.signedIn = true
      state.csrf = csrf
      localStorage.setItem('signedIn', state.signedIn.toString())
      localStorage.setItem('csrf', csrf)
    },
    signOut (state) {
      state.signedIn = false
      delete localStorage.signedIn
      delete localStorage.csrf
    },
    update (state, { object, json }) {
      object.load(json)
    },
    updateObject (state, { object, key, value }) {
      object[key] = value
    },
  },
  actions: {
    signIn ({ commit }, csrf: string) {
      commit('signIn', csrf)
    },
    signOut ({ commit }) {
      commit('signOut')
    },
  },
})

export default store
