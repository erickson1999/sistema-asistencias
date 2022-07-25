import { get } from './methods/get'
import { verifyAdminRoleMiddlewares } from '../../../middlewares/verifyAdminRoleMiddlewares'
import { verifyAssistantRoleMiddlewares } from '../../../middlewares/verifyAssitantRoleMiddlewares'
export const crudAttendancesAllControllers = async (method, tokenId, req) => {
  try {
    // queries
    const queries = req.query
    // middlewares
    const verifyAdminRole = await verifyAdminRoleMiddlewares(tokenId)
    const verifyAssistantRole = await verifyAssistantRoleMiddlewares(tokenId)

    switch (method) {
      case 'GET':
        if (verifyAdminRole || verifyAssistantRole) return await get(queries)
        return {
          status: 403,
          dataRes: {
            msg: 'No tienes los permisos para realizar esta acción',
            ok: false
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
