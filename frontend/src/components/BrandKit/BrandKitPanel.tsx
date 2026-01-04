import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Plus, Palette } from 'lucide-react'
import { useEditorStore } from '@/store/editorStore'
import Button from '@/components/UI/Button'
import { toast } from 'sonner'
import { fabric } from 'fabric'

export default function BrandKitPanel() {
  const { brandKit, setBrandKit, addBrandColor, canvas } = useEditorStore()
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#3b82f6')
  const [colorName, setColorName] = useState('')

  const handleAddColor = () => {
    if (!colorName.trim()) {
      toast.error('Please enter a color name')
      return
    }

    if (!brandKit) {
      setBrandKit({
        id: '1',
        name: 'My Brand Kit',
        colors: [{ id: '1', hex: selectedColor, name: colorName }],
        fonts: ['Arial', 'Helvetica'],
      })
    } else {
      addBrandColor({ hex: selectedColor, name: colorName })
    }

    setColorName('')
    setShowColorPicker(false)
    toast.success('Color added to brand kit')
  }

  const applyColorToCanvas = (hex: string) => {
    if (!canvas) return

    const activeObject = canvas.getActiveObject()
    if (!activeObject) {
      toast.error('Please select an object first')
      return
    }

    if (activeObject instanceof fabric.IText) {
      activeObject.set('fill', hex)
    } else {
      activeObject.set('fill', hex)
    }
    canvas.renderAll()
    toast.success('Color applied')
  }

  return (
    <div className="p-4 space-y-4">
      {/* Brand Colors */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-white">Brand Colors</h3>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-white/10 hover:text-purple-300 text-gray-400 transition-colors"
            onClick={() => setShowColorPicker(!showColorPicker)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {showColorPicker && (
          <div className="p-3 border-2 border-purple-500/40 rounded-xl space-y-2.5 backdrop-blur-xl bg-gradient-to-br from-purple-500/25 to-blue-500/25">
            <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
            <input
              type="text"
              placeholder="Color name (e.g., Primary Blue)"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
              className="w-full px-2.5 py-2 border-2 border-white/30 rounded-lg text-xs bg-white/15 text-white placeholder:text-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
            />
            <div className="flex gap-2">
              <Button variant="primary" size="sm" onClick={handleAddColor} className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg h-8 text-xs">
                Add Color
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowColorPicker(false)} className="border-white/30 text-gray-300 hover:bg-white/15 backdrop-blur-xl h-8 text-xs">
                Cancel
              </Button>
            </div>
          </div>
        )}

        {brandKit && brandKit.colors.length > 0 ? (
          <div className="grid grid-cols-3 gap-2.5">
            {brandKit.colors.map((color) => (
              <button
                key={color.id}
                onClick={() => applyColorToCanvas(color.hex)}
                className="group relative aspect-square rounded-lg border-2 border-white/30 hover:border-purple-400 transition-all duration-300 overflow-hidden hover:shadow-lg shadow-lg"
                style={{ backgroundColor: color.hex }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-1">
                  <span className="text-white text-[10px] font-bold text-center">
                    {color.name}
                  </span>
                  <span className="text-white text-[9px] opacity-90 font-mono">{color.hex}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 backdrop-blur-xl bg-gradient-to-br from-purple-500/15 to-blue-500/15 rounded-xl border-2 border-dashed border-white/30">
            <Palette className="w-10 h-10 mx-auto mb-2.5 text-gray-400" />
            <p className="text-xs font-medium text-gray-300">No brand colors yet</p>
            <p className="text-[10px] text-gray-500 mt-1">Add colors to build your brand kit</p>
          </div>
        )}
      </div>

      {/* Predefined Color Palettes */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold text-white">Popular Palettes</h3>
        <div className="space-y-2.5">
          {[
            { name: 'Modern Blue', colors: ['#1e3a8a', '#3b82f6', '#93c5fd', '#dbeafe'] },
            { name: 'Warm Sunset', colors: ['#7c2d12', '#ea580c', '#fb923c', '#fed7aa'] },
            { name: 'Fresh Green', colors: ['#14532d', '#16a34a', '#86efac', '#dcfce7'] },
          ].map((palette) => (
            <div key={palette.name} className="space-y-1.5 p-2.5 backdrop-blur-xl bg-white/10 rounded-lg border border-white/20 hover:border-white/40 transition-all">
              <span className="text-[10px] font-semibold text-gray-300">{palette.name}</span>
              <div className="flex gap-1.5">
                {palette.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => applyColorToCanvas(color)}
                    className="flex-1 h-8 rounded-lg hover:ring-2 hover:ring-purple-400 transition-all shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
