// src/routes/profileRoutes.ts

import express from 'express'
import * as ProfileController from '../controllers/profileController'

const router = express.Router()

router.get('/', ProfileController.getAllProfiles)
router.post('/', ProfileController.createProfile)
router.get('/:id', ProfileController.getProfileById)
router.put('/:id', ProfileController.updateProfile)
router.delete('/:id', ProfileController.deleteProfile)

export default router
