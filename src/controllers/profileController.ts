// src/controllers/profileController.ts

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await prisma.profile.findMany()
    res.json(profiles)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch profiles', error: error.message })
  }
}

export const createProfile = async (req: Request, res: Response) => {
  const { bio, userId } = req.body
  try {
    const newProfile = await prisma.profile.create({
      data: { bio, user: { connect: { id: userId } } },
    })
    res.status(201).json(newProfile)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to create profile', error: error.message })
  }
}

export const getProfileById = async (req: Request, res: Response) => {
  const profileId = parseInt(req.params.id)
  try {
    const profile = await prisma.profile.findUnique({ where: { id: profileId } })
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }
    res.json(profile)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message })
  }
}

export const updateProfile = async (req: Request, res: Response) => {
  const profileId = parseInt(req.params.id)
  const { bio } = req.body
  try {
    const updatedProfile = await prisma.profile.update({
      where: { id: profileId },
      data: { bio },
    })
    res.json(updatedProfile)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message })
  }
}

export const deleteProfile = async (req: Request, res: Response) => {
  const profileId = parseInt(req.params.id)
  try {
    await prisma.profile.delete({ where: { id: profileId } })
    res.json({ message: 'Profile deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to delete profile', error: error.message })
  }
}
