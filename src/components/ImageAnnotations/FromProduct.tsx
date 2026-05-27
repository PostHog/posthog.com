import React from 'react'
import ImageAnnotations, { type Annotation, type AnnotationSet, type AnnotationType } from './index'
import { useProductScreenshot } from './useProductScreenshot'

export interface ProductImageAnnotationsProps {
    /** Product handle, e.g. "session_replay". */
    product: string
    /** Key within that product's `screenshots` object, e.g. "overview". */
    screenshot: string
    /** Name of an annotation set stored on the screenshot (`screenshots.x.annotations[set]`). */
    set?: string
    /** Inline annotations — overrides anything resolved from `set`. */
    annotations?: Annotation[]
    /** Overrides the set's type (defaults to the set's type, then "numbered"). */
    type?: AnnotationType
    /** Force the key on/off. Defaults to showing it for the "numbered" type. */
    showKey?: boolean
    keyTitle?: string
    /** Overrides the screenshot's alt text. */
    alt?: string
    imgClassName?: string
    /** Wrapper around the image + key. Defaults to a stacked layout. */
    className?: string
}

/**
 * Renders an annotated screenshot by reference to a product hook, so the image
 * (light + dark) stays in sync with `useProducts`. Annotations can be passed
 * inline or stored on the screenshot under a named `set`.
 */
export default function ProductImageAnnotations({
    product,
    screenshot,
    set,
    annotations,
    type,
    showKey,
    keyTitle,
    alt,
    imgClassName = 'rounded-lg shadow-2xl',
    className = 'space-y-4',
}: ProductImageAnnotationsProps): JSX.Element | null {
    const shot = useProductScreenshot(product, screenshot)

    if (!shot?.src) {
        return null
    }

    const stored: AnnotationSet | undefined = set ? (shot.annotations?.[set] as AnnotationSet | undefined) : undefined
    const resolvedAnnotations = annotations ?? stored?.items ?? []
    const resolvedType = type ?? stored?.type ?? 'numbered'
    const renderKey = showKey ?? resolvedType === 'numbered'

    return (
        <ImageAnnotations annotations={resolvedAnnotations} type={resolvedType}>
            <div className={className}>
                <ImageAnnotations.Image
                    src={shot.src}
                    srcDark={shot.srcDark}
                    alt={alt ?? shot.alt}
                    imgClassName={imgClassName}
                />
                {renderKey && <ImageAnnotations.Key title={keyTitle} />}
            </div>
        </ImageAnnotations>
    )
}
