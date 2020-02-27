import { InstanceHelper } from '@/helpers/instanceHelper'
import { TClassKey } from '@/interfaces/basic'

export const ArrayHelper = {
  isPresent (array: any[]): boolean {
    return array.length > 0
  },
  pick (array: TClassKey[], options: { only?: TClassKey[], except?: TClassKey[] }): TClassKey[] {
    let keys = Object.values(array)
    if (options.only) {
      const onlyKeys = InstanceHelper.toArray(options.only)
      keys = keys.filter(k => onlyKeys.includes(k))
    } else if (options.except) {
      const exceptKeys = InstanceHelper.toArray(options.except)
      keys = keys.filter(k => !exceptKeys.includes(k))
    }

    return keys
  },
}
