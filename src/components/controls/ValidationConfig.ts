import ValidationInterface from '@/types/validation'

export default class ValidationConfig implements ValidationInterface {
  name: string
  as: string
  rules: string

  constructor (options: { [key: string]: any }) {
    this.name = options.name
    this.as = options.as
    this.rules = options.rules
  }
}
