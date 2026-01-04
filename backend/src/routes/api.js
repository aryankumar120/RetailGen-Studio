import express from 'express'
import uploadRoutes from './upload.js'
import projectRoutes from './project.js'
import brandKitRoutes from './brandKit.js'

const router = express.Router()

router.use('/upload', uploadRoutes)
router.use('/projects', projectRoutes)
router.use('/brand-kits', brandKitRoutes)

export default router
