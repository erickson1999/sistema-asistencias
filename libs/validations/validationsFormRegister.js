export const validationsFormRegister = (form, register = true) => {
  const errors = []
  if (!form.n_document) {
    errors.push({
      field: 'n_document',
      message: 'El campo número de documento es requerido'
    })
  }
  if (register) {
    if (!form.password) {
      errors.push({
        field: 'password',
        message: 'El campo contraseña es requerido'
      })
    }
  }
  if (!form.names) {
    errors.push({ field: 'names', message: 'El campo nombres es requerido' })
  }
  if (!form.last_names) {
    errors.push({
      field: 'last_names',
      message: 'El campo apellidos es requerido'
    })
  }
  if (!form.date_birth) {
    errors.push({
      field: 'date_birth',
      message: 'El campo fecha de nacimiento es requerido'
    })
  }
  if (!form.origin_institution) {
    errors.push({
      field: 'origin_institution',
      message: 'El campo institución de origen es requerido'
    })
  }
  if (!form.phone) {
    errors.push({
      field: 'phone',
      message: 'el campo número telefónico es requerido'
    })
  }

  //register
  if (register) {
    if (!form.season_start) {
      errors.push({
        field: 'start',
        message: 'El campo fecha de inicio es requerido'
      })
    }
    if (!form.season_end) {
      errors.push({
        field: 'end',
        message: 'El campo fecha de finalización es requerido'
      })
    }

    if (form.season_start >= form.season_end) {
      errors.push({
        field: 'end_start',
        message:
          'La fecha de inicio de prácticas no puede ser mayor o igual de la fecha de finalización de prácticas'
      })
    }
    if (!form.shift_name) {
      errors.push({
        field: 'shift_name',
        message: 'El campo turno es requerido'
      })
    }
  }

  return errors
}
