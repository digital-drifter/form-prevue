interface MenuItemOptionsInterface {
  event?: string
  payload?: string
  icon?: string
  text?: string
  heading?: string
  divider?: boolean
}

interface MenuInterface {
  items: MenuItem[]
}

export class MenuItem {
  event?: string
  payload?: string
  icon?: string
  text?: string
  heading?: string
  divider?: boolean

  constructor(item: MenuItemOptionsInterface) {
    this.event = item.event
    this.payload = item.payload
    this.icon = item.icon
    this.text = item.text
    this.heading = item.heading
    this.divider = item.divider
  }
}

export default class Menu implements MenuInterface {
  readonly _items: MenuItem[]

  constructor(items: MenuItem[]) {
    this._items = items
  }

  get items(): MenuItem[] {
    return this._items
  }
}
