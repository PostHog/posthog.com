import React from 'react'
import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar'
import { focusRing, surfaceVariants, textInput } from '../styles'
import type { Surface } from '../styles'
import { mergeClassName, withClassName } from '../utils'

export type ToolbarRootProps = BaseToolbar.Root.Props & { surface?: Surface }

const Root = React.forwardRef<HTMLDivElement, ToolbarRootProps>(function ToolbarRoot(
    { surface = 'raised', className, ...props },
    ref
) {
    return (
        <BaseToolbar.Root
            ref={ref}
            className={mergeClassName(
                `flex w-full items-center gap-1 p-1 data-[orientation=vertical]:w-fit data-[orientation=vertical]:flex-col ${surfaceVariants[surface]}`,
                className
            )}
            {...props}
        />
    )
})

const toolbarControl = `inline-flex h-7 min-w-7 shrink-0 select-none items-center justify-center gap-1 rounded border border-transparent px-1.5 text-sm text-primary transition-colors duration-150 ease-out hover:bg-[rgb(var(--text-primary)/0.07)] data-[pressed]:bg-[rgb(var(--text-primary)/0.1)] data-[popup-open]:bg-[rgb(var(--text-primary)/0.1)] data-[disabled]:pointer-events-none data-[disabled]:text-muted motion-reduce:transition-none ${focusRing}`

const Button = withClassName(BaseToolbar.Button, toolbarControl)

const Link = withClassName(BaseToolbar.Link, `${toolbarControl} no-underline`)

const Group = withClassName(BaseToolbar.Group, 'flex items-center gap-1')

const Separator = withClassName(
    BaseToolbar.Separator,
    'mx-1 self-stretch bg-[rgb(var(--text-primary)/0.14)] data-[orientation=vertical]:w-px data-[orientation=horizontal]:my-1 data-[orientation=horizontal]:h-px'
)

const Input = withClassName(BaseToolbar.Input, `${textInput} h-7 w-auto py-0 text-sm`)

export const Toolbar = { Root, Button, Link, Group, Separator, Input }
