import React from 'react'
import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu'
import { IconChevronDown } from '@posthog/icons'
import {
    menuItem,
    menubarTrigger,
    menubarVariants,
    popupArrow,
    popupSurface,
    popupTransition,
    positionerLayer,
    surfaceVariants,
} from '../styles'
import type { Surface } from '../styles'
import { mergeClassName, positionerPropNames, splitProps, withClassName } from '../utils'
import type { PositionerPropName } from '../utils'

export type NavigationMenuVariant = keyof typeof menubarVariants

export type NavigationMenuListProps = BaseNavigationMenu.List.Props & {
    variant?: NavigationMenuVariant
    surface?: Surface
}

const List = React.forwardRef<HTMLUListElement, NavigationMenuListProps>(function NavigationMenuList(
    { surface, variant, className, ...props },
    ref
) {
    const resolvedSurface = surface ?? variant ?? 'raised'
    return (
        <BaseNavigationMenu.List
            ref={ref}
            className={mergeClassName(
                `m-0 flex list-none items-center gap-px py-0.5 ${resolvedSurface === 'plain' ? 'px-0' : 'w-fit px-1'} ${
                    surfaceVariants[resolvedSurface]
                }`,
                className
            )}
            {...props}
        />
    )
})

const Trigger = withClassName(BaseNavigationMenu.Trigger, `${menubarTrigger} active:bg-[rgb(var(--text-primary)/0.1)]`)

const Icon = withClassName(
    BaseNavigationMenu.Icon,
    'flex shrink-0 text-secondary transition-transform duration-150 ease-out data-[popup-open]:rotate-180 motion-reduce:transition-none',
    { children: <IconChevronDown className="size-3.5" /> }
)

const morphTiming = 'duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none'

const InsideContentContext = React.createContext(false)

const navigationContent = `p-[5px] transition-[opacity,transform] ${morphTiming} data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 data-[starting-style]:data-[activation-direction=left]:-translate-x-1/2 data-[starting-style]:data-[activation-direction=right]:translate-x-1/2 data-[ending-style]:data-[activation-direction=left]:translate-x-1/2 data-[ending-style]:data-[activation-direction=right]:-translate-x-1/2`

const Content = React.forwardRef<HTMLDivElement, BaseNavigationMenu.Content.Props>(function NavigationMenuContent(
    { className, ...props },
    ref
) {
    return (
        <InsideContentContext.Provider value>
            <BaseNavigationMenu.Content ref={ref} className={mergeClassName(navigationContent, className)} {...props} />
        </InsideContentContext.Provider>
    )
})

const contentLink = `${menuItem} h-auto min-h-[25px] flex-col items-start justify-center gap-1 py-1.5 no-underline hover:bg-[rgb(var(--text-primary)/0.07)] focus-visible:bg-[rgb(var(--text-primary)/0.07)] data-[highlighted]:bg-[rgb(var(--text-primary)/0.07)]`

const listLink = `${menubarTrigger} no-underline active:bg-[rgb(var(--text-primary)/0.1)]`

const Link = React.forwardRef<HTMLAnchorElement, BaseNavigationMenu.Link.Props>(function NavigationMenuLink(
    { className, closeOnClick = true, ...props },
    ref
) {
    const insideContent = React.useContext(InsideContentContext)

    return (
        <BaseNavigationMenu.Link
            ref={ref}
            closeOnClick={closeOnClick}
            className={mergeClassName(insideContent ? contentLink : listLink, className)}
            {...props}
        />
    )
})

const navigationPositioner = `${positionerLayer} h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] transition-[top,left,right,bottom] ${morphTiming} data-[instant]:transition-none`

const navigationPopup = `${popupSurface} ${popupTransition} h-[var(--popup-height)] w-[var(--popup-width)] transition-[transform,opacity,width,height] ${morphTiming} data-[ending-style]:duration-150 data-[ending-style]:ease-out`

const navigationViewport = 'relative h-full w-full overflow-hidden'

const keepPreferredSide: BaseNavigationMenu.Positioner.Props['collisionAvoidance'] = { side: 'none' }

export type NavigationMenuPopupProps = BaseNavigationMenu.Popup.Props &
    Pick<BaseNavigationMenu.Positioner.Props, PositionerPropName> & {
        container?: BaseNavigationMenu.Portal.Props['container']
    }

const Popup = React.forwardRef<HTMLElement, NavigationMenuPopupProps>(function NavigationMenuPopup(
    { className, children, container, ...props },
    ref
) {
    const [positionerProps, popupProps] = splitProps(props, positionerPropNames)

    return (
        <BaseNavigationMenu.Portal container={container}>
            <BaseNavigationMenu.Positioner
                sideOffset={4}
                align="start"
                collisionAvoidance={keepPreferredSide}
                {...positionerProps}
                className={navigationPositioner}
            >
                <BaseNavigationMenu.Popup
                    ref={ref}
                    data-scheme="primary"
                    className={mergeClassName(navigationPopup, className)}
                    {...popupProps}
                >
                    {children}
                    <BaseNavigationMenu.Viewport className={navigationViewport} />
                </BaseNavigationMenu.Popup>
            </BaseNavigationMenu.Positioner>
        </BaseNavigationMenu.Portal>
    )
})

const Arrow = withClassName(BaseNavigationMenu.Arrow, `${popupArrow} transition-[left,right] ${morphTiming}`)

export const NavigationMenu = {
    Root: BaseNavigationMenu.Root,
    List,
    Item: BaseNavigationMenu.Item,
    Trigger,
    Icon,
    Content,
    Link,
    Popup,
    Arrow,
}
