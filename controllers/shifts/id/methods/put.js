import shiftModels from '../../../../models/shiftModels'
import { validationDataShift } from '../../../../utils/validationDataShift'
export const put = async (shiftId, req) => {
  //verification data correct

  const validData = validationDataShift(req)
  if (!validData) {
    return {
      status: 400,
      dataRes: { msg: 'Los datos para actualizar no son correctos', ok: false }
    }
  }

  //update data
  const shift = await shiftModels.findById(shiftId)
  if (!shift) {
    return {
      status: 400,
      dataRes: { msg: 'No se encontró el turno', ok: false }
    }
  }
  const shiftObject = shift.toObject()
  const test = JSON.stringify(shiftObject.shift_start)


  return {
    status: 200,
    dataRes: { msg: 'El turno se actualizó correctamente', ok: true }
  }
}
