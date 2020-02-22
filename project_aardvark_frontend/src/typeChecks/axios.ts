import { AxiosError, AxiosResponse } from 'axios'

export namespace TAxios {
  export function isError (object: AxiosError | AxiosResponse): object is AxiosError {
    return 'isAxiosError' in object
  }
}
