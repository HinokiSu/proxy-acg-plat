
export interface IPublishInfoObj {
  user: string
  team: string
  time: string
}

export interface IPublishInfo {
  publish_user: string
  publish_team: string
  publish_time: string
}

export interface ITorrent {
  title: string
  publish_user: string
  publish_team: string
  publish_time: string
  tags: string[]
  links: string
  img?: string
  create_at?: Date
  update_at?: Date
}

export type TTorrentDto = ITorrent