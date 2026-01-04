import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Save, Folder, Check } from 'lucide-react'
import Button from '@/components/UI/Button'
import { useEditorStore } from '@/store/editorStore'
import ProjectsModal from '@/components/Projects/ProjectsModal'
import { toast } from 'sonner'

export default function Header() {
  const navigate = useNavigate()
  const { currentProject, saveProject, renameProject, createNewProject } = useEditorStore()
  const [isEditing, setIsEditing] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [showProjectsModal, setShowProjectsModal] = useState(false)

  useEffect(() => {
    if (!currentProject) {
      createNewProject()
    } else {
      setProjectName(currentProject.name)
    }
  }, [currentProject, createNewProject])

  const handleSaveProject = () => {
    saveProject()
  }

  const handleRenameProject = () => {
    if (projectName.trim() && projectName !== currentProject?.name) {
      renameProject(projectName.trim())
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent event from bubbling up
    e.stopPropagation()

    if (e.key === 'Enter') {
      e.preventDefault()
      handleRenameProject()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setProjectName(currentProject?.name || 'Untitled Project')
      setIsEditing(false)
    }
  }

  return (
    <>
      <header className="h-14 border-b border-white/20 bg-slate-900/40 backdrop-blur-xl shadow-2xl flex items-center justify-between px-5 relative z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">RetailGen</h1>
              <p className="text-[10px] text-gray-400">Creative Studio</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Editable Project Name */}
          {isEditing ? (
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                onBlur={handleRenameProject}
                onKeyDown={handleKeyDown}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                autoFocus
                autoComplete="off"
                className="text-xs text-white font-medium px-2.5 py-1.5 bg-white/15 backdrop-blur-xl border-2 border-blue-500/60 rounded-lg outline-none w-48"
              />
              <button
                onClick={handleRenameProject}
                className="p-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs text-gray-300 font-medium px-2.5 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg hover:bg-white/15 hover:border-blue-500/40 transition-all"
            >
              {currentProject?.name || 'Untitled Project'}
            </button>
          )}

          {/* My Projects Button */}
          <Button
            variant="outline"
            size="sm"
            className="border-blue-500/40 bg-blue-500/15 hover:bg-blue-500/25 hover:border-blue-400/60 text-blue-300 hover:text-blue-200 transition-colors shadow-lg shadow-blue-500/20 h-8 text-xs backdrop-blur-xl"
            onClick={() => setShowProjectsModal(true)}
          >
            <Folder className="w-3.5 h-3.5 mr-1.5" />
            My Projects
          </Button>

          {/* Save Project Button */}
          <Button
            variant="outline"
            size="sm"
            className="border-purple-500/40 bg-purple-500/15 hover:bg-purple-500/25 hover:border-purple-400/60 text-purple-300 hover:text-purple-200 transition-colors shadow-lg shadow-purple-500/20 h-8 text-xs backdrop-blur-xl"
            onClick={handleSaveProject}
          >
            <Save className="w-3.5 h-3.5 mr-1.5" />
            Save Project
          </Button>
        </div>
      </header>

      {/* Projects Modal */}
      <ProjectsModal isOpen={showProjectsModal} onClose={() => setShowProjectsModal(false)} />
    </>
  )
}
