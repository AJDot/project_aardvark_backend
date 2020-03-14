import Vue from 'vue'
import { Module } from 'vuex'
import Slate from '@/models/slate'
import { Commit } from 'vuex/types'
import { Routes } from '@/router/routes'
import { ISlate } from '@/interfaces/slate'
import { Slates } from '@/interfaces/slates/item'
import SlateItem from '@/models/slateItem'

interface IState {
  slates: Slate[]
}

const state: IState = {
  slates: [],
}

const getters = {}

const actions = {
  async fetch ({ state, commit }: { state: IState, commit: Commit }) {
    let response
    try {
      response = await Vue.axios.secured.get(Routes.apiPath(Routes.Path.Slates))
    } catch (e) {
      response = { data: [] }
      console.warn('Something went wrong')
    }
    commit('add', { json: response.data })
    return response
  },
  async update ({ state, commit }: { state: IState, commit: Commit }, { slate, json }: { slate: Slate, json: Partial<Slate> }) {
    let response
    try {
      response = await Vue.axios.secured.patch(Routes.apiPath(Routes.Path.Slate, { id: slate.id }), { slate: json })
    } catch (e) {
      console.warn('Cannot update slate')
      throw e
    }
    commit('update', { slate: slate, json: response.data })
    return response
  },
  async destroy ({ state, commit }: { state: IState, commit: Commit }, slate: Slate) {
    let response
    try {
      response = await Vue.axios.secured.delete(Routes.apiPath(Routes.Path.Slate, { id: slate.id }))
    } catch (e) {
      console.warn('Cannot delete slate')
    }

    commit('destroy', slate)
    return response
  },
}

const mutations = {
  add (state: IState, { json }: { json?: ISlate[] }) {
    if (json) {
      state.slates.push(...json.map(s => new Slate().load(s)))
    }
  },
  update (state: IState, { slate, json }: { slate: Slate, json: Partial<Slate> }): void {
    slate.load(json)
  },
  destroy (state: IState, slate: Slate) {
    state.slates.splice(state.slates.indexOf(slate), 1)
  },
  addItem (state: IState, { slate, json }: { slate: Slate, json?: Slates.IItem }) {
    if (json) {
      slate.items.push(slate._relations.items.create(slate, json).load(json))
    }
  },
  removeItem (state: IState, { slate, item }: { slate: Slate, item: Slates.IItem }) {
    const slateItem: SlateItem | undefined = slate.items.find(i => i.id === item.id)
    if (slateItem) {
      slate.items.splice(slate.items.indexOf(slateItem), 1)
    }
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
