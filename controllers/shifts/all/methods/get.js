import shiftModels from '../../../../models/shiftModels'
export const get = async () => {
  const shifts = await shiftModels.find({})

  return { status: 200, dataRes: { msg: shifts, ok: true } }
}
