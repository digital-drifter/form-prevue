import { ConfigInterface } from '@/types/controls'

export class FormControlConfig implements ConfigInterface {
  required: boolean
  label: string
  name: string
}
