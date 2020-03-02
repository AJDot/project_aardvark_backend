import { IModel } from '@/interfaces/model'
import { IDescribable } from '@/interfaces/modeling/describable'

export namespace Slate {
  export interface IItem extends IModel, IDescribable {
  }
}
