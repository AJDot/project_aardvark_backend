<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'signup',
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
    signup () {
      this.$http.plain.post('/signup', {
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      })
        .then(response => this.signupSuccessful(response))
        .catch(error => this.signupFailed(error))
    },
    signupSuccessful (response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }

      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace({name: 'slates-index'})
    },
    signupFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.errors) || 'Something went wrong'
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace({name: 'slates-index'})
      }
    },
  },
})
</script>

<template>
  <div class="max-w-sm m-auto my-8">
    <div class="border p-10 border-grey-400 shadow rounded">
      <h3 class="text-2xl mb-6 text-grey-900">Sign Up</h3>
      <form @submit.prevent="signup">
        <div v-if="error" class="text-red">{{error}}</div>
        <div class="mb-6">
          <label for="email" class="label">Email</label>
          <input type="email" v-model="email" class="input" id="email" placeholder="awesome@email.com">
        </div>

        <div class="mb-6">
          <label for="password" class="label">Password</label>
          <input type="password" v-model="password" class="input" id="password">
        </div>

        <div class="mb-6">
          <label for="password-confirmation" class="label">Password Confirmation</label>
          <input type="password" v-model="passwordConfirmation" class="input" id="password-confirmation">
        </div>

        <button type="submit"
                class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green-600 hover:br-green-700 block w-full py-4 text-white items-center justify-center">
          Sign Up
        </button>

        <div class="my-4">
          <router-link :to="{name: 'signin'}" class="link">Sign In</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
