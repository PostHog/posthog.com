import React from 'react'
import type { Tone } from '../styles'
import type { AnnotationType, RoughAnnotationProps } from '../RoughAnnotation'
import { RoughAnnotation } from '../RoughAnnotation'
import { cn } from '../../../utils'

export type UnderlineStyle = Exclude<AnnotationType, 'highlight'>
export type UnderlineProps = Omit<RoughAnnotationProps, 'type'> & {
    type?: UnderlineStyle
    tone?: Tone
}

const strokeColors: Record<Tone, string> = {
    neutral: '[--annotation-stroke:rgb(var(--text-primary))]',
    info: '[--annotation-stroke:theme(colors.blue)] dark:[--annotation-stroke:theme(colors.light-blue)]',
    success: '[--annotation-stroke:theme(colors.green)] dark:[--annotation-stroke:theme(colors.lime-green)]',
    warning: '[--annotation-stroke:theme(colors.yellow)] dark:[--annotation-stroke:theme(colors.light-yellow)]',
    error: '[--annotation-stroke:theme(colors.salmon)] dark:[--annotation-stroke:theme(colors.salmon)]',
    brand: '[--annotation-stroke:theme(colors.orange)] dark:[--annotation-stroke:theme(colors.yellow)]',
}

export function Underline({
    type = 'underline',
    tone,
    color = tone ? 'var(--annotation-stroke)' : 'currentColor',
    strokeWidth = 1,
    multiline = true,
    className,
    ...props
}: UnderlineProps): JSX.Element {
    return (
        <span className={cn('inline', tone && strokeColors[tone])}>
            <RoughAnnotation
                {...props}
                type={type}
                color={color}
                strokeWidth={strokeWidth}
                multiline={multiline}
                className={cn('text-secondary', className)}
            />
        </span>
    )
}
