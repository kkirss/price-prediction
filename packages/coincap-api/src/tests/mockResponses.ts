/* eslint-disable */
// Copied from https://openapi-ts.pages.dev/advanced/
import { paths } from '~/openAPI/schema'
import { API_BASE_URL } from '~/openAPI/schemaInfo'

// Settings
const BASE_URL = API_BASE_URL
// End Settings

// type helpers — ignore these; these just make TS lookups better
type FilterKeys<Obj, Matchers> = { [K in keyof Obj]: K extends Matchers ? Obj[K] : never }[keyof Obj]
type PathResponses<T> = T extends { responses: any } ? T['responses'] : unknown
type OperationContent<T> = T extends { content: any } ? T['content'] : unknown
type MediaType = `${string}/${string}`
type MockedResponse<T, Status extends keyof T = keyof T> = FilterKeys<
OperationContent<T[Status]>,
MediaType
> extends never
  ? { status: Status, body?: never }
  : {
      status: Status
      body: FilterKeys<OperationContent<T[Status]>, MediaType>
    }

/**
 * Mock fetch() calls and type against OpenAPI schema
 */
export function mockResponses (responses: {
  [Path in keyof Partial<paths>]: {
    [Method in keyof Partial<paths[Path]>]: MockedResponse<PathResponses<paths[Path][Method]>>;
  };
}) {
  fetchMock.mockResponse((req) => {
    const mockedPath = findPath(req.url.replace(BASE_URL, ''), Object.keys(responses))!
    // note: we get lazy with the types here, because the inference is bad anyway and this has a `void` return signature. The important bit is the parameter signature.
    if (!mockedPath || (!responses as any)[mockedPath]) throw new Error(`No mocked response for ${req.url}`) // throw error if response not mocked (remove or modify if you’d like different behavior)
    const method = req.method.toLowerCase()
    if (!(responses as any)[mockedPath][method]) throw new Error(`${req.method} called but not mocked on ${mockedPath}`) // likewise throw error if other parts of response aren’t mocked
    if (!(responses as any)[mockedPath][method]) {
      throw new Error(`${req.method} called but not mocked on ${mockedPath}`)
    }
    const { status, body } = (responses as any)[mockedPath][method]
    return { status, body: JSON.stringify(body) }
  })
}

// helper function that matches a realistic URL (/users/123) to an OpenAPI path (/users/{user_id}
export function findPath (actual: string, testPaths: string[]): string | undefined {
  const url = new URL(actual, actual.startsWith('http') ? undefined : BASE_URL)
  const actualParts = url.pathname.split('/')
  for (const p of testPaths) {
    let matched = true
    const testParts = p.split('/')
    if (actualParts.length !== testParts.length) continue // automatically not a match if lengths differ
    for (let i = 0; i < testParts.length; i++) {
      if (testParts[i]!.startsWith('{')) continue // path params ({user_id}) always count as a match
      if (actualParts[i] !== testParts[i]) {
        matched = false
        break
      }
    }
    if (matched) return p
  }
}

export type MockResponses = Parameters<typeof mockResponses>[0]
/* eslint-enable */
