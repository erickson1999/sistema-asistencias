import fs from 'fs'
import path from 'path'
import { validateId } from '../../../../../utils/validateId'
export default function handler(req, res) {
  const {
    method,
    query: { userId }
  } = req

  if (method !== 'GET') {
    return res
      .status(400)
      .json({ msg: `El método ${method} no está soportado`, ok: false })
  }
  const validId = validateId(userId)
  if (!validId) {
    return res
      .status(400)
      .json({ msg: `El id ${userId} no es válido`, ok: false })
  }
  const filePath = path.resolve('.', `assets/qrcode-users/${userId}.png`)
  let imageBuffer
  try {
    imageBuffer = fs.readFileSync(filePath)
  } catch (err) {
    console.error(err.message)
    return res
      .status(400)
      .json({ msg: `El archivo solicitado no existe`, ok: false })
  }
  res.setHeader('Content-Type', 'image/jpg')
  return res.send(imageBuffer)
}
