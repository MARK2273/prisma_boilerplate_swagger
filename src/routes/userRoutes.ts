// src/routes/userRoutes.ts

import express from 'express'
import * as UserController from '../controllers/userController'

const router = express.Router()

router.get('/', UserController.getAllUsers)
router.post('/', UserController.createUser)
router.get('/:id', UserController.getUserById)
router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

export default router
