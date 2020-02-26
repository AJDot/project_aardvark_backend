import { Hash } from '@/interfaces/basic'
import { StringHelper } from '@/helpers/stringHelper'

export module Routes {
  const BASE = ''
  const BASE_API = `${BASE}/api/v1`

  export enum Name {
    Home = 'home',
    Slates = 'slates',
    NotFound = 'notFound'
  }

  export enum Path {
    Home = '/',
    SignUp = '/sign_up',
    SignIn = '/sign_in',
    Slates = '/slates',
    Slate = '/slates/:id',
    NotFound = '*'
  }

  export function path (path: Path, params: Hash<string> = {}): string {
    return StringHelper.interpolate(`${BASE}${path}`, params)
  }

  export function apiPath (path: Path, params: Hash<string> = {}): string {
    return StringHelper.interpolate(`${BASE_API}${path}`, params)
  }
}
