import React, { createContext, useContext, useMemo, useState } from 'react'
import ImageAnnotationsImage from './Image'
import ImageAnnotationsKey from './Key'
import ProductImageAnnotations from './FromProduct'

export type AnnotationType = 'dots' | 'numbered'

export interface Annotation {
    /** Horizontal position as a percentage (0–100) of the image width */
    x: number
    /** Vertical position as a percentage (0–100) of the image height */
    y: number
    title: string
    description?: string
}

/**
 * A named group of annotations, stored alongside a screenshot in a product hook.
 * The same image can hold several sets (e.g. used differently on different pages).
 */
export interface AnnotationSet {
    type?: AnnotationType
    items: Annotation[]
}

interface ImageAnnotationsContextValue {
    annotations: Annotation[]
    type: AnnotationType
    hoveredIndex: number | null
    setHoveredIndex: (index: number | null) => void
}

const ImageAnnotationsContext = createContext<ImageAnnotationsContextValue | null>(null)

export function useImageAnnotations(): ImageAnnotationsContextValue {
    const context = useContext(ImageAnnotationsContext)
    if (!context) {
        throw new Error('ImageAnnotations.Image and ImageAnnotations.Key must be used inside <ImageAnnotations>')
    }
    return context
}

export interface ImageAnnotationsProps {
    /** The callouts to render. Coordinates are percentages (0–100) so they scale with the image. */
    annotations: Annotation[]
    /** `dots` = pulsing, clickable markers with tooltips. `numbered` = numbered markers paired with a key. */
    type?: AnnotationType
    children: React.ReactNode
}

/**
 * Renders interactive callouts on top of an image. Define the `annotations` once
 * here; `<ImageAnnotations.Image>` and `<ImageAnnotations.Key>` read from this
 * shared context (so they can live anywhere inside and cross-highlight on hover).
 *
 * Coordinates are percentages of the rendered image, so markers stay anchored at
 * any size — no dimension measurement required.
 */
function ImageAnnotations({ annotations, type = 'numbered', children }: ImageAnnotationsProps): JSX.Element {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const value = useMemo<ImageAnnotationsContextValue>(
        () => ({ annotations, type, hoveredIndex, setHoveredIndex }),
        [annotations, type, hoveredIndex]
    )

    return <ImageAnnotationsContext.Provider value={value}>{children}</ImageAnnotationsContext.Provider>
}

ImageAnnotations.Image = ImageAnnotationsImage
ImageAnnotations.Key = ImageAnnotationsKey
ImageAnnotations.FromProduct = ProductImageAnnotations

export default ImageAnnotations
