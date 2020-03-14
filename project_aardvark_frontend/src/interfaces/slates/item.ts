import { IModel } from '@/interfaces/model'
import { IDescribable } from '@/interfaces/modeling/describable'
import Slate from '@/models/slate'

export namespace Slates {
  export interface IItem extends IModel, IDescribable {
    slate_id: string
    slate?: Slate
  }
}
