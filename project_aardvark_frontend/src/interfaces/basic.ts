export interface Hash<T = any> {
  [key: string]: T;
}

export type TClassKey = string | number | symbol

export type TPartialKeys<T, ValueType = any> = {
  [key in keyof T]?: ValueType
}
