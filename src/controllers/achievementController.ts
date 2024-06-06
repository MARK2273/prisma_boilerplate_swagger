// src/controllers/achievementController.ts

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllAchievements = async (req: Request, res: Response) => {
  try {
    const achievements = await prisma.achievement.findMany()
    res.json(achievements)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch achievements', error: error.message })
  }
}

export const createAchievement = async (req: Request, res: Response) => {
  const { title, date, userId } = req.body
  try {
    const newAchievement = await prisma.achievement.create({
      data: { title, date, user: { connect: { id: userId } } },
    })
    res.status(201).json(newAchievement)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to create achievement', error: error.message })
  }
}

export const getAchievementById = async (req: Request, res: Response) => {
  const achievementId = parseInt(req.params.id)
  try {
    const achievement = await prisma.achievement.findUnique({ where: { id: achievementId } })
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' })
    }
    res.json(achievement)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch achievement', error: error.message })
  }
}

export const updateAchievement = async (req: Request, res: Response) => {
  const achievementId = parseInt(req.params.id)
  const { title, date } = req.body
  try {
    const updatedAchievement = await prisma.achievement.update({
      where: { id: achievementId },
      data: { title, date },
    })
    res.json(updatedAchievement)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to update achievement', error: error.message })
  }
}

export const deleteAchievement = async (req: Request, res: Response) => {
  const achievementId = parseInt(req.params.id)
  try {
    await prisma.achievement.delete({ where: { id: achievementId } })
    res.json({ message: 'Achievement deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to delete achievement', error: error.message })
  }
}
