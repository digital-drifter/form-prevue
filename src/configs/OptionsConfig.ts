import { FieldOptionInterface } from '@/types/options'

export default class FieldOption implements FieldOptionInterface {
  uuid: string
  label: string
  value: any

  constructor (options: { [key: string]: any }) {
    this.uuid = options.uuid
    this.label = options.label
    this.value = options.value
  }
}
