class InvalidPath extends Error {
  constructor(notPath) {
    super(`expected a path list but ${JSON.stringify(notPath)} was not a valid path.`)
  }
}
function isString(maybeString) {
  return !!(maybeString && (typeof maybeString === 'string' || maybeString instanceof String))
}
export function validatePath(potentialPath) {
  if (
    Array.isArray(potentialPath) && potentialPath.length &&
    potentialPath.every(isString)
  )
    return potentialPath
  throw new InvalidPath(potentialPath)
}
