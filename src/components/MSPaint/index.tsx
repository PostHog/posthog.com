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
    RectangleHorizontal,
} from 'lucide-react'
import { useWindow } from '../../context/Window'
import { useApp } from '../../context/App'

// Tool types
type Tool =
    | 'pencil'
    | 'brush'
    | 'eraser'
    | 'line'
    | 'rectangle'
    | 'circle'
    | 'fill'
    | 'text'
    | 'picker'
    | 'select'
    | 'polygon'
    | 'airbrush'
    | 'zoom'
    | 'curve'
    | 'roundedRect'

// Brush sizes
const brushSizes = [1, 2, 3, 4]

// Windows 95 color palette
const colorPalette = [
    '#000000',
    '#808080',
    '#800000',
    '#808000',
    '#008000',
    '#008080',
    '#000080',
    '#800080',
    '#808040',
    '#004040',
    '#0080FF',
    '#004080',
    '#8000FF',
    '#804000',
    '#FFFFFF',
    '#C0C0C0',
    '#FF0000',
    '#FFFF00',
    '#00FF00',
    '#00FFFF',
    '#0000FF',
    '#FF00FF',
    '#FFFF80',
    '#00FF80',
    '#80FFFF',
    '#8080FF',
    '#FF0080',
    '#FF8040',
]

interface MSPaintProps {
    initialImage?: string // URL or base64 image data
    imageType?: 'raster' | 'svg' // Type of image
    threshold?: number // Threshold for black/white conversion (0-255, undefined = full color)
    canvasSize?: { width: number; height: number }
    initialState?: MSPaintState
    children?: React.ReactNode
}

interface MSPaintState {
    tool: Tool
    primaryColor: string
    secondaryColor: string
    brushSize: number
    isDrawing: boolean
    startPos: { x: number; y: number }
    canvasSize: { width: number; height: number }
    zoomLevel: number
    canvasHistory: ImageData[]
    historyIndex: number
    isModified: boolean
    polygonPoints: { x: number; y: number }[]
    curvePoints: { x: number; y: number }[]
    selection: { x: number; y: number; width: number; height: number } | null
    originalImageData: ImageData | null
    initialImageLoaded?: boolean
}

