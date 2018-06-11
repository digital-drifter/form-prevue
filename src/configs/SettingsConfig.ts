import { SettingOptionInterface } from '@/types/options'
import { FieldSettingInterface, FieldSettingsInterface, SettingsMenuInterface } from '@/types/controls'

export class SettingOption implements SettingOptionInterface {
  label: string
  value: string | boolean | object

  constructor (options: { [key: string]: any }) {
    this.label = options.label
    this.value = options.value
  }
}

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
  options?: SettingOptionInterface[]
  multiple?: boolean
  autocomplete?: boolean

  constructor(setting: {[key:string]: any}) {
    this.component = setting.component
    this.label = setting.label
    this.value = setting.value
    this.hint = setting.hint
    this.options = setting.options
    this.multiple = setting.multiple
    this.autocomplete = setting.autocomplete
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
