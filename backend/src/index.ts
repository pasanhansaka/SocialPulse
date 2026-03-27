import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import winston from 'winston'
import { supabase } from './lib/supabase.js'
import authRoutes from './routes/auth.js'
import accountsRoutes from './routes/accounts.js'
import postsRoutes from './routes/posts.js'
import { authenticate } from './middleware/auth.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}))
// Routes
app.use('/api/auth', authRoutes)
app.use('/api/accounts', accountsRoutes)
app.use('/api/posts', postsRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(port, () => {
  logger.info(`SocialPulse API running on port ${port}`)
})

export { app, supabase, logger }
