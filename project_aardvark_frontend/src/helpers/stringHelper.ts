import { Hash } from '@/interfaces/basic'

export const StringHelper = {
  isPresent (str: string): boolean {
    return str.length > 0
  },
  interpolate (str: string, params: Hash<string> = {}): string {
    return str.replace(new RegExp(/:(.+)(?:\b|$)/g), (match, capturedKey) => {
      return params[capturedKey]
    })
  },
}
