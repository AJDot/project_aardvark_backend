<script lang="ts">
import Vue from 'vue'
import mapper from '@/store/mappers/mapper'
import { Modals } from '@/modules/modals'

const modalStore = mapper('modals', {
  state: {},
  getters: { find: 'find' },
  mutations: { toggle: 'toggle', create: 'create' },
  actions: {},
})

export default Vue.extend({
  name: 'ModalLink',
  props: {
    id: {
      type: Number as () => Modals.Id,
      default: null,
    },
  },
  data: function () {
    return {}
  },
  computed: {
    ...modalStore.computed,
  },
  created () {
    const state = this.find(this.id)
    if (!state) this.create(this.id)
  },
  methods: {
    ...modalStore.methods,
  },
})
</script>

<template>
  <button @click="toggle({id: id})">
    <slot>{{ id }}</slot>
  </button>
</template>
