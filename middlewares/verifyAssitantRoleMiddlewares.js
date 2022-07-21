import roleModels from '../models/roleModels'
import userModels from '../models/userModels'
export const verifyAssistantRoleMiddlewares = async (tokenId) => {
  try {
    const userDocument = await userModels.findOne({ _id: tokenId })
    if (!userDocument) {
      console.error({
        verifyAssitantRole: 'No se encontro el usuario con el id del token'
      })
      return false
    }
    const assistantDocument = await roleModels.findOne({ name: 'assistant' })
    if (!assistantDocument) {
      console.error({ verifyAssitantRole: 'No se encontro el rol assistant' })
      return false
    }
    const compareId = userDocument.roles.find(
      (role) => role.toString() === assistantDocument._id.toString()
    )
    if (!compareId) {
      return false
    }

    return true
  } catch (error) {
    console.error({ error })
    return false
  }
}
