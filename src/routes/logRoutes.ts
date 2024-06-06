// src/routes/logRoutes.ts

import express from 'express'
import * as LogController from '../controllers/logController'

const router = express.Router()

router.get('/', LogController.getAllLogs)
router.post('/', LogController.createLog)
router.get('/:id', LogController.getLogById)
router.put('/:id', LogController.updateLog)
router.delete('/:id', LogController.deleteLog)

export default router
