import { ActionMethod, Computed, MutationMethod, createNamespacedHelpers } from 'vuex'
import { Hash } from '@/interfaces/basic'

export default function <S extends Hash, M extends Hash, G extends Hash, A extends Hash> (storeName: string, { state, mutations, getters, actions }:
  { state: S, mutations: M, getters: G, actions: A }):
  { computed: { [key in keyof typeof state]: Computed } & { [key in keyof typeof getters]: Computed }, methods: { [key in keyof typeof mutations]: MutationMethod } & { [key in keyof typeof actions]: ActionMethod } } {
  const { mapState, mapActions, mapGetters, mapMutations } = createNamespacedHelpers(storeName)
  return {
    computed: {
      ...mapState(state),
      ...mapGetters(getters),
    },
    methods: {
      ...mapMutations(mutations),
      ...mapActions(actions),
    },
  }
}
