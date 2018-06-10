export interface ValidationOptionsInterface {
  rules: string
  name: string
  as: string
}

export default interface ValidationInterface {
  [key:string]: string | number | object
}
