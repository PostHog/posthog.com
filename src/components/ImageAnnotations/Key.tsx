import React from 'react'
import { useImageAnnotations } from './index'

export interface ImageAnnotationsKeyProps {
    /** Optional heading shown above the list. Defaults to "Key". */
    title?: string
    className?: string
}

function ImageAnnotationsKey({ title = 'Key', className = '' }: ImageAnnotationsKeyProps): JSX.Element {
    const { annotations, type, hoveredIndex, setHoveredIndex } = useImageAnnotations()

    return (
        <div className={`border-y border-primary py-4 ${className}`}>
            {title && <strong className="block mb-1 text-secondary">{title}</strong>}
            <ul className="list-none p-0 m-0">
                {annotations.map((annotation, index) => {
                    const isActive = hoveredIndex === index
                    return (
                        <li
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={`flex items-start gap-2.5 rounded p-1.5 transition-colors cursor-default ${
                                isActive ? 'bg-primary/50' : ''
                            }`}
                        >
                            <span
                                className={`flex-shrink-0 flex items-center justify-center mt-0.5 rounded-full bg-red text-white font-semibold ring-2 ring-white transition-transform duration-200 ${
                                    isActive ? 'scale-110' : ''
                                } ${type === 'numbered' ? 'size-5 text-[12px]' : 'size-3'}`}
                            >
                                {type === 'numbered' ? index + 1 : ''}
                            </span>
                            <div className="leading-tight pt-0.5">
                                <span className="text-[15px] font-semibold">{annotation.title}</span>
                                {annotation.description && (
                                    <p className="text-sm text-secondary mt-0.5 mb-0 leading-normal">
                                        {annotation.description}
                                    </p>
                                )}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ImageAnnotationsKey
