import 'express'
import type {AuthRequest, User} from "lucia";

declare global {
  namespace Express {
    interface Locals {
      user: User
      sessionId: string
      authRequest: AuthRequest
    }
  }
}
