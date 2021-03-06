<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import { Backend } from '@/interfaces/backend'
import ModalLink from '@/components/modals/link.vue'
import SignUp from '@/components/sign-up.vue'
import SignIn from '@/components/sign-in.vue'
import { Modals } from '@/modules/modals'
import { Routes } from '@/router/routes'

interface IData {
  error: string
  Modals: typeof Modals,
  Routes: typeof Routes,
}

export default Vue.extend({
  name: 'AppHeader',
  components: {
    ModalLink,
    SignUp,
    SignIn,
  },
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  data: function (): IData {
    return {
      error: '',
      Modals,
      Routes,
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
          this.$router.replace({ name: 'home' })
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
        <router-link :to="{name: 'home'}">
          Project Aardvark
        </router-link>
      </div>
      <div>
        <modal-link
          v-if="!signedIn"
          :id="Modals.Id.SignIn"
          class="link-gray px-2 no-underline"
        >
          Sign In
        </modal-link>
        <modal-link
          v-if="!signedIn"
          :id="Modals.Id.SignUp"
          class="link-gray px-2 no-underline"
        >
          Sign Up
        </modal-link>
        <router-link
          v-if="signedIn"
          :to="{name: Routes.Name.Slates}"
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
    <sign-up />
    <sign-in />
  </header>
</template>
