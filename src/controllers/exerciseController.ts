// src/controllers/exerciseController.ts

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await prisma.exercise.findMany()
    res.json(exercises)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch exercises', error: error.message })
  }
}

export const createExercise = async (req: Request, res: Response) => {
  const { name, sets, reps, weight, workoutId } = req.body
  try {
    const newExercise = await prisma.exercise.create({
      data: { name, sets, reps, weight, workout: { connect: { id: workoutId } } },
    })
    res.status(201).json(newExercise)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to create exercise', error: error.message })
  }
}

export const getExerciseById = async (req: Request, res: Response) => {
  const exerciseId = parseInt(req.params.id)
  try {
    const exercise = await prisma.exercise.findUnique({ where: { id: exerciseId } })
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' })
    }
    res.json(exercise)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch exercise', error: error.message })
  }
}

export const updateExercise = async (req: Request, res: Response) => {
  const exerciseId = parseInt(req.params.id)
  const { name, sets, reps, weight } = req.body
  try {
    const updatedExercise = await prisma.exercise.update({
      where: { id: exerciseId },
      data: { name, sets, reps, weight },
    })
    res.json(updatedExercise)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to update exercise', error: error.message })
  }
}

export const deleteExercise = async (req: Request, res: Response) => {
  const exerciseId = parseInt(req.params.id)
  try {
    await prisma.exercise.delete({ where: { id: exerciseId } })
    res.json({ message: 'Exercise deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to delete exercise', error: error.message })
  }
}
