import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY
export const compareIdUrlWithTokenIdMiddlewares = async (req, idOfUrl) => {
  const token = req.headers['x-access-token']
  if (!token) return false
  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    const idOfToken = decoded.id
    console.log(idOfToken === idOfUrl)
    if (idOfToken === idOfUrl) return true
    return false
  } catch (error) {
    console.error(error)
    return false
  }
}
