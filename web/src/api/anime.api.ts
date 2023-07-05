import { apiURLHandler } from '@utils/apiURLHandler'
import ApiClient from '@utils/axios'
import {
  TPaginQuarterAnime,
  TResultAnimeDetail
} from './interfaces/animeResult.types'
import { TUpdateAnimeDto } from '@interfaces/anime.types'
import { TBaseResult, TUploadFile } from './interfaces/common.types'

const apiBasePath = '/anime'

export const fetchQuarter = (time: string): Promise<TPaginQuarterAnime> =>
  ApiClient.get(apiURLHandler(apiBasePath, `/all`), {
    time
  })

export const fetchPostUpdateAnime = (
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

export const fetchAnimeById = (id: string): Promise<TResultAnimeDetail> =>
  ApiClient.get(apiURLHandler(apiBasePath, `/id`), {
    id
  })

export const fetchPostUploadImg = (
  file: FormData,
  token: string
): Promise<TUploadFile> =>
  ApiClient.post(apiURLHandler(apiBasePath, '/upload'), file, {
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: token
    }
  })

export const UpdateAnimeImg = (
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
