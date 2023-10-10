const unauthorizedRoutes = new Set<string>([])
const unauthorizedRouteRegexps = new Set<RegExp>([])

// TODO: Using regex to match path params is not ideal. We should use a library.
const pathParamRegex = /\/(:\w+)/g

export const registerUnauthorizedRoute = (path: string): void => {
  if (pathParamRegex.test(path)) {
    const pathRegex = path.replace(pathParamRegex, '/\\w+')
    const pathRegexp = new RegExp(`^${pathRegex}$`)
    unauthorizedRouteRegexps.add(pathRegexp)
  }
  unauthorizedRoutes.add(path)
}

export const isUnauthorizedRoute = (path: string): boolean => {
  const contains = unauthorizedRoutes.has(path)
  if (contains) {
    return true
  }
  for (const pathRegexp of unauthorizedRouteRegexps) {
    if (pathRegexp.test(path)) {
      return true
    }
  }
  return false
}
