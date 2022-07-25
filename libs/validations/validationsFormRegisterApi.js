export const validationsFormRegisterApi = (req = {}) => {
  const {
    names,
    last_names,
    password,
    phone,
    n_document,
    role,
    origin_institution,
    shift_name,
    season_start,
    season_end
  } = req.body

  if (
    (!names,
    !last_names,
    !phone,
    !n_document ||
      !password ||
      !shift_name ||
      !origin_institution ||
      !role ||
      !season_start ||
      !season_end)
  ) {
    return false
  }

  return true
}
