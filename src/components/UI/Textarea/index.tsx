import React from 'react'
import { Input as BaseInput } from '@base-ui/react/input'
import { textInput, textareaSizes } from '../styles'
import type { FieldSize } from '../styles'
import { assignRef, mergeClassName, useSmoothHeight } from '../utils'

export type TextareaProps = Omit<BaseInput.Props, 'ref' | 'render' | 'type' | 'size'> &
    Pick<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows' | 'cols' | 'wrap'> & {
        size?: FieldSize
        autoExpand?: boolean
    }

const fixedHeight = 'resize-y data-[disabled]:resize-none'

const contentHeight = 'max-h-80 resize-none overflow-y-auto [field-sizing:content]'

export const Textarea = React.forwardRef<HTMLElement, TextareaProps>(function Textarea(
    { className, size = 'md', rows = 3, cols, wrap, autoExpand = false, ...props },
    ref
) {
    const smoothHeight = useSmoothHeight()
    const setRef = React.useCallback(
        (element: HTMLElement | null) => {
            smoothHeight(autoExpand ? element : null)
            assignRef(ref, element)
        },
        [autoExpand, ref, smoothHeight]
    )
    return (
        <BaseInput
            ref={setRef}
            render={<textarea rows={rows} cols={cols} wrap={wrap} />}
            className={mergeClassName(
                `${textInput} h-auto ${textareaSizes[size]} ${autoExpand ? contentHeight : fixedHeight}`,
                className
            )}
            {...props}
        />
    )
})
