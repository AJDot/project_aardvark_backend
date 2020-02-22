<script lang="ts">
import Vue from 'vue'
import { Modal } from '@/interfaces/iModal'
import { IModalState } from '@/store/modules/modals'

export default Vue.extend({
  props: {
    state: {
      type: Object as () => IModalState,
      default: null,
    },
  },
  data: function () {
    return {}
  },
  computed: {
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
    cancel (): void {
      this.$emit('cancel')
    },
  },
})
</script>

<template>
  <transition
    v-if="state.isOpen"
    appear
    name="modal"
  >
    <aside
      class="v-modal fixed w-full h-full flex justify-center mask bg-mask inset-0"
      @click.self="cancel"
    >
      <div class="v-modal-body self-center">
        <div class="v-modal-container relative border p-10 border-grey-400 shadow rounded bg-white">
          <h3 class="text-2xl mb-6 text-grey-900">
            <slot name="title" />
          </h3>
          <button
            type="button"
            class="absolute top-0 right-0 mx-3 py-1"
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
