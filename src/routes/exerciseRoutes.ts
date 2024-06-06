// src/routes/exerciseRoutes.ts

import express from 'express'
import * as ExerciseController from '../controllers/exerciseController'

const router = express.Router()

router.get('/', ExerciseController.getAllExercises)
router.post('/', ExerciseController.createExercise)
router.get('/:id', ExerciseController.getExerciseById)
router.put('/:id', ExerciseController.updateExercise)
router.delete('/:id', ExerciseController.deleteExercise)

export default router
