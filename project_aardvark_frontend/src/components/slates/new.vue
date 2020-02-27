<script lang="ts">
import Vue from 'vue'
import Modal from '@/components/modals/modal.vue'
import { ISlate } from '@/interfaces/slate'
import mapper from '@/store/mappers/mapper'
import { Modals } from '@/modules/modals'
import Slate from '@/models/slate'

const modalStore = mapper('modals', {
  state: {},
  getters: {},
  mutations: { close: 'close' },
  actions: {},
})

interface IData {
  newSlate: ISlate
  id: Modals.Id
}

export default Vue.extend({
  name: 'NewSlate',
  components: {
    Modal,
  },
  data: function (): IData {
    return {
      newSlate: new Slate(),
      id: Modals.Id.NewSlate,
    }
  },
  methods: {
    ...modalStore.methods,
    addSlate (): void {
      this.$emit('add', this.newSlate)
      this.reset()
    },
    getDefaultSlate (): ISlate {
      return new Slate()
    },
    closeModal (): void {
      this.close({ id: this.id })
    },
    reset (): void {
      this.newSlate = this.getDefaultSlate()
      this.closeModal()
    },
  },
})
</script>

<template>
  <modal
    :id="id"
    @close="reset"
  >
    <form @submit.prevent="addSlate">
      <div class="mb-6">
        <input
          v-model="newSlate.title"
          v-focus
          type="text"
          class="input"
          autocomplete="off"
          placeholder="Enter slate title"
        >
        <input
          type="submit"
          value="Add Slate"
          class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green-600 hover:bg-green-700 block w-full py-4 text-white item-center justify-center"
        >
      </div>
    </form>
  </modal>
</template>
