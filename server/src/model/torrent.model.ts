import { Document, Model, Schema, model } from 'mongoose'
import { ITorrent } from '../interfaces/torrent.types'

interface ITorrentDocument extends ITorrent, Document {}

const torrentSchema = new Schema<ITorrent>(
  {
    title: String,
    publish_user: String,
    publish_team: String,
    publish_time: String,
    tags: Array<String>,
    links: String,
    img: String,
    create_at: Date,
    update_at:Date
  },
  {
    versionKey: false
  }
)
export interface ITorrentModel extends Model<ITorrentDocument> {}

export const TorrentModel = model<ITorrentDocument>('torrent', torrentSchema)