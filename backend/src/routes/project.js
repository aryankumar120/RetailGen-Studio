import express from 'express'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

// In-memory storage
const projects = new Map()

// Get all projects
router.get('/', (req, res) => {
  res.json({
    projects: Array.from(projects.values()),
  })
})

// Get single project
router.get('/:id', (req, res) => {
  const project = projects.get(req.params.id)

  if (!project) {
    return res.status(404).json({ error: 'Project not found' })
  }

  res.json({ project })
})

// Create project
router.post('/', (req, res) => {
  const { name, canvasData, assets, brandKit } = req.body

  const project = {
    id: uuidv4(),
    name: name || 'Untitled Project',
    canvasData: canvasData || '',
    assets: assets || [],
    brandKit: brandKit || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  projects.set(project.id, project)

  res.status(201).json({ project })
})

// Update project
router.put('/:id', (req, res) => {
  const project = projects.get(req.params.id)

  if (!project) {
    return res.status(404).json({ error: 'Project not found' })
  }

  const { name, canvasData, assets, brandKit } = req.body

  const updatedProject = {
    ...project,
    name: name !== undefined ? name : project.name,
    canvasData: canvasData !== undefined ? canvasData : project.canvasData,
    assets: assets !== undefined ? assets : project.assets,
    brandKit: brandKit !== undefined ? brandKit : project.brandKit,
    updatedAt: new Date().toISOString(),
  }

  projects.set(project.id, updatedProject)

  res.json({ project: updatedProject })
})

// Delete project
router.delete('/:id', (req, res) => {
  const project = projects.get(req.params.id)

  if (!project) {
    return res.status(404).json({ error: 'Project not found' })
  }

  projects.delete(req.params.id)

  res.json({ success: true, message: 'Project deleted successfully' })
})

export default router
