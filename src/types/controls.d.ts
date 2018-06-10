import ValidationInterface from '@/types/validation'

export interface SettingsMenuInterface {
  open: boolean
  x: number
  y: number
}

export interface FieldSettingInterface {
  label: string
  value: any
  component: any
  hint: string
}

export interface FieldSettingsInterface {
  [key: string]: FieldSettingInterface
}

export default interface FieldConfigInterface {
  uuid: string
  name: string
  menu: SettingsMenuInterface
  settings: FieldSettingsInterface
  options?: Array<any> | undefined
  type?: string | undefined
  validation: ValidationInterface
}
