import {
  UpdateAnimeImg,
  fetchAnimeById,
  fetchPostUpdateAnime,
  fetchPostUploadImg,
  fetchQuarter,
  fetchWeekInQuarter
} from '@api/anime.api'
import { TAnime, TWeekItem } from '@interfaces/anime.types'
import getNowISO from '@utils/getNowISO'
import { defineStore, storeToRefs } from 'pinia'
import { useUserStore } from './user.store'
import dayjs from 'dayjs'

type TState = {
  total: number
  animeList: TAnime[]
  anime: TAnime
  week: TWeekItem[]
  loading: boolean
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
      update_at: '',
      start_week: 1
    },
    week: [],
    loading: true
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
        update_at: '',
        start_week: 1
      }
      this.week = []
    },

    clearAnime() {
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
        update_at: '',
        start_week: 1
      }
    },

    getWeekTabs() {
      const tabs = [
        { name: 'ALL', flag: -1, status: false },
        { name: '周一', flag: 1, status: false },
        { name: '周二', flag: 2, status: false },
        { name: '周三', flag: 3, status: false },
        { name: '周四', flag: 4, status: false },
        { name: '周五', flag: 5, status: false },
        { name: '周六', flag: 6, status: false },
        { name: '周日', flag: 0, status: false }
      ]
      this.week = tabs
    },
    changeWeekTab(key: number) {
      this.week.forEach((item) => {
        if (item.flag === key) {
          item.status = true
        } else {
          item.status = false
        }
      })
    },
    async getWeekAnime(key: number) {
      const res = await fetchWeekInQuarter(key)
      if (!res.data) {
        console.log(`Error: fetch [${this.week}] week anime failed`)
      }
      this.animeList = res.data.list
    },
    async getQuarterAnime(time: string) {
      // time will be formatted "YYYY/MM/DD"
      const formattedTime = dayjs(time).format('YYYY/MM/DD')
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
      return res.file.remote
    },

    async updateAnimeImg(img: string, id: string) {
      const { token } = storeToRefs(useUserStore())
      const res = await UpdateAnimeImg(img, id, token.value)
      if (!res.status) {
        return false
      }
      return true
    }
  }
})
