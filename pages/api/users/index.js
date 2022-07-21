import { crudUsersAllControllers } from '../../../controllers/users/all/crudUsersAllControllers'
import { decodedToken } from '../../../utils/decodedToken'

const handler = async (req, res) => {
  const { method } = req

  const decodedTokenData = await decodedToken(req)
  if (!decodedTokenData) {
    return res
      .status(400)
      .json({ msg: 'No se envió un token o el token es inválido', ok: false })
  }
  const tokenId = decodedTokenData.id

  const { status, dataRes } = await crudUsersAllControllers(
    method,
    tokenId,
    req
  )
  res.status(status).json(dataRes)
}
export default handler
