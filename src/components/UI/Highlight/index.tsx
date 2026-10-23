import React from 'react'
import type { Tone } from '../styles'
import type { RoughAnnotationProps } from '../RoughAnnotation'
import { RoughAnnotation } from '../RoughAnnotation'
import { textEffectColor } from '../textEffects'
import { cn } from '../../../utils'

export type HighlightProps = Omit<RoughAnnotationProps, 'type'> & {
    tone?: Tone | 'yellow'
}

export function Highlight({
    tone = 'yellow',
    color = 'var(--effect-color)',
    strokeWidth = 1,
    padding = 2,
    multiline = true,
    ...props
}: HighlightProps): JSX.Element {
    return (
        <span className={cn('inline', textEffectColor[tone])}>
            <RoughAnnotation
                {...props}
                type="highlight"
                color={color}
                strokeWidth={strokeWidth}
                padding={padding}
                multiline={multiline}
            />
        </span>
    )
}
