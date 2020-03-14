import { Constructor } from '@/interfaces/global/constructor'
import { RelationType } from '@/enums/relationType'

export interface IRelation<T = any, P = any> {
  Type: Constructor<T>
  relationType: RelationType
  create(parent: P, json: Partial<T>): T
}
