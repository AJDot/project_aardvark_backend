import Vue from 'vue'
import { Module, Commit } from 'vuex'
import { Routes } from '@/router/routes'
import Slate from '@/models/slate'
import SlateItem from '@/models/slateItem'

interface IState {
}

const state: IState = {}

const getters = {}

const actions = {
  async create ({ state, commit }: { state: IState, commit: Commit }, { slate, item }: { slate: Slate, item: object }) {
    let response
    try {
      response = await Vue.axios.secured.post(Routes.apiPath(Routes.Path.SlateItems, { slateId: slate.id }), { item: item })
    } catch (e) {
      response = { data: {} }
      console.warn('Something went wrong')
    }
    commit('slates/addItem', { slate: slate, json: response.data }, { root: true })
    return response
  },
  async destroy ({ state, commit }: { state: IState, commit: Commit }, { item }: { item: SlateItem }) {
    let response
    if (!item.slate_id) throw new Error(`Slate Item (${item.id}) does not have a slate_id`)
    try {
      response = await Vue.axios.secured.delete(Routes.apiPath(Routes.Path.SlateItem, {
        slateId: item.slate_id,
        id: item.id,
      }))
    } catch (e) {
      response = { data: {} }
      console.warn('Something went wrong')
    }
    commit('slates/removeItem', { slate: item.slate, item: item }, { root: true })
    return response
  },
}

const mutations = {
  update (state: IState, { item, json }: { item: SlateItem, json: Partial<SlateItem> }) {
    item.load(json)
  },
}

const module: Module<IState, any> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

export default module
