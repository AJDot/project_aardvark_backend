import Vue from 'vue'
import { Module } from 'vuex'
import { Hash } from '@/interfaces/basic'
import { Modal } from '@/interfaces/iModal'
import { InstanceHelper } from '@/helpers/instanceHelper'
import { Modals } from '@/modules/modals'

interface IState {
  states: { [key: string]: IModalState }
}

export interface IModalState {
  id: Modals.Id
  isOpen: boolean
  status: Modal.Status
  props: Hash
}

const state: IState = {
  states: {},
}

interface IGetters<S = IState> extends Hash {
  find (state: S): (id: Modals.Id) => IModalState | undefined
}

const getters: IGetters = {
  find: (state) => (id: Modals.Id) => {
    return state.states[id]
  },
}

const actions = {}

interface IMutations<S = IState> extends Hash {
  open (state: S, { id }: { id: Modals.Id }): void

  close (state: S, { id }: { id: Modals.Id }): void

  toggle (state: S, { id, force }: { id: Modals.Id, force?: boolean }): void

  create (state: S, { id }: { id: Modals.Id }): void
}

const mutations: IMutations = {
  create (state, { id }: { id: Modals.Id }): void {
    const modalState: IModalState = { id: id, isOpen: false, status: Modal.Status.None, props: {} }
    Vue.set(state.states, modalState.id, modalState)
  },
  open (state: IState, { id, props = {} }: { id: Modals.Id, props: object }): void {
    this.commit('modals/toggle', { id: id, props: props, force: true })
  },
  close (state: IState, { id, props = {} }: { id: Modals.Id, props: object }): void {
    this.commit('modals/toggle', { id: id, props: props, force: false })
  },
  toggle (state: IState, { id, props = {}, force }: { id: Modals.Id, props: object, force?: boolean }): void {
    const modalState = getters.find(state)(id)
    if (modalState) {
      if (InstanceHelper.isBoolean(force)) modalState.isOpen = force
      else modalState.isOpen = !modalState.isOpen
      modalState.props = props
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
