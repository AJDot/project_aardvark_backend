import { Hash } from '@/interfaces/basic'

export const StringHelper = {
  isPresent (str: string): boolean {
    return str.length > 0
  },
  interpolate (str: string, params: Hash<string> = {}): string {
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        str.replace(new RegExp(`:${key}`, 'g'), () => {
          return params[key]
        })
      }
    }
    return str
  },
}
