export interface MenuItemInterface {
  event?: string
  payload?: string
  icon?: string
  text?: string
  heading?: string
  divider?: boolean

  [key: string]: any
}

export default interface MenuInterface {
  items: MenuItemInterface[]
}
