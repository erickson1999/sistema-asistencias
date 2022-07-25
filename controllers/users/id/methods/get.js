import userModels from '../../../../models/userModels'
export const get = async (userId, queries) => {
  // queries
  try {
    let user = await userModels
      .findById(userId)
      .populate('roles')
      .populate('season')

    if (!user) {
      return {
        status: 400,
        dataRes: { msg: 'Usuario no encontrado', ok: false }
      }
    }

    const userObject = user.toObject()
    delete userObject.password
    return {
      status: 200,
      dataRes: { ok: true, msg: userObject }
    }
  } catch (error) {
    console.error(error)
    return { status: 400, dataRes: { msg: error, ok: false } }
  }
}
