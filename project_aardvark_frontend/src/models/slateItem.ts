import Model from '@/models/model'
import { Slates } from '@/interfaces/slates/item'
import Slate from '@/models/slate'
import trackFactory from '@/decorators/track'
import ICollection from '@/interfaces/global/collectionInterfaces'
import { IRelation } from '@/interfaces/global/relation'

export default class SlateItem extends Model implements Slates.IItem {
  declare slate_id: string
  declare description: string
  _slate: Slate | undefined

  constructor (parent: Slate) {
    super()
    const track = trackFactory(SlateItem)
    track(this, 'description', '123')
    track(this, 'slate_id', parent.id)
    this._slate = parent
  }

  _collection: ICollection = {
    name: 'slateItems',
    singular: 'slateItem',
  }

  _relations: { [key in keyof this]?: IRelation } = {}

  get slate (): Slate | undefined {
    return this._slate || undefined
  }
}
