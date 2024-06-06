// src/controllers/logController.ts

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllLogs = async (req: Request, res: Response) => {
  try {
    const logs = await prisma.log.findMany()
    res.json(logs)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch logs', error: error.message })
  }
}

export const createLog = async (req: Request, res: Response) => {
  const { content, date, workoutId } = req.body
  try {
    const newLog = await prisma.log.create({
      data: { content, date, workout: { connect: { id: workoutId } } },
    })
    res.status(201).json(newLog)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to create log', error: error.message })
  }
}

export const getLogById = async (req: Request, res: Response) => {
  const logId = parseInt(req.params.id)
  try {
    const log = await prisma.log.findUnique({ where: { id: logId } })
    if (!log) {
      return res.status(404).json({ message: 'Log not found' })
    }
    res.json(log)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch log', error: error.message })
  }
}

export const updateLog = async (req: Request, res: Response) => {
  const logId = parseInt(req.params.id)
  const { content, date } = req.body
  try {
    const updatedLog = await prisma.log.update({
      where: { id: logId },
      data: { content, date },
    })
    res.json(updatedLog)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to update log', error: error.message })
  }
}

export const deleteLog = async (req: Request, res: Response) => {
  const logId = parseInt(req.params.id)
  try {
    await prisma.log.delete({ where: { id: logId } })
    res.json({ message: 'Log deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to delete log', error: error.message })
  }
}
