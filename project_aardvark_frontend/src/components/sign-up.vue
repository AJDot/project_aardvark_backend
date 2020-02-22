<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import { AxiosError, AxiosResponse } from 'axios'
import { TAxios } from '@/typeChecks/axios'
import mapper from '@/store/mappers/mapper'
import { IModalState } from '@/store/modules/modals'
import Modal from '@/components/modals/modal.vue'

const modalStore = mapper('modals', {
  state: {},
  getters: { findByName: 'findByName' },
  mutations: { toggle: 'toggle', create: 'create' },
  actions: {},
})

export default Vue.extend({
  name: 'SignUp',
  components: {
    Modal,
  },
  props: {
    from: {
      type: Object as () => { name: string },
      required: true,
    },
  },
  data: function () {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      error: '',
    }
  },
  computed: {
    ...modalStore.computed,
    modalState (): IModalState {
      const state = this.findByName(this.from.name)
      if (state) return state
      this.create(this.from.name)
      return this.findByName(this.from.name)
    },
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    ...modalStore.methods,
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
        const routeName = 'slates-index'
        if (this.$route.name !== routeName) {
          this.$router.replace({ name: routeName })
        }
      }
    },
  },
})
</script>

<template>
  <modal :state="modalState">
    <div
      class="max-w-sm m-auto my-8"
    >
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
        </form>
      </div>
    </div>
  </modal>
</template>
