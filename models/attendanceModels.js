import mongoose, { Schema } from 'mongoose'
import userModels from './userModels'
import seasonModels from './seasonModels'
import mongoosePaginate from 'mongoose-paginate-v2'
const AttendanceSchema = new Schema(
  {
    status_attendance: {
      type: String,
      required: [true, 'El campo estado de asistencia es requerido'],
      default: 'falta'
    },
    justification: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: userModels,
      required: [true, 'El campo usuario es requerido']
    },
    season: {
      type: Schema.Types.ObjectId,
      ref: seasonModels,
      required: [true, 'El campo temporada es requerido']
    },
    registered_by: {
      type: Schema.Types.ObjectId,
      ref: userModels,
      required: [true, 'El campo registrado por es requerido']
    },
    type_attendance: {
      type: String,
      required: [true, 'El campo tipo de asistencia es requerido']
    }
  },
  { timestamps: true }
)

AttendanceSchema.plugin(mongoosePaginate)

export default mongoose.models.Attendance ||
  mongoose.model('Attendance', AttendanceSchema)
