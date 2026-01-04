import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Trash2, Image as ImageIcon } from 'lucide-react'
import { useEditorStore } from '@/store/editorStore'
import { Asset } from '@/types'
import Button from '@/components/UI/Button'
import { toast } from 'sonner'
import { fabric } from 'fabric'

export default function AssetPanel() {
  const { assets, addAsset, removeAsset, canvas } = useEditorStore()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image`)
        continue
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const asset: Asset = {
            id: Date.now().toString() + Math.random(),
            type: 'packshot',
            url: e.target?.result as string,
            name: file.name,
            width: img.width,
            height: img.height,
            size: file.size,
            createdAt: new Date().toISOString(),
          }
          addAsset(asset)
          toast.success(`${file.name} uploaded successfully`)
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }, [addAsset])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    multiple: true,
  })

  const addToCanvas = (asset: Asset) => {
    if (!canvas) {
      toast.error('Canvas not initialized')
      return
    }

    fabric.Image.fromURL(asset.url, (img) => {
      img.scaleToWidth(300)
      img.set({
        left: canvas.getWidth() / 2,
        top: canvas.getHeight() / 2,
        originX: 'center',
        originY: 'center',
      })
      canvas.add(img)
      canvas.setActiveObject(img)
      canvas.renderAll()
      toast.success('Added to canvas')
    })
  }

  return (
    <div className="p-4 space-y-4">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-blue-400/70 bg-gradient-to-br from-blue-500/25 to-purple-500/25 shadow-lg shadow-blue-500/30 scale-[1.02]'
            : 'border-white/30 hover:border-blue-400/60 hover:bg-white/10 backdrop-blur-xl'
        }`}
      >
        <input {...getInputProps()} />
        <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all ${
          isDragActive ? 'bg-blue-500 scale-110 shadow-lg shadow-blue-500/40' : 'bg-white/15'
        }`}>
          <Upload className={`w-6 h-6 transition-colors ${isDragActive ? 'text-white' : 'text-blue-400'}`} />
        </div>
        <p className="text-sm font-semibold text-white mb-1">
          {isDragActive ? 'Drop files here' : 'Upload Images'}
        </p>
        <p className="text-xs text-gray-400">Click or drag images to upload</p>
        <p className="text-[10px] text-gray-500 mt-1.5">PNG, JPG, WEBP up to 10MB</p>
      </div>

      {/* Asset Grid */}
      {assets.length > 0 && (
        <div className="space-y-2.5">
          <h3 className="text-xs font-semibold text-white">Your Assets ({assets.length})</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="relative group aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all duration-300 hover:shadow-lg hover:scale-105"
                onClick={() => addToCanvas(asset)}
              >
                <img
                  src={asset.url}
                  alt={asset.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-[10px] font-medium bg-blue-600 px-2.5 py-1 rounded-full">Click to add</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeAsset(asset.id)
                    toast.success('Asset removed')
                  }}
                  className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:scale-110 shadow-lg"
                >
                  <Trash2 className="w-2.5 h-2.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold text-white">Quick Add</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-blue-500/40 bg-blue-500/15 hover:bg-blue-500/25 hover:border-blue-400/60 text-blue-300 hover:text-blue-200 transition-all text-xs h-8 backdrop-blur-xl"
            onClick={() => {
              if (!canvas) return
              const rect = new fabric.Rect({
                width: 200,
                height: 200,
                fill: '#3b82f6',
                left: canvas.getWidth() / 2 - 100,
                top: canvas.getHeight() / 2 - 100,
              })
              canvas.add(rect)
              canvas.setActiveObject(rect)
              canvas.renderAll()
            }}
          >
            Add Shape
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-purple-500/40 bg-purple-500/15 hover:bg-purple-500/25 hover:border-purple-400/60 text-purple-300 hover:text-purple-200 transition-all text-xs h-8 backdrop-blur-xl"
            onClick={() => {
              if (!canvas) return
              const text = new fabric.IText('Double click to edit', {
                left: canvas.getWidth() / 2,
                top: canvas.getHeight() / 2,
                fontSize: 32,
                fill: '#ffffff',
                originX: 'center',
                originY: 'center',
                editable: true,
                fontWeight: 'normal',
                fontStyle: 'normal',
                underline: false,
              })
              canvas.add(text)
              canvas.setActiveObject(text)
              canvas.renderAll()
            }}
          >
            Add Text
          </Button>
        </div>
      </div>
    </div>
  )
}
