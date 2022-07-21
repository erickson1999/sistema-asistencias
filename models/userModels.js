import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import roleModels from './roleModels'
import seasonModels from './seasonModels'
import mongoosePaginate from 'mongoose-paginate-v2'
const UserSchema = new Schema(
  {
    names: {
      type: String,
      required: [true, 'Campo nombres obligatorio'],
      maxlength: [200, 'El nombre no puede exceder los 200 caracteres']
    },
    last_names: {
      type: String,
      required: [true, 'El campo apellidos es requerido']
    },
    password: {
      type: String,
      required: [true, 'El campo contraseña es requerido']
    },
    phone: {
      type: Number,
      maxlength: [9, 'El número telefonico no puede exceder los 9 caracteres']
    },
    date_birth: {
      type: Date,
      required: [true, 'El campo fecha de nacimiento es obligatorio'],
    },
    n_document: {
      type: Number,
      unique: true,
      required: [true, 'El campo número de documento es requerido']
    },
    origin_institution: {
      type: String
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: roleModels,
        required: [true, 'El campo rol es requerido']
      }
    ],
    status: {
      type: Boolean,
      required: [true, 'El campo estado es requerido'],
      default: true
    },
    season: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: seasonModels,
        required: [true, 'El campo temporada es requerido']
      }
    ]
  },
  { timestamps: true }
)

UserSchema.plugin(mongoosePaginate)

UserSchema.static('encryptPassword', async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
})

UserSchema.static('comparePasswords', async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
