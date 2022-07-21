import dbConnect from '../../../libs/dbConnectLibs'
import { get, put, del } from './methods'
import { verifyAdminRoleMiddlewares } from '../../../middlewares/verifyAdminRoleMiddlewares'
import { verifyTokenMiddlewares } from '../../../middlewares/verifyTokenMiddlewares'
import { verifyAssistantRoleMiddlewares } from '../../../middlewares/verifyAssitantRoleMiddlewares'
import { verifyMatchIdMiddlewares } from '../../../middlewares/verifyMatchId'
export const crudUsersForIdControllers = async (
  method,
  tokenId,
  userId,
  req
) => {
  try {
    await dbConnect()
  } catch (error) {
    return {
      status: 500,
      dataRes: {
        msg: '¡Upss! parece que ocurrio un error intentalo más tarde',
        ok: false
      }
    }
  }
  const queries = req.query
  //middlewares
  const verifyAdminRole = await verifyAdminRoleMiddlewares(tokenId)
  const verifyAssistantRole = await verifyAssistantRoleMiddlewares(tokenId)
  const verifyMatchId = verifyMatchIdMiddlewares(tokenId, userId)

  switch (method) {
    case 'GET':
      if (verifyAdminRole || verifyAssistantRole || verifyMatchId) {
        return await get(userId, queries)
      }
      return {
        status: 403,
        dataRes: {
          ok: false,
          msg: 'No tienes permisos para realizar esta acción'
        }
      }

    case 'PUT':
      if (verifyAdminRole || verifyMatchId) return await put(userId, req)
      return {
        status: 403,
        dataRes: {
          ok: false,
          msg: 'No tienes permisos para realizar esta acción'
        }
      }

    case 'DELETE':
      if (verifyAdminRole) return await del(userId)
      return {
        status: 403,
        dataRes: {
          ok: false,
          msg: 'No tienes permisos para realizar esta acción'
        }
      }

    default: {
      return {
        status: 400,
        dataRes: { ok: false, msg: `El método ${method} no es soportado` }
      }
    }
  }
}
