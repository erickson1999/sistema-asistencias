import roleModels from '../models/roleModels'
import userModels from '../models/userModels'
export const verifyAdminRoleMiddlewares = async (tokenId) => {
  try {
    if (!tokenId) {
      return false
    }
    const userDocument = await userModels.findOne({ _id: tokenId })
    if (!userDocument) {
      console.error({
        verifyAdminRoleMiddlewares:
          'No se encontró el usuario con el id del token'
      })
      return false
    }

    const adminDocument = await roleModels.findOne({ name: 'admin' })
    if (!adminDocument) {
      console.error({
        verifyAdminRoleMiddlewares: 'No se encontro el rol admin'
      })
      return false
    }
    const matchId = userDocument.roles.find(
      (role) => role.toString() === adminDocument._id.toString()
    )
    if (!matchId) {
      return false
    }
    return true
  } catch (error) {
    console.error({ error })
    return false
  }
}
