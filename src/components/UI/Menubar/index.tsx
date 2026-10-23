import React from 'react'
import { Menubar as BaseMenubar } from '@base-ui/react/menubar'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import { menubarTrigger, menubarVariants, surfaceVariants } from '../styles'
import type { Surface } from '../styles'
import { mergeClassName, withClassName } from '../utils'

export type MenubarVariant = keyof typeof menubarVariants

export type MenubarRootProps = Omit<BaseMenubar.Props, 'ref'> & {
    variant?: MenubarVariant
    surface?: Surface
}

const Root = React.forwardRef<HTMLDivElement, MenubarRootProps>(function MenubarRoot(
    { surface, variant, className, ...props },
    ref
) {
    const resolvedSurface = surface ?? variant ?? 'raised'
    return (
        <BaseMenubar
            ref={ref}
            className={mergeClassName(
                `flex items-center gap-px py-0.5 ${resolvedSurface === 'plain' ? '' : 'w-fit px-1'} ${
                    surfaceVariants[resolvedSurface]
                }`,
                className
            )}
            {...props}
        />
    )
})

const Trigger = withClassName(BaseMenu.Trigger, `${menubarTrigger} active:bg-[rgb(var(--text-primary)/0.1)]`)

export const Menubar = { Root, Trigger }
