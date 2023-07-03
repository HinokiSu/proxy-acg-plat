import {
  fetchAnimeById,
  fetchPostUpdateAnime,
  fetchPostUploadImg,
  fetchQuarter
} from '@api/anime.api'
import { TAnime } from '@interfaces/anime.types'
import getNowISO from '@utils/getNowISO'
import { defineStore, storeToRefs } from 'pinia'
import { useUserStore } from './user.store'
import dayjs from 'dayjs'

type TState = {
  total: number
  animeList: TAnime[]
  anime: TAnime
}
export const useAnimeStore = defineStore('AnimeStore', {
  state: (): TState => ({
    total: 0,
    animeList: [],
    anime: {
      _id: '',
      origin_id: '',
      zh_name: '',
      ja_name: '',
      en_name: '',
      start_date: '',
      end_date: '',
      credit: '',
      img: '',
      create_at: '',
      update_at: ''
    }
  }),
  getters: {},
  actions: {
    clearState() {
      this.animeList = []
      this.anime = {
        _id: '',
        origin_id: '',
        zh_name: '',
        ja_name: '',
        en_name: '',
        start_date: '',
        end_date: '',
        credit: '',
        img: '',
        create_at: '',
        update_at: ''
      }
    },
    // time format "YYYY/MM/DD" or others
    async getQuarterAnime(time: string) {
      const formattedTime = dayjs(time).format("YYYY/MM/DD")
      const res = await fetchQuarter(formattedTime)
      if (!res.data) {
        console.log(`Error: fetch [${formattedTime}] quarter anime failed`)
      }
      this.total = res.data.total
      this.animeList = res.data.list
    },
    async getAnimeById(id: string) {
      const res = await fetchAnimeById(id)
      this.anime = res.data.anime
      return this.anime
    },
    async updateAnime() {
      const { token } = storeToRefs(useUserStore())
      const now = getNowISO()
      const res = await fetchPostUpdateAnime(
        {
          _id: this.anime._id,
          zh_name: this.anime.zh_name,
          en_name: this.anime.en_name,
          img: this.anime.img,
          update_at: now
        },
        token.value
      )
      if (!res) {
        return false
      }
      return true
    },

    async uploadImg(file: File) {
      const { token } = storeToRefs(useUserStore())

      const formData = new FormData()
      formData.append('file', file)
      const res = await fetchPostUploadImg(formData, token.value)
      if (!res.status) {
        return ''
      }
      console.log(res.file)
      return res.file.filename
    }
  }
})
