import { IModel } from '@/interfaces/model'

export interface ISlate extends IModel {
  title: string | undefined
  user_id: string | undefined
}
