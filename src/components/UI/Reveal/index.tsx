import React, { useEffect, useRef, useState } from 'react'
import type { CSSProperties, HTMLAttributes } from 'react'
import { cn } from '../../../utils'
import { observeReveal } from './observe'
import './styles.css'

export type RevealProps = HTMLAttributes<HTMLDivElement> & {
    effect?: 'fade' | 'slide-up' | 'scale'
    delay?: number
    stagger?: number
    duration?: number
    text?: string
}

export const Reveal = React.forwardRef<HTMLDivElement, RevealProps>(function Reveal(
    { effect = 'slide-up', delay = 0, stagger, duration = 500, text, children, className, style, ...props },
    ref
) {
    const element = useRef<HTMLDivElement>(null)
    const [entered, setEntered] = useState(false)
    React.useImperativeHandle(ref, () => element.current as HTMLDivElement)
    useEffect(() => {
        if (!element.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        return observeReveal(element.current, () => setEntered(true))
    }, [])
    const partStagger = Math.max(0, stagger ?? (text !== undefined ? 45 : 0))
    const parts = text !== undefined ? text.split(/(\s+)/) : partStagger > 0 ? React.Children.toArray(children) : null
    let index = 0
    return (
        <div
            ref={element}
            {...props}
            data-reveal-effect={effect}
            data-reveal-entered={entered || undefined}
            data-reveal-parts={parts ? true : undefined}
            className={cn('ui-reveal', className)}
            style={
                {
                    ...style,
                    '--reveal-delay': `${Math.max(0, delay)}ms`,
                    '--reveal-duration': `${Math.max(1, duration)}ms`,
                } as CSSProperties
            }
        >
            {parts
                ? parts.map((part, key) => {
                      if (typeof part === 'string' && /^\s+$/.test(part)) return part
                      const partDelay = Math.max(0, delay) + index++ * partStagger
                      const Part = text !== undefined ? 'span' : 'div'
                      return (
                          <Part
                              key={key}
                              className={
                                  text !== undefined ? 'ui-reveal-part inline-block' : 'ui-reveal-part block min-w-0'
                              }
                              style={{ '--reveal-delay': `${partDelay}ms` } as CSSProperties}
                          >
                              {part}
                          </Part>
                      )
                  })
                : children}
        </div>
    )
})
