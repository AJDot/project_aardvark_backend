import { IModel } from '@/interfaces/model'
import { Slates } from '@/interfaces/slates/item'

export interface ISlate extends IModel {
  title: string | undefined
  user_id: string | undefined

  items: Slates.IItem[]
}
