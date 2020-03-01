<script lang="ts">
import Vue from 'vue'
import Slate from '@/models/slate'
import { Modals } from '@/modules/modals'
import { Backend } from '@/interfaces/backend'
import mapper from '@/store/mappers/mapper'

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
  name: 'SlateCard',
  props: {
    slate: {
      type: Object as () => Slate,
      required: true,
    },
    tag: {
      type: String,
      default: 'div',
    },
  },
  data: function (): IData {
    return {
      error: '',
    }
  },
  methods: {
    ...modalStore.methods,
    setError (error: Backend.IResponse, text: string): void {
      this.error = (error.response && error.response.data && error.response.data.errors) || text
    },
    async removeSlate () {
      await this.$store.dispatch('slates/destroy', this.slate)
    },
    editSlate (): void {
      this.open({ id: Modals.Id.EditSlate, props: { slate: this.slate } })
    },
  },
})
</script>

<template>
  <component
    :is="tag"
    class="card slate"
  >
    <h3 class="m-1">
      {{ slate.title }}
    </h3>

    <div class="cta">
      <button
        class="by-transparent text-sm hover:bg-blue-600 hover:text-white text-blue-600 border border-blue-600 no-underline font-bold py2 px-4 mr-2 rounded"
        @click.prevent="editSlate"
      >
        Edit
      </button>
      <button
        class="by-transparent text-sm hover:bg-red-600 hover:text-white text-red-600 border border-red-600 no-underline font-bold py2 px-4 mr-2 rounded"
        @click.prevent="removeSlate"
      >
        Delete
      </button>
    </div>
  </component>
</template>
