import { crudAttendancesForIdControllers } from '../../../controllers/attendances/id/crudAttendancesForIdControllers'
import { verifyUserExistMiddlewares } from '../../../middlewares/verifyUserExistMiddlewares'
import { decodedToken } from '../../../utils/decodedToken'
import userModels from '../../../models/userModels'
import { validateId } from '../../../utils/validateId'
const handler = async (req, res) => {
  const {
    method,
    query: { numberIdentification }
  } = req

  let userId = null
  const typeIdentification = req.headers['type-identification'] || null
  if (method === 'POST') {
    if (!typeIdentification) {
      return res
        .status(400)
        .json({ msg: 'No se envió el header type-identification', ok: false })
    }
  }

  const verifyUserExist = await verifyUserExistMiddlewares(
    numberIdentification,
    typeIdentification
  )

  if (!verifyUserExist) {
    return res.status(400).json({ msg: 'El usuario no existe o el número de identificación es incorrecto', ok: false })
  }

  if (
    method !== 'POST' &&
    method !== 'GET' &&
    method !== 'PUT' &&
    method !== 'DELETE'
  ) {
    return res.status(400).json({
      msg: 'Solo los métodos GET, POST, PUT y DELETE son soportados',
      ok: false
    })
  }

  const decodedTokenData = await decodedToken(req)

  if (!decodedTokenData) {
    return res
      .status(400)
      .json({ msg: 'No se envió un token o el token es inválido', ok: false })
  }

  const tokenId = decodedTokenData.id

  // Parser numberIdentification to userId
  try {
    switch (typeIdentification) {
      case 'id': {
        // validation id
        const validId = validateId(numberIdentification)
        if (!validId) {
          res.status(400).json({ msg: 'El id no es válido', ok: false })
        }
        const user = await userModels.findById(numberIdentification)
        userId = user._id
        break
      }
      case 'ndocument': {
        const user = await userModels.findOne({
          n_document: numberIdentification
        })
        userId = user._id
        break
      }
      default: {
        return res.status(400).json({
          msg: 'No se envió un tipo de identificación válido',
          ok: false
        })
      }
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      msg: 'Upss parece que hubo un error inténelo más tarde',
      ok: false
    })
  }

  const { status, dataRes } = await crudAttendancesForIdControllers(
    method,
    tokenId,
    userId,
    req
  )

  return res.status(status).json(dataRes)
}

export default handler
