import dbConnect from '../../../libs/dbConnectLibs'
import { verifyAdminRoleMiddlewares } from '../../../middlewares/verifyAdminRoleMiddlewares'
import { get } from './methods/get'
export const crudShiftsAllControllers = async (method, tokenId) => {
  try {
    await dbConnect()
    //middelwares
    const verifyAdminRole = await verifyAdminRoleMiddlewares(tokenId)

    switch (method) {
      case 'GET': {
        if (verifyAdminRole) {
          return await get()
        } else {
          return {
            status: 401,
            dataRes: {
              ok: false,
              msg: 'No tienes permisos para realizar esta acción'
            }
          }
        }
      }
      default:
        return {
          status: 400,
          dataRes: { msg: 'El método no es soportado', ok: false }
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
