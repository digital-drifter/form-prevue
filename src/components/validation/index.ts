import ValidationInterface from '@/types/validation'

export default class FieldValidation implements ValidationInterface {
  [key: string]: string | number | object

  constructor(public name: string, public as: string, public rules: string) {

  }
}
