import { validateId } from '../../../utils/validateId'
import { decodedToken } from '../../../utils/decodedToken'
import { crudShiftByIdControllers } from '../../../controllers/shifts/id/crudShiftsByIdControllers'
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

  const {
    method,
    query: { shiftId }
  } = req
  //validations
  const decodedUserToken = await decodedToken(req)
  if (!decodedUserToken) {
    return res
      .status(401)
      .json({ msg: 'No se envió un token o el token es inválido', ok: false })
  }
  const tokenId = decodedUserToken.id

  const validateShiftId = validateId(shiftId)

  if (!validateShiftId) {
    return res.status(400).json({ msg: 'El id es inválido', ok: false })
  }

  const { status, dataRes } = await crudShiftByIdControllers(
    method,
    tokenId,
    shiftId,
    req
  )
  return res.status(status).json(dataRes)
}

export default handler
