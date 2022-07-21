import mongoose, { Schema } from 'mongoose'

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'EL campo nombre de rol es requerido']
    }
  },
  { timestamps: true }
)

export default mongoose.models.Role || mongoose.model('Role', RoleSchema)
