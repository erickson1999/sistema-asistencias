import mongoose, { Schema } from 'mongoose'
import shiftModels from './shiftModels'
const SeasonSchema = new Schema(
  {
    season_start: {
      type: Date,
      required: [true, 'El campo fecha de inicio de temporada es requerido']
    },
    season_end: {
      type: Date,
      required: [true, 'El campo fecha fin de temporada es requerido']
    },
    status: {
      type: Boolean,
      required: [true, 'El campo estado es requerido'],
      default: true
    },
    shift: {
      type: mongoose.Schema.Types.ObjectId,
      ref: shiftModels
    }
  },
  { timestamps: true }
)

export default mongoose.models.Season || mongoose.model('Season', SeasonSchema)
