import React from 'react'
import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { cn } from '../../../utils'
import { focusRing, surfaceDivider } from '../styles'
import { assignRef, mergeClassName, useSmoothHeight, withClassName } from '../utils'

type Appearance = 'pane' | 'underline'
const AppearanceContext = React.createContext<Appearance>('pane')
const root = 'flex w-full flex-col gap-2 data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-start'

const Root = React.forwardRef<HTMLDivElement, Omit<BaseTabs.Root.Props, 'ref'> & { appearance?: Appearance }>(
    function TabsRoot({ appearance = 'pane', className, onValueChange, ...props }, ref) {
        const tabChanged = React.useRef(false)
        const smoothHeight = useSmoothHeight(() => {
            const changed = tabChanged.current
            tabChanged.current = false
            return changed
        })
        const setRef = React.useCallback(
            (element: HTMLDivElement | null) => {
                smoothHeight(element)
                assignRef(ref, element)
            },
            [ref, smoothHeight]
        )
        const changeTab: BaseTabs.Root.Props['onValueChange'] = (...args) => {
            tabChanged.current = true
            onValueChange?.(...args)
        }
        return (
            <AppearanceContext.Provider value={appearance}>
                <BaseTabs.Root
                    ref={setRef}
                    className={mergeClassName(root, className)}
                    onValueChange={changeTab}
                    {...props}
                />
            </AppearanceContext.Provider>
        )
    }
)

const Indicator = withClassName(
    BaseTabs.Indicator,
    'pointer-events-none absolute -bottom-px left-0 h-0.5 w-[var(--active-tab-width)] bg-orange [transform:translateX(var(--active-tab-left))] transition-[transform,width,height] duration-200 ease-out data-[orientation=vertical]:-left-px data-[orientation=vertical]:top-0 data-[orientation=vertical]:bottom-auto data-[orientation=vertical]:h-[var(--active-tab-height)] data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:[transform:translateY(var(--active-tab-top))] motion-reduce:transition-none'
)

const List = React.forwardRef<HTMLDivElement, Omit<BaseTabs.List.Props, 'ref'>>(function TabsList(
    { className, children, ...props },
    ref
) {
    const appearance = React.useContext(AppearanceContext)
    return (
        <BaseTabs.List
            ref={ref}
            className={mergeClassName(
                cn(
                    'relative flex shrink-0 gap-0.5 data-[orientation=vertical]:flex-col',
                    appearance === 'pane'
                        ? 'p-1'
                        : `border-b data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-l ${surfaceDivider}`
                ),
                className
            )}
            {...props}
        >
            {children}
            {appearance === 'underline' && <Indicator />}
        </BaseTabs.List>
    )
})

const tab = cn(
    'group flex cursor-default select-none items-center whitespace-nowrap rounded px-3 py-2 text-[15px] leading-tight text-primary',
    'transition-[background-color,color] duration-200 ease-out motion-reduce:transition-none',
    'data-[disabled]:pointer-events-none data-[disabled]:text-muted',
    focusRing
)

const paneTab =
    'hover:bg-[rgb(var(--text-primary)/0.06)] data-[active]:bg-white/60 data-[active]:shadow-[inset_0_0_0_1px_rgb(var(--text-primary)/0.12),0_1px_0_rgb(var(--text-primary)/0.12),0_1px_2px_rgb(0_0_0/0.06)] dark:data-[active]:bg-white/[0.1]'
const underlineTab = 'rounded-none bg-transparent text-secondary hover:text-primary data-[active]:text-primary'

const label = 'col-start-1 row-start-1 flex items-center gap-2'

const Tab = React.forwardRef<HTMLElement, Omit<BaseTabs.Tab.Props, 'ref'>>(function TabsTab(
    { className, children, ...props },
    ref
) {
    const appearance = React.useContext(AppearanceContext)
    return (
        <BaseTabs.Tab
            ref={ref}
            className={mergeClassName(cn(tab, appearance === 'pane' ? paneTab : underlineTab), className)}
            {...props}
        >
            <span className="grid">
                <span aria-hidden className={cn(label, 'invisible font-bold')}>
                    {children}
                </span>
                <span className={cn(label, 'group-data-[active]:font-bold')}>{children}</span>
            </span>
        </BaseTabs.Tab>
    )
})

const Panel = withClassName(
    BaseTabs.Panel,
    `grow rounded text-[15px] text-primary transition-opacity duration-200 ease-out data-[starting-style]:opacity-0 motion-reduce:transition-none ${focusRing}`
)

export const Tabs = { Root, List, Tab, Panel }
