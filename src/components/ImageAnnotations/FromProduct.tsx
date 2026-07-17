import React from 'react'
import ImageAnnotations, { type Annotation, type AnnotationSet, type AnnotationType } from './index'
import { useProductScreenshot } from './useProductScreenshot'

export interface ProductImageAnnotationsProps {
    /** Product handle, e.g. "session_replay". */
    product: string
    /** Key within that product's `screenshots` object, e.g. "overview". */
    screenshot: string
    /** Section heading. In `split` it sits in the left column next to the image. */
    title?: React.ReactNode
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
    /**
     * `stacked` (default) renders the image above the key. `split` renders a
     * responsive two-column layout (uses `@container/reader-content` queries):
     * `children` + key on the left, image filling the right column.
     */
    layout?: 'stacked' | 'split'
    /** Left-column content for the `split` layout (the description/prose). */
    children?: React.ReactNode
}

/**
 * Renders an annotated screenshot by reference to a product hook, so the image
 * (light + dark) stays in sync with `useProducts`. Annotations can be passed
 * inline or stored on the screenshot under a named `set`.
 */
export default function ProductImageAnnotations({
    product,
    screenshot,
    title,
    set,
    annotations,
    type,
    showKey,
    keyTitle,
    alt,
    imgClassName = 'rounded-lg shadow-2xl',
    className,
    layout = 'stacked',
    children,
}: ProductImageAnnotationsProps): JSX.Element | null {
    const shot = useProductScreenshot(product, screenshot)

    if (!shot?.src) {
        return null
    }

    const stored: AnnotationSet | undefined = set ? (shot.annotations?.[set] as AnnotationSet | undefined) : undefined
    const resolvedAnnotations = annotations ?? stored?.items ?? []
    const resolvedType = type ?? stored?.type ?? 'numbered'
    const renderKey = showKey ?? resolvedType === 'numbered'

    const image = (
        <ImageAnnotations.Image
            src={shot.src}
            srcDark={shot.srcDark}
            alt={alt ?? shot.alt}
            className="w-full"
            imgClassName={imgClassName}
        />
    )

    if (layout === 'split') {
        return (
            <ImageAnnotations annotations={resolvedAnnotations} type={resolvedType}>
                {/* Source order (children → image → key) so it stacks as description → image → key on mobile.
                    At @2xl/reader-content it becomes 2 columns: description top-left, key bottom-left, image right. */}
                <div
                    className={`grid grid-cols-1 gap-6 @2xl/reader-content:gap-x-12 @2xl/reader-content:grid-cols-2 @2xl/reader-content:[grid-template-rows:auto_1fr] @2xl/reader-content:items-start ${
                        className ?? ''
                    }`}
                >
                    <div className="@2xl/reader-content:col-start-1 @2xl/reader-content:row-start-1">
                        {title && <h2 className="!mt-0">{title}</h2>}
                        {children}
                    </div>
                    <div className="@2xl/reader-content:col-start-2 @2xl/reader-content:row-start-1 @2xl/reader-content:row-span-2">
                        {image}
                    </div>
                    {renderKey && (
                        <div className="@2xl/reader-content:col-start-1 @2xl/reader-content:row-start-2">
                            <ImageAnnotations.Key title={keyTitle} />
                        </div>
                    )}
                </div>
            </ImageAnnotations>
        )
    }

    return (
        <ImageAnnotations annotations={resolvedAnnotations} type={resolvedType}>
            {title && <h2 className="!mt-0">{title}</h2>}
            <div className={className ?? 'space-y-4'}>
                {image}
                {renderKey && <ImageAnnotations.Key title={keyTitle} />}
            </div>
        </ImageAnnotations>
    )
}
