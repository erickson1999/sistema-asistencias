import { decodedToken } from '../../../utils/decodedToken'
import { crudShiftsAllControllers } from '../../../controllers/shifts/all/crudShiftsAllControllers'
import dbConnect from '../../../libs/dbConnectLibs'
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

  const decodedUserToken = await decodedToken(req)
  if (!decodedUserToken) {
    return res
      .status(401)
      .json({ msg: 'No se envió un token o el token es inválido', ok: false })
  }

  const tokenId = decodedUserToken.id
  if (method !== 'GET') {
    return res.status(400).json({ msg: 'El método no es soportado', ok: false })
  }

  const { status, dataRes } = await crudShiftsAllControllers(
    method,
    tokenId
  )
  return res.status(status).json(dataRes)
}
export default handler
