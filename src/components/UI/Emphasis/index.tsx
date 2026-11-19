import React from 'react'
import type { HTMLAttributes } from 'react'
import { cn } from '../../../utils'
import { colorEmphasis } from '../colors'
import type { ColorName } from '../colors'

export type EmphasisColor = ColorName

export type EmphasisProps = Omit<HTMLAttributes<HTMLSpanElement>, 'color'> & { color?: EmphasisColor }

export const Emphasis = React.forwardRef<HTMLSpanElement, EmphasisProps>(function Emphasis(
    { color = 'blue', className, ...props },
    ref
) {
    return (
        <span
            ref={ref}
            {...props}
            className={cn(
                'inline box-decoration-clone rounded-[0.15em] px-[0.12em] [-webkit-box-decoration-break:clone]',
                colorEmphasis[color],
                className
            )}
        />
    )
})
