import { Menu as BaseMenu, MenuItem as BaseMenuItem, MenuItemOptionsInterface } from '@/types/menu'

export class AppMenuItem implements BaseMenuItem {
  options: MenuItemOptionsInterface
  constructor (options: MenuItemOptionsInterface) {
    this.options = options
  }

  get divider (): boolean | undefined {
    return this.options.divider
  }

  get event (): string | undefined {
    return this.options.event
  }

  get heading (): string | undefined {
    return this.options.heading
  }

  get icon (): string | undefined {
    return this.options.icon
  }

  get payload (): string | undefined {
    return this.options.payload
  }

  get text (): string | undefined {
    return this.options.text
  }
}

export class AppMenu implements BaseMenu {
  items: AppMenuItem[]

  constructor (items: AppMenuItem[]) {
    this.items = items
  }
}
