<script lang="ts">
import Vue from 'vue'
import Modal from '@/components/modals/modal.vue'
import mapper from '@/store/mappers/mapper'
import { Modals } from '@/modules/modals'
import Slate from '@/models/slate'

const modalStore = mapper('modals', {
  state: {},
  getters: { find: 'find' },
  mutations: { close: 'close' },
  actions: {},
})

interface IData {
  id: Modals.Id
  slateCopy: Slate
}

export default Vue.extend({
  name: 'EditSlate',
  components: {
    Modal,
  },
  props: {
    slate: {
      type: Object as () => Slate,
      required: true,
    },
  },
  data: function (): IData {
    console.log(this.slate.jsonify())
    return {
      id: Modals.Id.EditSlate,
      slateCopy: new Slate(),
    }
  },
  computed: {
    ...modalStore.computed,
    isOpen (): boolean {
      return this.find(this.id)?.isOpen
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
    updateSlate () {
      this.$emit('update', { slate: this.slate, json: this.slateCopy.jsonify({ only: ['title'] }) })
      this.closeModal()
    },
    closeModal (): void {
      this.close({ id: this.id })
    },
    setCopy (): void {
      this.slateCopy = new Slate().load(this.slate.jsonify())
    },
  },
})
</script>

<template>
  <modal
    :id="id"
    @close="closeModal"
  >
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
