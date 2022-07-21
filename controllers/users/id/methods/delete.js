import userModels from '../../../../models/userModels'
export const del = async (id) => {
  try {
    let user = await userModels.findById(id)
    if (!user)
      return {
        status: 400,
        dataRes: { msg: 'Usuario no encontrado', ok: false }
      }

    user = await userModels.findById(id).populate('roles')
    const findAdminRole = user.roles.find((role) => role.name === 'admin')
    if (findAdminRole) {
      return {
        status: 400,
        dataRes: { msg: 'No puedes eliminar a un administrador', ok: false }
      }
    }

    await userModels.deleteOne({ _id: id })
    return {
      status: 200,
      dataRes: { msg: 'usuario eliminado', ok: true }
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      dataRes: {
        msg: 'Upss parece que hubo un error intentalo más tarde',
        ok: false
      }
    }
  }
}
