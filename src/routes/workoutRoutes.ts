// src/routes/workoutRoutes.ts

import express from 'express'
import * as WorkoutController from '../controllers/workoutController'

const router = express.Router()

router.get('/', WorkoutController.getAllWorkouts)
router.post('/', WorkoutController.createWorkout)
router.get('/:id', WorkoutController.getWorkoutById)
router.put('/:id', WorkoutController.updateWorkout)
router.delete('/:id', WorkoutController.deleteWorkout)

export default router
