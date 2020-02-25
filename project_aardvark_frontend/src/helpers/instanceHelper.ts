import { ArrayHelper } from '@/helpers/arrayHelper'
import { StringHelper } from '@/helpers/stringHelper'

export const InstanceHelper = {
  isPresent (instance: any): boolean {
    if (instance instanceof Array) {
      return ArrayHelper.isPresent(instance)
    } else if (this.isObject(instance)) {
      return Object.keys(instance).length > 0
    } else if (this.isBoolean(instance)) {
      return instance
    } else if (this.isString(instance)) {
      return StringHelper.isPresent(instance)
    } else {
      return false
    }
  },
  toArray<T> (instance: T | T[]): T[] {
    if (instance instanceof Array) {
      return instance
    } else {
      return [instance]
    }
  },
  isObject (instance: any): instance is object {
    return typeof instance === 'object'
  },
  isBoolean (instance: any): instance is boolean {
    return typeof instance === 'boolean'
  },
  isString (instance: any): instance is string {
    return typeof instance === 'string'
  },
  isFunction (instance: any): instance is Function {
    return typeof instance === 'function'
  },
}
