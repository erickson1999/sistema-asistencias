import mongoose, { Schema } from 'mongoose'

const DocumentActivatedModels = new Schema(
  {
    n_document: {
      type: Number,
      required: [true, 'el numero de documento es requerido']
    }
  },
  { timestamps: true }
)

export default mongoose.models.DocumentActivated ||
  mongoose.model('Documentactivated', DocumentActivatedModels)
