import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import { auth } from '~/auth'

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const sessionId = res.locals.sessionId
  await auth.invalidateSession(sessionId)

  res
    .status(200)
    .json({
      message: 'Successfully logged out'
    })
})
