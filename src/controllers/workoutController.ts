// src/controllers/workoutController.ts

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllWorkouts = async (req: Request, res: Response) => {
  try {
    const workouts = await prisma.workout.findMany()
    res.json(workouts)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch workouts', error: error.message })
  }
}

export const createWorkout = async (req: Request, res: Response) => {
  const { name, date, duration, calories, userId } = req.body
  try {
    const newWorkout = await prisma.workout.create({
      data: { name, date, duration, calories, user: { connect: { id: userId } } },
    })
    res.status(201).json(newWorkout)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to create workout', error: error.message })
  }
}

export const getWorkoutById = async (req: Request, res: Response) => {
  const workoutId = parseInt(req.params.id)
  try {
    const workout = await prisma.workout.findUnique({ where: { id: workoutId } })
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' })
    }
    res.json(workout)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch workout', error: error.message })
  }
}

export const updateWorkout = async (req: Request, res: Response) => {
  const workoutId = parseInt(req.params.id)
  const { name, date, duration, calories } = req.body
  try {
    const updatedWorkout = await prisma.workout.update({
      where: { id: workoutId },
      data: { name, date, duration, calories },
    })
    res.json(updatedWorkout)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to update workout', error: error.message })
  }
}

export const deleteWorkout = async (req: Request, res: Response) => {
  const workoutId = parseInt(req.params.id)
  try {
    await prisma.workout.delete({ where: { id: workoutId } })
    res.json({ message: 'Workout deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to delete workout', error: error.message })
  }
}
