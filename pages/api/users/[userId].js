import { crudUsersForIdControllers } from '../../../controllers/users/id/crudUsersForIdControllers'
import { decodedToken } from '../../../utils/decodedToken'
import dbConnect from '../../../libs/dbConnectLibs'
const handler = async (req, res) => {
  try {
    await dbConnect()
  } catch (error) {
    console.error(err)
    return res.status(500).json({
      msg: '¡Upss! parece que ocurrio un error intentalo más tarde',
      ok: false
    })
  }
  const {
    query: { userId },
    method
  } = req
  const checkForHexRegExp = /^[0-9a-fA-F]{24}$/
  if (!checkForHexRegExp.test(userId)) {
    return res.status(400).json({ msg: 'el id no es válido', ok: false })
  }

  const decodedTokenData = await decodedToken(req)
  if (!decodedTokenData) {
    return res
      .status(400)
      .json({ msg: 'No se envió un token o el token es inválido', ok: false })
  }
  const tokenId = decodedTokenData.id

  const { status, dataRes } = await crudUsersForIdControllers(
    method,
    tokenId,
    userId,
    req
  )
  res.status(status).json(dataRes)
}

export default handler
