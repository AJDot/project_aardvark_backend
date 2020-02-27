<script lang="ts">
import Vue from 'vue'
import { Modal } from '@/interfaces/iModal'
import { IModalState } from '@/store/modules/modals'
import mapper from '@/store/mappers/mapper'
import { Modals } from '@/modules/modals'

const modalStore = mapper('modals', {
  state: {},
  getters: { find: 'find' },
  mutations: { create: 'create' },
  actions: {},
})

export default Vue.extend({
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
    state (): IModalState {
      const state = this.find(this.id)
      if (state) return state
      this.create({ id: this.id })
      return this.find(this.id)
    },
    status (): typeof Modal.Status {
      return Modal.Status
    },
    currentStatus (): Modal.Status {
      return this.state.status
    },
    isNone (): boolean {
      return this.state.status === Modal.Status.None
    },
  },
  methods: {
    ...modalStore.methods,
    close (): void {
      this.$emit('close')
    },
  },
})
</script>

<template>
  <transition
    v-if="state.isOpen"
    appear
    name="v-modal"
  >
    <aside
      class="v-modal fixed w-full h-full flex justify-center mask bg-mask inset-0"
      @click.self="close"
    >
      <div class="v-modal-body self-center">
        <div class="v-modal-container relative border p-5 border-grey-400 shadow rounded bg-white">
          <h3 class="text-2xl mb-6 text-grey-900 text-center">
            <slot name="title" />
          </h3>
          <button
            type="button"
            class="absolute top-0 right-0 mx-3 py-1"
            @click="close"
          >
            <span class="sr-only">Dismiss Modal</span>
            x
          </button>
          <transition
            name="fade-in-out"
            mode="out-in"
          >
            <div :key="currentStatus">
              <template v-if="isNone">
                <slot />
              </template>
              <slot
                v-else
                :name="currentStatus"
              />
            </div>
          </transition>
        </div>
      </div>
    </aside>
  </transition>
</template>
