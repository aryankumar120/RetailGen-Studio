import { useState, useEffect, useRef } from 'react'
import { Bold, Italic, Underline, Type, Square, Circle, Image as ImageIcon, Crop, RotateCw, Palette, Minus, ChevronDown, Trash2 } from 'lucide-react'
import { useEditorStore } from '@/store/editorStore'
import { fabric } from 'fabric'
import { HexColorPicker } from 'react-colorful'

export default function CanvasToolbar() {
  const { canvas } = useEditorStore()
  const toolbarRef = useRef<HTMLDivElement>(null)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#000000')
  const [showFontDropdown, setShowFontDropdown] = useState(false)
  const [showShapesMenu, setShowShapesMenu] = useState(false)
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null)
  const [opacity, setOpacity] = useState(100)
  const [fontSize, setFontSize] = useState(16)
  const [, forceUpdate] = useState(0)
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // Update active object when selection changes
  useEffect(() => {
    if (!canvas) return

    const updateSelection = () => {
      const selected = canvas.getActiveObject()
      setActiveObject(selected || null)
      if (selected) {
        setOpacity(Math.round(((selected.get('opacity') as number) || 1) * 100))
        if (selected.type === 'i-text' || selected.type === 'text' || selected.type === 'textbox') {
          setFontSize((selected.get('fontSize') as number) || 16)
        }
      }
    }

    canvas.on('selection:created', updateSelection)
    canvas.on('selection:updated', updateSelection)
    canvas.on('selection:cleared', () => {
      setActiveObject(null)
      setOpacity(100)
      setFontSize(16)
    })

    return () => {
      canvas.off('selection:created', updateSelection)
      canvas.off('selection:updated', updateSelection)
      canvas.off('selection:cleared')
    }
  }, [canvas])

  const isText = activeObject && (activeObject.type === 'i-text' || activeObject.type === 'text' || activeObject.type === 'textbox')
  const isLine = activeObject && activeObject.type === 'line'

  // Text formatting functions
  const toggleBold = () => {
    if (!canvas || !activeObject || !isText) return
    const currentWeight = activeObject.get('fontWeight')
    activeObject.set('fontWeight', currentWeight === 'bold' ? 'normal' : 'bold')
    canvas.renderAll()
    forceUpdate((n) => n + 1)
  }

  const toggleItalic = () => {
    if (!canvas || !activeObject || !isText) return
    const currentStyle = activeObject.get('fontStyle')
    activeObject.set('fontStyle', currentStyle === 'italic' ? 'normal' : 'italic')
    canvas.renderAll()
    forceUpdate((n) => n + 1)
  }

  const toggleUnderline = () => {
    if (!canvas || !activeObject || !isText) return
    const currentUnderline = activeObject.get('underline')
    activeObject.set('underline', !currentUnderline)
    canvas.renderAll()
    forceUpdate((n) => n + 1)
  }

  const changeFontSize = (size: number) => {
    if (!canvas || !activeObject || !isText) return
    setFontSize(size)
    activeObject.set('fontSize', size)
    canvas.renderAll()
  }

  const changeFont = (font: string) => {
    if (!canvas || !activeObject || !isText) return
    activeObject.set('fontFamily', font)
    canvas.renderAll()
    setShowFontDropdown(false)
  }

  const changeColor = (color: string) => {
    if (!canvas || !activeObject) return
    // Lines use 'stroke' for color, other objects use 'fill'
    if (isLine) {
      activeObject.set('stroke', color)
    } else {
      activeObject.set('fill', color)
    }
    canvas.renderAll()
  }

  const changeOpacity = (value: number) => {
    if (!canvas || !activeObject) return
    setOpacity(value)
    activeObject.set('opacity', value / 100)
    canvas.renderAll()
  }

  const rotateObject = () => {
    if (!canvas || !activeObject) return
    const currentAngle = activeObject.get('angle') || 0
    activeObject.rotate(currentAngle + 45)
    canvas.renderAll()
  }

  const addShape = (type: 'rect' | 'circle' | 'line') => {
    if (!canvas) return
    let shape: fabric.Object

    switch (type) {
      case 'rect':
        shape = new fabric.Rect({
          width: 150,
          height: 150,
          fill: '#3b82f6',
          left: canvas.getWidth() / 2 - 75,
          top: canvas.getHeight() / 2 - 75,
        })
        break
      case 'circle':
        shape = new fabric.Circle({
          radius: 75,
          fill: '#8b5cf6',
          left: canvas.getWidth() / 2 - 75,
          top: canvas.getHeight() / 2 - 75,
        })
        break
      case 'line':
        shape = new fabric.Line([0, 0, 200, 0], {
          stroke: '#ffffff',
          strokeWidth: 3,
          left: canvas.getWidth() / 2 - 100,
          top: canvas.getHeight() / 2,
        })
        break
    }

    canvas.add(shape)
    canvas.setActiveObject(shape)
    canvas.renderAll()
    setShowShapesMenu(false)
  }

  const deleteObject = () => {
    if (!canvas || !activeObject) return
    canvas.remove(activeObject)
    canvas.renderAll()
  }

  const fonts = ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana', 'Impact', 'Comic Sans MS', 'Courier New']
  const fontSizes = [12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 72]

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only allow dragging from the toolbar background, not from buttons or inputs
    if ((e.target as HTMLElement).closest('button, input, select')) {
      return
    }

    if (toolbarRef.current) {
      const rect = toolbarRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
    setIsDragging(true)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset])

  if (!canvas) return null

  return (
    <div
      ref={toolbarRef}
      className="fixed z-50 cursor-move"
      style={{
        left: position ? `${position.x}px` : '50%',
        bottom: position ? 'auto' : '24px',
        top: position ? `${position.y}px` : 'auto',
        transform: position ? 'none' : 'translateX(-50%)',
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-center justify-center gap-1 px-2.5 py-2 backdrop-blur-xl bg-slate-900/70 border border-white/30 rounded-xl shadow-2xl">
        {/* Text Formatting - Only show if text is selected */}
        {isText && (
          <>
            {/* Font Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFontDropdown(!showFontDropdown)}
                className="flex items-center gap-1 px-2 py-1.5 hover:bg-white/10 rounded-md transition-all text-white text-xs border border-white/20"
              >
                <Type className="w-3.5 h-3.5" />
                <span className="max-w-20 truncate">{activeObject ? (activeObject.get('fontFamily') as string) || 'Arial' : 'Arial'}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {showFontDropdown && (
                <div
                  className="absolute bottom-full mb-2 left-0 backdrop-blur-xl bg-slate-900/90 border border-white/30 rounded-lg shadow-xl max-h-40 overflow-y-auto"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  {fonts.map((font) => (
                    <button
                      key={font}
                      onClick={() => changeFont(font)}
                      className="block w-full px-3 py-1.5 text-left text-xs text-white hover:bg-white/10 transition-all"
                      style={{ fontFamily: font }}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Font Size Selector */}
            <select
              value={fontSize}
              onChange={(e) => changeFontSize(Number(e.target.value))}
              onMouseDown={(e) => e.stopPropagation()}
              className="px-2 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-md text-white text-xs transition-all outline-none"
            >
              {fontSizes.map((size) => (
                <option key={size} value={size} className="bg-slate-900">
                  {size}px
                </option>
              ))}
            </select>

            <div className="w-px h-5 bg-white/20 mx-1"></div>

            {/* Bold */}
            <button
              onClick={toggleBold}
              className={`p-1.5 rounded-md transition-all ${
                activeObject && activeObject.get('fontWeight') === 'bold'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-white/10 text-white'
              }`}
              title="Bold (Ctrl+B)"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>

            {/* Italic */}
            <button
              onClick={toggleItalic}
              className={`p-1.5 rounded-md transition-all ${
                activeObject && activeObject.get('fontStyle') === 'italic'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-white/10 text-white'
              }`}
              title="Italic (Ctrl+I)"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>

            {/* Underline */}
            <button
              onClick={toggleUnderline}
              className={`p-1.5 rounded-md transition-all ${
                activeObject && activeObject.get('underline')
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-white/10 text-white'
              }`}
              title="Underline (Ctrl+U)"
            >
              <Underline className="w-3.5 h-3.5" />
            </button>

            <div className="w-px h-5 bg-white/20 mx-1"></div>
          </>
        )}

        {/* Color Picker */}
        <div className="relative">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-white/10 rounded-md transition-all border border-white/20"
            title="Color"
          >
            <Palette className="w-3.5 h-3.5 text-white" />
            <div
              className="w-4 h-4 rounded border border-white/40"
              style={{
                backgroundColor: activeObject
                  ? (isLine ? (activeObject.get('stroke') as string) : (activeObject.get('fill') as string)) || '#000000'
                  : '#000000'
              }}
            ></div>
          </button>

          {showColorPicker && activeObject && (
            <div
              className="absolute bottom-full mb-2 left-0 p-2.5 backdrop-blur-xl bg-slate-900/90 border border-white/30 rounded-lg shadow-xl"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <HexColorPicker
                color={
                  isLine
                    ? (activeObject.get('stroke') as string) || '#ffffff'
                    : (activeObject.get('fill') as string) || '#000000'
                }
                onChange={(color) => {
                  setSelectedColor(color)
                  changeColor(color)
                }}
              />
              <button
                onClick={() => setShowColorPicker(false)}
                className="w-full mt-2 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-md transition-all"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Opacity Slider */}
        {activeObject && (
          <div
            className="flex items-center gap-1.5 px-2 py-1.5 border border-white/20 rounded-md"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <Minus className="w-3.5 h-3.5 text-white" />
            <input
              type="range"
              min="0"
              max="100"
              value={opacity}
              onChange={(e) => changeOpacity(Number(e.target.value))}
              className="w-20 accent-blue-500"
              title="Opacity"
              style={{ height: '4px' }}
            />
            <span className="text-xs text-white min-w-[3ch]">{opacity}%</span>
          </div>
        )}

        <div className="w-px h-5 bg-white/20 mx-1"></div>

        {/* Shapes Menu */}
        <div className="relative">
          <button
            onClick={() => setShowShapesMenu(!showShapesMenu)}
            className="p-1.5 hover:bg-white/10 rounded-md transition-all text-white"
            title="Add Shape"
          >
            <Square className="w-3.5 h-3.5" />
          </button>

          {showShapesMenu && (
            <div
              className="absolute bottom-full mb-2 left-0 backdrop-blur-xl bg-slate-900/90 border border-white/30 rounded-lg shadow-xl p-1.5 space-y-1"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => addShape('rect')}
                className="flex items-center gap-2 w-full px-3 py-1.5 text-left text-xs text-white hover:bg-white/10 rounded-md transition-all"
              >
                <Square className="w-3.5 h-3.5" />
                Rectangle
              </button>
              <button
                onClick={() => addShape('circle')}
                className="flex items-center gap-2 w-full px-3 py-1.5 text-left text-xs text-white hover:bg-white/10 rounded-md transition-all"
              >
                <Circle className="w-3.5 h-3.5" />
                Circle
              </button>
              <button
                onClick={() => addShape('line')}
                className="flex items-center gap-2 w-full px-3 py-1.5 text-left text-xs text-white hover:bg-white/10 rounded-md transition-all"
              >
                <Minus className="w-3.5 h-3.5" />
                Line
              </button>
            </div>
          )}
        </div>

        {/* Rotate */}
        <button
          onClick={rotateObject}
          className="p-1.5 hover:bg-white/10 rounded-md transition-all text-white disabled:opacity-30 disabled:cursor-not-allowed"
          title="Rotate 45°"
          disabled={!activeObject}
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>

        {/* Delete */}
        {activeObject && (
          <>
            <div className="w-px h-5 bg-white/20 mx-1"></div>
            <button
              onClick={deleteObject}
              className="p-1.5 hover:bg-red-500/20 rounded-md transition-all text-red-400 hover:text-red-300"
              title="Delete (Del)"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
