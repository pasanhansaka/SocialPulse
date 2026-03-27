import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { supabase } from '../index.js'

const router = Router()

/**
 * Register a new user
 */
router.post('/register', async (req, res) => {
  const { email, password } = req.body

  try {
    const { data: existingUser } = await supabase
      .from('User')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // In production, bcrypt passwordHash here
    const { data: user, error } = await supabase
      .from('User')
      .insert({
        email,
        passwordHash: password // Placeholder for real hashing
      })
      .select()
      .single()

    if (error || !user) throw new Error(error?.message || 'Failed to create user')

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    )

    res.json({ token, user: { id: user.id, email: user.email } })
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to register' })
  }
})

/**
 * Login user
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const { data: user } = await supabase
      .from('User')
      .select('*')
      .eq('email', email)
      .single()
    
    // In production, compare with bcrypt.compare
    if (!user || user.passwordHash !== password) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    )

    res.json({ token, user: { id: user.id, email: user.email } })
  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
})

export default router
