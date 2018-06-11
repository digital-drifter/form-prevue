import ValidationInterface from '@/types/validation'
import { SettingOptionInterface } from '@/types/options'

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
  options?: SettingOptionInterface[]
  multiple?: boolean
  autocomplete?: boolean
  mask?: string
}

export interface FieldSettingsInterface {
  [key: string]: FieldSettingInterface
}

export interface DynamicControlConfigInterface {
  field: string
  uuid: string
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
