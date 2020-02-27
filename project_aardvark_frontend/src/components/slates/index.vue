<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import { Backend } from '@/interfaces/backend'
import { ISlate } from '@/interfaces/slate'
import { AxiosResponse } from 'axios'
import { Routes } from '@/router/routes'
import mapper from '@/store/mappers/mapper'
import { IModalState } from '@/store/modules/modals'
import { Modals } from '@/modules/modals'
import NewSlate from './new.vue'
import EditSlate from './edit.vue'
import Slate from '@/models/slate'

const modalStore = mapper('modals', {
  state: {},
  getters: { find: 'find' },
  mutations: { open: 'open', close: 'close', create: 'create' },
  actions: {},
})

interface IData {
  slates: ISlate[]
  error: string
  editedSlate: ISlate
}

export default Vue.extend({
  name: 'Slates',
  components: {
    NewSlate,
    EditSlate,
  },
  data: function (): IData {
    return {
      slates: [],
      error: '',
      editedSlate: new Slate(),
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
  },
  created () {
    if (!store.state.signedIn) {
      this.$router.replace({ name: Routes.Name.Home })
    } else {
      this.$http.secured.get('/api/v1/slates')
        .then((response: AxiosResponse) => {
          this.slates = response.data.map((json: ISlate) => new Slate().load(json))
        })
        .catch((error: Backend.IResponse) => this.setError(error, 'Something went wrong'))
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
    addSlate (slate: ISlate): void {
      if (!slate) {
        return
      }
      this.$http.secured.post(Routes.apiPath(Routes.Path.Slates), { slate: { title: slate.title } })
        .then(response => {
          this.slates.push(response.data)
        })
        .catch(error => this.setError(error, 'Cannot create slate'))
    },
    removeSlate (slate: ISlate) {
      this.$http.secured.delete(Routes.apiPath(Routes.Path.Slate, { id: slate.id }))
        .then(response => {
          this.slates.splice(this.slates.indexOf(slate), 1)
        })
        .catch(error => this.setError(error, 'Cannot delete slate'))
    },
    editSlate (slate: ISlate) {
      this.editedSlate = slate
      this.open({ id: Modals.Id.EditSlate })
    },
    updateSlate ({ slate, json }: { slate: Slate, json: Partial<Slate> }) {
      this.$http.secured.patch(Routes.apiPath(Routes.Path.Slate, { id: slate.id }), json)
        .then(response => {
          slate.load(response.data)
        })
        .catch(error => this.setError(error, 'Cannot update slate'))
    },
  },
})
</script>

<template>
  <div class="max-w-md m-auto py-10">
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
    <ul class="list-reset mt-4">
      <li
        v-for="slate in slates"
        :key="slate.id"
        :slate="slate"
        class="py-4"
      >
        <div class="flex items-center justify-between flex-wrap">
          <p class="block flex-1 font-mono font-semibold flex items-center">
            {{ slate.title }}
          </p>

          <button
            class="by-transparent text-sm hover:bg-blue-600 hover:text-white text-blue-600 border border-blue-600 no-underline font-bold py2 px-4 mr-2 rounded"
            @click.prevent="editSlate(slate)"
          >
            Edit
          </button>
          <button
            class="by-transparent text-sm hover:bg-red-600 hover:text-white text-red-600 border border-red-600 no-underline font-bold py2 px-4 mr-2 rounded"
            @click.prevent="removeSlate(slate)"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>

    <new-slate @add="addSlate" />
    <edit-slate
      :slate="editedSlate"
      @update="updateSlate"
    />
  </div>
</template>
