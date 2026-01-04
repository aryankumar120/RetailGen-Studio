import { useEffect } from 'react'
import { useEditorStore } from '@/store/editorStore'
import Header from '@/components/Layout/Header'
import Sidebar from '@/components/Layout/Sidebar'
import CanvasEditor from '@/components/Canvas/CanvasEditor'
import AssetPanel from '@/components/AssetPanel/AssetPanel'
import BrandKitPanel from '@/components/BrandKit/BrandKitPanel'
import AIPanel from '@/components/AI/AIPanel'
import ExportPanel from '@/components/Export/ExportPanel'

export default function EditorPage() {
  const { activePanel, canvas, saveProject } = useEditorStore()

  // Auto-save every 5 seconds
  useEffect(() => {
    if (!canvas) return

    const autoSaveInterval = setInterval(() => {
      saveProject()
      console.log('Auto-saved project')
    }, 5000) // 5 seconds

    return () => clearInterval(autoSaveInterval)
  }, [canvas, saveProject])

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">

      {/* Animated Gradient Mesh Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full mix-blend-normal filter blur-3xl opacity-80 animate-blob"></div>
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full mix-blend-normal filter blur-3xl opacity-80 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-pink-500/30 rounded-full mix-blend-normal filter blur-3xl opacity-80 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-green-500/25 rounded-full mix-blend-normal filter blur-3xl opacity-70 animate-blob animation-delay-3000"></div>
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col">
          <CanvasEditor />
        </div>

        {/* Right Panel */}
        <div className="w-80 border-l border-white/20 backdrop-blur-2xl bg-slate-900/40 overflow-y-auto shadow-2xl relative z-10">
          {activePanel === 'assets' && <AssetPanel />}
          {activePanel === 'brand' && <BrandKitPanel />}
          {activePanel === 'ai' && <AIPanel />}
          {activePanel === 'export' && <ExportPanel />}
          {!activePanel && (
            <div className="h-full flex flex-col items-center justify-center p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-base font-semibold text-white mb-2">Select a Tool</p>
              <p className="text-sm text-gray-400 text-center">Choose from the sidebar to start creating</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
