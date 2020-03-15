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
  async create ({ state, commit }: { state: IState, commit: Commit }, { slate, slateItem }: { slate: Slate, slateItem: object }) {
    let response
    try {
      response = await Vue.axios.secured.post(Routes.apiPath(Routes.Path.SlateItems, { slateId: slate.id }), { item: slateItem })
    } catch (e) {
      response = { data: {} }
      console.warn('Something went wrong')
    }
    commit('slates/addItem', { slate: slate, json: response.data }, { root: true })
    return response
  },
  async update ({ state, commit }: { state: IState, commit: Commit }, { slateItem, json }: { slateItem: SlateItem, json: Partial<SlateItem> }) {
    let response
    try {
      response = await Vue.axios.secured.patch(Routes.apiPath(Routes.Path.SlateItem, { slateId: slateItem.slate_id, id: slateItem.id }), { item: json })
    } catch (e) {
      console.warn('Cannot update slate item')
      throw e
    }
    commit('update', { slateItem: slateItem, json: response.data })
    return response
  },
  async destroy ({ state, commit }: { state: IState, commit: Commit }, { slateItem }: { slateItem: SlateItem }) {
    let response
    if (!slateItem.slate_id) throw new Error(`Slate Item (${slateItem.id}) does not have a slate_id`)
    try {
      response = await Vue.axios.secured.delete(Routes.apiPath(Routes.Path.SlateItem, {
        slateId: slateItem.slate_id,
        id: slateItem.id,
      }))
    } catch (e) {
      response = { data: {} }
      console.warn('Something went wrong')
    }
    commit('slates/removeItem', { slate: slateItem.slate, slateItem: slateItem }, { root: true })
    return response
  },
}

const mutations = {
  update (state: IState, { slateItem, json }: { slateItem: SlateItem, json: Partial<SlateItem> }) {
    slateItem.load(json)
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
