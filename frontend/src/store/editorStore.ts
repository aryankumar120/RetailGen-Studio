import { create } from 'zustand'
import { Asset, BrandKit, ExportFormat } from '@/types'

export interface SavedProject {
  id: string
  name: string
  canvasJSON: string
  thumbnail?: string
  createdAt: string
  updatedAt: string
}

interface EditorState {
  // Canvas
  canvas: fabric.Canvas | null
  setCanvas: (canvas: fabric.Canvas | null) => void

  // Project Management
  currentProject: SavedProject | null
  setCurrentProject: (project: SavedProject | null) => void
  saveProject: () => void
  loadProject: (projectId: string) => void
  deleteProject: (projectId: string) => void
  getSavedProjects: () => SavedProject[]
  renameProject: (name: string) => void
  createNewProject: () => void

  // Assets
  assets: Asset[]
  addAsset: (asset: Asset) => void
  removeAsset: (id: string) => void

  // Brand Kit
  brandKit: BrandKit | null
  setBrandKit: (kit: BrandKit) => void
  addBrandColor: (color: { hex: string; name: string }) => void

  // Export
  selectedFormat: ExportFormat | null
  setSelectedFormat: (format: ExportFormat | null) => void

  // UI State
  activePanel: 'assets' | 'brand' | 'ai' | 'export' | null
  setActivePanel: (panel: 'assets' | 'brand' | 'ai' | 'export' | null) => void

  sidebarExpanded: boolean
  setSidebarExpanded: (expanded: boolean) => void

  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export const useEditorStore = create<EditorState>((set, get) => ({
  // Canvas
  canvas: null,
  setCanvas: (canvas) => set({ canvas }),

  // Project Management
  currentProject: null,
  setCurrentProject: (project) => set({ currentProject: project }),

  createNewProject: () => {
    const newProject: SavedProject = {
      id: Date.now().toString(),
      name: 'Untitled Project',
      canvasJSON: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    set({ currentProject: newProject })
  },

  saveProject: () => {
    const { canvas, currentProject } = get()
    if (!canvas) return

    const canvasJSON = JSON.stringify(canvas.toJSON())
    const thumbnail = canvas.toDataURL({ format: 'png', quality: 0.3, multiplier: 0.2 })

    const project: SavedProject = currentProject
      ? { ...currentProject, canvasJSON, thumbnail, updatedAt: new Date().toISOString() }
      : {
          id: Date.now().toString(),
          name: 'Untitled Project',
          canvasJSON,
          thumbnail,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

    // Save to localStorage
    const projects = get().getSavedProjects()
    const existingIndex = projects.findIndex(p => p.id === project.id)

    if (existingIndex >= 0) {
      projects[existingIndex] = project
    } else {
      projects.push(project)
    }

    localStorage.setItem('retailgen_projects', JSON.stringify(projects))
    set({ currentProject: project })
  },

  loadProject: (projectId: string) => {
    const { canvas } = get()
    if (!canvas) return

    const projects = get().getSavedProjects()
    const project = projects.find(p => p.id === projectId)

    if (project) {
      canvas.loadFromJSON(JSON.parse(project.canvasJSON), () => {
        canvas.renderAll()
        set({ currentProject: project })
      })
    }
  },

  deleteProject: (projectId: string) => {
    const projects = get().getSavedProjects()
    const filtered = projects.filter(p => p.id !== projectId)
    localStorage.setItem('retailgen_projects', JSON.stringify(filtered))

    // If deleted project is current, create new one
    if (get().currentProject?.id === projectId) {
      get().createNewProject()
    }
  },

  getSavedProjects: () => {
    const saved = localStorage.getItem('retailgen_projects')
    return saved ? JSON.parse(saved) : []
  },

  renameProject: (name: string) => {
    const { currentProject } = get()
    if (currentProject) {
      const updated = { ...currentProject, name, updatedAt: new Date().toISOString() }
      set({ currentProject: updated })
      get().saveProject()
    }
  },

  // Assets
  assets: [],
  addAsset: (asset) => set((state) => ({ assets: [...state.assets, asset] })),
  removeAsset: (id) => set((state) => ({ assets: state.assets.filter(a => a.id !== id) })),

  // Brand Kit
  brandKit: null,
  setBrandKit: (kit) => set({ brandKit: kit }),
  addBrandColor: (color) => set((state) => ({
    brandKit: state.brandKit
      ? { ...state.brandKit, colors: [...state.brandKit.colors, { id: Date.now().toString(), ...color }] }
      : null
  })),

  // Export
  selectedFormat: null,
  setSelectedFormat: (format) => set({ selectedFormat: format }),

  // UI State
  activePanel: 'assets',
  setActivePanel: (panel) => set({ activePanel: panel }),

  sidebarExpanded: true,
  setSidebarExpanded: (expanded) => set({ sidebarExpanded: expanded }),

  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}))
