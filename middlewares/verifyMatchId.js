export const verifyMatchIdMiddlewares = (tokenId, userId) => {
  const strTokenId = tokenId.toString()
  const strUserId = userId.toString()
  if (strTokenId === strUserId) {
    return true
  }
  {
    return false
  }
}
