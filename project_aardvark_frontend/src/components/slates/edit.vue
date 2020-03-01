<script lang="ts">
import Vue from 'vue'
import Modal from '@/components/modals/modal.vue'
import mapper from '@/store/mappers/mapper'
import { Modals } from '@/modules/modals'
import Slate from '@/models/slate'
import { IModalState } from '@/store/modules/modals'
import { Backend } from '@/interfaces/backend'

const modalStore = mapper('modals', {
  state: {},
  getters: { find: 'find' },
  mutations: { close: 'close', create: 'create' },
  actions: {},
})

interface IData {
  id: Modals.Id
  slateCopy: Slate
  error: string
}

export default Vue.extend({
  name: 'EditSlate',
  components: {
    Modal,
  },
  data: function (): IData {
    return {
      id: Modals.Id.EditSlate,
      slateCopy: new Slate(),
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
  watch: {
    isOpen: function (newVal, oldVal) {
      if (newVal) {
        this.setCopy()
      }
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
    setCopy (): void {
      this.slateCopy = new Slate().load(this.slate.jsonify())
    },
    async updateSlate () {
      await this.$store.dispatch('slates/update', {
        slate: this.slate,
        json: this.slateCopy.jsonify({ only: ['title'] }),
      })
      this.closeModal()
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
      Edit Slate
    </template>
    <form @submit.prevent="updateSlate">
      <div class="mb-6">
        <input
          v-model="slateCopy.title"
          v-focus
          type="text"
          class="input"
          autocomplete="off"
          placeholder="Enter slate title"
        >
        <input
          type="submit"
          value="Update Slate"
          class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green-600 hover:bg-green-700 block w-full py-4 text-white item-center justify-center"
        >
      </div>
    </form>
  </modal>
</template>
