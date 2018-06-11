import MenuInterface, { MenuItemInterface } from '@/types/menu'

export class MenuItem implements MenuItemInterface {
  [key: string]: any

  event?: string
  payload?: string
  icon?: string
  text?: string
  heading?: string
  divider?: boolean

  constructor (options: { [key: string]: any }) {
    this.event = options.event
    this.payload = options.payload
    this.icon = options.icon
    this.text = options.text
    this.heading = options.heading
    this.divider = options.divider
  }
}

export default class Menu implements MenuInterface {
  readonly items: MenuItemInterface[]

  constructor (items: MenuItemInterface[]) {
    this.items = items
  }
}
