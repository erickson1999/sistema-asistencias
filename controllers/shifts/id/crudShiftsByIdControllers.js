import { get } from './methods/get'
import { put } from './methods/put'
import dbConnect from '../../../libs/dbConnectLibs'
import { verifyAdminRoleMiddlewares } from '../../../middlewares/verifyAdminRoleMiddlewares'

export const crudShiftByIdControllers = async (
  method,
  tokenId,
  shiftId,
  req
) => {
  try {

    //middlewares
    const verifyAdminRole = await verifyAdminRoleMiddlewares(tokenId)
    switch (method) {
      case 'GET': {
        if (verifyAdminRole) {
          return await get(shiftId)
        } else {
          return {
            status: 403,
            dataRes: { msg: 'No tienes permisos para realizar esta acción' }
          }
        }
      }
      case 'PUT': {
        if (verifyAdminRole) {
          return await put(shiftId, req)
        } else {
          return {
            status: 403,
            dataRes: { msg: 'No tienes permisos para realizar esta acción' }
          }
        }
      }
      default: {
        return {
          status: '400',
          dataRes: { msg: 'El método no es soportado', ok: false }
        }
      }
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      dataRes: {
        msg: '¡Upss! parece que ocurrio un error intentalo más tarde',
        ok: false
      }
    }
  }
}
