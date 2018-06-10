import ValidationInterface from '@/types/validation'

export interface SettingsMenuInterface {
  open: boolean
  x: number
  y: number
}

export interface FormControlSettingInterface {
  label: string
  value: any
  component: any
}

export interface FormControlSettingsInterface {
  [key: string]: FormControlSettingInterface
}

export default interface FormControlConfigInterface {
  uuid: string
  name: string
  menu: SettingsMenuInterface
  settings: FormControlSettingsInterface
  options?: Array<any> | undefined
  type?: string | undefined
  validation?: ValidationInterface | undefined
}
