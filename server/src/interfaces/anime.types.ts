export type TAnime = {
  _id: string
  origin_id: string
  zh_name: string
  ja_name: string
  en_name: string
  start_date: string
  end_date: string
  credit: string
  img: string
  create_at: string
  update_at: string
  start_week: number
}


export type TUpdateAnimeDto = {
  _id: string,
  zh_name: string
  en_name: string
  img: string
  update_at: string
}