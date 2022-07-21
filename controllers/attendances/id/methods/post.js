import userModels from '../../../../models/userModels'
import attendanceModels from '../../../../models/attendanceModels'
import { verificationAttendanceAlreadyRegistered } from '../../../../libs/verifications/verificationAttendanceAlreadyRegistered'
import { setStatusAttendance } from '../../../../libs/sets/setStatusAttendance'

export const post = async (tokenId, userId, req) => {
  try {
    const registered = await userModels.findById(tokenId)
    const attendanceAlreadyRegistered =
      await verificationAttendanceAlreadyRegistered(userId)
    let { justification } = req.body
    const user = await userModels.findOne({ _id: userId }).populate('season')
    const season = user.season.find((season) => season.status == true)
    if (attendanceAlreadyRegistered.ok) {
      return {
        status: 400,
        dataRes: {
          msg: 'El usuario ya registro su entrada y salida hoy',
          ok: false
        }
      }
    }
    const status_attendance = await setStatusAttendance(
      season,
      attendanceAlreadyRegistered.type_attendance
    )

    const newAttendance = await attendanceModels.create({
      registered_by: registered._id,
      justification,
      status_attendance,
      user: user._id,
      season: season._id,
      type_attendance: attendanceAlreadyRegistered.type_attendance
    })

    const resAttendance = await attendanceModels
      .findOne({
        _id: newAttendance._id
      })
      .populate('user')
      .populate('season')
      .populate('registered_by')
    return {
      status: 200,
      dataRes: { msg: resAttendance, ok: true }
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      dataRes: {
        msg: '¡Upss! parece que hubo un error inténtelo más tarde',
        ok: false
      }
    }
  }
}
