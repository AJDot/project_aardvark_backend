import Vue from 'vue'
import { Module } from 'vuex'
import { Hash } from '@/interfaces/basic'
import Guid from '@/helpers/guid'
import { Modal } from '@/interfaces/iModal'

interface IState {
  states: { [key: string]: IModalState }
}

export interface IModalState {
  id: string
  name: string
  isOpen: boolean
  status: Modal.Status
}

const state: IState = {
  states: {},
}

interface IGetters<S = IState> extends Hash {
  find (state: S): (id: string) => IModalState | undefined

  findByName (state: S): (id: string) => IModalState | undefined

  findByIdOrName (state: S, getters: IGetters<S>): (id: string) => IModalState | undefined
}

const getters: IGetters = {
  find: (state) => (id: string) => {
    return state.states[id]
  },
  findByName: (state) => (name: string) => {
    return Object.values(state.states).find(s => s.name === name)
  },
  findByIdOrName: (state, getters) => (idOrName: string) => {
    return getters.find(state)(idOrName) || getters.findByName(state)(idOrName)
  },
}

const actions = {}

interface IMutations<S = IState> extends Hash {
  toggle (state: S, idOrName: string): IModalState

  create (state: S, name: string): IModalState
}

const mutations: IMutations = {
  create (state, name: string): IModalState {
    const modalState = { id: Guid.create(), isOpen: false, name: name, status: Modal.Status.None }
    Vue.set(state.states, modalState.id, modalState)
    return modalState
  },
  toggle (state: IState, idOrName: string): IModalState {
    let modalState = getters.findByIdOrName(state, getters)(idOrName)
    if (!modalState) {
      modalState = this.create(state, idOrName)
    }
    modalState.isOpen = !modalState.isOpen
    return modalState
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
