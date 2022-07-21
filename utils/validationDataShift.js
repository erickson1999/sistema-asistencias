export const validationDataShift = (req) => {
  const { body } = req
  if (!body) {
    console.log(1)
    return false
  }
  const { shift_start, shift_end } = body

  if (shift_start || shift_end) {
    for (const key in shift_start) {
      if (key === 'hour') {
        if (isNaN(shift_start[key])) {
          return false
        } else {
          if (shift_start[key] < 0 || shift_start[key] > 23) {
            return false
          } else {
            return true
          }
        }
      }
      if (key === 'minute') {
        if (isNaN(shift_start[key])) {
          return false
        } else {
          if (shift_start[key] < 0 || shift_start[key] > 59) {
            return false
          } else {
            return true
          }
        }
      }
    }
    for (const key in shift_end) {
      console.log(4)
      if (key === 'hour') {
        if (isNaN(shift_end[key])) {
          return false
        } else {
          if (shift_end[key] < 0 || shift_end[key] > 23) {
            return false
          } else {
            return true
          }
        }
      }
      if (key === 'minute') {
        if (isNaN(shift_end[key])) {
          return false
        } else {
          if (shift_end[key] < 0 || shift_end[key] > 59) {
            return false
          } else {
            return true
          }
        }
      }
    }
  } else {
    return false
  }
}
