import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
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
