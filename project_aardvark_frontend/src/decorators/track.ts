import store from '@/store'
import { DebugHelper } from '@/helpers/debugHelper'

export default function trackFactory (Type: any) {
  return function (target: any, key: any, initialValue: any): void {
    const _key = '_' + String(key)

    let mutation = 'update'
    if (target._collection?.name) mutation = `${target._collection.name}/${mutation}`
    let action = 'update'
    if (target._collection?.name) action = `${target._collection.name}/${action}`
    const singular = target._collection ? target._collection.singular : 'object'

    Object.defineProperty(target, key, {
      get () {
        return target[_key]
      },
      set (newVal) {
        const currVal = target[_key]
        if (currVal === newVal) return

        if (target._tracking?.[key]) {
          DebugHelper.log('Tracking', 'dispatch', target, key, newVal)
          store.dispatch(action, {
            [singular]: target,
            json: {
              [key]: newVal,
            },
          })
        } else {
          DebugHelper.log('Tracking', 'commit', target, key, newVal)
          store.commit(mutation, {
            [singular]: target,
            json: {
              [_key]: newVal,
            },
          })
        }
        target.trackChange(key, currVal, newVal)
      },
    })
    DebugHelper.log('Tracking', 'initial commit', target, key, initialValue)
    store.commit(mutation, {
      [singular]: target,
      json: {
        [key]: initialValue,
      },
    })
  }
}
