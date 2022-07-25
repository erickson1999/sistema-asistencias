import dbConnect from '../../../../libs/dbConnectLibs'
import userModels from '../../../../models/userModels'
import jwt from 'jsonwebtoken'
import { defaultConfig } from '../../../../defaultConfig'
const SECRET_KEY = process.env.SECRET_KEY

const handler = async (req, res) => {
  try {
    await dbConnect()
  } catch (error) {
    return res.status(500).json({
      msg: '¡Upss! parece que ocurrio un error intentalo más tarde',
      ok: false
    })
  }
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        const userExist = await userModels.findOne({
          n_document: req.body.n_document
        })

        if (!userExist) {
          return res
            .status(404)
            .json({ msg: 'El usuario no existe', ok: false })
        }

        if (userExist.status === false) {
          return res
            .status(403)
            .json({ msg: 'El usuario no esta activo', ok: false })
        }

        if (userExist) {
          const { password } = req.body
          const passEncrypt = userExist.password
          const matchPassword = await userModels.comparePasswords(
            password,
            passEncrypt
          )
          if (!matchPassword) {
            return res
              .status(400)
              .json({ ok: false, msg: 'Usuario o contraseña incorrecto' })
          }

          const token = jwt.sign({ id: userExist._id }, SECRET_KEY, {
            expiresIn: defaultConfig().tokenExpiration
          })

          const userClean = {
            age: userExist.age,
            names: userExist.names,
            last_names: userExist.last_names,
            n_document: userExist.n_document,
            origin_institution: userExist.origin_institution,
            document_type: userExist.document_type
          }

          return res.status(200).json({ ok: true, data: userClean, token })
        }
        return res
          .status(400)
          .json({ ok: false, msg: 'Usuario o contraseña incorreto' })
      } catch (error) {
        console.error({ error })
        return {
          status: 500,
          dataRes: {
            msg: '¡Upss! parece que hubo un error inténelo más tarde',
            ok: false
          }
        }
      }
    default:
      return res
        .status(400)
        .json({ ok: false, msg: `El método ${method} no es soportado` })
  }
}
export default handler
