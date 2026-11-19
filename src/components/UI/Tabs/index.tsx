import React from 'react'
import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { Button, ButtonGroup } from '../Button'
import type { ButtonAppearance, ButtonSize } from '../Button'
import { focusRing } from '../styles'
import {
    HEIGHT_CHANGE_MS,
    assignRef,
    mergeClassName,
    useIsomorphicLayoutEffect,
    useSmoothHeight,
    withClassName,
} from '../utils'

const TAB_CHANGE_WINDOW_MS = HEIGHT_CHANGE_MS * 2

type TabsLook = {
    appearance: ButtonAppearance
    size: ButtonSize
    orientation: 'horizontal' | 'vertical'
}

const LookContext = React.createContext<TabsLook>({
    appearance: 'outline',
    size: 'md',
    orientation: 'horizontal',
})

const root =
    'flex w-full flex-col gap-2 [&[data-orientation=horizontal]>*]:shrink-0 [&[data-orientation=horizontal]>[role=tablist]]:self-start data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-start'

export type TabsRootProps = Omit<BaseTabs.Root.Props, 'ref'> & {
    appearance?: ButtonAppearance
    size?: ButtonSize
}

const Root = React.forwardRef<HTMLDivElement, TabsRootProps>(function TabsRoot(
    { appearance = 'outline', size = 'md', orientation = 'horizontal', className, onValueChange, ...props },
    ref
) {
    const tabChanged = React.useRef(false)
    const clearTabChange = React.useRef<ReturnType<typeof setTimeout>>()
    const smoothHeight = useSmoothHeight(() => tabChanged.current)
    const markTabChange = React.useCallback(() => {
        tabChanged.current = true
        clearTimeout(clearTabChange.current)
        clearTabChange.current = setTimeout(() => {
            tabChanged.current = false
        }, TAB_CHANGE_WINDOW_MS)
    }, [])
    React.useEffect(() => () => clearTimeout(clearTabChange.current), [])
    const controlledValue = props.value
    const previousValue = React.useRef(controlledValue)
    useIsomorphicLayoutEffect(() => {
        if (controlledValue === previousValue.current) return
        previousValue.current = controlledValue
        markTabChange()
    }, [controlledValue, markTabChange])
    const setRef = React.useCallback(
        (element: HTMLDivElement | null) => {
            smoothHeight(element)
            assignRef(ref, element)
        },
        [ref, smoothHeight]
    )
    const changeTab: BaseTabs.Root.Props['onValueChange'] = (...args) => {
        markTabChange()
        onValueChange?.(...args)
    }
    const look = React.useMemo(() => ({ appearance, size, orientation }), [appearance, size, orientation])
    return (
        <LookContext.Provider value={look}>
            <BaseTabs.Root
                ref={setRef}
                className={mergeClassName(root, className)}
                orientation={orientation}
                onValueChange={changeTab}
                {...props}
            />
        </LookContext.Provider>
    )
})

const List = React.forwardRef<HTMLDivElement, Omit<BaseTabs.List.Props, 'ref' | 'render'>>(function TabsList(
    props,
    ref
) {
    const { appearance, size, orientation } = React.useContext(LookContext)
    return (
        <BaseTabs.List
            ref={ref}
            render={<ButtonGroup appearance={appearance} size={size} orientation={orientation} />}
            {...props}
        />
    )
})

const Tab = React.forwardRef<HTMLElement, Omit<BaseTabs.Tab.Props, 'ref' | 'render'>>(function TabsTab(props, ref) {
    const { appearance, size } = React.useContext(LookContext)
    return (
        <BaseTabs.Tab
            ref={ref}
            render={(tabProps, state) => (
                <Button
                    {...tabProps}
                    appearance={appearance}
                    size={size}
                    data-pressed={state.active ? '' : undefined}
                />
            )}
            {...props}
        />
    )
})

const Panel = withClassName(
    BaseTabs.Panel,
    `grow rounded text-15 text-primary transition-opacity duration-200 ease-out data-[starting-style]:opacity-0 motion-reduce:transition-none ${focusRing}`
)

export const Tabs = { Root, List, Tab, Panel }
