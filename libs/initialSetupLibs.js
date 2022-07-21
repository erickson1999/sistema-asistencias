import dbConnect from "./dbConnect";
import RolModels from "../models/Rol.models";

export const createRoles = async () => {
  try {
    await dbConnect();
    const count = await RolModels.estimatedDocumentCount();

    if (count > 0) return;

    await RolModels.create({ nombre: "practicante" });
    await RolModels.create({ nombre: "admin" });
    await RolModels.create({ nombre: "superadmin" });
    await RolModels.create({ nombre: "asistente" });
  } catch (error) {
    console.error(error)
  }
};

createRoles()
