<script lang="ts">
import Vue from 'vue'
import Modal from '@/components/modals/modal.vue'
import mapper from '@/store/mappers/mapper'
import { Modals } from '@/modules/modals'
import Slate from '@/models/slate'
import { IModalState } from '@/store/modules/modals'
import { Backend } from '@/interfaces/backend'
import EditItem from '@/components/slates/edit-item.vue'

const modalStore = mapper('modals', {
  state: {},
  getters: { find: 'find' },
  mutations: { close: 'close', create: 'create' },
  actions: {},
})

interface IData {
  id: Modals.Id
  error: string
}

export default Vue.extend({
  name: 'EditSlate',
  components: {
    Modal,
    EditItem,
  },
  data: function (): IData {
    return {
      id: Modals.Id.EditSlate,
      error: '',
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
    isOpen (): boolean {
      return this.modalState.isOpen
    },
    slate (): Slate {
      return this.modalState.props.slate
    },
  },
  methods: {
    ...modalStore.methods,
    setError (error: Backend.IResponse, text: string): void {
      this.error = (error.response && error.response.data && error.response.data.errors) || text
    },
    closeModal (): void {
      this.close({ id: this.id })
    },
    async updateSlate () {
      await this.$store.dispatch('slates/update', {
        slate: this.slate,
        json: this.slate.jsonify({ only: ['title', 'items'] }),
      })
      this.closeModal()
    },
    async addItem () {
      await this.$store.dispatch('slateItems/create', { slate: this.slate, item: { description: '' } })
    },
  },
})
</script>

<template>
  <modal
    v-if="slate"
    :id="id"
    @close="closeModal"
  >
    <template #title>
      Edit Slate
    </template>
    <form @submit.prevent="updateSlate">
      <div class="mb-6">
        <input
          v-model="slate.title"
          v-focus
          type="text"
          class="input"
          autocomplete="off"
          placeholder="Enter slate title"
        >
      </div>
      <ul>
        <li
          v-for="item in slate.items"
          :key="item.id"
        >
          <edit-item :item="item" />
        </li>
      </ul>
      <div class="cta">
        <button
          type="button"
          @click="addItem"
        >
          Add Item
        </button>
      </div>
      <div class="cta">
        <input
          type="submit"
          value="Update Slate"
          class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green-600 hover:bg-green-700 block w-full py-4 text-white item-center justify-center"
        >
      </div>
    </form>
  </modal>
</template>
