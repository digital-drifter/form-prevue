import FieldConfigInterface, { FieldSettingInterface, FieldSettingsInterface, SettingsMenuInterface } from '@/types/controls'
import ValidationInterface from '@/types/validation'

export class SettingsMenu implements SettingsMenuInterface {
  open: boolean = false
  x: number = 0
  y: number = 0

  constructor(options: {[key:string]: any}) {
    this.open = options.open
    this.x = options.x
    this.y = options.y
  }
}

export class FieldSetting implements FieldSettingInterface {
  component: any
  label: string
  value: any
  hint: string

  constructor(setting: {[key:string]: any}) {
    this.component = setting.component
    this.label = setting.label
    this.value = setting.value
    this.hint = setting.hint
  }
}

export class FieldSettings implements FieldSettingsInterface {
  [key: string]: FieldSettingInterface

  constructor(settings: {[key:string]: FieldSettingInterface}) {
    Object.keys(settings).forEach(key => {
      this[key] = settings[key]
    })
  }
}

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
