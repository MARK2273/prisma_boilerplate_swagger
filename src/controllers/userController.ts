// src/controllers/userController.ts

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message })
  }
}

export const createUser = async (req: Request, res: Response) => {
  const { email } = req.body
  try {
    const newUser = await prisma.user.create({
      data: { email },
    })
    res.status(201).json(newUser)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to create user', error: error.message })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id)
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch user', error: error.message })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id)
  const { email } = req.body
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { email },
    })
    res.json(updatedUser)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to update user', error: error.message })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id)
  try {
    await prisma.user.delete({ where: { id: userId } })
    res.json({ message: 'User deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message })
  }
}
