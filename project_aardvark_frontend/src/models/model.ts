import { IModel } from '@/interfaces/model'
import { ArrayHelper } from '@/helpers/arrayHelper'
import { TClassKey, TPartialKeys } from '@/interfaces/basic'

export default class Model implements IModel {
  id: string = ''
  c_at: string = ''
  u_at: string = ''

  load (json: TPartialKeys<this>, options: { only?: TClassKey[], except?: TClassKey[] } = {}): this {
    if (json) {
      const keys = ArrayHelper.pick(Object.getOwnPropertyNames(json), options) as (keyof TPartialKeys<this>)[]
      for (const key of keys) {
        this[key] = json[key]
      }
    }
    return this
  }

  jsonify (options: { only?: TClassKey[], except?: TClassKey[] } = {}): Partial<this> {
    const json: Partial<this> = {}
    const keys = ArrayHelper.pick(Object.getOwnPropertyNames(this), options) as (keyof this)[]
    for (const key of keys) {
      json[key] = this[key]
    }
    return json
  }
}
