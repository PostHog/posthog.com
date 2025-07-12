import React, { useState, useRef, useEffect, useCallback } from 'react'
import MenuBar from '../RadixUI/MenuBar'
import { toJpeg, toPng } from 'html-to-image'
import {
  Pencil,
  Brush,
  Eraser,
  Type,
  Pipette,
  PaintBucket,
  ZoomIn,
  Square,
  Circle,
  Minus,
  Move,
  Pentagon,
  SprayCan,
  Spline,
  RectangleHorizontal
} from 'lucide-react'

// Tool types
type Tool = 'pencil' | 'brush' | 'eraser' | 'line' | 'rectangle' | 'circle' | 'fill' | 'text' | 'picker' | 'select' | 'polygon' | 'airbrush' | 'zoom' | 'curve' | 'roundedRect'

// Brush sizes
const brushSizes = [1, 2, 3, 4]

// Windows 95 color palette
const colorPalette = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
  '#808040', '#004040', '#0080FF', '#004080', '#8000FF', '#804000', '#FFFFFF', '#C0C0C0',
  '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#FFFF80', '#00FF80',
  '#80FFFF', '#8080FF', '#FF0080', '#FF8040'
]

export default function MSPaint() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [tool, setTool] = useState<Tool>('pencil')
  const [primaryColor, setPrimaryColor] = useState('#000000')
  const [secondaryColor, setSecondaryColor] = useState('#FFFFFF')
  const [brushSize, setBrushSize] = useState(1)
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [canvasSize, setCanvasSize] = useState({ width: 640, height: 480 })
  const [zoomLevel, setZoomLevel] = useState(1)
  const [canvasHistory, setCanvasHistory] = useState<ImageData[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isModified, setIsModified] = useState(false)
  const [polygonPoints, setPolygonPoints] = useState<{ x: number, y: number }[]>([])
  const [curvePoints, setCurvePoints] = useState<{ x: number, y: number }[]>([])
  const [selection, setSelection] = useState<{ x: number, y: number, width: number, height: number } | null>(null)

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Only initialize if canvas is truly empty (not resizing)
    if (canvasHistory.length === 0) {
      // Set white background
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Save initial state
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      setCanvasHistory([imageData])
      setHistoryIndex(0)
      setIsModified(false)
    }
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Use Shift+Z for undo, Shift+Y for redo to avoid browser conflicts
      if (e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault()
        undo()
      } else if (e.shiftKey && e.key.toLowerCase() === 'y') {
        e.preventDefault()
        redo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [historyIndex, canvasHistory])

  // Save to history
  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const newHistory = canvasHistory.slice(0, historyIndex + 1)
    newHistory.push(imageData)

    // Limit history to 50 items
    if (newHistory.length > 50) {
      newHistory.shift()
    }

    setCanvasHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
    setIsModified(true)
  }, [canvasHistory, historyIndex])

  // Undo/Redo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const newIndex = historyIndex - 1
      ctx.putImageData(canvasHistory[newIndex], 0, 0)
      setHistoryIndex(newIndex)
    }
  }, [historyIndex, canvasHistory])

  const redo = useCallback(() => {
    if (historyIndex < canvasHistory.length - 1) {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const newIndex = historyIndex + 1
      ctx.putImageData(canvasHistory[newIndex], 0, 0)
      setHistoryIndex(newIndex)
    }
  }, [historyIndex, canvasHistory])

  // Get mouse position relative to canvas
  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left) / zoomLevel,
      y: (e.clientY - rect.top) / zoomLevel
    }
  }

  // Handle mouse down
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e)
    setIsDrawing(true)
    setStartPos(pos)

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return

    const isRightClick = e.button === 2
    const color = isRightClick ? secondaryColor : primaryColor

    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    switch (tool) {
      case 'select':
        setSelection({ x: pos.x, y: pos.y, width: 0, height: 0 })
        break
      case 'pencil':
      case 'brush':
        ctx.beginPath()
        ctx.moveTo(pos.x, pos.y)
        if (tool === 'brush') ctx.lineWidth = brushSize * 2
        break
      case 'airbrush':
        ctx.globalAlpha = 0.3
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, brushSize * 3, 0, 2 * Math.PI)
        ctx.fill()
        break
      case 'eraser':
        ctx.globalCompositeOperation = 'destination-out'
        ctx.lineWidth = brushSize * 3
        ctx.beginPath()
        ctx.moveTo(pos.x, pos.y)
        break
      case 'fill':
        floodFill(pos.x, pos.y, color)
        setIsDrawing(false)
        saveToHistory()
        break
      case 'text':
        const text = prompt('Enter text:')
        if (text) {
          ctx.font = `${16 * brushSize}px Arial`
          ctx.fillStyle = color
          ctx.fillText(text, pos.x, pos.y)
          saveToHistory()
        }
        setIsDrawing(false)
        break
      case 'picker':
        const imageData = ctx.getImageData(pos.x, pos.y, 1, 1)
        const data = imageData.data
        const pickedColor = `#${((1 << 24) + (data[0] << 16) + (data[1] << 8) + data[2]).toString(16).slice(1)}`
        if (isRightClick) {
          setSecondaryColor(pickedColor)
        } else {
          setPrimaryColor(pickedColor)
        }
        setIsDrawing(false)
        break
      case 'polygon':
        if (polygonPoints.length === 0) {
          setPolygonPoints([pos])
        } else {
          const first = polygonPoints[0]
          const distance = Math.sqrt(Math.pow(pos.x - first.x, 2) + Math.pow(pos.y - first.y, 2))
          if (distance < 10) {
            // Close polygon
            ctx.beginPath()
            ctx.moveTo(first.x, first.y)
            polygonPoints.forEach(p => ctx.lineTo(p.x, p.y))
            ctx.closePath()
            ctx.stroke()
            setPolygonPoints([])
            saveToHistory()
            setIsDrawing(false)
          } else {
            setPolygonPoints([...polygonPoints, pos])
          }
        }
        break
      case 'curve':
        if (curvePoints.length < 2) {
          setCurvePoints([...curvePoints, pos])
        } else {
          setIsDrawing(false)
        }
        break
      case 'zoom':
        const newZoom = (isRightClick || e.shiftKey) ? Math.max(zoomLevel / 2, 0.25) : Math.min(zoomLevel * 2, 8)
        setZoomLevel(newZoom)
        setIsDrawing(false)
        break
    }
  }

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e)

    if (!isDrawing) return

    const canvas = canvasRef.current
    const overlayCanvas = overlayCanvasRef.current
    const ctx = canvas?.getContext('2d')
    const overlayCtx = overlayCanvas?.getContext('2d')

    if (!ctx || !canvas || !overlayCtx || !overlayCanvas) return

    switch (tool) {
      case 'select':
        if (selection) {
          overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
          overlayCtx.strokeStyle = '#000000'
          overlayCtx.setLineDash([5, 5])
          const width = pos.x - selection.x
          const height = pos.y - selection.y
          overlayCtx.strokeRect(selection.x, selection.y, width, height)
          setSelection({ ...selection, width, height })
        }
        break
      case 'pencil':
      case 'brush':
      case 'eraser':
        ctx.lineTo(pos.x, pos.y)
        ctx.stroke()
        break
      case 'airbrush':
        ctx.globalAlpha = 0.1
        for (let i = 0; i < 5; i++) {
          const offsetX = (Math.random() - 0.5) * brushSize * 4
          const offsetY = (Math.random() - 0.5) * brushSize * 4
          ctx.beginPath()
          ctx.arc(pos.x + offsetX, pos.y + offsetY, 1, 0, 2 * Math.PI)
          ctx.fill()
        }
        break
      case 'line':
        overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
        overlayCtx.strokeStyle = primaryColor
        overlayCtx.lineWidth = brushSize
        overlayCtx.beginPath()
        overlayCtx.moveTo(startPos.x, startPos.y)
        overlayCtx.lineTo(pos.x, pos.y)
        overlayCtx.stroke()
        break
      case 'rectangle':
        overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
        overlayCtx.strokeStyle = primaryColor
        overlayCtx.lineWidth = brushSize
        const width = pos.x - startPos.x
        const height = pos.y - startPos.y
        overlayCtx.strokeRect(startPos.x, startPos.y, width, height)
        break
      case 'roundedRect':
        overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
        overlayCtx.strokeStyle = primaryColor
        overlayCtx.lineWidth = brushSize
        const rrWidth = pos.x - startPos.x
        const rrHeight = pos.y - startPos.y
        const radius = Math.min(Math.abs(rrWidth), Math.abs(rrHeight)) * 0.2
        overlayCtx.beginPath()
        overlayCtx.roundRect(startPos.x, startPos.y, rrWidth, rrHeight, radius)
        overlayCtx.stroke()
        break
      case 'circle':
        overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
        overlayCtx.strokeStyle = primaryColor
        overlayCtx.lineWidth = brushSize
        overlayCtx.beginPath()
        const radiusX = Math.abs(pos.x - startPos.x) / 2
        const radiusY = Math.abs(pos.y - startPos.y) / 2
        const centerX = (pos.x + startPos.x) / 2
        const centerY = (pos.y + startPos.y) / 2
        overlayCtx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI)
        overlayCtx.stroke()
        break
      case 'polygon':
        if (polygonPoints.length > 0) {
          overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
          overlayCtx.strokeStyle = primaryColor
          overlayCtx.lineWidth = brushSize
          overlayCtx.beginPath()
          overlayCtx.moveTo(polygonPoints[0].x, polygonPoints[0].y)
          polygonPoints.slice(1).forEach(p => overlayCtx.lineTo(p.x, p.y))
          overlayCtx.lineTo(pos.x, pos.y)
          overlayCtx.stroke()
        }
        break
      case 'curve':
        if (curvePoints.length === 2) {
          overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
          overlayCtx.strokeStyle = primaryColor
          overlayCtx.lineWidth = brushSize
          overlayCtx.beginPath()
          overlayCtx.moveTo(curvePoints[0].x, curvePoints[0].y)
          overlayCtx.quadraticCurveTo(pos.x, pos.y, curvePoints[1].x, curvePoints[1].y)
          overlayCtx.stroke()
        }
        break
    }
  }

  // Handle mouse up
  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e)

    const canvas = canvasRef.current
    const overlayCanvas = overlayCanvasRef.current
    const ctx = canvas?.getContext('2d')
    const overlayCtx = overlayCanvas?.getContext('2d')

    if (!ctx || !canvas || !overlayCtx || !overlayCanvas) return

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'source-over'
    }

    if (tool === 'airbrush') {
      ctx.globalAlpha = 1
    }

    switch (tool) {
      case 'select':
        overlayCtx.setLineDash([])
        break
      case 'line':
        ctx.strokeStyle = primaryColor
        ctx.lineWidth = brushSize
        ctx.beginPath()
        ctx.moveTo(startPos.x, startPos.y)
        ctx.lineTo(pos.x, pos.y)
        ctx.stroke()
        overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
        break
      case 'rectangle':
        ctx.strokeStyle = primaryColor
        ctx.lineWidth = brushSize
        const width = pos.x - startPos.x
        const height = pos.y - startPos.y
        ctx.strokeRect(startPos.x, startPos.y, width, height)
        overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
        break
      case 'roundedRect':
        ctx.strokeStyle = primaryColor
        ctx.lineWidth = brushSize
        const rrWidth = pos.x - startPos.x
        const rrHeight = pos.y - startPos.y
        const radius = Math.min(Math.abs(rrWidth), Math.abs(rrHeight)) * 0.2
        ctx.beginPath()
        ctx.roundRect(startPos.x, startPos.y, rrWidth, rrHeight, radius)
        ctx.stroke()
        overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
        break
      case 'circle':
        ctx.strokeStyle = primaryColor
        ctx.lineWidth = brushSize
        ctx.beginPath()
        const radiusX = Math.abs(pos.x - startPos.x) / 2
        const radiusY = Math.abs(pos.y - startPos.y) / 2
        const centerX = (pos.x + startPos.x) / 2
        const centerY = (pos.y + startPos.y) / 2
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI)
        ctx.stroke()
        overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
        break
      case 'curve':
        if (curvePoints.length === 2) {
          ctx.strokeStyle = primaryColor
          ctx.lineWidth = brushSize
          ctx.beginPath()
          ctx.moveTo(curvePoints[0].x, curvePoints[0].y)
          ctx.quadraticCurveTo(pos.x, pos.y, curvePoints[1].x, curvePoints[1].y)
          ctx.stroke()
          overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
          setCurvePoints([])
        }
        break
    }

    setIsDrawing(false)

    if (tool !== 'picker' && tool !== 'zoom' && tool !== 'polygon' && tool !== 'curve' && tool !== 'select') {
      saveToHistory()
    }
  }

  // Flood fill algorithm
  const floodFill = (startX: number, startY: number, fillColor: string) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    const targetColor = getPixelColor(Math.floor(startX), Math.floor(startY), imageData)
    const fillColorRgb = hexToRgb(fillColor)

    if (!fillColorRgb || colorsMatch(targetColor, fillColorRgb)) return

    const pixelsToCheck = [[Math.floor(startX), Math.floor(startY)]]
    const width = canvas.width
    const height = canvas.height

    while (pixelsToCheck.length > 0) {
      const [x, y] = pixelsToCheck.pop()!
      const index = (y * width + x) * 4

      if (x < 0 || x >= width || y < 0 || y >= height) continue
      if (!colorsMatch(getPixelColor(x, y, imageData), targetColor)) continue

      data[index] = fillColorRgb.r
      data[index + 1] = fillColorRgb.g
      data[index + 2] = fillColorRgb.b
      data[index + 3] = 255

      pixelsToCheck.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
    }

    ctx.putImageData(imageData, 0, 0)
  }

  // Helper functions
  const getPixelColor = (x: number, y: number, imageData: ImageData) => {
    const index = (y * imageData.width + x) * 4
    return {
      r: imageData.data[index],
      g: imageData.data[index + 1],
      b: imageData.data[index + 2],
      a: imageData.data[index + 3]
    }
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const colorsMatch = (c1: any, c2: any) => {
    return c1.r === c2.r && c1.g === c2.g && c1.b === c2.b
  }

  // Export functions
  const exportImage = async (format: 'png' | 'jpeg') => {
    const canvas = canvasRef.current
    if (!canvas) return

    try {
      const dataUrl = await (format === 'png' ? toPng : toJpeg)(canvas)
      const link = document.createElement('a')
      link.download = `mspaint-${Date.now()}.${format}`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Failed to export image:', err)
    }
  }

  // Load image
  const loadImage = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Clear canvas
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw image
        ctx.drawImage(img, 0, 0)
        saveToHistory()
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  // Clear canvas
  const clearCanvas = () => {
    if (isModified && !confirm('Do you want to clear the canvas? Any unsaved changes will be lost.')) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    setIsModified(false)
    saveToHistory()
  }

  // Resize canvas
  const resizeCanvas = () => {
    const newWidth = prompt('Enter new width:', canvasSize.width.toString())
    const newHeight = prompt('Enter new height:', canvasSize.height.toString())

    if (newWidth && newHeight) {
      const width = parseInt(newWidth)
      const height = parseInt(newHeight)

      if (!isNaN(width) && !isNaN(height) && width > 0 && height > 0) {
        // Save current canvas content
        const canvas = canvasRef.current
        if (canvas) {
          const ctx = canvas.getContext('2d')
          if (ctx) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

            // Resize
            setCanvasSize({ width, height })

            // Restore content after resize
            setTimeout(() => {
              const newCanvas = canvasRef.current
              if (newCanvas) {
                const newCtx = newCanvas.getContext('2d')
                if (newCtx) {
                  // Create temporary canvas
                  const tempCanvas = document.createElement('canvas')
                  tempCanvas.width = imageData.width
                  tempCanvas.height = imageData.height
                  const tempCtx = tempCanvas.getContext('2d')
                  if (tempCtx) {
                    tempCtx.putImageData(imageData, 0, 0)

                    // Clear and draw white background
                    newCtx.fillStyle = '#FFFFFF'
                    newCtx.fillRect(0, 0, width, height)

                    // Draw old content
                    newCtx.drawImage(tempCanvas, 0, 0)
                    saveToHistory()
                  }
                }
              }
            }, 0)
          }
        }
      }
    }
  }

  // Flip horizontal
  const flipHorizontal = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Create temp canvas to avoid self-reference issues
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = canvas.width
    tempCanvas.height = canvas.height
    const tempCtx = tempCanvas.getContext('2d')
    if (!tempCtx) return

    tempCtx.drawImage(canvas, 0, 0)
    ctx.save()
    ctx.scale(-1, 1)
    ctx.drawImage(tempCanvas, -canvas.width, 0)
    ctx.restore()
    saveToHistory()
  }

  // Flip vertical
  const flipVertical = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Create temp canvas to avoid self-reference issues
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = canvas.width
    tempCanvas.height = canvas.height
    const tempCtx = tempCanvas.getContext('2d')
    if (!tempCtx) return

    tempCtx.drawImage(canvas, 0, 0)
    ctx.save()
    ctx.scale(1, -1)
    ctx.drawImage(tempCanvas, 0, -canvas.height)
    ctx.restore()
    saveToHistory()
  }

  // Rotate 90 degrees
  const rotate90 = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Save current content
    const currentImage = ctx.getImageData(0, 0, canvas.width, canvas.height)

    // Create temporary canvas with current dimensions
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = canvas.width
    tempCanvas.height = canvas.height
    const tempCtx = tempCanvas.getContext('2d')
    if (!tempCtx) return

    // Put current image data on temp canvas
    tempCtx.putImageData(currentImage, 0, 0)

    // Create rotated canvas
    const rotatedCanvas = document.createElement('canvas')
    rotatedCanvas.width = canvas.height
    rotatedCanvas.height = canvas.width
    const rotatedCtx = rotatedCanvas.getContext('2d')
    if (!rotatedCtx) return

    // Rotate
    rotatedCtx.translate(rotatedCanvas.width / 2, rotatedCanvas.height / 2)
    rotatedCtx.rotate(Math.PI / 2)
    rotatedCtx.drawImage(tempCanvas, -tempCanvas.width / 2, -tempCanvas.height / 2)

    // Update canvas size and restore rotated content
    const newWidth = canvas.height
    const newHeight = canvas.width
    setCanvasSize({ width: newWidth, height: newHeight })

    // Use setTimeout to ensure canvas has resized
    setTimeout(() => {
      const newCanvas = canvasRef.current
      if (newCanvas) {
        const newCtx = newCanvas.getContext('2d')
        if (newCtx) {
          newCtx.drawImage(rotatedCanvas, 0, 0)
          saveToHistory()
        }
      }
    }, 0)
  }

  // Menu items
  const menus = [
    {
      trigger: 'File',
      items: [
        { type: 'item' as const, label: 'New', shortcut: 'Shift+N', onClick: clearCanvas },
        { type: 'item' as const, label: 'Open...', shortcut: 'Shift+O', onClick: () => fileInputRef.current?.click() },
        { type: 'separator' as const },
        { type: 'item' as const, label: 'Save as PNG', shortcut: 'Shift+S', onClick: () => exportImage('png') },
        { type: 'item' as const, label: 'Save as JPEG', onClick: () => exportImage('jpeg') },
      ]
    },
    {
      trigger: 'Edit',
      items: [
        { type: 'item' as const, label: 'Undo', shortcut: 'Shift+Z', onClick: undo, disabled: historyIndex <= 0 },
        { type: 'item' as const, label: 'Redo', shortcut: 'Shift+Y', onClick: redo, disabled: historyIndex >= canvasHistory.length - 1 },
        { type: 'separator' as const },
        { type: 'item' as const, label: 'Clear image', onClick: clearCanvas },
      ]
    },
    {
      trigger: 'View',
      items: [
        { type: 'item' as const, label: 'Zoom in', onClick: () => setZoomLevel(Math.min(zoomLevel * 2, 8)) },
        { type: 'item' as const, label: 'Zoom out', onClick: () => setZoomLevel(Math.max(zoomLevel / 2, 0.25)) },
        { type: 'item' as const, label: 'Actual size', onClick: () => setZoomLevel(1) },
      ]
    },
    {
      trigger: 'Image',
      items: [
        { type: 'item' as const, label: 'Resize canvas...', onClick: resizeCanvas },
        { type: 'separator' as const },
        { type: 'item' as const, label: 'Flip horizontal', onClick: flipHorizontal },
        { type: 'item' as const, label: 'Flip vertical', onClick: flipVertical },
        { type: 'item' as const, label: 'Rotate 90°', onClick: rotate90 },
      ]
    }
  ]

  // Tool buttons
  const toolButtons = [
    { tool: 'select' as Tool, icon: Move, tooltip: 'Select' },
    { tool: 'pencil' as Tool, icon: Pencil, tooltip: 'Pencil' },
    { tool: 'brush' as Tool, icon: Brush, tooltip: 'Brush' },
    { tool: 'airbrush' as Tool, icon: SprayCan, tooltip: 'Airbrush' },
    { tool: 'fill' as Tool, icon: PaintBucket, tooltip: 'Fill' },
    { tool: 'text' as Tool, icon: Type, tooltip: 'Text' },
    { tool: 'line' as Tool, icon: Minus, tooltip: 'Line' },
    { tool: 'curve' as Tool, icon: Spline, tooltip: 'Curve' },
    { tool: 'rectangle' as Tool, icon: Square, tooltip: 'Rectangle' },
    { tool: 'polygon' as Tool, icon: Pentagon, tooltip: 'Polygon' },
    { tool: 'circle' as Tool, icon: Circle, tooltip: 'Ellipse' },
    { tool: 'roundedRect' as Tool, icon: RectangleHorizontal, tooltip: 'Rounded Rectangle' },
    { tool: 'zoom' as Tool, icon: ZoomIn, tooltip: 'Magnifier' },
    { tool: 'picker' as Tool, icon: Pipette, tooltip: 'Pick Color' },
    { tool: 'eraser' as Tool, icon: Eraser, tooltip: 'Eraser' },
  ]

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0]" style={{ fontFamily: 'Tahoma, sans-serif' }}>
      {/* Menu Bar */}
      <div className="bg-white border-b-2 border-[#dfdfdf] border-t-2 border-[#ffffff]">
        <MenuBar menus={menus} className="h-6" />
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) loadImage(file)
        }}
      />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Toolbox */}
        <div className="w-14 bg-[#c0c0c0] border-r-2 border-[#808080] p-1">
          <div className="grid grid-cols-2 gap-0.5">
            {toolButtons.map(({ tool: t, icon: Icon, tooltip }) => (
              <button
                key={t}
                onClick={() => setTool(t)}
                className={`w-6 h-6 border flex items-center justify-center ${tool === t
                  ? 'border-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-[#ffffff]'
                  : 'border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] bg-[#c0c0c0] hover:bg-[#dfdfdf]'
                  }`}
                title={tooltip}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          {/* Brush sizes */}
          <div className="mt-4 p-1 border-2 border-t-[#808080] border-l-[#808080] border-b-[#ffffff] border-r-[#ffffff]">
            <div className="grid grid-cols-2 gap-1">
              {brushSizes.map(size => (
                <button
                  key={size}
                  onClick={() => setBrushSize(size)}
                  className={`w-5 h-5 border flex items-center justify-center ${brushSize === size
                    ? 'border-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-[#ffffff]'
                    : 'border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] bg-[#c0c0c0]'
                    }`}
                >
                  <div
                    className="bg-black rounded-full"
                    style={{ width: size * 2, height: size * 2 }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas area */}
        <div className="flex-1 bg-[#808080] p-2 overflow-auto">
          <div
            ref={containerRef}
            className="inline-block bg-white shadow-[inset_-1px_-1px_#ffffff,inset_1px_1px_#808080,inset_-2px_-2px_#c0c0c0,inset_2px_2px_#000000]"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
          >
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
                className=""
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => setIsDrawing(false)}
                onContextMenu={(e) => e.preventDefault()}
                style={{ cursor: tool === 'picker' ? 'crosshair' : tool === 'zoom' ? 'zoom-in' : 'default' }}
              />
              <canvas
                ref={overlayCanvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
                className="absolute top-0 left-0 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Color palette */}
        <div className="w-36 bg-[#c0c0c0] border-l-2 border-[#ffffff] p-2">
          <div className="mb-2">
            <div className="text-xs mb-1">Colors</div>
            <div className="flex items-center gap-2 mb-2">
              <div className="relative">
                <div
                  className="w-8 h-8 border-2 border-[#808080] absolute top-1 left-1"
                  style={{ backgroundColor: secondaryColor }}
                />
                <div
                  className="w-8 h-8 border-2 border-[#000000] relative"
                  style={{ backgroundColor: primaryColor }}
                />
              </div>
              <div className="text-xs">
                <div>Foreground</div>
                <div>Background</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-px p-2 border-2 border-t-[#808080] border-l-[#808080] border-b-[#ffffff] border-r-[#ffffff]">
            {colorPalette.map(color => (
              <button
                key={color}
                className="size-6 border border-[#000000]"
                style={{ backgroundColor: color }}
                onClick={() => setPrimaryColor(color)}
                onContextMenu={(e) => {
                  e.preventDefault()
                  setSecondaryColor(color)
                }}
              />
            ))}
          </div>

          <div className="mt-4 text-xs">
            <div className="mb-1">Canvas: {canvasSize.width} × {canvasSize.height}</div>
            <div className="mb-1">Zoom: {Math.round(zoomLevel * 100)}%</div>
            <div className="mb-1">Tool: {tool}</div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="h-6 bg-[#c0c0c0] border-t-2 border-[#ffffff] px-2 flex items-center text-xs">
        <span>Help? Where we're going, we don't need help! 🎨</span>
      </div>

    </div>
  )
}