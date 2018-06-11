interface MenuItemOptionsInterface {
  divider?: boolean
  event?: string
  heading?: string
  icon?: string
  payload?: string
  text?: string
}

export interface MenuItemInterface {
  options: MenuItemOptionsInterface

  [key: string]: any
}

export interface MenuInterface {
  items: MenuItemInterface[]
}

export declare class MenuItem implements MenuItemInterface {
  [key: string]: any

  options: MenuItemOptionsInterface

  protected constructor (options: MenuItemOptionsInterface)
}

export declare class Menu implements MenuInterface {
  items: MenuItemInterface[]

  protected constructor (items: MenuItemInterface[])
}
