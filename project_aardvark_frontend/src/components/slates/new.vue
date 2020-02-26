<script lang="ts">
import Vue from 'vue'
import Modal from '@/components/modals/modal.vue'
import { ISlate } from '@/types/slate'
import mapper from '@/store/mappers/mapper'
import { Modals } from '@/modules/modals'

const modalStore = mapper('modals', {
  state: {},
  getters: { find: 'find' },
  mutations: { open: 'open', close: 'close', create: 'create' },
  actions: {},
})

interface IData {
  newSlate: ISlate
  id: Modals.Id
}

export default Vue.extend({
  name: 'New',
  components: {
    Modal,
  },
  data: function (): IData {
    return {
      newSlate: { id: '', title: '' },
      id: Modals.Id.NewSlate,
    }
  },
  methods: {
    ...modalStore.methods,
    addSlate () {
      this.$emit('add', this.newSlate)
      this.newSlate = this.getDefaultSlate()
      this.closeModal()
    },
    getDefaultSlate (): ISlate {
      return { id: '', title: '' }
    },
    closeModal (): void {
      this.close({ id: this.id })
    },
  },
})
</script>

<template>
  <modal
    :id="id"
    @close="closeModal"
  >
    <form @submit.prevent="addSlate">
      <div class="mb-6">
        <input
          v-model="newSlate.title"
          type="text"
          class="input"
          autofocus
          autocomplete="off"
          placeholder="Enter slate title"
        >
        <input
          type="submit"
          value="Add Slate"
          class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green hover:bg-green-700 block w-full py-4 text-white item-center justify-center"
        >
      </div>
    </form>
  </modal>
</template>
