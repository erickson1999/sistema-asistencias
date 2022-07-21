import shiftModels from '../../../../models/shiftModels'
export const get = async (shiftId) => {
  const shift = await shiftModels.findById(shiftId)
  if (!shift) {
    return {
      status: 404,
      dataRes: { msg: 'No se encontró el turno', ok: false }
    }
  }

  return { status: 200, dataRes: { msg: shift, ok: true } }
}
