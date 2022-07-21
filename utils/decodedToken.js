import jwt from 'jsonwebtoken'
import userModels from '../models/userModels'
export const decodedToken = async (req) => {
  const token = req.headers['x-access-token'] || null
  if (!token) return null
  let tokenDecoded = null
  let tokenDecodedData = null
  try {
    tokenDecoded = jwt.decode(token)
    const user = await userModels.findById(tokenDecoded.id)
    if (!user) {
      return null
    }
    tokenDecodedData = { ...tokenDecoded, id: user._id }
  } catch (error) {
    return null
  }
  return tokenDecodedData
}
