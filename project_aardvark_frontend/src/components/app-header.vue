<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import { Backend } from '@/types'

interface IData {
  error: string
}

export default Vue.extend({
  name: 'AppHeader',
  data: function (): IData {
    return {
      error: '',
    }
  },
  computed: {
    signedIn () {
      return store.state.signedIn
    },
  },
  methods: {
    setError (error: Backend.IResponse, text: string) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    signOut () {
      this.$http.secured.delete('/sign_in')
        .then(response => {
          store.dispatch('signOut')
          this.$router.replace({ name: 'root' })
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    },
  },
})
</script>

<template>
  <header class="bg-gray-500 py-4">
    <div class="container m-auto flex flex-wrap items-center justify-end">
      <div class="flex-1 flex items-center">
        <router-link :to="{name: 'root'}">
          Project Aardvark
        </router-link>
      </div>
      <div>
        <router-link
          v-if="!signedIn"
          :to="{name: 'signIn'}"
          class="link-gray px-2 no-underline"
        >
          Sign In
        </router-link>
        <router-link
          v-if="!signedIn"
          :to="{name: 'signUp'}"
          class="link-gray px-2 no-underline"
        >
          Sign Up
        </router-link>
        <router-link
          v-if="signedIn"
          :to="{name: 'slates-index'}"
          class="link-gray px-2 no-underline"
        >
          Slates
        </router-link>
        <a
          v-if="signedIn"
          href="#"
          class="link-gray px-2 no-underline"
          @click.prevent="signOut"
        >
          Sign Out
        </a>
      </div>
    </div>
  </header>
</template>
