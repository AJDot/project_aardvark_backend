import { AxiosResponse } from 'axios'

export namespace Backend {
  export interface IResponse {
    response: AxiosResponse
  }
}

export interface IModel {
  id: string
}

export interface ISlate extends IModel {
  title: string
}
