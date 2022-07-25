import { decodedToken } from '../../../utils/decodedToken'
import { crudAttendancesAllControllers } from '../../../controllers/attendances/all/crudAttendancesAllControllers'
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
  if (method !== 'GET') {
    return res
      .status(400)
      .json({ msg: 'Solo el método GET es soportado', ok: false })
  }

  const decodedTokenData = await decodedToken(req)
  if (!decodedTokenData) {
    return res
      .status(400)
      .json({ msg: 'No se envió un token o el token es inválido', ok: false })
  }
  const tokenId = decodedTokenData.id
  const { status, dataRes } = await crudAttendancesAllControllers(
    method,
    tokenId,
    req
  )

  return res.status(status).json(dataRes)
}

export default handler
