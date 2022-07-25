import dbConnect from '../../../libs/dbConnectLibs'
import { post, get } from './methods'
import { verifyAdminRoleMiddlewares } from '../../../middlewares/verifyAdminRoleMiddlewares'
import { verifyAssistantRoleMiddlewares } from '../../../middlewares/verifyAssitantRoleMiddlewares'
import { verifyMatchIdMiddlewares } from '../../../middlewares/verifyMatchId'
export const crudAttendancesForIdControllers = async (
  method,
  tokenId,
  userId,
  req
) => {
  try {
    await dbConnect()
    //queries
    const queries = req.query

    //middlewares
    const verifyAdminRole = await verifyAdminRoleMiddlewares(tokenId)
    const verifyAssistantRole = await verifyAssistantRoleMiddlewares(tokenId)
    const verifyMatchId = verifyMatchIdMiddlewares(tokenId, userId)
    switch (method) {
      case 'GET': {
        if (verifyAdminRole || verifyAssistantRole || verifyMatchId)
          return await get(userId, queries)
        return {
          status: 403,
          dataRes: {
            ok: false,
            msg: 'No tienes permisos para realizar esta acción'
          }
        }
      }
      case 'POST': {
        if (verifyAdminRole || verifyAssistantRole)
          return await post(tokenId, userId, req)
        return {
          status: 403,
          dataRes: {
            ok: false,
            msg: 'No tienes permisos para realizar esta acción'
          }
        }
      }
      case 'PUT': {
        return {
          status: 500,
          dataRes: {
            msg: 'método aun no implementado',
            ok: false
          }
        }
      }
      case 'DELETE': {
        return {
          status: 500,
          dataRes: {
            msg: 'método aun no implementado',
            ok: false
          }
        }
      }
      default: {
        return {
          status: 400,
          dataRes: { msg: 'No se envió un método válido', ok: false }
        }
      }
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      dataRes: {
        msg: '¡Upss! parece que hubo un error inténelo más tarde',
        ok: false
      }
    }
  }
}
