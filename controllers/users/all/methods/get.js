import userModels from '../../../../models/userModels'
import { mapQueries } from '../../../../utils/mapQueries'
import { findToRegex } from '../../../../utils/findToRegex'
export const get = async (queries) => {
  try {
    // queries
    const defaultQueries = {
      limit: 15,
      page: 1,
      names: null,
      sort: 1,
      last_names: null,
      origin_institution: null,
      n_document: null
    }
    queries = mapQueries(defaultQueries, queries)
    queries = findToRegex(queries)
    let usersPaginate = await userModels.paginate(queries.find, {
      sort: { createdAt: queries.sort },
      page: queries.page,
      limit: queries.limit,
      populate: ['season', 'roles']
    })

    if (usersPaginate.docs.length === 0) {
      return {
        status: 404,
        dataRes: { ok: false, msg: 'No se encontraron usuarios' }
      }
    }

    usersPaginate.docs = usersPaginate.docs.map((user) => {
      const userObject = user.toObject()
      delete userObject.password
      return userObject
    })

    const { totalDocs, limit, totalPages, page, prevPage, nextPage } =
      usersPaginate || {}

    return {
      status: 200,
      dataRes: {
        totalItems: totalDocs,
        limit,
        totalPages,
        page,
        prevPage,
        nextPage,
        msg: usersPaginate.docs,
        ok: true
      }
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      dataRes: {
        msg: '¡Upss! parece que ocurrio un error intentelo más tarde ',
        ok: false
      }
    }
  }
}
