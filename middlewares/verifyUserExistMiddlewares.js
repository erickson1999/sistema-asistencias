import userModels from '../models/userModels'
import dbConnect from '../libs/dbConnectLibs'

export const verifyUserExistMiddlewares = async (
  numberIdentification,
  typeIdentification
) => {
  try {
    await dbConnect()
    switch (typeIdentification) {
      case 'id': {
        if (numberIdentification.length !== 24) {
          return false
        }
        const user = await userModels.findOne({
          _id: numberIdentification
        })

        return user ? true : false
      }
      case 'ndocument': {
        const user = await userModels.findOne({
          n_document: numberIdentification
        })

        return user ? true : false
      }
    }
  } catch (error) {
    console.error(error)
    return false
  }
}
