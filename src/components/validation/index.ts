import { ValidationInterface } from '@/types/validation'

export default class FieldValidation implements ValidationInterface {
  constructor(public name: string, public as: string, public rules: string) {

  }
}
