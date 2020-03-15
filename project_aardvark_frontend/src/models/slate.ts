import { ISlate } from '@/interfaces/slate'
import Model from '@/models/model'
import SlateItem from '@/models/slateItem'
import { TClassKey, TPartialKeys } from '@/interfaces/basic'
import { Slates } from '@/interfaces/slates/item'
import { RelationType } from '@/enums/relationType'
import ICollection from '@/interfaces/global/collectionInterfaces'
import trackFactory from '@/decorators/track'

export default class Slate extends Model implements ISlate {
  declare title: string

  user_id: string = ''

  items: SlateItem[] = []

  constructor () {
    super()
    const track = trackFactory(SlateItem)
    track(this, 'title', '')
  }

  _collection: ICollection = {
    name: 'slates',
    singular: 'slate',
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

  load (json: TPartialKeys<this>, options: { only?: TClassKey[]; except?: TClassKey[] } = {}): this {
    super.load(json, options)
    if (json.items) {
      this.items = (<Slates.IItem[]>json.items).map(x => new SlateItem(this).load(x))
    }
    return this
  }
}
