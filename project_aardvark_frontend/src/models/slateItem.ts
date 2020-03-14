import Model from '@/models/model'
import { Slates } from '@/interfaces/slates/item'
import Slate from '@/models/slate'

export default class SlateItem extends Model implements Slates.IItem {
  slate_id: string = ''
  description: string = ''
  _slate: Slate | undefined

  constructor (parent: Slate) {
    super()
    this.slate_id = parent.id
    this._slate = parent
  }

  get slate (): Slate | undefined {
    return this._slate || undefined
  }
}
