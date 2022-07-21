import attendanceModels from '../../../../models/attendanceModels'
import { mapQueries } from '../../../../utils/mapQueries'
export const get = async (userId, queries) => {
  //queries
  const defaultQueries = {
    limit: 10,
    page: 1
  }
  queries = mapQueries(defaultQueries, queries)

  try {
    let attendancesPaginate = await attendanceModels.paginate(
      { user: userId },
      {
        page: queries.page,
        limit: queries.limit,
        populate: ['user', 'season', 'registered_by']
      }
    )
    if (attendancesPaginate.docs.length === 0) {
      return {
        status: 404,
        dataRes: {
          msg: 'No existe registro de asistencias de este usuario',
          ok: false
        }
      }
    }

    attendancesPaginate.docs = attendancesPaginate.docs.map((attendance) => {
      const attendanceObject = attendance.toObject()
      delete attendanceObject.user.password
      delete attendanceObject.registered_by.password
      return attendanceObject
    })

    const { totalDocs, limit, totalPages, page, prevPage, nextPage } =
      attendancesPaginate || {}

    return {
      status: 200,
      dataRes: {
        totalItems: totalDocs,
        limit,
        totalPages,
        page,
        prevPage,
        nextPage,
        msg: attendancesPaginate.docs,
        ok: true
      }
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      dataRes: {
        msg: '¡Upss! parece que hubo un error inténelo más tarde',
        ok: false
      }
    }
  }
}
