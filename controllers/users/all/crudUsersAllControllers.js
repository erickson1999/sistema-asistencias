import dbConnect from '../../../libs/dbConnectLibs'
import { get } from './methods'
import { crudRegisterControllers } from '../../auth/crudRegisterControllers'
import { verifyAdminRoleMiddlewares } from '../../../middlewares/verifyAdminRoleMiddlewares'
import { verifyAssistantRoleMiddlewares } from '../../../middlewares/verifyAssitantRoleMiddlewares'
export const crudUsersAllControllers = async (method, tokenId, req) => {
  // queries
  const queries = req.query

  //middlewares
  const verifyAdminRole = await verifyAdminRoleMiddlewares(tokenId)
  const verifyAssistantRole = await verifyAssistantRoleMiddlewares(tokenId)

  switch (method) {
    case 'GET': {
      if (verifyAdminRole || verifyAssistantRole) return await get(queries)
      return {
        status: 403,
        dataRes: {
          ok: false,
          msg: 'No tienes permisos para realizar esta acción'
        }
      }
    }
    case 'POST': {
      return await crudRegisterControllers(method, req)
    }
    default:
      return {
        status: 400,
        dataRes: {
          ok: false,
          msg: `El método ${method} no es soportado`
        }
      }
  }
}
