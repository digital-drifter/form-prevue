import ValidationInterface, { ValidationOptionsInterface } from '@/types/validation'

export default class ValidationConfig implements ValidationInterface {
  [key: string]: string | number | object

  constructor (options: ValidationOptionsInterface) {
    this.name = options.name
    this.as = options.as
    this.rules = options.rules
  }
}
