import jwt from "jsonwebtoken";
import userModels from "../models/userModels";

const SECRET_KEY = process.env.SECRET_KEY;
export const verifyRolesMiddlewares = (userId, listRoles) => {
  const token = req.headers["x-access-token"] || null;
  if (!token)
    return { status: 400, dataRes: { msg: "No se envió el token", ok: false } };
  let tokenDecoded = null;
  try {
    tokenDecoded = jwt.verify(token,SECRET_KEY );
  } catch (error) {
    return {
      status: 400,
      dataRes: { msg: "token inválido", ok: false },
    };
  }
  const userId = tokenDecoded.id;
  const user = await userModels.findById(userId);
};
