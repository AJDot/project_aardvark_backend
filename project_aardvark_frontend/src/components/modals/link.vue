<script lang="ts">
import Vue from 'vue'
import mapper from '@/store/mappers/mapper'
import { IModalState } from '@/store/modules/modals'

const modalStore = mapper('modals', {
  state: {},
  getters: { findByName: 'findByName' },
  mutations: { toggle: 'toggle', create: 'create' },
  actions: {},
})

export default Vue.extend({
  name: 'ModalLink',
  props: {
    to: {
      type: Object as () => { name: string },
      required: true,
    },
  },
  data: function () {
    return {}
  },
  computed: {
    ...modalStore.computed,
    modalState (): IModalState {
      const state = this.findByName(this.to.name)
      if (state) return state
      this.create(this.to.name)
      return this.findByName(this.to.name)
    },
  },
  methods: {
    ...modalStore.methods,
  },
})
</script>

<template>
  <button @click="toggle(modalState.id)">
    <slot>{{ to.name }}</slot>
  </button>
</template>
