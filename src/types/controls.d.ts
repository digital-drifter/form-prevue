import ValidationInterface from '@/types/validation'
import { FieldOptionInterface, SettingOptionInterface } from '@/types/options'

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

export interface FieldConfigInterface {
  uuid: string
  name: string
  menu: SettingsMenuInterface
  settings: FieldSettingsInterface
  options?: FieldOptionInterface[]
  type?: string | undefined
  validation: ValidationInterface
}
