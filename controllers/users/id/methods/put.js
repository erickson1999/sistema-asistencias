import userModels from '../../../../models/userModels'
export const put = async (userId, req) => {
  try {
    if (req.body.password) {
      req.body.password = await userModels.encryptPassword(req.body.password)
    }
    const user = await userModels.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true
    })
    if (!user) {
      return { status: 400, dataRes: { ok: false } }
    }
    const { password, ...userWithoutPassword } = user.toObject()
    return {
      status: 200,
      dataRes: { ok: true, data: userWithoutPassword }
    }
  } catch (error) {
    console.error(error)
    return { status: 400, dataRes: { ok: false } }
  }
}
