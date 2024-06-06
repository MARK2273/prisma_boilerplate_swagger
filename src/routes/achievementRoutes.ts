// src/routes/achievementRoutes.ts

import express from 'express'
import * as AchievementController from '../controllers/achievementController'

const router = express.Router()

router.get('/', AchievementController.getAllAchievements)
router.post('/', AchievementController.createAchievement)
router.get('/:id', AchievementController.getAchievementById)
router.put('/:id', AchievementController.updateAchievement)
router.delete('/:id', AchievementController.deleteAchievement)

export default router
