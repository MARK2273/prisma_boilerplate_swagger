// src/app.ts

import express, { NextFunction, Request, Response } from 'express'
import userRoutes from './routes/userRoutes'
import profileRoutes from './routes/profileRoutes'
import workoutRoutes from './routes/workoutRoutes'
import exerciseRoutes from './routes/exerciseRoutes'
import logRoutes from './routes/logRoutes'
import achievementRoutes from './routes/achievementRoutes'

const app = express()

app.use(express.json())

// Define routes
app.use('/api/users', userRoutes)
app.use('/api/profiles', profileRoutes)
app.use('/api/workouts', workoutRoutes)
app.use('/api/exercises', exerciseRoutes)
app.use('/api/logs', logRoutes)
app.use('/api/achievements', achievementRoutes)

// Default route handler
app.get('/', (req, res) => {
  res.send('Welcome to the Fitness Tracking API!')
})

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Internal Server Error' })
})

export default app
