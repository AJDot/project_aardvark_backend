import { IModel } from '@/interfaces/model'
import { ArrayHelper } from '@/helpers/arrayHelper'
import { Hash, TClassKey, TPartialKeys } from '@/interfaces/basic'
import { IRelation } from '@/interfaces/global/relation'

export default class Model implements IModel {
  id: string = ''
  c_at: string = ''
  u_at: string = ''

  _relations: { [key in keyof this]?: IRelation } = {}

  load (json: TPartialKeys<this>, options: { only?: TClassKey[], except?: TClassKey[] } = {}): this {
    if (json) {
      const keys = ArrayHelper.pick(Object.getOwnPropertyNames(json), options) as (keyof TPartialKeys<this>)[]
      const relationKeys = Object.keys(this._relations)
      for (const key of keys) {
        if (relationKeys.includes(key.toString())) {
          const relation = this._relations[key]
          this[key] = relation?.create(this, json[key])
        } else {
          this[key] = json[key]
        }
      }
    }
    return this
  }

  jsonify (options: { only?: TClassKey[], except?: TClassKey[] } = {}): Hash {
    const json: Hash = {}
    const keys = ArrayHelper.pick(Object.getOwnPropertyNames(this), options) as string[]
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
}
