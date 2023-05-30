export interface IMenu {
  menus: TMenuItem[]
}

export type TMenuItem = {
  key: number
  title: string
  routeName: string
  icon: string
  status: boolean
}
