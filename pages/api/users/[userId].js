import { crudUsersForIdControllers } from '../../../controllers/users/id/crudUsersForIdControllers'
import { decodedToken } from '../../../utils/decodedToken'
const handler = async (req, res) => {
  const {
    query: { userId },
    method
  } = req
  const checkForHexRegExp = /^[0-9a-fA-F]{24}$/
  if (!checkForHexRegExp.test(userId)) {
    return { status: 400, dataRes: { ok: false, msg: 'El id no es válido' } }
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
