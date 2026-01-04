import { Image, Palette, Sparkles, Download, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEditorStore } from '@/store/editorStore'
import { clsx } from 'clsx'

const tools = [
  { id: 'assets' as const, icon: Image, label: 'Assets', description: 'Upload & manage images' },
  { id: 'brand' as const, icon: Palette, label: 'Brand Kit', description: 'Brand colors & fonts' },
  { id: 'ai' as const, icon: Sparkles, label: 'AI Tools', description: 'AI-powered features' },
  { id: 'export' as const, icon: Download, label: 'Export', description: 'Download creatives' },
]

export default function Sidebar() {
  const { activePanel, setActivePanel, sidebarExpanded, setSidebarExpanded } = useEditorStore()

  const getToolColors = (toolId: string) => {
    const colors = {
      assets: 'from-blue-500 to-blue-600',
      brand: 'from-purple-500 to-purple-600',
      ai: 'from-pink-500 to-pink-600',
      export: 'from-green-500 to-green-600',
    }
    return colors[toolId as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  return (
    <div className={clsx(
      'border-r border-white/20 backdrop-blur-2xl bg-slate-900/30 flex flex-col shadow-2xl relative transition-all duration-300',
      sidebarExpanded ? 'w-56' : 'w-16'
    )} style={{ zIndex: 15 }}>
      {/* Tools */}
      <div className={clsx('flex flex-col gap-1.5 py-3 flex-1', sidebarExpanded ? 'px-2' : 'items-center px-1.5')}>
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActivePanel(activePanel === tool.id ? null : tool.id)}
            className={clsx(
              'relative rounded-lg flex items-center transition-all duration-300 group',
              sidebarExpanded ? 'px-3 py-2.5 justify-start' : 'w-12 h-12 justify-center',
              activePanel === tool.id
                ? 'bg-gradient-to-br ' + getToolColors(tool.id) + ' text-white shadow-lg'
                : 'text-gray-400 hover:bg-white/10 hover:text-white'
            )}
            title={!sidebarExpanded ? tool.label : undefined}
          >
            {/* Glow effect on hover for inactive buttons */}
            {activePanel !== tool.id && (
              <div className={`absolute -inset-1 bg-gradient-to-br ${getToolColors(tool.id)} opacity-0 group-hover:opacity-30 rounded-lg transition-opacity blur-lg -z-10`}></div>
            )}

            <tool.icon className={clsx('flex-shrink-0', sidebarExpanded ? 'w-4 h-4' : 'w-5 h-5')} />

            {sidebarExpanded && (
              <div className="ml-2.5 text-left overflow-hidden">
                <div className="text-xs font-semibold">{tool.label}</div>
                <div className="text-[9px] opacity-80 truncate">{tool.description}</div>
              </div>
            )}

            {activePanel === tool.id && !sidebarExpanded && (
              <div className={`absolute -right-px top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b ${getToolColors(tool.id)} rounded-l-full shadow-lg`} />
            )}
          </button>
        ))}
      </div>

      {/* Toggle Button at Bottom */}
      <div className={clsx('p-3 border-t border-white/20', 'flex justify-center')}>
        <button
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
          className="relative backdrop-blur-xl bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-all shadow-lg hover:shadow-2xl flex items-center justify-center w-10 h-10 rounded-lg group"
          title={sidebarExpanded ? 'Hide sidebar' : 'Show sidebar'}
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-50 group-hover:opacity-75 rounded-lg transition-opacity blur-md -z-10"></div>

          {sidebarExpanded ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  )
}