export default function MSPaint({
    initialImage,
    imageType = 'raster',
    threshold,
    canvasSize: initialCanvasSize,
    initialState,
    children,
}: MSPaintProps = {}) {
    const { updateWindow } = useApp()
    const { appWindow } = useWindow()

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const overlayCanvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Calculate initial canvas size based on whether it should be responsive
    const getInitialCanvasSize = () => {
        if (!initialCanvasSize) return { width: 640, height: 480 }

        // Check if we should use responsive sizing
        if (initialCanvasSize.width >= 1000 && initialCanvasSize.height >= 500 && typeof window !== 'undefined') {
            // Try to get container dimensions if available
            const container = document.querySelector('.flex-1.bg-\\[\\#808080\\]')
            if (container) {
                const rect = container.getBoundingClientRect()
                if (rect.width > 0 && rect.height > 0) {
                    return {
                        width: Math.floor(rect.width - 8), // Account for padding and borders
                        height: Math.floor(rect.height - 8)
                    }
                }
            }
        }

        return initialCanvasSize
    }

    const [state, setState] = useState<MSPaintState>(
        initialState || {
            tool: 'pencil',
            primaryColor: '#000000',
            secondaryColor: '#FFFFFF',
            brushSize: 1,
            isDrawing: false,
            startPos: { x: 0, y: 0 },
            canvasSize: getInitialCanvasSize(),
            zoomLevel: 1,
            canvasHistory: [],
            historyIndex: -1,
            isModified: false,
            polygonPoints: [],
            curvePoints: [],
            selection: null,
            originalImageData: null,
            initialImageLoaded: false,
        }
    )

    // Handle responsive canvas sizing
    useEffect(() => {
        if (!initialCanvasSize || !(initialCanvasSize.width >= 1000 && initialCanvasSize.height >= 500)) {
            return
        }

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect
                if (width > 0 && height > 0) {
                    const newWidth = Math.floor(width - 4) // Account for borders
                    const newHeight = Math.floor(height - 4)

                    if (newWidth !== state.canvasSize?.width || newHeight !== state.canvasSize?.height) {
                        setState(prev => ({ ...prev, canvasSize: { width: newWidth, height: newHeight } }))
                    }
                }
            }
        })

        // Observe the parent container
        if (containerRef.current?.parentElement) {
            resizeObserver.observe(containerRef.current.parentElement)
        }

        return () => {
            resizeObserver.disconnect()
        }
    }, [initialCanvasSize])

    // Initialize canvas and load image
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Check if we need to load the initial image
        if (initialImage && !state.initialImageLoaded) {
            // For responsive canvases, wait a bit for resize to complete
            const isResponsive = initialCanvasSize && initialCanvasSize.width >= 1000 && initialCanvasSize.height >= 500
            const loadDelay = isResponsive ? 100 : 0

            const loadTimeout = setTimeout(() => {
                // Set white background first
                ctx.fillStyle = '#FFFFFF'
                ctx.fillRect(0, 0, canvas.width, canvas.height)

                const img = new Image()
                img.onload = () => {
                    // Get the current canvas (might have been resized)
                    const currentCanvas = canvasRef.current
                    if (!currentCanvas) return
                    const currentCtx = currentCanvas.getContext('2d')
                    if (!currentCtx) return

                    // Clear and set white background
                    currentCtx.fillStyle = '#FFFFFF'
                    currentCtx.fillRect(0, 0, currentCanvas.width, currentCanvas.height)

                    // Draw the image scaled to canvas size
                    currentCtx.drawImage(img, 0, 0, currentCanvas.width, currentCanvas.height)

                    // Only convert to black and white if threshold is provided
                    if (threshold !== undefined) {
                        const imageData = currentCtx.getImageData(0, 0, currentCanvas.width, currentCanvas.height)
                        const data = imageData.data

                        // Convert to black lines on white background
                        for (let i = 0; i < data.length; i += 4) {
                            // Get grayscale value
                            const gray = (data[i] + data[i + 1] + data[i + 2]) / 3

                            // Threshold to pure black or white
                            if (gray < threshold) {
                                // Make it black
                                data[i] = 0 // R
                                data[i + 1] = 0 // G
                                data[i + 2] = 0 // B
                            } else {
                                // Make it white
                                data[i] = 255 // R
                                data[i + 1] = 255 // G
                                data[i + 2] = 255 // B
                            }
                            data[i + 3] = 255 // Alpha
                        }

                        currentCtx.putImageData(imageData, 0, 0)
                    }

                    // Save initial state with image
                    const finalImageData = currentCtx.getImageData(0, 0, currentCanvas.width, currentCanvas.height)
                    setState((prev) => ({
                        ...prev,
                        canvasHistory: [finalImageData],
                        historyIndex: 0,
                        isModified: false,
                        originalImageData: finalImageData,
                        initialImageLoaded: true,
                    }))
                }
                img.src = initialImage
            }, loadDelay)

            return () => clearTimeout(loadTimeout)
        } else if (!initialImage && (!state.canvasHistory || state.canvasHistory.length === 0)) {
            // No image provided, just set white background
            ctx.fillStyle = '#FFFFFF'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Save initial blank state
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            setState((prev) => ({
                ...prev,
                canvasHistory: [imageData],
                historyIndex: 0,
                isModified: false,
            }))
        }
    }, [initialImage, state.initialImageLoaded, threshold, state.canvasSize?.width, state.canvasSize?.height, initialCanvasSize])

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
    }, [state.historyIndex, state.canvasHistory])

    useEffect(() => {
        if (appWindow && appWindow.element && typeof appWindow.element === 'object' && 'props' in appWindow.element) {
            updateWindow(appWindow, {
                element: { ...appWindow.element, props: { ...appWindow.element.props, initialState: state } },
            })
        }
    }, [state])

    useEffect(() => {
        const { canvasHistory, historyIndex } = initialState || {}
        if (canvasHistory && canvasHistory.length > 0 && historyIndex) {
            const canvas = canvasRef.current
            const ctx = canvas?.getContext('2d')
            if (ctx && canvas) {
                ctx.putImageData(canvasHistory[historyIndex], 0, 0)
            }
        }
    }, [])

    // Save to history
    const saveToHistory = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const newHistory = (state.canvasHistory || []).slice(0, (state.historyIndex || 0) + 1)
        newHistory.push(imageData)

        // Limit history to 50 items
        if (newHistory.length > 50) {
            newHistory.shift()
        }

        setState((prev) => ({
            ...prev,
            canvasHistory: newHistory,
            historyIndex: newHistory.length - 1,
            isModified: true,
        }))
    }, [state.canvasHistory, state.historyIndex])

    // Undo/Redo
    const undo = useCallback(() => {
        if (state.historyIndex && state.historyIndex > 0) {
            const canvas = canvasRef.current
            if (!canvas) return

            const ctx = canvas.getContext('2d')
            if (!ctx) return

            const newIndex = state.historyIndex - 1
            ctx.putImageData(state.canvasHistory[newIndex], 0, 0)
            setState((prev) => ({ ...prev, historyIndex: newIndex }))
        }
    }, [state.historyIndex, state.canvasHistory])

    const redo = useCallback(() => {
        if (
            state.canvasHistory &&
            state.historyIndex !== undefined &&
            state.historyIndex < state.canvasHistory.length - 1
        ) {
            const canvas = canvasRef.current
            if (!canvas) return

            const ctx = canvas.getContext('2d')
            if (!ctx) return

            const newIndex = state.historyIndex + 1
            ctx.putImageData(state.canvasHistory[newIndex], 0, 0)
            setState((prev) => ({ ...prev, historyIndex: newIndex }))
        }
    }, [state.historyIndex, state.canvasHistory])

    // Get mouse position relative to canvas
    const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current
        if (!canvas) return { x: 0, y: 0 }

        // Get the bounding rect of the canvas
        const rect = canvas.getBoundingClientRect()

        // Calculate the scale factors from the actual rendered size vs natural size
        const scaleX = canvas.width / rect.width
        const scaleY = canvas.height / rect.height

        // Get coordinates relative to the canvas element
        const x = (e.clientX - rect.left) * scaleX
        const y = (e.clientY - rect.top) * scaleY

        return { x, y }
    }

    // Handle mouse down
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const pos = getMousePos(e)
        setState((prev) => ({ ...prev, isDrawing: true, startPos: pos }))

        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!ctx || !canvas) return

        const isRightClick = e.button === 2
        const color = isRightClick ? state.secondaryColor : state.primaryColor

        ctx.strokeStyle = color
        ctx.fillStyle = color
        ctx.lineWidth = state.brushSize
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        switch (state.tool) {
            case 'select': {
                setState((prev) => ({ ...prev, selection: { x: pos.x, y: pos.y, width: 0, height: 0 } }))
                break
            }
            case 'pencil':
            case 'brush':
                ctx.beginPath()
                ctx.moveTo(pos.x, pos.y)
                if (state.tool === 'brush') ctx.lineWidth = state.brushSize * 2
                break
            case 'airbrush':
                ctx.globalAlpha = 0.3
                ctx.beginPath()
                ctx.arc(pos.x, pos.y, state.brushSize * 3, 0, 2 * Math.PI)
                ctx.fill()
                break
            case 'eraser':
                ctx.globalCompositeOperation = 'destination-out'
                ctx.lineWidth = state.brushSize * 3
                ctx.beginPath()
                ctx.moveTo(pos.x, pos.y)
                break
            case 'fill':
                floodFill(pos.x, pos.y, color)
                setState((prev) => ({ ...prev, isDrawing: false }))
                saveToHistory()
                break
            case 'text': {
                const text = prompt('Enter text:')
                if (text) {
                    ctx.font = `${16 * state.brushSize}px Arial`
                    ctx.fillStyle = color
                    ctx.fillText(text, pos.x, pos.y)
                    saveToHistory()
                }
                setState((prev) => ({ ...prev, isDrawing: false }))
                break
            }
            case 'picker': {
                const imageData = ctx.getImageData(pos.x, pos.y, 1, 1)
                const data = imageData.data
                const pickedColor = `#${((1 << 24) + (data[0] << 16) + (data[1] << 8) + data[2]).toString(16).slice(1)}`
                if (isRightClick) {
                    setState((prev) => ({ ...prev, secondaryColor: pickedColor, isDrawing: false }))
                } else {
                    setState((prev) => ({ ...prev, primaryColor: pickedColor, isDrawing: false }))
                }
                break
            }
            case 'polygon':
                if (state.polygonPoints.length === 0) {
                    setState((prev) => ({ ...prev, polygonPoints: [pos] }))
                } else {
                    const first = state.polygonPoints[0]
                    const distance = Math.sqrt(Math.pow(pos.x - first.x, 2) + Math.pow(pos.y - first.y, 2))
                    if (distance < 10) {
                        // Close polygon
                        ctx.beginPath()
                        ctx.moveTo(first.x, first.y)
                        state.polygonPoints.forEach((p) => ctx.lineTo(p.x, p.y))
                        ctx.closePath()
                        ctx.stroke()
                        setState((prev) => ({ ...prev, polygonPoints: [], isDrawing: false }))
                        saveToHistory()
                    } else {
                        setState((prev) => ({ ...prev, polygonPoints: [...prev.polygonPoints, pos] }))
                    }
                }
                break
            case 'curve':
                if (state.curvePoints.length < 2) {
                    setState((prev) => ({ ...prev, curvePoints: [...prev.curvePoints, pos] }))
                } else {
                    setState((prev) => ({ ...prev, isDrawing: false }))
                }
                break
            case 'zoom': {
                const newZoom =
                    isRightClick || e.shiftKey
                        ? Math.max((state.zoomLevel || 1) / 2, 0.25)
                        : Math.min((state.zoomLevel || 1) * 2, 8)
                setState((prev) => ({ ...prev, zoomLevel: newZoom, isDrawing: false }))
                break
            }
        }
    }

    // Handle mouse move
    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const pos = getMousePos(e)

        if (!state.isDrawing) return

        const canvas = canvasRef.current
        const overlayCanvas = overlayCanvasRef.current
        const ctx = canvas?.getContext('2d')
        const overlayCtx = overlayCanvas?.getContext('2d')

        if (!ctx || !canvas || !overlayCtx || !overlayCanvas) return

        switch (state.tool) {
            case 'select':
                if (state.selection) {
                    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
                    overlayCtx.strokeStyle = '#000000'
                    overlayCtx.setLineDash([5, 5])
                    const width = pos.x - state.selection.x
                    const height = pos.y - state.selection.y
                    overlayCtx.strokeRect(state.selection.x, state.selection.y, width, height)
                    setState((prev) => ({ ...prev, selection: { ...prev.selection!, width, height } }))
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
                    const offsetX = (Math.random() - 0.5) * state.brushSize * 4
                    const offsetY = (Math.random() - 0.5) * state.brushSize * 4
                    ctx.beginPath()
                    ctx.arc(pos.x + offsetX, pos.y + offsetY, 1, 0, 2 * Math.PI)
                    ctx.fill()
                }
                break
            case 'line':
                overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
                overlayCtx.strokeStyle = state.primaryColor
                overlayCtx.lineWidth = state.brushSize
                overlayCtx.beginPath()
                overlayCtx.moveTo(state.startPos.x, state.startPos.y)
                overlayCtx.lineTo(pos.x, pos.y)
                overlayCtx.stroke()
                break
            case 'rectangle': {
                overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
                overlayCtx.strokeStyle = state.primaryColor
                overlayCtx.lineWidth = state.brushSize
                const width = pos.x - state.startPos.x
                const height = pos.y - state.startPos.y
                overlayCtx.strokeRect(state.startPos.x, state.startPos.y, width, height)
                break
            }
            case 'roundedRect': {
                overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
                overlayCtx.strokeStyle = state.primaryColor
                overlayCtx.lineWidth = state.brushSize
                const rrWidth = pos.x - state.startPos.x
                const rrHeight = pos.y - state.startPos.y
                const radius = Math.min(Math.abs(rrWidth), Math.abs(rrHeight)) * 0.2
                overlayCtx.beginPath()
                overlayCtx.roundRect(state.startPos.x, state.startPos.y, rrWidth, rrHeight, radius)
                overlayCtx.stroke()
                break
            }
            case 'circle': {
                overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
                overlayCtx.strokeStyle = state.primaryColor
                overlayCtx.lineWidth = state.brushSize
                overlayCtx.beginPath()
                const radiusX = Math.abs(pos.x - state.startPos.x) / 2
                const radiusY = Math.abs(pos.y - state.startPos.y) / 2
                const centerX = (pos.x + state.startPos.x) / 2
                const centerY = (pos.y + state.startPos.y) / 2
                overlayCtx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI)
                overlayCtx.stroke()
                break
            }
            case 'polygon':
                if (state.polygonPoints.length > 0) {
                    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
                    overlayCtx.strokeStyle = state.primaryColor
                    overlayCtx.lineWidth = state.brushSize
                    overlayCtx.beginPath()
                    overlayCtx.moveTo(state.polygonPoints[0].x, state.polygonPoints[0].y)
                    state.polygonPoints.slice(1).forEach((p) => overlayCtx.lineTo(p.x, p.y))
                    overlayCtx.lineTo(pos.x, pos.y)
                    overlayCtx.stroke()
                }
                break
            case 'curve':
                if (state.curvePoints.length === 2) {
                    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
                    overlayCtx.strokeStyle = state.primaryColor
                    overlayCtx.lineWidth = state.brushSize
                    overlayCtx.beginPath()
                    overlayCtx.moveTo(state.curvePoints[0].x, state.curvePoints[0].y)
                    overlayCtx.quadraticCurveTo(pos.x, pos.y, state.curvePoints[1].x, state.curvePoints[1].y)
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

        if (state.tool === 'eraser') {
            ctx.globalCompositeOperation = 'source-over'
        }

        if (state.tool === 'airbrush') {
            ctx.globalAlpha = 1
        }

        switch (state.tool) {
            case 'select':
                overlayCtx.setLineDash([])
                break
            case 'line':
                ctx.strokeStyle = state.primaryColor
                ctx.lineWidth = state.brushSize
                ctx.beginPath()
                ctx.moveTo(state.startPos.x, state.startPos.y)
                ctx.lineTo(pos.x, pos.y)
                ctx.stroke()
                overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
                break
            case 'rectangle': {
                ctx.strokeStyle = state.primaryColor
                ctx.lineWidth = state.brushSize
                const width = pos.x - state.startPos.x
                const height = pos.y - state.startPos.y
                ctx.strokeRect(state.startPos.x, state.startPos.y, width, height)
                overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
                break
            }
            case 'roundedRect': {
                ctx.strokeStyle = state.primaryColor
                ctx.lineWidth = state.brushSize
                const rrWidth = pos.x - state.startPos.x
                const rrHeight = pos.y - state.startPos.y
                const radius = Math.min(Math.abs(rrWidth), Math.abs(rrHeight)) * 0.2
                ctx.beginPath()
                ctx.roundRect(state.startPos.x, state.startPos.y, rrWidth, rrHeight, radius)
                ctx.stroke()
                overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
                break
            }
            case 'circle': {
                ctx.strokeStyle = state.primaryColor
                ctx.lineWidth = state.brushSize
                ctx.beginPath()
                const radiusX = Math.abs(pos.x - state.startPos.x) / 2
                const radiusY = Math.abs(pos.y - state.startPos.y) / 2
                const centerX = (pos.x + state.startPos.x) / 2
                const centerY = (pos.y + state.startPos.y) / 2
                ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI)
                ctx.stroke()
                overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
                break
            }
            case 'curve':
                if (state.curvePoints.length === 2) {
                    ctx.strokeStyle = state.primaryColor
                    ctx.lineWidth = state.brushSize
                    ctx.beginPath()
                    ctx.moveTo(state.curvePoints[0].x, state.curvePoints[0].y)
                    ctx.quadraticCurveTo(pos.x, pos.y, state.curvePoints[1].x, state.curvePoints[1].y)
                    ctx.stroke()
                    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
                    setState((prev) => ({ ...prev, curvePoints: [] }))
                }
                break
        }

        setState((prev) => ({ ...prev, isDrawing: false }))

        if (
            state.tool !== 'picker' &&
            state.tool !== 'zoom' &&
            state.tool !== 'polygon' &&
            state.tool !== 'curve' &&
            state.tool !== 'select'
        ) {
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
            a: imageData.data[index + 3],
        }
    }

    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            }
            : null
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

    // Reset to original image
    const resetImage = () => {
        if (!state.originalImageData) return

        if (
            state.isModified &&
            !confirm('Do you want to reset to the original image? Any unsaved changes will be lost.')
        ) {
            return
        }

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.putImageData(state.originalImageData, 0, 0)
        saveToHistory()
        setState((prev) => ({ ...prev, isModified: false }))
    }

    // Clear canvas
    const clearCanvas = () => {
        if (state.isModified && !confirm('Do you want to clear the canvas? Any unsaved changes will be lost.')) {
            return
        }

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        setState((prev) => ({ ...prev, isModified: false }))
        saveToHistory()
    }

    // Resize canvas
    const resizeCanvas = () => {
        const newWidth = prompt('Enter new width:', (state.canvasSize?.width || 640).toString())
        const newHeight = prompt('Enter new height:', (state.canvasSize?.height || 480).toString())

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
                        setState((prev) => ({ ...prev, canvasSize: { width, height } }))

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
        setState((prev) => ({ ...prev, canvasSize: { width: newWidth, height: newHeight } }))

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
                {
                    type: 'item' as const,
                    label: 'Open...',
                    shortcut: 'Shift+O',
                    onClick: () => fileInputRef.current?.click(),
                },
                { type: 'separator' as const },
                { type: 'item' as const, label: 'Save as PNG', shortcut: 'Shift+S', onClick: () => exportImage('png') },
                { type: 'item' as const, label: 'Save as JPEG', onClick: () => exportImage('jpeg') },
            ],
        },
        {
            trigger: 'Edit',
            items: [
                {
                    type: 'item' as const,
                    label: 'Undo',
                    shortcut: 'Shift+Z',
                    onClick: undo,
                    disabled: !state.canvasHistory || state.historyIndex <= 0,
                },
                {
                    type: 'item' as const,
                    label: 'Redo',
                    shortcut: 'Shift+Y',
                    onClick: redo,
                    disabled: !state.canvasHistory || state.historyIndex >= state.canvasHistory.length - 1,
                },
                { type: 'separator' as const },
                ...(state.originalImageData
                    ? [{ type: 'item' as const, label: 'Reset image', onClick: resetImage }]
                    : []),
                { type: 'item' as const, label: 'Clear image', onClick: clearCanvas },
            ],
        },
        {
            trigger: 'View',
            items: [
                {
                    type: 'item' as const,
                    label: 'Zoom in',
                    onClick: () =>
                        setState((prev) => ({ ...prev, zoomLevel: Math.min(prev.zoomLevel * 2, 8), isDrawing: false })),
                },
                {
                    type: 'item' as const,
                    label: 'Zoom out',
                    onClick: () =>
                        setState((prev) => ({
                            ...prev,
                            zoomLevel: Math.max(prev.zoomLevel / 2, 0.25),
                            isDrawing: false,
                        })),
                },
                {
                    type: 'item' as const,
                    label: 'Actual size',
                    onClick: () => setState((prev) => ({ ...prev, zoomLevel: 1, isDrawing: false })),
                },
            ],
        },
        {
            trigger: 'Image',
            items: [
                { type: 'item' as const, label: 'Resize canvas...', onClick: resizeCanvas },
                { type: 'separator' as const },
                { type: 'item' as const, label: 'Flip horizontal', onClick: flipHorizontal },
                { type: 'item' as const, label: 'Flip vertical', onClick: flipVertical },
                { type: 'item' as const, label: 'Rotate 90°', onClick: rotate90 },
            ],
        },
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
                                onClick={() => setState((prev) => ({ ...prev, tool: t }))}
                                className={`w-6 h-6 border flex items-center justify-center ${state.tool === t
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
                            {brushSizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setState((prev) => ({ ...prev, brushSize: size }))}
                                    className={`w-5 h-5 border flex items-center justify-center ${state.brushSize === size
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
                <div className="flex-1 bg-[#808080] overflow-auto">
                    <div
                        ref={containerRef}
                        className="inline-block bg-white shadow-[inset_-1px_-1px_#ffffff,inset_1px_1px_#808080,inset_-2px_-2px_#c0c0c0,inset_2px_2px_#000000]"
                        style={{
                            transform: `scale(${state.zoomLevel || 1})`,
                            transformOrigin: 'top left',
                            width: initialCanvasSize && initialCanvasSize.width >= 1000 ? '100%' : 'auto'
                        }}
                    >
                        <div className="relative" style={{
                            width: initialCanvasSize && initialCanvasSize.width >= 1000 ? '100%' : 'auto',
                            height: initialCanvasSize && initialCanvasSize.height >= 500 ? '100%' : 'auto'
                        }}>
                            <canvas
                                ref={canvasRef}
                                width={state.canvasSize?.width || 640}
                                height={state.canvasSize?.height || 480}
                                className=""
                                style={{
                                    cursor:
                                        state.tool === 'picker'
                                            ? 'crosshair'
                                            : state.tool === 'zoom'
                                                ? 'zoom-in'
                                                : 'default',
                                    width: initialCanvasSize && initialCanvasSize.width >= 1000 ? '100%' : 'auto',
                                    height: initialCanvasSize && initialCanvasSize.height >= 500 ? '100%' : 'auto',
                                    display: 'block'
                                }}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={() => setState((prev) => ({ ...prev, isDrawing: false }))}
                                onContextMenu={(e) => e.preventDefault()}
                            />
                            <canvas
                                ref={overlayCanvasRef}
                                width={state.canvasSize?.width || 640}
                                height={state.canvasSize?.height || 480}
                                className="absolute top-0 left-0 pointer-events-none"
                                style={{
                                    width: initialCanvasSize && initialCanvasSize.width >= 1000 ? '100%' : 'auto',
                                    height: initialCanvasSize && initialCanvasSize.height >= 500 ? '100%' : 'auto'
                                }}
                            />
                            {children}
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
                                    style={{ backgroundColor: state.secondaryColor }}
                                />
                                <div
                                    className="w-8 h-8 border-2 border-[#000000] relative"
                                    style={{ backgroundColor: state.primaryColor }}
                                />
                            </div>
                            <div className="text-xs">
                                <div>Foreground</div>
                                <div>Background</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-px p-2 border-2 border-t-[#808080] border-l-[#808080] border-b-[#ffffff] border-r-[#ffffff]">
                        {colorPalette.map((color) => (
                            <button
                                key={color}
                                className="size-6 border border-[#000000]"
                                style={{ backgroundColor: color }}
                                onClick={() => setState((prev) => ({ ...prev, primaryColor: color }))}
                                onContextMenu={(e) => {
                                    e.preventDefault()
                                    setState((prev) => ({ ...prev, secondaryColor: color }))
                                }}
                            />
                        ))}
                    </div>

                    <div className="mt-4 text-xs">
                        <div className="mb-1">
                            Canvas: {state.canvasSize?.width || 640} × {state.canvasSize?.height || 480}
                        </div>
                        <div className="mb-1">Zoom: {Math.round((state.zoomLevel || 1) * 100)}%</div>
                        <div className="mb-1">Tool: {state.tool}</div>
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
