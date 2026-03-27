import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { logger } from '../index.js'

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
  }
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string, email: string }
    req.user = decoded
    next()
  } catch (error) {
    logger.error('JWT Verification failed:', error)
    return res.status(401).json({ error: 'Unauthorized: Invalid token' })
  }
}
