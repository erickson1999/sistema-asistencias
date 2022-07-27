import QRCode from 'qrcode'
import { validateId } from '../../../../../utils/validateId'
const handler = async (req, res) => {
  const {
    method,
    query: { userId }
  } = req
  if (method !== 'POST') {
    return res.status(400).json({ msg: `El método ${method} no es soportado` })
  }
  const validId = validateId(userId)
  if (!validId) {
    return res.status(400).json({ msg: `El id ${userId} no es válido` })
  }
  try {
    QRCode.toFile(
      `assets/qrcode-users/${userId}.png`,
      userId,
      {
        color: {
          dark: '#000',
          light: '#fff'
        },
        rendererOpts: {}
      },
      function (err) {
        if (err) throw err
        console.error('Create qr code success')
      }
    )
    return res.status(201).json({ msg: 'Qr creado correctamente', ok: true })
  } catch (error) {
    return res.status(500).json({
      msg: 'Upss!! parece que ocurrio un error inténtelo más tarde',
      ok: false
    })
  }
}

export default handler
