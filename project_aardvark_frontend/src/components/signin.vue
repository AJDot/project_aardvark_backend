<script lang="ts">
import Vue from 'vue'
import store from '@/store'

export default Vue.extend({
  name: 'SignIn',
  data: function () {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signin () {
      this.$http.plain.post('/signin', { email: this.email, password: this.password })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error))
    },
    signinSuccessful (response) {
      if (!response.data.csrf) {
        this.signinFailed(response)
        return
      }

      store.dispatch('signIn', response.data.csrf)
      this.error = ''
      this.$router.replace({ name: 'slates-index' })
    },
    signinFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      store.dispatch('signOut')
    },
    checkSignedIn () {
      if (store.state.signedIn) {
        this.$router.replace({ name: 'slates-index' })
      }
    },
  },
})
</script>

<template>
  <div class="max-w-sm m-auto my-8">
    <div class="border p-10 border-grey-400 shadow rounded">
      <h3 class="text-2xl mb-6 text-grey-900">
        Sign In
      </h3>
      <form @submit.prevent="signin">
        <div
          v-if="error"
          class="text-red"
        >
          {{ error }}
        </div>
        <div class="mb-6">
          <label
            for="email"
            class="label"
          >Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="input"
            placeholder="awesome@email.com"
          >
        </div>

        <div class="mb-6">
          <label
            for="password"
            class="label"
          >Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="input"
          >
        </div>

        <button
          type="submit"
          class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green-600 hover:br-green-700 block w-full py-4 text-white items-center justify-center"
        >
          Sign In
        </button>

        <div class="my-4">
          <router-link
            :to="{name: 'signup'}"
            class="link"
          >
            Sign Up
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
