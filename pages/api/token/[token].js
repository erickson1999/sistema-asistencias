import jwt from 'jsonwebtoken'
import userModels from '../../../models/userModels'
import dbConnect from '../../../libs/dbConnectLibs'
const SECRET_KEY = process.env.SECRET_KEY
const handler = async (req, res) => {
  try {
    await dbConnect()
    const {
      method,
      query: { token }
    } = req
    if (method !== 'GET') {
      return res
        .status(400)
        .json({ msg: 'Este end-point solo acepta el método GET', ok: false })
    }
    try {
      const decoded = jwt.verify(token, SECRET_KEY)
      if (decoded) {
        const user = await userModels
          .findOne({ _id: decoded.id })
          .populate('roles')
          .populate('season')

        if (!user) {
          return res
            .status(400)
            .json({ msg: '¡Upss! parece que el usuario no existe', ok: false })
        }

        const userObject = user.toObject()
        res.status(200).json({ msg: userObject, ok: true })
      }
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        res.status(400).json({ msg: 'El token ha expirado', ok: false })
      } else {
        res
          .status(400)
          .json({ msg: 'El token enviado no es válido', ok: false })
      }
    }
  } catch (error) {
    res.status(500).json({
      msg: '¡Upss! parece que hubo un error inténtelo más tarde',
      ok: false
    })
  }
}
export default handler
