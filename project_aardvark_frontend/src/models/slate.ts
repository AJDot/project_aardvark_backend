import { ISlate } from '@/interfaces/slate'
import Model from '@/models/model'

export default class Slate extends Model implements ISlate {
  title: string = ''
  c_at: string = ''
  u_at: string = ''
  user_id: string = ''
}
