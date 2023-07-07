import { apiURLHandler } from '@utils/apiURLHandler'
import ApiClient from '@utils/axios'
import {
  TPaginQuarterAnime,
  TResultAnimeDetail,
  TResultWeekAnime
} from './interfaces/animeResult.types'
import { TAnime, TUpdateAnimeDto } from '@interfaces/anime.types'
import { TBaseResult, TUploadFile } from './interfaces/common.types'

const apiBasePath = '/anime'

export const fetchQuarterApi = (time: string): Promise<TPaginQuarterAnime> =>
  ApiClient.get(apiURLHandler(apiBasePath, `/all`), {
    time
  })

export const fetchWeekInQuarterApi = (
  week: number
): Promise<TResultWeekAnime> =>
  ApiClient.get(apiURLHandler(apiBasePath, `/week`), {
    week
  })

export const fetchPostUpdateAnimeApi = (
  anime: TUpdateAnimeDto,
  token: string
): Promise<any> =>
  ApiClient.post(
    apiURLHandler(apiBasePath, '/update'),
    {
      ...anime
    },
    {
      headers: {
        authorization: token
      }
    }
  )

export const fetchAnimeByIdApi = (id: string): Promise<TResultAnimeDetail> =>
  ApiClient.get(apiURLHandler(apiBasePath, `/id`), {
    id
  })

export const fetchPostUploadImgApi = (
  file: FormData,
  token: string
): Promise<TUploadFile> =>
  ApiClient.post(apiURLHandler(apiBasePath, '/upload'), file, {
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: token
    }
  })

export const updateAnimeImgApi = (
  img: string,
  id: string,
  token: string
): Promise<TBaseResult> =>
  ApiClient.post(
    apiURLHandler(apiBasePath, '/update/img'),
    {
      img,
      id
    },
    {
      headers: {
        authorization: token
      }
    }
  )

export const addAnimeApi = (anime: TAnime, token: string) => {

  return ApiClient.post(
    apiURLHandler(apiBasePath, '/add'),
    { ...anime },
    {
      headers: {
        authorization: token
      }
    }
  )
}
