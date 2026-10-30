import React from 'react'
import { Input as BaseInput } from '@base-ui/react/input'
import { fieldAppearanceShape, textareaSizes, textInputFor } from '../styles'
import type { FieldAppearance, FieldSize } from '../styles'
import { assignRef, mergeClassName, useSmoothHeight } from '../utils'

type TextareaEvents = Pick<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    keyof React.DOMAttributes<HTMLTextAreaElement>
>

export type TextareaProps = Omit<BaseInput.Props, 'ref' | 'render' | 'type' | 'size' | keyof TextareaEvents> &
    TextareaEvents &
    Pick<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows' | 'cols' | 'wrap'> & {
        size?: FieldSize
        appearance?: FieldAppearance
        autoExpand?: boolean
    }

const fixedHeight = 'resize-y data-[disabled]:resize-none'

const contentHeight = 'max-h-80 resize-none overflow-y-auto [field-sizing:content]'

export const Textarea = React.forwardRef<HTMLElement, TextareaProps>(function Textarea(
    { className, size = 'md', appearance = 'inset', rows = 3, cols, wrap, autoExpand = false, ...props },
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
                `${textInputFor(appearance)} h-auto ${textareaSizes[size]} ${
                    autoExpand ? contentHeight : fixedHeight
                } ${fieldAppearanceShape[appearance]}`,
                className
            )}
            {...(props as Omit<BaseInput.Props, 'ref'>)}
        />
    )
})
