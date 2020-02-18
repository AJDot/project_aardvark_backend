<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'app-header',
  computed: {
    signedIn () {
      return localStorage.signedIn
    },
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    signOut () {
      this.$http.secured.delete('/signin')
        .then(response => {
          delete localStorage.csrf
          delete localStorage.signedIn
          this.$router.replace({name: 'root'})
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
        <router-link :to="{name: 'root'}">Project Aardvark</router-link>
      </div>
      <div>
        <router-link :to="{name: 'signin'}" v-if="!signedIn" class="link-gray px-2 no-underline">Sign In</router-link>
        <router-link :to="{name: 'signup'}" v-if="!signedIn" class="link-gray px-2 no-underline">Sign Up</router-link>
        <router-link :to="{name: 'slates'}" v-if="signedIn" class="link-gray px-2 no-underline">Slates</router-link>
        <a href="#" @click.prevent="signOut" v-if="signedIn" class="link-gray px-2 no-underline">Sign Out</a>
      </div>
    </div>
  </header>
</template>
