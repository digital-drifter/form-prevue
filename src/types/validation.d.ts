export interface ValidationOptionsInterface {
  rules: string | object | null
  name: string
  as: string
}

export default interface ValidationInterface {
  [key:string]: string | object | null
}
