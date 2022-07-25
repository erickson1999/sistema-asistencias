import { crudRegisterControllers } from '../../../../controllers/auth/crudRegisterControllers'
import dbConnect from '../../../../libs/dbConnectLibs'
import { decodedToken } from '../../../../utils/decodedToken'
const handler = async (req, res) => {
  try {
    await dbConnect()
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ msg: '¡Upss! parece que ocurrio un error intentalo más tarde' })
  }
  const { method } = req
  let tokenId = null
  const decodedTokenData = await decodedToken(req)

  if (decodedTokenData) {
    tokenId = decodedTokenData.id
  }

  const { status, dataRes } = await crudRegisterControllers(
    method,
    tokenId,
    req
  )
  return res.status(status).json(dataRes)
}

export default handler
