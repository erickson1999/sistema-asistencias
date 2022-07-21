export const validationsFormLogin = (form) => {
  const errors = [];
  if (!form.n_document) {
    errors.push({
      field: "n_document",
      message: "El campo número de documento es requerido",
    });
  }
  if (!form.password) {
    errors.push({
      field: "password",
      message: "El campo contraseña es requerido",
    });
  }

  return errors;
};
