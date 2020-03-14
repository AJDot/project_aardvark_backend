<script lang="ts">
import Vue from 'vue'
import SlateItem from '@/models/slateItem'

export default Vue.extend({
  name: 'SlateItem',
  props: {
    item: {
      type: Object as () => SlateItem,
      required: true,
    },
  },
  data: function () {
    return {}
  },
  computed: {
    description: {
      get (): SlateItem['description'] {
        return this.item.description
      },
      set (val: SlateItem['description']) {
        this.$store.commit('slateItems/update', { item: this.item, json: { description: val } })
      },
    },
  },
  methods: {
    async destroy () {
      await this.$store.dispatch('slateItems/destroy', { item: this.item })
    },
  },
})
</script>

<template>
  <div>
    <label
      :for="`item-${item.id}`"
      class="sr-only"
    />
    <input
      :id="`item-${item.id}`"
      v-model="description"
      type="text"
      autocomplete="off"
      class="input"
    >
    <button
      type="button"
      @click.stop="destroy"
    >
      x
    </button>
  </div>
</template>
