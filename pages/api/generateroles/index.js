import { defaultConfig } from '../../../defaultConfig'
import dbConnect from '../../../libs/dbConnectLibs'
import shiftModels from '../../../models/shiftModels'
const handler = async (req, res) => {
  try {
    await dbConnect()
    const { method } = req
    const password = req.headers['password-gen-roles']

    if (method === 'POST') {
      if (password === defaultConfig().passwordGenRoles) {
        // const resGenDefaultRoles = await roleModels.insertMany(
        //   defaultConfig().defaultRoles.map((name) => ({
        //     name,
        //   }))
        // );

        const shifts = await shiftModels.insertMany([
          {
            name: 'morning',
            shift_start: { hour: 8, minute: 0 },
            shift_end: { hour: 13, minute: 0 }
          },
          {
            name: 'afternoon',
            shift_start: { hour: 13, minute: 0 },
            shift_end: { hour: 17, minute: 0 }
          },
          {
            name: 'complete',
            shift_start: { hour: 8, minute: 0 },
            shift_end: { hour: 17, minute: 0 }
          }
        ])

        return res.status(201).json({ data: shifts, ok: true })
      } else {
        res.status(400).json({ error: 'acceso denegado', ok: false })
      }
    } else {
      return res
        .status(400)
        .json({ error: `método ${method} no soportado`, ok: false })
    }
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error, ok: false })
  }
}

export default handler
