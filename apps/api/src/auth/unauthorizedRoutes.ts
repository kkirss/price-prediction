const unauthorizedRoutes = new Set<string>([])

export const registerUnauthorizedRoute = (path: string): void => {
  unauthorizedRoutes.add(path)
}

export const isUnauthorizedRoute = (path: string): boolean =>
  unauthorizedRoutes.has(path)
