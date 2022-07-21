import userModels from '../../models/userModels'
import roleModels from '../../models/roleModels'
import jwt from 'jsonwebtoken'
//import documentActivatedModels from "../../models/documentActivatedModels";
import { defaultConfig } from '../../defaultConfig'
import { verifyAdminRoleMiddlewares } from '../../middlewares/verifyAdminRoleMiddlewares'
import seasonModels from '../../models/seasonModels'
import shiftModels from '../../models/shiftModels'
import moment from 'moment'
import { validationsFormRegisterApi } from '../../libs/validations'
import dbConnect from '../../libs/dbConnectLibs'

const SECRET_KEY = process.env.SECRET_KEY
export const crudRegisterControllers = async (method, tokenId, req) => {
  try {
    await dbConnect()
  } catch (error) {
    return {
      status: 500,
      dataRes: {
        msg: '¡Upss! parece que ocurrio un error intentalo más tarde',
        ok: false
      }
    }
  }

  let { role, n_document, password, shift_name } = req.body
  if (!validationsFormRegisterApi(req)) {
    return {
      status: 400,
      dataRes: {
        msg: 'Se necesita completar todos los campos para realizar el registro',
        ok: false
      }
    }
  }
  // middlewares
  const verifyAdmin = await verifyAdminRoleMiddlewares(tokenId)

  switch (method) {
    case 'POST':
      try {
        console.log({ role })
        if (role !== 'practicing') {
          if (!verifyAdmin) {
            return {
              status: 403,
              dataRes: {
                msg: 'No puedes registrar con un rol si no eres administrador',
                ok: false
              }
            }
          }
        }
        const userExist = await userModels.findOne({ n_document })
        if (userExist) {
          return {
            status: 400,
            dataRes: {
              msg: 'El número de documento ya está en uso',
              ok: false
            }
          }
        }
        // const documentIsActivated = await documentActivatedModels.findOne({
        //   n_document: n_document,
        // });

        // if (!documentIsActivated) {
        //   return {
        //     status: 400,
        //     dataRes: {
        //       msg: "No estás habilitado para registrarte comunicate con un administrador",
        //       ok: false,
        //     },
        //   };
        // }

        const rolesExist = await roleModels.find({
          name: { $in: role }
        })
        console.log({ rolesExist })

        const rolePracticingId = await roleModels.findOne({
          name: 'practicing'
        })

        const roleAssistantId = await roleModels.findOne({ name: 'assistant' })
        const roleAdminId = await roleModels.findOne({ name: 'admin' })

        if (rolesExist.length > 0) {
          if (rolesExist[0].name === 'practicing') {
            role = [rolePracticingId._id]
          }
          if (rolesExist[0].name === 'assistant') {
            role = [roleAssistantId._id]
          }
          if (rolesExist[0].name === 'admin') {
            role = [roleAdminId._id]
          }
        } else {
          role = await roleModels.find({ name: defaultConfig().defaultRole })
        }
        //encrypt password
        const passEncrypt = await userModels.encryptPassword(password)

        //create season
        const season_start_convert = moment(
          req.body.season_start,
          'YYYY-MM-DD'
        ).toDate()
        const season_end_convert = moment(
          req.body.season_end,
          'YYYY-MM-DD'
        ).toDate()

        const date_birth_convert = moment(
          req.body.date_birth,
          'YYYY-MM-DD'
        ).toDate()
        const shift = await shiftModels.findOne({ name: shift_name })
        if (!shift)
          return {
            status: 500,
            dataRes: { msg: '¡Upss! parce que el turno no existe ', ok: false }
          }

        const season = await seasonModels.create({
          season_start: season_start_convert,
          season_end: season_end_convert,
          status: true,
          shift: shift._id
        })

        if (!shift_name)
          return {
            status: 400,
            dataRes: {
              msg: 'El campo nombre de turno es requerido',
              ok: false
            }
          }
        //merge all data
        const newUser = await userModels.create({
          ...req.body,
          season: [season._id],
          date_birth: date_birth_convert,
          roles: role,
          password: passEncrypt
        })

        const token = jwt.sign({ id: newUser._id }, SECRET_KEY, {
          expiresIn: defaultConfig().tokenExpiration
        })

        return { status: 200, dataRes: { token, ok: true } }
      } catch (error) {
        switch (error.code) {
          case 11000:
            return {
              status: 400,
              dataRes: {
                msg: 'El número de documento ya está en uso',
                ok: false
              }
            }
          default:
            console.error(error)
            return {
              status: 400,
              dataRes: {
                msg: '¡Upss parece que hubo un error inténtelo más tarde'
              }
            }
        }
      }

    default:
      return {
        status: 400,
        dataRes: { msg: `El metodo ${method} no es soportado` }
      }
  }
}
