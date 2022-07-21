export const validateId = (id) => {
  const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$')
  return checkForHexRegExp.test(id) ? true : false
}
