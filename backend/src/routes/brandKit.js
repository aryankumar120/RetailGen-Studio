import express from 'express'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

// In-memory storage
const brandKits = new Map()

// Get all brand kits
router.get('/', (req, res) => {
  res.json({
    brandKits: Array.from(brandKits.values()),
  })
})

// Get single brand kit
router.get('/:id', (req, res) => {
  const brandKit = brandKits.get(req.params.id)

  if (!brandKit) {
    return res.status(404).json({ error: 'Brand kit not found' })
  }

  res.json({ brandKit })
})

// Create brand kit
router.post('/', (req, res) => {
  const { name, colors, logoUrl, fonts } = req.body

  const brandKit = {
    id: uuidv4(),
    name: name || 'My Brand Kit',
    colors: colors || [],
    logoUrl: logoUrl || null,
    fonts: fonts || ['Arial', 'Helvetica'],
    createdAt: new Date().toISOString(),
  }

  brandKits.set(brandKit.id, brandKit)

  res.status(201).json({ brandKit })
})

// Update brand kit
router.put('/:id', (req, res) => {
  const brandKit = brandKits.get(req.params.id)

  if (!brandKit) {
    return res.status(404).json({ error: 'Brand kit not found' })
  }

  const { name, colors, logoUrl, fonts } = req.body

  const updatedBrandKit = {
    ...brandKit,
    name: name !== undefined ? name : brandKit.name,
    colors: colors !== undefined ? colors : brandKit.colors,
    logoUrl: logoUrl !== undefined ? logoUrl : brandKit.logoUrl,
    fonts: fonts !== undefined ? fonts : brandKit.fonts,
  }

  brandKits.set(brandKit.id, updatedBrandKit)

  res.json({ brandKit: updatedBrandKit })
})

// Delete brand kit
router.delete('/:id', (req, res) => {
  const brandKit = brandKits.get(req.params.id)

  if (!brandKit) {
    return res.status(404).json({ error: 'Brand kit not found' })
  }

  brandKits.delete(req.params.id)

  res.json({ success: true, message: 'Brand kit deleted successfully' })
})

export default router
