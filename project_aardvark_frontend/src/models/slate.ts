// import Vue from 'vue'
import { ISlate } from '@/interfaces/slate'
import Model from '@/models/model'
import SlateItem from '@/models/slateItem'
import { TClassKey, TPartialKeys } from '@/interfaces/basic'
import { Slates } from '@/interfaces/slates/item'
import { RelationType } from '@/enums/relationType'

// function embed (): PropertyDecorator {
//   return function (target, propertyKey): void {
//     const _key = '_' + String(propertyKey)
//     Object.defineProperty(target, propertyKey, {
//       get () {
//         return this[_key]
//       },
//       set (newVal) {
//         Vue.set(target, _key, newVal)
//       },
//     })
//   }
// }

// function embedsMany<T extends typeof Model> (Type: T): PropertyDecorator {
//   return function (target, propertyKey) {
//     const _key: string = '_' + String(propertyKey)
//     Object.defineProperty(target as T, propertyKey, {
//       get () {
//         return this[_key]
//       },
//       set (newVal) {
//         function setItem (val: object) {
//           // @ts-ignore
//           const property = target[_key]
//           const index: number = property.length
//           if (val instanceof Type) {
//             Vue.set(property, index, newVal)
//           } else if (typeof val === 'object') {
//             Vue.set(property, index, new Type().load(val))
//           }
//         }
//
//         // @ts-ignore
//         if (!target[_key]) {
//           // @ts-ignore
//           Vue.set(target, _key, [])
//         }
//         if (Array.isArray(newVal)) {
//           newVal.forEach(val => {
//             setItem(val)
//           })
//         } else {
//           setItem(newVal)
//         }
//       },
//     })
//   }
// }

export default class Slate extends Model implements ISlate {
  title: string = ''
  c_at: string = ''
  u_at: string = ''
  user_id: string = ''

  items: SlateItem[] = []

  load (json: TPartialKeys<this>, options: { only?: TClassKey[]; except?: TClassKey[] } = {}): this {
    super.load(json, options)
    if (json.items) {
      const items = (<Slates.IItem[]>json.items).map(x => new SlateItem(this).load(x))
      this.items = items
    }
    return this
  }

  _relations = {
    items: {
      Type: SlateItem,
      relationType: RelationType.Array,
      create (parent: Slate, json: Partial<SlateItem>) {
        return new this.Type(parent)
      },
    },
  }
}
