export const mapQueries = (defaultQueries, reqQueries) => {
  const queries = { find: {} }

  for (const key in defaultQueries) {
    if (!defaultQueries[key]) {
      if (reqQueries[key]) {
        queries.find = { ...queries.find, [key]: reqQueries[key] }
      }
    }
    if (reqQueries[key]) {
      queries[key] = reqQueries[key]
    } else {
      queries[key] = defaultQueries[key]
    }
  }
  return queries
}
