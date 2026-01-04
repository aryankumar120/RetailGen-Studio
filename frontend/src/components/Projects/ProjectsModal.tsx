import { useState, useEffect } from 'react'
import { X, Folder, Trash2, Clock } from 'lucide-react'
import { useEditorStore, SavedProject } from '@/store/editorStore'
import Button from '@/components/UI/Button'
import { toast } from 'sonner'
import { clsx } from 'clsx'

interface ProjectsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProjectsModal({ isOpen, onClose }: ProjectsModalProps) {
  const { getSavedProjects, loadProject, deleteProject, createNewProject } = useEditorStore()
  const [projects, setProjects] = useState<SavedProject[]>([])

  useEffect(() => {
    if (isOpen) {
      setProjects(getSavedProjects())
    }
  }, [isOpen, getSavedProjects])

  const handleLoadProject = (projectId: string) => {
    loadProject(projectId)
    onClose()
  }

  const handleDeleteProject = (projectId: string, projectName: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm(`Delete "${projectName}"? This cannot be undone.`)) {
      deleteProject(projectId)
      setProjects(getSavedProjects())
    }
  }

  const handleNewProject = () => {
    if (confirm('Create new project? Any unsaved changes will be lost.')) {
      createNewProject()
      onClose()
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900/95 backdrop-blur-2xl border-2 border-white/20 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
              <Folder className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">My Projects</h2>
              <p className="text-xs text-gray-400">{projects.length} saved projects</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <Folder className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400 text-sm mb-6">No saved projects yet</p>
              <Button
                variant="primary"
                onClick={handleNewProject}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Create Your First Project
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => handleLoadProject(project.id)}
                  className="group relative bg-slate-800/50 backdrop-blur-xl border-2 border-white/20 rounded-xl overflow-hidden cursor-pointer hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02]"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-slate-700/50 flex items-center justify-center overflow-hidden">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Folder className="w-12 h-12 text-gray-600" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-white mb-1 truncate">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(project.updatedAt)}</span>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => handleDeleteProject(project.id, project.name, e)}
                    className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:scale-110 shadow-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/20 flex justify-between items-center">
          <p className="text-xs text-gray-400">
            Projects are saved locally in your browser
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="border-white/30 text-gray-300 hover:bg-white/10 backdrop-blur-xl">
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleNewProject}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
            >
              New Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
