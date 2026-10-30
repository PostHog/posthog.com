import React from 'react'
import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import { cn } from '../../../utils'
import { Dialog, scrollBodyRoot, scrollBodyViewport } from '../Dialog'
import { ScrollArea } from '../ScrollArea'
import { dialogBackdrop, dialogSurface, overlayLayer } from '../styles'

type DrawerSwipeDirection = BaseDrawer.Popup.State['swipeDirection']

const DrawerModalContext = React.createContext<BaseDrawer.Root.Props['modal']>(true)

function Root<Payload = unknown>({ modal = true, ...props }: BaseDrawer.Root.Props<Payload>): JSX.Element {
    return (
        <DrawerModalContext.Provider value={modal}>
            <BaseDrawer.Root modal={modal} {...props} />
        </DrawerModalContext.Provider>
    )
}

const drawerTiming =
    'duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] motion-reduce:transition-none'

const drawerBackdrop = cn(
    dialogBackdrop,
    `opacity-[calc(1_-_var(--drawer-swipe-progress))] data-[swiping]:duration-0 ${drawerTiming}`
)

const drawerViewport = `fixed inset-0 ${overlayLayer}`

const drawerPopup = `${dialogSurface} absolute flex flex-col overflow-hidden transition-transform data-[swiping]:select-none ${drawerTiming}`

const drawerPopupSides: Record<DrawerSwipeDirection, string> = {
    down: 'inset-x-2 bottom-2 mx-auto max-h-[calc(100%-4rem)] max-w-2xl [transform:translateY(var(--drawer-swipe-movement-y))] data-[ending-style]:[transform:translateY(calc(100%+1rem))] data-[starting-style]:[transform:translateY(calc(100%+1rem))]',
    up: 'inset-x-2 top-2 mx-auto max-h-[calc(100%-4rem)] max-w-2xl [transform:translateY(var(--drawer-swipe-movement-y))] data-[ending-style]:[transform:translateY(calc(-100%-1rem))] data-[starting-style]:[transform:translateY(calc(-100%-1rem))]',
    right: 'inset-y-2 right-2 w-96 max-w-[calc(100%-4rem)] [transform:translateX(var(--drawer-swipe-movement-x))] data-[ending-style]:[transform:translateX(calc(100%+1rem))] data-[starting-style]:[transform:translateX(calc(100%+1rem))]',
    left: 'inset-y-2 left-2 w-96 max-w-[calc(100%-4rem)] [transform:translateX(var(--drawer-swipe-movement-x))] data-[ending-style]:[transform:translateX(calc(-100%-1rem))] data-[starting-style]:[transform:translateX(calc(-100%-1rem))]',
}

const drawerGrabHandle =
    'pointer-events-none absolute inset-x-0 top-[3px] z-[1] mx-auto hidden h-1 w-9 rounded-full bg-[rgb(var(--text-primary)/0.25)] [[data-swipe-direction=down]>&]:block'

export type DrawerPopupProps = BaseDrawer.Popup.Props & {
    container?: BaseDrawer.Portal.Props['container']
}

function drawerPopupClassName(className: DrawerPopupProps['className']) {
    return (state: BaseDrawer.Popup.State): string =>
        cn(
            drawerPopup,
            drawerPopupSides[state.swipeDirection],
            typeof className === 'function' ? className(state) : className
        )
}

const Popup = React.forwardRef<HTMLDivElement, DrawerPopupProps>(function DrawerPopup(
    { className, container, children, ...props },
    ref
) {
    const modal = React.useContext(DrawerModalContext)
    return (
        <BaseDrawer.Portal container={container}>
            {modal === true && <BaseDrawer.Backdrop className={drawerBackdrop} />}
            <BaseDrawer.Viewport className={cn(drawerViewport, modal !== true && 'pointer-events-none')}>
                <BaseDrawer.Popup
                    ref={ref}
                    data-scheme="primary"
                    className={drawerPopupClassName((state) =>
                        cn('pointer-events-auto', typeof className === 'function' ? className(state) : className)
                    )}
                    {...props}
                >
                    <div aria-hidden className={drawerGrabHandle} />
                    {children}
                </BaseDrawer.Popup>
            </BaseDrawer.Viewport>
        </BaseDrawer.Portal>
    )
})

export type DrawerContentProps = Omit<BaseDrawer.Content.Props, 'className'> & { className?: string }

const Content = React.forwardRef<HTMLDivElement, DrawerContentProps>(function DrawerContent(
    { className, children, ...props },
    ref
) {
    return (
        <BaseDrawer.Content className={scrollBodyRoot} {...props}>
            <ScrollArea.Root className={scrollBodyRoot}>
                <ScrollArea.Viewport ref={ref} className={cn(`${scrollBodyViewport} p-4`, className)}>
                    {children}
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar>
                    <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        </BaseDrawer.Content>
    )
})

export const Drawer = {
    Provider: BaseDrawer.Provider,
    IndentBackground: BaseDrawer.IndentBackground,
    Indent: BaseDrawer.Indent,
    Root,
    Trigger: BaseDrawer.Trigger,
    SwipeArea: BaseDrawer.SwipeArea,
    Popup,
    Content,
    Header: Dialog.Header,
    Footer: Dialog.Footer,
    Title: Dialog.Title,
    Description: Dialog.Description,
    Close: BaseDrawer.Close,
    VirtualKeyboardProvider: BaseDrawer.VirtualKeyboardProvider,
    createHandle: BaseDrawer.createHandle,
    Handle: BaseDrawer.Handle,
}
