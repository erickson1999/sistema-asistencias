import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY
export const verifyTokenMiddlewares = (req) => {
  try {
    const token = req.headers['x-access-token'] || null
    if (!token) {
      return false
    }
    try {
      const decoded = jwt.verify(token, SECRET_KEY)
      if (decoded) {
        return true
      }
    } catch {
      return false
    }
  } catch (error) {
    switch (error.message) {
      case 'invalid signature': {
        const error = 'Firma invalida'
        console.error(error)
        break
      }
      case 'invalid token': {
        const error = 'Token invalido'
        console.error(error)
        break
      }
      default:
        console.error(error)
        break
    }
    return false
  }
}
