import { Hash } from '@/interfaces/basic'

export const StringHelper = {
  isPresent (str: string): boolean {
    return str.length > 0
  },
  interpolate (str: string, params: Hash<string> = {}): string {
    return str.replace(new RegExp(/%{(.+)}|:(.+?)(?:\b|$)/g), (match, capturedKey1, capturedKey2) => {
      const key = capturedKey1 || capturedKey2
      return params[key]
    })
  },
}
