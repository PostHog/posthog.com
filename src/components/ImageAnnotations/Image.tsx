import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import { Popover } from 'components/RadixUI/Popover'
import Tooltip from 'components/RadixUI/Tooltip'
import { useImageAnnotations, type Annotation } from './index'
import { useProductScreenshot } from './useProductScreenshot'

type CloudinarySrc = `https://res.cloudinary.com/${string}`

export interface ImageAnnotationsImageProps {
    /** Explicit image URL. Omit to resolve from `product` + `screenshot`. */
    src?: string
    /** Optional dark-mode variant. Rendered via the `dark:` dual-image pattern. */
    srcDark?: string
    /** Resolve `src`/`srcDark`/`alt` from a product hook (keeps the image in sync). */
    product?: string
    screenshot?: string
    alt?: string
    /** Classes applied to the underlying <img>. */
    imgClassName?: string
    /** Classes applied to the relative wrapper. */
    className?: string
    /** Inline styles applied to the relative wrapper (e.g. a max-width cap). */
    style?: React.CSSProperties
}

const clamp = (value: number) => Math.max(0, Math.min(100, value))

function Marker({ annotation, index }: { annotation: Annotation; index: number }): JSX.Element {
    const { type, hoveredIndex, setHoveredIndex } = useImageAnnotations()
    const isActive = hoveredIndex === index

    const anchorStyle: React.CSSProperties = {
        position: 'absolute',
        left: `${clamp(annotation.x)}%`,
        top: `${clamp(annotation.y)}%`,
        transform: 'translate(-50%, -50%)',
    }

    const scaleClass = isActive ? 'scale-125' : 'scale-100'

    if (type === 'numbered') {
        // Controlled tooltip: open whenever this marker is "active", so hovering
        // either the marker or its matching key row reveals the details (handy when
        // the key is scrolled off-screen on a tall image).
        return (
            <div style={anchorStyle} className="z-10">
                <Tooltip
                    open={isActive}
                    side="top"
                    contentClassName="max-w-xs"
                    trigger={
                        <span
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={`flex items-center justify-center size-6 rounded-full bg-red text-white text-[13px] font-semibold shadow-md ring-2 ring-white transition-transform duration-200 cursor-default ${scaleClass} ${
                                isActive ? 'shadow-lg' : ''
                            }`}
                        >
                            {index + 1}
                        </span>
                    }
                >
                    <div className="max-w-xs">
                        <strong className="text-[15px]">{annotation.title}</strong>
                        {annotation.description && (
                            <p className="text-sm text-secondary mt-1 mb-0 leading-normal">{annotation.description}</p>
                        )}
                    </div>
                </Tooltip>
            </div>
        )
    }

    // dots — pulsing, clickable, opens a popover with the details
    return (
        <div style={anchorStyle} className="z-10">
            <Popover
                dataScheme="primary"
                side="top"
                contentClassName="w-64 border border-primary"
                trigger={
                    <button
                        type="button"
                        aria-label={annotation.title}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`relative flex items-center justify-center transition-transform duration-200 ${scaleClass}`}
                    >
                        <span className="absolute inline-flex size-5 rounded-full bg-red opacity-60 animate-ping" />
                        <span className="relative inline-flex size-4 rounded-full bg-red ring-2 ring-white shadow-md" />
                    </button>
                }
            >
                <div className="p-2 max-w-xs">
                    <strong className="text-[15px]">{annotation.title}</strong>
                    {annotation.description && (
                        <p className="text-sm text-secondary mt-1 mb-0 leading-normal">{annotation.description}</p>
                    )}
                </div>
            </Popover>
        </div>
    )
}

function ImageAnnotationsImage({
    src,
    srcDark,
    product,
    screenshot,
    alt,
    imgClassName = '',
    className = '',
    style,
}: ImageAnnotationsImageProps): JSX.Element | null {
    const { annotations } = useImageAnnotations()
    const resolved = useProductScreenshot(src ? undefined : product, src ? undefined : screenshot)

    const finalSrc = src ?? resolved?.src
    const finalSrcDark = srcDark ?? resolved?.srcDark
    const finalAlt = alt ?? resolved?.alt ?? ''

    if (!finalSrc) {
        return null
    }

    return (
        <div className={`relative inline-block leading-[0] ${className}`} style={style}>
            <CloudinaryImage
                src={finalSrc as CloudinarySrc}
                alt={finalAlt}
                className={finalSrcDark ? 'dark:hidden w-full' : 'w-full'}
                imgClassName={imgClassName}
            />
            {finalSrcDark && (
                <CloudinaryImage
                    src={finalSrcDark as CloudinarySrc}
                    alt={finalAlt}
                    className="hidden dark:inline-block w-full"
                    imgClassName={imgClassName}
                />
            )}
            {annotations.map((annotation, index) => (
                <Marker key={index} annotation={annotation} index={index} />
            ))}
        </div>
    )
}

export default ImageAnnotationsImage
