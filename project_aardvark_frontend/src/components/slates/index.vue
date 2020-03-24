<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import { Backend } from '@/interfaces/backend'
import { Routes } from '@/router/routes'
import mapper from '@/store/mappers/mapper'
import { IModalState } from '@/store/modules/modals'
import { Modals } from '@/modules/modals'
import NewSlate from './new.vue'
import SlateCard from './card.vue'
import Slate from '@/models/slate'

const modalStore = mapper('modals', {
  state: {},
  getters: { find: 'find' },
  mutations: { open: 'open', close: 'close', create: 'create' },
  actions: {},
})

interface IData {
  error: string
}

export default Vue.extend({
  name: 'Slates',
  components: {
    NewSlate,
    SlateCard,
  },
  data: function (): IData {
    return {
      error: '',
    }
  },
  computed: {
    ...modalStore.computed,
    newSlateModalState (): IModalState {
      const id = Modals.Id.NewSlate
      const state = this.find(id)
      if (state) return state
      this.create({ id: id })
      return this.find(id)
    },
    slates (): Slate[] {
      return this.$store.state.slates.slates
    },
  },
  async created () {
    if (!store.state.signedIn) {
      this.$router.replace({ name: Routes.Name.Home })
    } else {
      await this.$store.dispatch('slates/fetch')
    }
  },
  methods: {
    ...modalStore.methods,
    setError (error: Backend.IResponse, text: string) {
      this.error = (error.response && error.response.data && error.response.data.errors) || text
    },
    newSlate (): void {
      this.open({ id: this.newSlateModalState.id })
    },
    addSlate (slate: Slate): void {
      if (!slate) {
        return
      }
      this.$http.secured.post(Routes.apiPath(Routes.Path.Slates), { slate: { title: slate.title } })
        .then(response => {
          this.slates.push(response.data)
        })
        .catch(error => this.setError(error, 'Cannot create slate'))
    },
  },
})
</script>

<template>
  <div class="m-auto px-5 py-10">
    <div
      v-if="error"
      class="text-red"
    >
      {{ error }}
    </div>
    <h3 class="font-mono font-regular text-3xl mb-4">
      Slates
    </h3>
    <button @click="newSlate">
      Add Slate
    </button>
    <ul class="list-reset mt-4 card-box">
      <slate-card
        v-for="slate in slates"
        :key="slate.id"
        :slate="slate"
        tag="li"
      />
    </ul>

    <new-slate @add="addSlate" />
  </div>
</template>
