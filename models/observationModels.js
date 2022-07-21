import mongoose, { Schema } from 'mongoose'
import userModels from './userModels'
const ObservationSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModels,
      required: [true, 'El campo usuario es requerido']
    },
    registered_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModels,
      required: [true, "El 'campo registrado por' es requerido"]
    },
    observation_level: {
      type: String,
      required: [true, 'El campo nivel de observación es obligatorio']
    },
    observation_score: {
      type: number,
      required: [true, 'Error al guardar el puntaje del alumno'],
      default: 20
    },
    observation_description: {
      type: String,
      required: [true, 'El campo descripción es obligatorio']
    }
  },
  { timestamps: true }
)

export default mongoose.models.Observation ||
  mongoose.model('Observation', ObservationSchema)
