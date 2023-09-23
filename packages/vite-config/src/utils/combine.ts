import { deepmerge } from 'deepmerge-ts'
import { type UserConfig } from 'vite'

export const combine = (...configs: UserConfig[]): UserConfig => {
  return deepmerge(...configs) as UserConfig
}
