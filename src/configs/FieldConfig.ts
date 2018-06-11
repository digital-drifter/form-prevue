import FieldConfigInterface, { FieldSettingsInterface, SettingsMenuInterface } from '@/types/controls'
import ValidationInterface from '@/types/validation'

export default class FieldConfig implements FieldConfigInterface {
  uuid: string
  name: string
  menu: SettingsMenuInterface
  settings: FieldSettingsInterface
  validation: ValidationInterface
  options?: Array<any> | undefined
  type?: string | undefined

  constructor (options: { [key: string]: any }) {
    this.uuid = options.uuid
    this.name = options.name
    this.menu = options.menu
    this.settings = options.settings
    this.validation = options.validation
    this.options = options.options
    this.type = options.type
  }
}
