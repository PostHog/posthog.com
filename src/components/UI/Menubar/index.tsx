import React from 'react'
import { Menubar as BaseMenubar } from '@base-ui/react/menubar'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import { menubarTrigger, surfaceAppearances } from '../styles'
import type { SurfaceAppearance } from '../styles'
import { mergeClassName, withClassName } from '../utils'

export type MenubarAppearance = SurfaceAppearance

export type MenubarRootProps = Omit<BaseMenubar.Props, 'ref'> & {
    appearance?: MenubarAppearance
}

const Root = React.forwardRef<HTMLDivElement, MenubarRootProps>(function MenubarRoot(
    { appearance = 'raised', className, ...props },
    ref
) {
    return (
        <BaseMenubar
            ref={ref}
            className={mergeClassName(
                `flex items-center gap-px py-0.5 aria-[orientation=vertical]:flex-col aria-[orientation=vertical]:items-stretch aria-[orientation=vertical]:px-0.5 ${
                    appearance === 'plain' ? '' : 'w-fit px-1'
                } ${surfaceAppearances[appearance]}`,
                className
            )}
            {...props}
        />
    )
})

const Trigger = withClassName(BaseMenu.Trigger, `${menubarTrigger} active:bg-[rgb(var(--text-primary)/0.1)]`)

export const Menubar = { Root, Trigger }
