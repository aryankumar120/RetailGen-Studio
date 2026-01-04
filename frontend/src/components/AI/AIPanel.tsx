import { useState, useEffect } from 'react'
import { Sparkles, Wand2, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { useEditorStore } from '@/store/editorStore'
import Button from '@/components/UI/Button'
import { toast } from 'sonner'
import { aiService } from '@/services/aiService'
import { fabric } from 'fabric'

export default function AIPanel() {
  const { canvas } = useEditorStore()
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [compliance, setCompliance] = useState<any[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [templatePreviews, setTemplatePreviews] = useState<{[key: number]: string}>({})
  const [loadingRemoveBg, setLoadingRemoveBg] = useState(false)
  const [loadingLayouts, setLoadingLayouts] = useState(false)
  const [loadingCompliance, setLoadingCompliance] = useState(false)

  const handleRemoveBackground = async () => {
    if (!canvas) {
      toast.error('Canvas not initialized')
      return
    }

    const activeObject = canvas.getActiveObject()
    if (!activeObject || !(activeObject instanceof fabric.Image)) {
      toast.error('Please select an image first')
      return
    }

    setLoadingRemoveBg(true)
    try {
      const imageUrl = (activeObject as any).getSrc()
      const result = await aiService.removeBackground(imageUrl)

      // Replace the image with background removed version
      fabric.Image.fromURL(result.imageUrl, (img) => {
        img.set({
          left: activeObject.left,
          top: activeObject.top,
          scaleX: activeObject.scaleX,
          scaleY: activeObject.scaleY,
        })
        canvas.remove(activeObject)
        canvas.add(img)
        canvas.setActiveObject(img)
        canvas.renderAll()
        toast.success('Background removed successfully')
      })
    } catch (error) {
      toast.error('Failed to remove background')
      console.error(error)
    } finally {
      setLoadingRemoveBg(false)
    }
  }

  const handleGenerateSuggestions = async () => {
    if (!canvas) return

    setLoadingLayouts(true)
    try {
      // Generate 5 diverse template layouts for retail media
      const templates = [
        {
          id: 1,
          name: 'Luxury Fashion',
          description: 'Elegant premium apparel showcase',
          category: 'Fashion',
          layout: generateLuxuryFashionLayout(),
        },
        {
          id: 2,
          name: 'Modern F&B',
          description: 'Trendy food & beverage design',
          category: 'F&B',
          layout: generateModernFoodLayout(),
        },
        {
          id: 3,
          name: 'Tech Minimal',
          description: 'Sleek electronics presentation',
          category: 'Tech',
          layout: generateTechMinimalLayout(),
        },
        {
          id: 4,
          name: 'Beauty Glow',
          description: 'Sophisticated cosmetics layout',
          category: 'Beauty',
          layout: generateBeautyGlowLayout(),
        },
        {
          id: 5,
          name: 'Holiday Sale',
          description: 'Festive seasonal promotion',
          category: 'Seasonal',
          layout: generateHolidaySaleLayout(),
        },
      ]

      setSuggestions(templates)

      // Generate preview thumbnails
      generatePreviews(templates)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingLayouts(false)
    }
  }

  const generatePreviews = (templates: any[]) => {
    if (!canvas) return

    const previews: {[key: number]: string} = {}
    let loadedCount = 0

    templates.forEach((template) => {
      // Create a temporary off-screen canvas for generating thumbnails
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = 1400
      tempCanvas.height = 800
      const fabricTempCanvas = new fabric.Canvas(tempCanvas)

      // Load template into temporary canvas
      fabricTempCanvas.loadFromJSON(template.layout, () => {
        fabricTempCanvas.renderAll()
        // Generate thumbnail
        const thumbnail = fabricTempCanvas.toDataURL({ format: 'png', quality: 0.5, multiplier: 0.15 })
        previews[template.id] = thumbnail

        loadedCount++

        // Update state once all previews are generated
        if (loadedCount === templates.length) {
          setTemplatePreviews(previews)
        }

        // Cleanup temporary canvas
        fabricTempCanvas.dispose()
      })
    })
  }

  const applyTemplate = (template: any) => {
    if (!canvas) return

    // Save existing images before applying template
    const existingImages: fabric.Image[] = []
    canvas.getObjects().forEach((obj) => {
      if (obj.type === 'image') {
        existingImages.push(obj as fabric.Image)
      }
    })

    // Load template
    canvas.loadFromJSON(template.layout, () => {
      // Add back the saved images on top
      existingImages.forEach((img) => {
        canvas.add(img)
        canvas.bringToFront(img)
      })

      canvas.renderAll()
      setSelectedTemplate(template)
    })
  }

  const clearTemplates = () => {
    setSuggestions([])
    setSelectedTemplate(null)
    setTemplatePreviews({})
  }

  // Template generation functions
  const generateLuxuryFashionLayout = () => {
    return {
      version: '5.3.0',
      objects: [
        // Elegant cream background
        { type: 'rect', left: 0, top: 0, width: 1400, height: 800, fill: '#f8f6f3', selectable: false, evented: false },
        // Sophisticated navy accent strip
        { type: 'rect', left: 50, top: 0, width: 8, height: 800, fill: '#1a1a2e', selectable: false, evented: false },
        // Gold decorative line top
        { type: 'rect', left: 300, top: 80, width: 200, height: 2, fill: '#d4af37', selectable: false, evented: false },
        // Main heading - elegant serif style
        { type: 'i-text', left: 300, top: 120, text: 'LUXURY', fontSize: 72, fontWeight: 'bold', fill: '#1a1a2e', fontFamily: 'Georgia', letterSpacing: 8, fontStyle: 'normal', underline: false },
        { type: 'i-text', left: 300, top: 200, text: 'Collection', fontSize: 48, fill: '#6b6b6b', fontFamily: 'Georgia', fontStyle: 'italic', underline: false },
        // Premium tagline
        { type: 'i-text', left: 300, top: 280, text: 'Elevate Your Style', fontSize: 24, fill: '#9a9a9a', fontFamily: 'Arial', fontStyle: 'normal', underline: false },
        // Product placeholder with shadow effect
        { type: 'circle', left: 950, top: 400, radius: 180, fill: '#ffffff', shadow: { color: 'rgba(0,0,0,0.1)', blur: 40, offsetX: 0, offsetY: 20 }, originX: 'center', originY: 'center' },
        // Gold accent circle
        { type: 'circle', left: 750, top: 250, radius: 25, fill: 'transparent', stroke: '#d4af37', strokeWidth: 2 },
        // Price tag style element
        { type: 'rect', left: 300, top: 620, width: 280, height: 100, fill: '#1a1a2e', rx: 8, ry: 8 },
        { type: 'i-text', left: 440, top: 650, text: 'EXCLUSIVE OFFER', fontSize: 14, fill: '#d4af37', originX: 'center', originY: 'center', letterSpacing: 2, fontStyle: 'normal', underline: false },
        { type: 'i-text', left: 440, top: 685, text: 'SHOP NOW', fontSize: 22, fontWeight: 'bold', fill: '#ffffff', originX: 'center', originY: 'center', fontStyle: 'normal', underline: false },
        // Decorative corner element
        { type: 'rect', left: 1300, top: 700, width: 80, height: 80, fill: '#d4af37', opacity: 0.15, angle: 45 },
      ]
    }
  }

  const generateModernFoodLayout = () => {
    return {
      version: '5.3.0',
      objects: [
        // Warm gradient background - 2025 trending colors
        { type: 'rect', left: 0, top: 0, width: 1400, height: 800, fill: '#2d1b0e', selectable: false, evented: false },
        // Warm accent gradient overlay
        { type: 'rect', left: 0, top: 0, width: 1400, height: 400, fill: 'rgba(139, 69, 19, 0.3)', selectable: false, evented: false },
        // Modern geometric accent
        { type: 'circle', left: 1100, top: 150, radius: 280, fill: '#ff6b35', opacity: 0.12 },
        // Trendy title with modern font
        { type: 'i-text', left: 300, top: 140, text: 'FRESH', fontSize: 96, fontWeight: 'bold', fill: '#ff6b35', fontFamily: 'Impact', letterSpacing: 4, fontStyle: 'normal', underline: false },
        { type: 'i-text', left: 300, top: 240, text: 'Daily', fontSize: 68, fill: '#ffffff', fontFamily: 'Georgia', fontStyle: 'italic', underline: false },
        // Subtitle with premium feel
        { type: 'i-text', left: 300, top: 330, text: 'Artisan Quality', fontSize: 28, fill: '#ffc896', fontFamily: 'Arial', fontStyle: 'normal', underline: false },
        // Product showcase area
        { type: 'circle', left: 900, top: 480, radius: 200, fill: '#ffffff', opacity: 0.08, originX: 'center', originY: 'center' },
        { type: 'circle', left: 900, top: 480, radius: 160, fill: '#ffffff', opacity: 0.06, originX: 'center', originY: 'center' },
        // Decorative food-themed elements
        { type: 'circle', left: 380, top: 550, radius: 15, fill: '#ff6b35', opacity: 0.6 },
        { type: 'circle', left: 430, top: 590, radius: 20, fill: '#ffc896', opacity: 0.5 },
        { type: 'circle', left: 360, top: 620, radius: 12, fill: '#ff6b35', opacity: 0.7 },
        // CTA section with modern style
        { type: 'rect', left: 300, top: 660, width: 320, height: 85, fill: '#ff6b35', rx: 42, ry: 42 },
        { type: 'i-text', left: 460, top: 702, text: 'ORDER NOW', fontSize: 26, fontWeight: 'bold', fill: '#ffffff', originX: 'center', originY: 'center', letterSpacing: 2, fontStyle: 'normal', underline: false },
        // Additional info
        { type: 'i-text', left: 1050, top: 720, text: '★ Premium Quality ★', fontSize: 18, fill: '#ffc896', originX: 'center', originY: 'center', fontStyle: 'normal', underline: false },
      ]
    }
  }

  const generateTechMinimalLayout = () => {
    return {
      version: '5.3.0',
      objects: [
        // Clean white background
        { type: 'rect', left: 0, top: 0, width: 1400, height: 800, fill: '#ffffff', selectable: false, evented: false },
        // Sleek gradient accent
        { type: 'rect', left: 0, top: 0, width: 600, height: 800, fill: '#0a0a0a', selectable: false, evented: false },
        { type: 'rect', left: 600, top: 0, width: 800, height: 800, fill: '#f5f5f7', selectable: false, evented: false },
        // Modern tech blue accent line
        { type: 'rect', left: 590, top: 0, width: 20, height: 800, fill: '#007aff', selectable: false, evented: false },
        // Premium product title
        { type: 'i-text', left: 280, top: 180, text: 'Innovation', fontSize: 52, fill: '#ffffff', fontFamily: 'Helvetica', fontWeight: 'normal', fontStyle: 'normal', underline: false },
        { type: 'i-text', left: 280, top: 250, text: 'Redefined', fontSize: 68, fontWeight: 'bold', fill: '#007aff', fontFamily: 'Helvetica', fontStyle: 'normal', underline: false },
        // Tech tagline
        { type: 'i-text', left: 280, top: 350, text: 'Next Generation Technology', fontSize: 22, fill: '#b0b0b0', fontFamily: 'Arial', fontStyle: 'normal', underline: false },
        // Product showcase circle - minimalist
        { type: 'circle', left: 1000, top: 400, radius: 200, fill: '#ffffff', stroke: '#e5e5e5', strokeWidth: 1, originX: 'center', originY: 'center' },
        { type: 'circle', left: 1000, top: 400, radius: 140, fill: 'transparent', stroke: '#007aff', strokeWidth: 2, originX: 'center', originY: 'center', opacity: 0.3 },
        // Specs/Features area
        { type: 'i-text', left: 750, top: 650, text: '• 5G Ready  • AI Powered  • Premium Build', fontSize: 18, fill: '#666666', fontFamily: 'Arial', fontStyle: 'normal', underline: false },
        // Clean CTA button
        { type: 'rect', left: 280, top: 640, width: 240, height: 65, fill: '#007aff', rx: 32, ry: 32 },
        { type: 'i-text', left: 400, top: 672, text: 'Learn More', fontSize: 22, fill: '#ffffff', originX: 'center', originY: 'center', fontFamily: 'Helvetica', fontStyle: 'normal', underline: false },
        // Minimalist corner accent
        { type: 'rect', left: 1350, top: 50, width: 30, height: 2, fill: '#007aff' },
        { type: 'rect', left: 1378, top: 50, width: 2, height: 30, fill: '#007aff' },
      ]
    }
  }

  const generateBeautyGlowLayout = () => {
    return {
      version: '5.3.0',
      objects: [
        // Elegant gradient background - rose gold tones
        { type: 'rect', left: 0, top: 0, width: 1400, height: 800, fill: '#faf8f6', selectable: false },
        // Soft gradient overlay top
        { type: 'rect', left: 0, top: 0, width: 1400, height: 350, fill: 'rgba(237, 223, 219, 0.5)', selectable: false },
        // Large soft circle - glow effect
        { type: 'circle', left: 300, top: 400, radius: 320, fill: '#fde8e9', opacity: 0.4 },
        { type: 'circle', left: 1100, top: 200, radius: 250, fill: '#e8d5d1', opacity: 0.3 },
        // Elegant title
        { type: 'i-text', left: 700, top: 140, text: 'Radiant Beauty', fontSize: 64, fontWeight: 'bold', fill: '#8b6f6f', originX: 'center', originY: 'center', fontFamily: 'Georgia', fontStyle: 'italic', underline: false },
        // Subtitle with luxury feel
        { type: 'i-text', left: 700, top: 220, text: 'PREMIUM SKINCARE COLLECTION', fontSize: 20, fill: '#b8a398', originX: 'center', originY: 'center', letterSpacing: 4, fontStyle: 'normal', underline: false },
        // Decorative line
        { type: 'rect', left: 600, top: 260, width: 200, height: 1, fill: '#d4af37', originX: 'center', originY: 'center' },
        // Product showcase circle with glow
        { type: 'circle', left: 700, top: 480, radius: 160, fill: '#ffffff', shadow: { color: 'rgba(212, 175, 55, 0.2)', blur: 50, offsetX: 0, offsetY: 10 }, originX: 'center', originY: 'center' },
        { type: 'circle', left: 700, top: 480, radius: 130, fill: 'transparent', stroke: '#d4af37', strokeWidth: 1, opacity: 0.4, originX: 'center', originY: 'center' },
        // Decorative elements - sparkle effect
        { type: 'circle', left: 500, top: 250, radius: 8, fill: '#d4af37', opacity: 0.6 },
        { type: 'circle', left: 920, top: 280, radius: 6, fill: '#d4af37', opacity: 0.7 },
        { type: 'circle', left: 850, top: 620, radius: 10, fill: '#d4af37', opacity: 0.5 },
        { type: 'circle', left: 550, top: 580, radius: 7, fill: '#d4af37', opacity: 0.6 },
        // Premium CTA
        { type: 'rect', left: 540, top: 680, width: 320, height: 75, fill: '#8b6f6f', rx: 37, ry: 37 },
        { type: 'i-text', left: 700, top: 717, text: 'DISCOVER MORE', fontSize: 22, fontWeight: 'bold', fill: '#ffffff', originX: 'center', originY: 'center', letterSpacing: 2, fontStyle: 'normal', underline: false },
        // Brand tagline
        { type: 'i-text', left: 700, top: 100, text: '✦ Luxury ✦ Elegance ✦ You ✦', fontSize: 16, fill: '#d4af37', originX: 'center', originY: 'center', fontStyle: 'normal', underline: false },
      ]
    }
  }

  const generateHolidaySaleLayout = () => {
    return {
      version: '5.3.0',
      objects: [
        // Festive gradient background - winter/holiday colors
        { type: 'rect', left: 0, top: 0, width: 1400, height: 800, fill: '#1a1f3a', selectable: false, evented: false },
        // Festive accent gradient
        { type: 'rect', left: 0, top: 0, width: 1400, height: 400, fill: 'rgba(183, 28, 28, 0.15)', selectable: false, evented: false },
        // Decorative holiday circles - snowflake effect
        { type: 'circle', left: 380, top: 150, radius: 180, fill: '#c41e3a', opacity: 0.15 },
        { type: 'circle', left: 1200, top: 600, radius: 200, fill: '#2d5f3f', opacity: 0.12 },
        // Holiday badge/starburst
        { type: 'circle', left: 1150, top: 180, radius: 85, fill: '#c41e3a' },
        { type: 'i-text', left: 1150, top: 165, text: 'HOLIDAY', fontSize: 16, fontWeight: 'bold', fill: '#ffffff', originX: 'center', originY: 'center', letterSpacing: 1, fontStyle: 'normal', underline: false },
        { type: 'i-text', left: 1150, top: 195, text: 'SALE', fontSize: 24, fontWeight: 'bold', fill: '#ffd700', originX: 'center', originY: 'center', fontStyle: 'normal', underline: false },
        // Main festive heading
        { type: 'i-text', left: 300, top: 200, text: 'SEASON', fontSize: 72, fontWeight: 'bold', fill: '#ffffff', fontFamily: 'Impact', letterSpacing: 6, fontStyle: 'normal', underline: false },
        { type: 'i-text', left: 300, top: 285, text: 'Specials', fontSize: 86, fontWeight: 'bold', fill: '#ffd700', fontFamily: 'Georgia', fontStyle: 'italic', underline: false },
        // Festive tagline
        { type: 'i-text', left: 300, top: 390, text: 'Limited Time Offers', fontSize: 28, fill: '#e0e0e0', fontFamily: 'Arial', fontStyle: 'normal', underline: false },
        // Discount highlight
        { type: 'rect', left: 300, top: 480, width: 380, height: 110, fill: '#c41e3a', rx: 12, ry: 12 },
        { type: 'i-text', left: 490, top: 510, text: 'UP TO', fontSize: 22, fill: '#ffffff', originX: 'center', originY: 'center', letterSpacing: 3, fontStyle: 'normal', underline: false },
        { type: 'i-text', left: 490, top: 555, text: '60% OFF', fontSize: 42, fontWeight: 'bold', fill: '#ffd700', originX: 'center', originY: 'center', fontStyle: 'normal', underline: false },
        // Product showcase area
        { type: 'circle', left: 900, top: 450, radius: 180, fill: '#ffffff', opacity: 0.08, originX: 'center', originY: 'center' },
        { type: 'circle', left: 900, top: 450, radius: 150, fill: 'transparent', stroke: '#ffd700', strokeWidth: 2, opacity: 0.4, originX: 'center', originY: 'center' },
        // Decorative snowflakes/stars
        { type: 'i-text', left: 680, top: 150, text: '❄', fontSize: 32, fill: '#ffffff', opacity: 0.3, fontStyle: 'normal', underline: false },
        { type: 'i-text', left: 970, top: 250, text: '★', fontSize: 28, fill: '#ffd700', opacity: 0.5, fontStyle: 'normal', underline: false },
        { type: 'i-text', left: 630, top: 600, text: '❄', fontSize: 24, fill: '#ffffff', opacity: 0.4, fontStyle: 'normal', underline: false },
        { type: 'i-text', left: 1120, top: 680, text: '★', fontSize: 20, fill: '#ffd700', opacity: 0.6, fontStyle: 'normal', underline: false },
        // CTA button
        { type: 'rect', left: 300, top: 660, width: 340, height: 80, fill: '#2d5f3f', rx: 40, ry: 40 },
        { type: 'i-text', left: 470, top: 700, text: 'SHOP NOW', fontSize: 28, fontWeight: 'bold', fill: '#ffffff', originX: 'center', originY: 'center', letterSpacing: 2, fontStyle: 'normal', underline: false },
      ]
    }
  }

  const handleCheckCompliance = async () => {
    if (!canvas) return

    setLoadingCompliance(true)
    try {
      const objects = canvas.getObjects()
      const rules: any[] = []

      // Check 1: Has at least one text element
      const hasText = objects.some(obj => obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox')
      rules.push({
        id: 1,
        message: hasText ? 'Design contains text content ✓' : 'No text found - add product name or CTA',
        passed: hasText,
        severity: hasText ? 'success' : 'warning'
      })

      // Check 2: Has visual content (image or shape)
      const hasVisuals = objects.some(obj => obj.type === 'image' || obj.type === 'rect' || obj.type === 'circle')
      rules.push({
        id: 2,
        message: hasVisuals ? 'Design contains visual elements ✓' : 'No images or shapes found',
        passed: hasVisuals,
        severity: hasVisuals ? 'success' : 'warning'
      })

      // Check 3: Text readability - check if text has sufficient size
      const textObjects = objects.filter(obj => obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox')
      const hasReadableText = textObjects.length === 0 || textObjects.some(obj => (obj.get('fontSize') as number) >= 20)
      rules.push({
        id: 3,
        message: hasReadableText ? 'Text size is readable ✓' : 'Some text may be too small (minimum 20px recommended)',
        passed: hasReadableText,
        severity: hasReadableText ? 'success' : 'warning'
      })

      // Check 4: Design is not empty
      const hasContent = objects.length > 0
      rules.push({
        id: 4,
        message: hasContent ? 'Canvas contains design elements ✓' : 'Canvas is empty - add content to your design',
        passed: hasContent,
        severity: hasContent ? 'success' : 'error'
      })

      // Check 5: Has product image (recommended for retail media)
      const hasImage = objects.some(obj => obj.type === 'image')
      rules.push({
        id: 5,
        message: hasImage ? 'Product image present ✓' : 'No product image - recommended for retail media',
        passed: hasImage,
        severity: hasImage ? 'success' : 'warning'
      })

      setCompliance(rules)

      const errors = rules.filter((r: any) => r.severity === 'error' && !r.passed)
      const warnings = rules.filter((r: any) => r.severity === 'warning' && !r.passed)

      if (errors.length === 0 && warnings.length === 0) {
        toast.success('All compliance checks passed!')
      } else if (errors.length > 0) {
        toast.error(`${errors.length} errors found`)
      } else {
        toast.info(`${warnings.length} recommendations`)
      }
    } catch (error) {
      toast.error('Failed to check compliance')
      console.error(error)
    } finally {
      setLoadingCompliance(false)
    }
  }

  return (
    <div className="p-4 space-y-4">
      {/* AI Actions */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold text-white">Quick Actions</h3>

        <Button
          variant="outline"
          className="w-full justify-start border-pink-500/40 bg-pink-500/15 hover:bg-pink-500/25 hover:border-pink-400/60 text-pink-300 hover:text-pink-200 transition-all text-xs h-8 backdrop-blur-xl"
          onClick={handleRemoveBackground}
          disabled={loadingRemoveBg}
        >
          {loadingRemoveBg ? (
            <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
          ) : (
            <Wand2 className="w-3.5 h-3.5 mr-1.5" />
          )}
          Remove Background
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start border-purple-500/40 bg-purple-500/15 hover:bg-purple-500/25 hover:border-purple-400/60 text-purple-300 hover:text-purple-200 transition-all text-xs h-8 backdrop-blur-xl"
          onClick={handleGenerateSuggestions}
          disabled={loadingLayouts}
        >
          {loadingLayouts ? (
            <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
          )}
          Generate Layout Ideas
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start border-green-500/40 bg-green-500/15 hover:bg-green-500/25 hover:border-green-400/60 text-green-300 hover:text-green-200 transition-all text-xs h-8 backdrop-blur-xl"
          onClick={handleCheckCompliance}
          disabled={loadingCompliance}
        >
          {loadingCompliance ? (
            <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
          ) : (
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
          )}
          Check Compliance
        </Button>
      </div>

      {/* Layout Templates */}
      {suggestions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              AI-Generated Templates
            </h3>
            <button
              onClick={clearTemplates}
              className="text-[10px] text-red-400 hover:text-red-300 bg-red-500/15 hover:bg-red-500/25 px-2 py-1 rounded-full transition-all"
            >
              Clear All
            </button>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {suggestions.map((suggestion: any) => (
              <div
                key={suggestion.id}
                className={`group relative backdrop-blur-xl border-2 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedTemplate?.id === suggestion.id
                    ? 'border-purple-500/80 shadow-lg shadow-purple-500/30'
                    : 'border-white/20 hover:border-purple-400/60 hover:shadow-lg'
                }`}
                onClick={() => applyTemplate(suggestion)}
              >
                {/* Thumbnail Preview */}
                <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 relative overflow-hidden">
                  {templatePreviews[suggestion.id] ? (
                    <img
                      src={templatePreviews[suggestion.id]}
                      alt={suggestion.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-1.5 right-1.5">
                    <span className="text-[8px] font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 px-2 py-0.5 rounded-full shadow-lg">
                      {suggestion.category}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5">
                    <Sparkles className="w-5 h-5 text-white animate-pulse" />
                    <span className="text-white text-[10px] font-bold">CLICK TO APPLY</span>
                  </div>

                  {/* Selected Indicator */}
                  {selectedTemplate?.id === suggestion.id && (
                    <div className="absolute top-1.5 left-1.5">
                      <div className="bg-purple-500 text-white rounded-full p-1">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-2 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                  <h4 className="text-[11px] font-bold text-white truncate">{suggestion.name}</h4>
                  <p className="text-[9px] text-gray-400 truncate mt-0.5">{suggestion.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Compliance Results */}
      {compliance.length > 0 && (
        <div className="space-y-2.5">
          <h3 className="text-xs font-semibold text-white">Compliance Check Results</h3>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {compliance.map((rule: any) => (
              <div
                key={rule.id}
                className={`p-2.5 rounded-lg text-xs flex items-start gap-1.5 transition-all backdrop-blur-xl ${
                  rule.passed
                    ? 'bg-green-500/25 text-green-200 border border-green-500/40'
                    : rule.severity === 'error'
                    ? 'bg-red-500/25 text-red-200 border border-red-500/40'
                    : 'bg-yellow-500/25 text-yellow-200 border border-yellow-500/40'
                }`}
              >
                {rule.passed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                )}
                <span className="font-medium">{rule.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
