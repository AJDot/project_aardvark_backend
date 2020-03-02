import { IModel } from '@/interfaces/model'
import { Slate } from '@/interfaces/slates/item'

export interface ISlate extends IModel {
  title: string | undefined
  user_id: string | undefined
  items: Slate.IItem
}
