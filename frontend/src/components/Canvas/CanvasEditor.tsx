import { useEffect, useRef } from 'react'
import { fabric } from 'fabric'
import { useEditorStore } from '@/store/editorStore'
import { EXPORT_FORMATS } from '@/types'
import CanvasToolbar from './CanvasToolbar'

export default function CanvasEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { setCanvas, selectedFormat } = useEditorStore()

  useEffect(() => {
    if (!canvasRef.current) return

    // Initialize Fabric.js canvas
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 1400,
      height: 800,
      backgroundColor: '#0f172a',
      preserveObjectStacking: true,
      selection: true,
      defaultCursor: 'default',
      hoverCursor: 'move',
    })

    // Enable text editing on double click
    fabricCanvas.on('mouse:dblclick', (e) => {
      const target = e.target
      if (target && (target.type === 'i-text' || target.type === 'text' || target.type === 'textbox')) {
        fabricCanvas.setActiveObject(target)
        target.enterEditing()
        target.selectAll()
      }
    })

    // Set canvas in store
    setCanvas(fabricCanvas)

    // Add grid
    addGrid(fabricCanvas)

    // Add keyboard shortcuts for layer ordering and deletion
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keyboard shortcuts when user is typing in an input field or editing text
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return
      }

      const activeObject = fabricCanvas.getActiveObject()

      // Check if user is editing text on canvas
      const isEditingText = activeObject && (activeObject.type === 'i-text' || activeObject.type === 'text' || activeObject.type === 'textbox') && (activeObject as any).isEditing
      if (isEditingText) {
        return
      }

      if (!activeObject) return

      // Delete key
      if (e.key === 'Delete' || e.key === 'Backspace') {
        fabricCanvas.remove(activeObject)
        fabricCanvas.renderAll()
        e.preventDefault()
        return
      }

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const modifier = isMac ? e.metaKey : e.ctrlKey

      if (modifier) {
        if (e.key === ']') {
          if (e.shiftKey) {
            // Cmd/Ctrl + Shift + ] = Bring to Front
            fabricCanvas.bringToFront(activeObject)
          } else {
            // Cmd/Ctrl + ] = Bring Forward
            fabricCanvas.bringForward(activeObject)
          }
          fabricCanvas.renderAll()
          e.preventDefault()
        } else if (e.key === '[') {
          if (e.shiftKey) {
            // Cmd/Ctrl + Shift + [ = Send to Back
            fabricCanvas.sendToBack(activeObject)
          } else {
            // Cmd/Ctrl + [ = Send Backward
            fabricCanvas.sendBackwards(activeObject)
          }
          fabricCanvas.renderAll()
          e.preventDefault()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      fabricCanvas.dispose()
      setCanvas(null)
    }
  }, [setCanvas])

  // Update canvas size when format changes
  useEffect(() => {
    const canvas = useEditorStore.getState().canvas
    if (!canvas || !selectedFormat) return

    canvas.setDimensions({
      width: selectedFormat.width,
      height: selectedFormat.height,
    })
    canvas.renderAll()
  }, [selectedFormat])

  const addGrid = (canvas: fabric.Canvas) => {
    const gridSize = 50
    const width = canvas.getWidth()
    const height = canvas.getHeight()

    for (let i = 0; i < width / gridSize; i++) {
      canvas.add(new fabric.Line([i * gridSize, 0, i * gridSize, height], {
        stroke: '#ffffff',
        strokeWidth: 0.5,
        opacity: 0.15,
        selectable: false,
        evented: false,
      }))
    }

    for (let i = 0; i < height / gridSize; i++) {
      canvas.add(new fabric.Line([0, i * gridSize, width, i * gridSize], {
        stroke: '#ffffff',
        strokeWidth: 0.5,
        opacity: 0.15,
        selectable: false,
        evented: false,
      }))
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center overflow-hidden relative p-6 z-[5]">
      {/* Canvas Container */}
      <div className="relative" style={{
        width: 'calc(100vh - 180px)',
        height: 'calc(100vh - 180px)',
        maxWidth: '90%',
        maxHeight: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Gradient glow behind canvas */}
        <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-3xl"></div>

        {/* Canvas background with glassmorphic effect - visible working board */}
        <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-xl shadow-2xl flex items-center justify-center border-2 border-blue-500/30 p-4">
          <canvas ref={canvasRef} style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            borderRadius: '0.75rem',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
          }} />
        </div>

        {/* Format indicator */}
        {selectedFormat && (
          <div className="absolute -top-10 right-0 backdrop-blur-xl bg-white/15 border border-white/30 text-white px-3 py-1.5 rounded-lg text-xs shadow-lg">
            <span className="font-medium">{selectedFormat.name}</span>
            <span className="text-gray-400 ml-1.5 text-[10px]">({selectedFormat.width}×{selectedFormat.height})</span>
          </div>
        )}

        {/* Canvas Editing Toolbar */}
        <CanvasToolbar />
      </div>
    </div>
  )
}
