<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import { AxiosError, AxiosResponse } from 'axios'
import { TAxios } from '@/typeChecks/axios'

export default Vue.extend({
  name: 'SignUp',
  data: function () {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
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
    signUp () {
      this.$http.plain.post('/sign_up', {
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      })
        .then(response => this.signUpSuccessful(response))
        .catch(error => this.signUpFailed(error))
    },
    signUpSuccessful (response: AxiosResponse | AxiosError) {
      if (TAxios.isError(response) || !response.data.csrf) {
        this.signUpFailed(response)
        return
      }

      store.dispatch('signIn', response.data.csrf)
      this.error = ''
      this.$router.replace({ name: 'slates-index' })
    },
    signUpFailed (error: AxiosResponse | AxiosError) {
      if (TAxios.isError(error)) {
        this.error = (error.response && error.response.data && error.response.data.error) || ''
      } else {
        this.error = 'Something went wrong. Please try again later.'
      }
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
        Sign Up
      </h3>
      <form @submit.prevent="signUp">
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

        <div class="mb-6">
          <label
            for="password-confirmation"
            class="label"
          >Password Confirmation</label>
          <input
            id="password-confirmation"
            v-model="passwordConfirmation"
            type="password"
            class="input"
          >
        </div>

        <button
          type="submit"
          class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green-600 hover:br-green-700 block w-full py-4 text-white items-center justify-center"
        >
          Sign Up
        </button>

        <div class="my-4">
          <router-link
            :to="{name: 'signIn'}"
            class="link"
          >
            Sign In
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
