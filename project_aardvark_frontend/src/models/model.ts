import { IModel } from '@/interfaces/model'
import { ArrayHelper } from '@/helpers/arrayHelper'
import { Hash, TClassKey, TPartialKeys } from '@/interfaces/basic'
import { IRelation } from '@/interfaces/global/relation'
import IChange from '@/interfaces/trackable/changeInterfaces'
import ICollection from '@/interfaces/global/collectionInterfaces'
import store from '@/store'
import trackFactory from '@/decorators/track'

export default abstract class Model implements IModel {
  declare id: string
  declare c_at: string
  declare u_at: string

  protected constructor () {
    const track = trackFactory(Model)
    track(this, 'id', '')
    track(this, 'c_at', '')
    track(this, 'u_at', '')
  }

  // Database *****************************************
  abstract _collection: ICollection

  abstract _relations: { [key in keyof this]?: IRelation } = {}

  // Database End *************************************

  load (json: TPartialKeys<this>, options: { only?: TClassKey[], except?: TClassKey[] } = {}): this {
    if (json) {
      const keys = ArrayHelper.pick(Object.getOwnPropertyNames(json), options) as (keyof TPartialKeys<this>)[]
      const relationKeys = Object.keys(this._relations || {})
      keys.sort((a, b) => relationKeys.includes(a.toString()) ? -1 : 1)
      for (const key of keys) {
        const sKey = key.toString()
        const _key = sKey.startsWith('_') ? sKey : '_' + sKey
        if (relationKeys.includes(key.toString())) {
          const relation = this._relations[key]
          // @ts-ignore
          this[_key] = relation?.create(this, json[key])
        } else {
          // @ts-ignore
          this[_key] = json[key]
        }
        // after first set, start tracking
        this._tracking[key] = true
      }
    }
    return this
  }

  jsonify (options: { only?: TClassKey[], except?: TClassKey[] } = {}): Hash {
    const json: Hash = {}
    const allKeys = Reflect.ownKeys(this)
      .concat(Reflect.ownKeys(Object.getPrototypeOf(this)))
      .filter(k => k.toString() !== 'constructor')
    const keys = ArrayHelper.pick(allKeys, options) as string[]
    const relationKeys = Object.keys(this._relations)
    for (const key of keys) {
      if (String(key).startsWith('_')) continue
      const val: this[keyof this] = this[key as keyof this]
      let jKey = key.toString()
      if (relationKeys.includes(key.toString())) jKey = jKey + '_attributes'
      if (Array.isArray(val)) {
        json[jKey] = val.map(x => {
          if (x instanceof Model) {
            return x.jsonify()
          } else {
            return x
          }
        })
      } else {
        if (val instanceof Model) {
          json[jKey] = val.jsonify()
        } else {
          json[jKey] = val
        }
      }
    }

    return json
  }

  // Track Changes **************************************
  trackChange (key: keyof this, oldVal: any, newVal: any) {
    if (this._tracking[key]) {
      // so rails knows to empty the array
      if (Array.isArray(oldVal) && oldVal.length === 0) oldVal = ['']
      if (Array.isArray(newVal) && newVal.length === 0) newVal = ['']
      const sKey: string = key.toString()
      if (this._changes[sKey]) {
        // if change already present
        store.commit('updateObject', { object: this._changes[sKey], key: 'newVal', value: newVal })
      } else {
        store.commit('updateObject', {
          object: this._changes,
          key: sKey,
          value: { oldVal: oldVal, newVal: newVal, object: this },
        })
      }
    }
  }

  _changes: Hash<IChange<this>> = {}

  _tracking: TPartialKeys<this, boolean> = {}
  // Track Changes End **********************************
}
