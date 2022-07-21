export const errorsMongoMessagesLibs = (error) => {
  switch (error) {
    case 11000: {
      return "El usuario ya existe";
    }
    default: {
      return "Error desconocido";
    }
  }
};
