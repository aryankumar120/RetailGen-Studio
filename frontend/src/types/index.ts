export interface Asset {
  id: string
  type: 'packshot' | 'background' | 'logo'
  url: string
  name: string
  width: number
  height: number
  size: number
  createdAt: string
}

export interface BrandColor {
  id: string
  hex: string
  name: string
}

export interface BrandKit {
  id: string
  name: string
  colors: BrandColor[]
  logoUrl?: string
  fonts: string[]
}

export interface ExportFormat {
  id: string
  name: string
  width: number
  height: number
  platform: 'facebook' | 'instagram' | 'instore'
  type: 'feed' | 'story' | 'post' | 'display'
}

export const EXPORT_FORMATS: ExportFormat[] = [
  { id: 'fb-feed', name: 'Facebook Feed', width: 1200, height: 628, platform: 'facebook', type: 'feed' },
  { id: 'fb-post', name: 'Facebook Post', width: 1080, height: 1080, platform: 'facebook', type: 'post' },
  { id: 'ig-post', name: 'Instagram Post', width: 1080, height: 1080, platform: 'instagram', type: 'post' },
  { id: 'ig-story', name: 'Instagram Story', width: 1080, height: 1920, platform: 'instagram', type: 'story' },
  { id: 'instore-display', name: 'In-Store Display', width: 1920, height: 1080, platform: 'instore', type: 'display' },
]

export interface ComplianceRule {
  id: string
  type: 'logo' | 'text' | 'color' | 'spacing' | 'content'
  severity: 'error' | 'warning' | 'info'
  message: string
  passed: boolean
}

export interface LayoutSuggestion {
  id: string
  thumbnail: string
  description: string
  layout: any // Fabric.js JSON
}

export interface Project {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  canvasData: string // Fabric.js JSON stringified
  assets: Asset[]
  brandKit?: BrandKit
}
