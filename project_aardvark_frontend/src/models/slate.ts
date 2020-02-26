import { ISlate } from '@/types/slate'
import Model from '@/models/model'

export default class Slate extends Model implements ISlate {
  title: string = ''
}
