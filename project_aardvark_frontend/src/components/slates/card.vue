<script lang="ts">
import Vue from 'vue'
import Slate from '@/models/slate'
import { Modals } from '@/modules/modals'
import { Backend } from '@/interfaces/backend'
import mapper from '@/store/mappers/mapper'
import Item from '@/components/slates/item.vue'

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
  components: {
    Item,
  },
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
    @click="editSlate"
  >
    <h3 class="m-1">
      {{ slate.title }}
    </h3>

    <ul class="list">
      <item
        v-for="item in slate.items"
        :key="item.id"
        :item="item"
      />
    </ul>

    <div class="cta">
      <button
        class="white hover-red"
        @click.stop.prevent="removeSlate"
      >
        Delete
      </button>
    </div>
  </component>
</template>
