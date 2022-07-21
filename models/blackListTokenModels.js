import mongoose, { Schema } from 'mongoose'

const Blacklisttoken = new Schema({})

export default mongoose.models.Blacklisttoken ||
  mongoose.model('Blacklisttoken', Blacklisttoken)
