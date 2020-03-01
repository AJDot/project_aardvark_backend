<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import { AxiosError, AxiosResponse } from 'axios'
import { TAxios } from '@/typeChecks/axios'
import mapper from '@/store/mappers/mapper'
import { IModalState } from '@/store/modules/modals'
import Modal from '@/components/modals/modal.vue'
import { Routes } from '@/router/routes'
import { Modals } from '@/modules/modals'

const modalStore = mapper('modals', {
  state: {},
  getters: { find: 'find' },
  mutations: { open: 'open', close: 'close', create: 'create' },
  actions: {},
})

export default Vue.extend({
  name: 'SignUp',
  components: {
    Modal,
  },
  data: function () {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      error: '',
      id: Modals.Id.SignUp,
    }
  },
  computed: {
    ...modalStore.computed,
    modalState (): IModalState {
      const state = this.find(this.id)
      if (state) return state
      this.create({ id: this.id })
      return this.find(this.id)
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
      this.$http.plain.post(Routes.Path.SignUp, {
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
      this.closeModal()
      this.$router.replace({ name: Routes.Name.Slates })
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
        const routeName = Routes.Name.Slates
        if (this.$route.name !== routeName) {
          this.$router.replace({ name: routeName })
        }
      }
    },
    closeModal (): void {
      this.close({ id: this.id })
    },
    openSignIn (): void {
      this.close({ id: this.id })
      this.open({ id: Modals.Id.SignIn })
    },
  },
})
</script>

<template>
  <modal
    :id="id"
    @close="closeModal"
  >
    <template #title>
      Sign Up
    </template>
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
          v-focus
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

      <div class="cta">
        <a
          href="#"
          @click.prevent="openSignIn"
        >Sign In</a>
      </div>
    </form>
  </modal>
</template>
