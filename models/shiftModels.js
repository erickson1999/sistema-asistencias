import mongoose, { Schema } from 'mongoose'

const ShiftSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El campo nombre de turno es requerido']
    },
    shift_start: {
      type: Map,
      required: [true, 'El campo hora de entrada es requerido']
    },
    shift_end: {
      type: Map,
      required: [true, 'El campo hora de salida es requerido']
    }
  },
  { timestamps: true }
)

export default mongoose.models.Shift || mongoose.model('Shift', ShiftSchema)
