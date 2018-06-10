import FormControlConfigInterface, { FormControlSettingInterface, FormControlSettingsInterface, SettingsMenuInterface } from '@/types/controls'
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

export class FormControlSetting implements FormControlSettingInterface {
  component: any
  label: string
  value: any

  constructor(setting: {[key:string]: any}) {
    this.component = setting.component
    this.label = setting.label
    this.value = setting.value
  }
}

export class FormControlSettings implements FormControlSettingsInterface {
  [key: string]: FormControlSettingInterface

  constructor(settings: {[key:string]: FormControlSettingInterface}) {
    this.label = settings.label
    this.required = settings.required
    this.value = settings.value
  }
}

export default class FormControlConfig implements FormControlConfigInterface {
  uuid: string
  name: string
  menu: SettingsMenuInterface
  settings?: FormControlSettingsInterface
  validation?: ValidationInterface | undefined
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
