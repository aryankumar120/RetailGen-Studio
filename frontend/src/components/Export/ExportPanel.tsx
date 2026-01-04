import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { useEditorStore } from '@/store/editorStore'
import { EXPORT_FORMATS } from '@/types'
import Button from '@/components/UI/Button'
import { toast } from 'sonner'
import { clsx } from 'clsx'

export default function ExportPanel() {
  const { canvas, selectedFormat, setSelectedFormat } = useEditorStore()
  const [exporting, setExporting] = useState(false)

  const handleExport = async (format: 'png' | 'jpg') => {
    if (!canvas) {
      toast.error('Canvas not initialized')
      return
    }

    setExporting(true)
    try {
      // Export canvas as image
      const dataURL = canvas.toDataURL({
        format: format,
        quality: 0.9,
        multiplier: 1,
      })

      // Create download link
      const link = document.createElement('a')
      link.download = `retailgen-creative-${Date.now()}.${format}`
      link.href = dataURL
      link.click()

      toast.success(`Exported as ${format.toUpperCase()}`)
    } catch (error) {
      toast.error('Failed to export')
      console.error(error)
    } finally {
      setExporting(false)
    }
  }

  const handleExportAllFormats = async () => {
    if (!canvas) return

    setExporting(true)
    const originalWidth = canvas.getWidth()
    const originalHeight = canvas.getHeight()

    // Save original state of all objects
    const originalState = canvas.toJSON()

    try {
      for (const format of EXPORT_FORMATS) {
        // Calculate scaling factors
        const scaleX = format.width / originalWidth
        const scaleY = format.height / originalHeight

        // Use the smaller scale to ensure everything fits
        const uniformScale = Math.min(scaleX, scaleY)

        // Calculate offset to center the content if aspect ratios don't match
        const scaledWidth = originalWidth * uniformScale
        const scaledHeight = originalHeight * uniformScale
        const offsetX = (format.width - scaledWidth) / 2
        const offsetY = (format.height - scaledHeight) / 2

        // Resize canvas
        canvas.setDimensions({
          width: format.width,
          height: format.height,
        })

        // Adapt all objects to new dimensions
        const objects = canvas.getObjects()
        objects.forEach((obj) => {
          // Skip grid lines (they're not selectable/evented)
          if (!obj.selectable && !obj.evented) return

          // Save original values
          const originalLeft = obj.left || 0
          const originalTop = obj.top || 0
          const originalScaleX = obj.scaleX || 1
          const originalScaleY = obj.scaleY || 1
          const originalWidth = obj.width || 0
          const originalHeight = obj.height || 0

          // Calculate new position with centering offset
          const newLeft = originalLeft * uniformScale + offsetX
          const newTop = originalTop * uniformScale + offsetY

          // Apply new position
          obj.set({
            left: newLeft,
            top: newTop,
            scaleX: originalScaleX * uniformScale,
            scaleY: originalScaleY * uniformScale,
          })

          // For text objects, also scale font size proportionally
          if (obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox') {
            const originalFontSize = obj.get('fontSize') as number || 16
            const newFontSize = Math.max(12, Math.round(originalFontSize * uniformScale))
            obj.set('fontSize', newFontSize)
          }

          obj.setCoords()
        })

        canvas.renderAll()

        // Export
        const dataURL = canvas.toDataURL({
          format: 'png',
          quality: 0.9,
        })

        const link = document.createElement('a')
        link.download = `retailgen-${format.id}.png`
        link.href = dataURL
        link.click()

        // Restore original state for next iteration
        await new Promise(resolve => setTimeout(resolve, 300))
        canvas.loadFromJSON(originalState, () => {
          canvas.renderAll()
        })
        await new Promise(resolve => setTimeout(resolve, 200))
      }

      // Final restore to ensure canvas is back to original state
      canvas.loadFromJSON(originalState, () => {
        canvas.setDimensions({
          width: originalWidth,
          height: originalHeight,
        })
        canvas.renderAll()
      })

      toast.success('Exported all formats with adaptive sizing')
    } catch (error) {
      toast.error('Failed to export all formats')
      console.error(error)

      // Restore original state on error
      canvas.loadFromJSON(originalState, () => {
        canvas.setDimensions({
          width: originalWidth,
          height: originalHeight,
        })
        canvas.renderAll()
      })
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="p-4 space-y-4">
      {/* Format Selection */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold text-white">Select Format</h3>
        <div className="space-y-2">
          {EXPORT_FORMATS.map((format) => (
            <button
              key={format.id}
              onClick={() => setSelectedFormat(format)}
              className={clsx(
                'w-full p-2.5 rounded-lg border-2 text-left transition-all duration-300 backdrop-blur-xl',
                selectedFormat?.id === format.id
                  ? 'border-green-500/50 bg-gradient-to-br from-green-500/25 to-blue-500/25 shadow-md'
                  : 'border-white/30 hover:border-green-400/60 hover:bg-white/10'
              )}
            >
              <div className="font-semibold text-xs text-white">{format.name}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">
                {format.width} × {format.height} • {format.platform}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Export Actions */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold text-white">Export Options</h3>

        <Button
          variant="primary"
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all text-white h-9 text-xs"
          onClick={() => handleExport('png')}
          disabled={exporting}
        >
          {exporting ? (
            <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5 mr-1.5" />
          )}
          Export as PNG
        </Button>

        <Button
          variant="outline"
          className="w-full border-green-500/40 bg-green-500/15 hover:bg-green-500/25 hover:border-green-400/60 text-green-300 hover:text-green-200 transition-all backdrop-blur-xl h-9 text-xs"
          onClick={() => handleExport('jpg')}
          disabled={exporting}
        >
          {exporting ? (
            <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5 mr-1.5" />
          )}
          Export as JPG
        </Button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-white/20" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-slate-900/80 px-3 text-gray-400 font-medium">or</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full border-white/30 bg-white/10 hover:bg-white/20 hover:border-white/40 text-gray-200 hover:text-white transition-all backdrop-blur-xl h-9 text-xs"
          onClick={handleExportAllFormats}
          disabled={exporting}
        >
          {exporting ? (
            <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5 mr-1.5" />
          )}
          Export All Formats
        </Button>
      </div>

      {selectedFormat && (
        <div className="p-3 backdrop-blur-xl bg-gradient-to-br from-blue-500/25 to-purple-500/25 rounded-lg border-2 border-blue-500/40 shadow-sm">
          <p className="font-bold text-white text-xs">Selected: {selectedFormat.name}</p>
          <p className="text-[10px] text-gray-300 mt-1">
            Canvas will resize to {selectedFormat.width}×{selectedFormat.height}px
          </p>
        </div>
      )}
    </div>
  )
}
