export const findToRegex = (queries) => {
  for (const key in queries.find) {
    if (isNaN(queries.find[key])) {
      queries.find[key] = { $regex: queries.find[key], $options: 'i' }
    }else{
      queries.find[key] = parseInt(queries.find[key])
    }
  }
  return queries
}
