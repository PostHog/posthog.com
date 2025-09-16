import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { AnimatePresence, motion, PanInfo, useDragControls } from 'framer-motion'
import {
    IconChevronDown,
    IconDocument,
    IconMinus,
    IconX,
    IconCollapse45Chevrons,
    IconExpand45Chevrons,
    IconSquare,
    IconArrowLeft,
    IconArrowRight,
} from '@posthog/icons'
import { Menu, MenuItem, useApp } from '../../context/App'
import { Provider as WindowProvider, AppWindow as AppWindowType, useWindow } from '../../context/Window'
import { ContextMenu, Dialog } from 'radix-ui'
import Tooltip from 'components/RadixUI/Tooltip'
import OSButton from 'components/OSButton'
import { Button } from 'components/Squeak/components/SubscribeButton'
import MenuBar, { MenuItemType } from 'components/RadixUI/MenuBar'
import { Popover } from '../RadixUI/Popover'
import { FileMenu } from '../RadixUI/FileMenu'
import { IMenu } from 'components/PostLayout/types'
import { Link, navigate } from 'gatsby'
import Inbox from 'components/Inbox'
import Handbook from '../../templates/Handbook'
import BlogPost from '../../templates/BlogPost'
import Legal from 'components/Legal'
import { getProseClasses } from '../../constants'
import KeyboardShortcut from 'components/KeyboardShortcut'
import { useToast } from '../../context/Toast'
import usePostHog from '../../hooks/usePostHog'

const recursiveSearch = (array: MenuItem[] | undefined, value: string): boolean => {
    if (!array) return false

    for (let i = 0; i < array.length; i++) {
        const element = array[i]

        if (element.url?.split('?')[0] === value) {
            return true
        }

        if (element.children) {
            const found = recursiveSearch(element.children, value)
            if (found) {
                return true
            }
        }
    }

    return false
}

const snapThreshold = -50

const Router = (props) => {
    const { minimizeWindow } = useApp()
    const { appWindow } = useWindow()
    const { children, path, minimizing, onExit } = props

    useEffect(() => {
        if (minimizing) {
            minimizeWindow(appWindow)
            // Trigger the animation in the TaskBarMenu
            const taskbarMenu = document.querySelector('#taskbar')
            if (taskbarMenu) {
                const event = new CustomEvent('windowMinimized')
                taskbarMenu.dispatchEvent(event)
            }
        }

        return () => {
            onExit()
        }
    }, [minimizing])

    if (/^\/questions/.test(path)) {
        return <Inbox {...props} />
    }
    if (/^\/handbook|^\/docs\/(?!api)|^\/manual/.test(path) && props.data?.post) {
        return <Handbook {...props} />
    }
    if ((props.pageContext?.post || /^posts/.test(path)) && props.data) {
        return <BlogPost {...props} />
    }
    if (['/terms', '/privacy', '/dpa', '/baa'].includes(path)) {
        return <Legal defaultTab={path}>{children}</Legal>
    }
    return (!props.minimizing || appWindow?.appSettings?.size?.autoHeight) && children
}

const WindowContainer = ({ children, closing }: { children: React.ReactNode; closing: boolean }) => {
    const { closeWindow } = useApp()
    const { appWindow } = useWindow()
    return (
        <AnimatePresence
            onExitComplete={() => {
                if (closing) {
                    closeWindow(appWindow)
                }
            }}
        >
            {children}
        </AnimatePresence>
    )
}

export default function AppWindow({ item, chrome = true }: { item: AppWindowType; chrome?: boolean }) {
    const { addToast, toasts } = useToast()
    const {
        minimizeWindow,
        bringToFront,
        focusedWindow,
        taskbarHeight,
        windows,
        updateWindowRef,
        updateWindow,
        getDesktopCenterPosition,
        handleSnapToSide,
        constraintsRef,
        expandWindow,
        siteSettings,
        updateSiteSettings,
        openNewChat,
        compact,
        menu: appMenu,
        taskbarRef,
    } = useApp()
    const isSSR = typeof window === 'undefined'
    const controls = useDragControls()
    const sizeConstraints = item.sizeConstraints
    const size = item.size
    const previousSize = item.previousSize
    const position = item.position
    const previousPosition = item.previousPosition
    const [snapIndicator, setSnapIndicator] = useState<'left' | 'right' | null>(null)
    const [windowOptionsTooltipVisible, setWindowOptionsTooltipVisible] = useState(false)
    const [menu, setMenu] = useState<IMenu[]>([])
    const [history, setHistory] = useState<string[]>([])
    const [activeHistoryIndex, setActiveHistoryIndex] = useState(0)
    const windowRef = useRef<HTMLDivElement>(null)
    const [rendered, setRendered] = useState(false)
    const [dragging, setDragging] = useState(false)
    const [leftResizing, setLeftResizing] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)
    const [pageOptions, setPageOptions] = useState<MenuItemType[]>()
    const [closing, setClosing] = useState(false)
    const [closed, setClosed] = useState(false)
    const [minimizing, setMinimizing] = useState(false)
    const [animating, setAnimating] = useState(true)
    const animationStartTimeRef = useRef<number | null>(null)
    const posthog = usePostHog()

    const inView = useMemo(() => {
        const windowsAbove = windows.filter(
            (window) => window !== item && window.zIndex > item.zIndex && !window.minimized
        )

        let coveredArea = 0
        const currentArea = size.width * size.height

        for (const windowAbove of windowsAbove) {
            const left = Math.max(position.x, windowAbove.position.x)
            const right = Math.min(position.x + size.width, windowAbove.position.x + windowAbove.size.width)
            const top = Math.max(position.y, windowAbove.position.y)
            const bottom = Math.min(position.y + size.height, windowAbove.position.y + windowAbove.size.height)

            if (left < right && top < bottom) {
                coveredArea += (right - left) * (bottom - top)
            }
        }

        return coveredArea / currentArea < 0.8
    }, [windows, item, position, size])

    const parent =
        (appMenu as Menu).find(({ children, url }) => {
            const currentURL = item?.path
            return currentURL === url?.split('?')[0] || recursiveSearch(children, currentURL)
        }) ||
        appMenu.find(({ url }) => url === `/${item?.path?.split('/')[1]}`) ||
        appMenu.find(({ name }) => name === 'Docs')

    const internalMenu = parent?.children || []

    const getActiveInternalMenu = useCallback(() => {
        return internalMenu?.find((menuItem: MenuItem) => {
            const currentURL = item?.path
            return currentURL === menuItem.url?.split('?')[0] || recursiveSearch(menuItem.children, currentURL)
        })
    }, [internalMenu, item])

    const [activeInternalMenu, setActiveInternalMenu] = useState<MenuItem | undefined>(getActiveInternalMenu())

    useEffect(() => {
        setMenu?.(internalMenu)
    }, [activeInternalMenu])

    useEffect(() => {
        if (windowRef.current) {
            updateWindowRef(item, windowRef)
        }
    }, [windowRef.current])

    const beyondViewport = (windowSize: { width: number; height: number }) => {
        const rightEdge = position.x + windowSize.width
        const bottomEdge = position.y + windowSize.height

        return (
            rightEdge > window.innerWidth ||
            bottomEdge > window.innerHeight - taskbarHeight ||
            position.x < 0 ||
            position.y < 0
        )
    }

    const handleResize = (
        item: AppWindowType,
        info: PanInfo,
        change: { fromLeft?: boolean } & ({ x: boolean } | { y: boolean } | { x: boolean; y: boolean })
    ) => {
        const update: { size?: { height?: number; width?: number }; position?: { x: number } } = {}
        if ('y' in change) update.size = { height: Math.max(size.height + info.delta.y, sizeConstraints.min.height) }
        if ('x' in change) {
            update.size ||= {}
            const delta = change.fromLeft ? -1 * info.delta.x : info.delta.x
            update.size.width = Math.max(size.width + delta, sizeConstraints.min.width)
            if (change.fromLeft) update.position = { x: item.position.x + size.width - update.size.width }
        }
        updateWindow(item, update)
    }

    const handleDoubleClick = () => {
        const newSize = beyondViewport(sizeConstraints.max)
            ? { width: window.innerWidth, height: window.innerHeight - taskbarHeight }
            : sizeConstraints.max
        updateWindow(item, {
            size: newSize,
            position: getDesktopCenterPosition(newSize),
        })
    }

    const collapseWindow = () => {
        const isBeyondViewport = beyondViewport(previousSize)
        const newSize = isBeyondViewport
            ? { width: window.innerWidth - 40, height: window.innerHeight - 40 - taskbarHeight }
            : previousSize
        updateWindow(item, {
            size: newSize,
            position: isBeyondViewport ? getDesktopCenterPosition(newSize) : previousPosition,
        })
    }

    const getActiveWindowsButtonPosition = () => {
        const activeWindowsButton = isSSR ? null : taskbarRef.current?.querySelector('[data-active-windows]')
        if (!activeWindowsButton) return { x: 0, y: 0 }
        const rect = activeWindowsButton.getBoundingClientRect()
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        }
    }

    const handleMinimize = () => {
        setMinimizing(true)
    }

    const handleDrag = (_event: any, info: any) => {
        if (!dragging) setDragging(true)
        if (item.fixedSize) return
        if (!constraintsRef.current) return

        const bounds = constraintsRef.current.getBoundingClientRect()
        const newX = position.x + info.offset.x

        if (newX < snapThreshold) {
            setSnapIndicator('left')
        } else if (newX > bounds.width - size.width - snapThreshold) {
            setSnapIndicator('right')
        } else {
            setSnapIndicator(null)
        }
    }

    const handleDragEnd = (_event: any, info: any) => {
        if (dragging) setDragging(false)
        if (!item.fixedSize && snapIndicator !== null) {
            handleSnapToSide(snapIndicator)
            setSnapIndicator(null)
            return
        } else {
            if (!constraintsRef.current) return

            const bounds = constraintsRef.current.getBoundingClientRect()
            const newX = position.x + info?.offset?.x
            const newY = position.y + info?.offset?.y

            if (newX >= 0 && newY >= 0 && newX + size.width <= bounds.width && newY + size.height <= bounds.height) {
                updateWindow(item, {
                    position: { x: newX, y: newY },
                })
            }
        }
    }

    const handleDragTransitionEnd = () => {
        if (!dragging) setDragging(false)
        if (!constraintsRef.current || !item.ref?.current) return

        const containerBounds = constraintsRef.current.getBoundingClientRect()
        const windowBounds = item.ref.current.getBoundingClientRect()

        const newX = windowBounds.left - containerBounds.left
        const newY = windowBounds.top - containerBounds.top

        updateWindow(item, {
            position: { x: newX, y: newY },
        })
    }

    const windowPosition = useMemo(() => {
        if (isSSR) return { x: 0, y: 0 }
        const activeWindowsPosition = getActiveWindowsButtonPosition()
        if (activeWindowsPosition.x === 0 && activeWindowsPosition.y === 0) {
            return undefined
        }
        return {
            x: activeWindowsPosition.x - size.width / 2,
            y: activeWindowsPosition.y - size.height / 2,
        }
    }, [size.width, size.height, taskbarRef.current])

    const canGoBack = history.length > 0 && activeHistoryIndex > 0
    const canGoForward = activeHistoryIndex < history.length - 1

    useEffect(() => {
        if (!item?.fromHistory) {
            setHistory((prev) => [...prev, item.path])
            setActiveHistoryIndex(history.length)
        }
        setActiveInternalMenu(getActiveInternalMenu())
    }, [item?.path])

    const goBack = () => {
        if (canGoBack) {
            setActiveHistoryIndex(activeHistoryIndex - 1)
            navigate(history[activeHistoryIndex - 1], {
                state: {
                    fromHistory: true,
                },
            })
        }
    }

    const goForward = () => {
        if (canGoForward) {
            setActiveHistoryIndex(activeHistoryIndex + 1)
            navigate(history[activeHistoryIndex + 1], {
                state: {
                    fromHistory: true,
                },
            })
        }
    }

    const handleMouseDown = () => {
        if (focusedWindow === item) return
        if (item.path.startsWith('/')) {
            navigate(item.path, { state: { newWindow: true } })
        } else {
            bringToFront(item)
        }
    }

    useEffect(() => {
        const handleResize = () => {
            if (beyondViewport(size)) {
                const newSize = {
                    width: Math.min(size.width, window.innerWidth),
                    height: Math.min(size.height, window.innerHeight - taskbarHeight),
                }

                const newPosition = {
                    x: Math.min(Math.max(0, position.x), window.innerWidth - newSize.width),
                    y: Math.min(Math.max(0, position.y), window.innerHeight - taskbarHeight - newSize.height),
                }

                updateWindow(item, {
                    size: newSize,
                    position: newPosition,
                })
            }
        }
        if (!isSSR) {
            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }
    }, [item])

    useEffect(() => {
        setRendered(true)
    }, [])

    useEffect(() => {
        const handleWindowClose = (event: CustomEvent) => {
            if (event.detail.windowKey === item.key) {
                handleClose()
            }
        }

        document.addEventListener('windowClose', handleWindowClose as EventListener)

        return () => {
            document.removeEventListener('windowClose', handleWindowClose as EventListener)
        }
    }, [item.key])

    const chatWindows = windows.filter((w) => w.key?.startsWith('ask-max'))
    const defaultPageOptions = useMemo(
        () => [
            {
                type: 'submenu',
                label: 'Ask Max about this page',
                items: [
                    {
                        type: 'item',
                        label: 'New Max chat',
                        onClick() {
                            openNewChat({
                                path: `ask-max-${item.path}`,
                                context: [{ type: 'page', value: { path: item.path, label: item.meta?.title } }],
                            })
                        },
                    },

                    ...(chatWindows.length > 0
                        ? [
                              {
                                  type: 'separator',
                              },
                              ...chatWindows.map((appWindow, index) => ({
                                  type: 'item',
                                  label: appWindow.meta?.title || `Chat ${index + 1}`,
                                  onClick: () => {
                                      const newAppWindow = updateWindow(appWindow, {
                                          element: {
                                              ...appWindow.element,
                                              props: {
                                                  ...appWindow.props,
                                                  context: [
                                                      {
                                                          type: 'page',
                                                          value: { path: item.path, label: item.meta?.title },
                                                      },
                                                  ],
                                              },
                                          },
                                      })
                                      bringToFront(newAppWindow)
                                  },
                              })),
                          ]
                        : []),
                ],
            },
            {
                type: 'item',
                label: 'Bookmark',
            },
        ],
        [item, chatWindows]
    )

    const handleClose = () => {
        setAnimating(true)
        setClosing(true)
        setTimeout(() => {
            setClosed(true)
        }, 0)
    }

    const onAnimationStart = () => {
        animationStartTimeRef.current = performance.now()
    }
    const onAnimationComplete = () => {
        setAnimating(false)
        const endTime = performance.now()
        const startTime = animationStartTimeRef.current || 0
        const duration = endTime - startTime
        if (
            duration > 700 &&
            !siteSettings.performanceBoost &&
            !toasts.some((toast) => toast.title === 'Animations running slow')
        ) {
            posthog?.capture('animation_performance_reduced')
            // addToast({
            //     title: 'Animations may be affecting performance',
            //     description: 'You can turn off animations to improve performance if needed.',
            //     actionLabel: 'Disable animations',
            //     onAction: () => {
            //         posthog?.capture('animation_performance_toast_action')
            //         updateSiteSettings({ ...siteSettings, performanceBoost: true })
            //         addToast({
            //             title: 'Animations have been disabled',
            //             description: (
            //                 <p className="max-w-sm">
            //                     Animations have been turned off to improve performance. You can change this setting in{' '}
            //                     <Link
            //                         to="/display-options"
            //                         className="font-semibold underline"
            //                         state={{ newWindow: true }}
            //                     >
            //                         display options
            //                     </Link>
            //                 </p>
            //             ),
            //             duration: 2000,
            //             onUndo: () => {
            //                 updateSiteSettings({ ...siteSettings, performanceBoost: false })
            //             },
            //         })
            //     },
            //     duration: 8000,
            // })
        }
        animationStartTimeRef.current = null
    }

    return (
        <WindowProvider
            appWindow={item}
            menu={menu}
            setMenu={setMenu}
            goBack={goBack}
            goForward={goForward}
            canGoBack={canGoBack}
            canGoForward={canGoForward}
            dragControls={controls}
            setPageOptions={setPageOptions}
            activeInternalMenu={activeInternalMenu}
            setActiveInternalMenu={setActiveInternalMenu}
            internalMenu={internalMenu}
            parent={parent}
        >
            <WindowContainer closing={closing}>
                {!item.minimized && !closed && (
                    <>
                        {snapIndicator && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.3 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-4 border-2 border-blue bg-blue/40 pointer-events-none rounded-md"
                                style={{
                                    left: snapIndicator === 'left' ? 0 : '50%',
                                    width: '50%',
                                    top: taskbarHeight,
                                    height: `calc(100% - ${taskbarHeight}px)`,
                                }}
                            />
                        )}
                        <motion.div
                            ref={windowRef}
                            data-app="AppWindow"
                            data-scheme="tertiary"
                            suppressHydrationWarning
                            className={`@container absolute !select-auto flex flex-col ${
                                item.appSettings?.size?.fixed ? 'bg-transparent' : 'bg-transparent'
                            } ${
                                siteSettings.experience === 'boring' && !item.appSettings?.size?.fixed
                                    ? 'border-b border-primary'
                                    : `${
                                          focusedWindow === item
                                              ? 'shadow-2xl border-primary'
                                              : 'shadow-lg border-input'
                                      } ${dragging ? '[&_*]:select-none' : ''} ${
                                          item.minimal
                                              ? '!shadow-none'
                                              : `flex flex-col ${
                                                    siteSettings.experience === 'boring' ? '' : 'border rounded'
                                                }`
                                      }`
                            } ${chrome ? 'overflow-hidden' : ''}`}
                            style={{
                                zIndex: item.zIndex,
                            }}
                            initial={{
                                scale: 0.08,
                                x: rendered
                                    ? siteSettings.experience === 'boring' || !windowPosition
                                        ? 0
                                        : windowPosition.x
                                    : item.fromOrigin?.x || windowPosition?.x || Math.round(position.x),
                                y: rendered
                                    ? siteSettings.experience === 'boring' || !windowPosition
                                        ? 0
                                        : windowPosition.y
                                    : item.fromOrigin?.y || windowPosition?.y || Math.round(position.y),
                                width: siteSettings.experience === 'boring' ? '100%' : size.width,
                                height:
                                    siteSettings.experience === 'boring'
                                        ? '100%'
                                        : item.appSettings?.size?.autoHeight
                                        ? 'auto'
                                        : size.height,
                            }}
                            animate={{
                                scale: 1,
                                x: siteSettings.experience === 'boring' ? 0 : Math.round(position.x),
                                y: siteSettings.experience === 'boring' ? 0 : Math.round(position.y),
                                width: siteSettings.experience === 'boring' ? '100%' : size.width,
                                height:
                                    siteSettings.experience === 'boring'
                                        ? '100%'
                                        : item.appSettings?.size?.autoHeight
                                        ? 'auto'
                                        : size.height,
                                transition: {
                                    duration:
                                        siteSettings.experience === 'boring' ||
                                        siteSettings.performanceBoost ||
                                        leftResizing
                                            ? 0
                                            : 0.2,
                                    scale: {
                                        duration:
                                            siteSettings.experience === 'boring' ||
                                            siteSettings.performanceBoost ||
                                            !windowPosition
                                                ? 0
                                                : 0.2,
                                        delay:
                                            siteSettings.experience === 'boring' ||
                                            siteSettings.performanceBoost ||
                                            !windowPosition
                                                ? 0
                                                : 0.2,
                                        ease: [0.2, 0.2, 0.8, 1],
                                    },
                                    width: {
                                        duration: 0,
                                    },
                                    height: {
                                        duration: 0,
                                    },
                                },
                            }}
                            exit={{
                                scale: 0.005,
                                ...(closing || !windowPosition ? {} : { x: windowPosition.x, y: windowPosition.y }),
                                transition: {
                                    scale: {
                                        duration:
                                            siteSettings.experience === 'boring' || siteSettings.performanceBoost
                                                ? 0
                                                : 0.23,
                                        ease: [0.2, 0.2, 0.8, 1],
                                    },
                                    x: {
                                        duration: 0.23,
                                        ease: [0.2, 0.2, 0.8, 1],
                                    },
                                    y: {
                                        duration: 0.23,
                                        ease: [0.2, 0.2, 0.8, 1],
                                    },
                                },
                            }}
                            drag={siteSettings.experience === 'posthog'}
                            dragControls={controls}
                            dragListener={false}
                            dragMomentum={false}
                            dragConstraints={constraintsRef}
                            onDrag={handleDrag}
                            onDragEnd={handleDragEnd}
                            onDragTransitionEnd={handleDragTransitionEnd}
                            onMouseDown={handleMouseDown}
                            onAnimationStart={onAnimationStart}
                            onAnimationComplete={onAnimationComplete}
                        >
                            {!item.minimal && !compact && (
                                <div
                                    data-scheme="tertiary"
                                    onDoubleClick={handleDoubleClick}
                                    className={`flex-shrink-0 w-full flex @md:grid grid-cols-[minmax(100px,auto)_1fr_minmax(100px,auto)] gap-1 items-center py-0.5 pl-1.5 pr-0.5 bg-primary/50 backdrop-blur-3xl skin-classic:bg-primary border-b border-input ${
                                        siteSettings.experience === 'boring' ? '' : 'cursor-move'
                                    }`}
                                    onPointerDown={(e) => controls.start(e)}
                                >
                                    <MenuBar
                                        menus={[
                                            {
                                                trigger: (
                                                    <>
                                                        <IconDocument className="size-5" />
                                                        <IconChevronDown className="size-6 -mx-1.5 text-muted group-hover:text-primary data-[state=open]:text-primary" />
                                                    </>
                                                ),
                                                items: [
                                                    ...(pageOptions || defaultPageOptions),
                                                    {
                                                        type: 'item',
                                                        label: 'Close',
                                                        onClick: handleClose,
                                                        shortcut: ['Shift', 'W'],
                                                    },
                                                ],
                                            },
                                        ]}
                                    />

                                    <div className="flex-1 truncate flex items-center justify-start @md:justify-center">
                                        {menu && menu.length > 0 ? (
                                            <Popover
                                                trigger={
                                                    <button className="text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark text-left items-center justify-center text-sm font-semibold flex select-none">
                                                        {(item.meta?.title && item.meta.title) ||
                                                            activeInternalMenu?.name}
                                                        <IconChevronDown className="size-6 -m-1" />
                                                    </button>
                                                }
                                                dataScheme="primary"
                                                contentClassName="w-auto p-0 border border-primary"
                                                header={false}
                                            >
                                                <FileMenu menu={menu} />
                                            </Popover>
                                        ) : (
                                            <div className="text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark text-left items-center justify-center text-sm font-semibold flex select-none">
                                                {item.meta?.title && item.meta.title}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-end">
                                        {siteSettings.experience !== 'boring' && (
                                            <>
                                                <OSButton size="xs" onClick={handleMinimize} className="">
                                                    <IconMinus className="size-4 relative top-1" />
                                                </OSButton>

                                                <ContextMenu.Root
                                                    onOpenChange={() => setWindowOptionsTooltipVisible(false)}
                                                >
                                                    <ContextMenu.Trigger
                                                        className="data-[highlighted]:bg-accent data-[state=open]:bg-accent"
                                                        asChild
                                                    >
                                                        {!item.fixedSize && (
                                                            <OSButton
                                                                size="xs"
                                                                onClick={() => {
                                                                    setWindowOptionsTooltipVisible(false)
                                                                    if (size.width >= window?.innerWidth) {
                                                                        collapseWindow()
                                                                    } else {
                                                                        expandWindow()
                                                                    }
                                                                }}
                                                                onMouseEnter={() => {
                                                                    setWindowOptionsTooltipVisible(true)
                                                                }}
                                                                onMouseLeave={() => {
                                                                    setWindowOptionsTooltipVisible(false)
                                                                }}
                                                                className=" group"
                                                            >
                                                                <Tooltip
                                                                    trigger={
                                                                        <span>
                                                                            <IconSquare className="size-5 group-hover:hidden" />
                                                                            {!isSSR &&
                                                                            size.width >= window?.innerWidth ? (
                                                                                <IconCollapse45Chevrons className="size-6 -m-0.5 hidden group-hover:block" />
                                                                            ) : (
                                                                                <IconExpand45Chevrons className="size-6 -m-0.5 hidden group-hover:block" />
                                                                            )}
                                                                        </span>
                                                                    }
                                                                    open={windowOptionsTooltipVisible}
                                                                >
                                                                    Right click for more options
                                                                </Tooltip>
                                                            </OSButton>
                                                        )}
                                                    </ContextMenu.Trigger>
                                                    <ContextMenu.Portal>
                                                        <ContextMenu.Content
                                                            className="min-w-[220px] rounded-md bg-white dark:bg-accent-dark p-1 shadow-xl"
                                                            data-scheme="primary"
                                                        >
                                                            <ContextMenu.Label className="px-2.5 text-[13px] leading-[25px] text-muted">
                                                                Snap to...
                                                            </ContextMenu.Label>
                                                            <ContextMenu.Item
                                                                className="group relative flex h-[25px] select-none items-center rounded px-2.5 text-sm leading-none text-primary hover:bg-accent outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-input-bg data-[disabled]:text-muted"
                                                                onClick={() => handleSnapToSide('left')}
                                                            >
                                                                Left half
                                                                <div className="ml-auto pl-5 text-secondary group-data-[disabled]:text-muted group-data-[highlighted]:text-primary">
                                                                    <KeyboardShortcut text="Shift" size="xs" />
                                                                    <KeyboardShortcut
                                                                        text={
                                                                            <IconArrowLeft className="size-3 inline-block" />
                                                                        }
                                                                        size="xs"
                                                                    />
                                                                </div>
                                                            </ContextMenu.Item>
                                                            <ContextMenu.Item
                                                                className="group relative flex h-[25px] select-none items-center rounded px-2.5 text-sm leading-none text-primary hover:bg-accent outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-input-bg data-[disabled]:text-muted"
                                                                onClick={() => handleSnapToSide('right')}
                                                            >
                                                                Right half
                                                                <div className="ml-auto pl-5 text-secondary group-data-[disabled]:text-muted group-data-[highlighted]:text-primary">
                                                                    <KeyboardShortcut text="Shift" size="xs" />
                                                                    <KeyboardShortcut
                                                                        text={
                                                                            <IconArrowRight className="size-3 inline-block" />
                                                                        }
                                                                        size="xs"
                                                                    />
                                                                </div>
                                                            </ContextMenu.Item>
                                                            <ContextMenu.Separator className="m-[5px] h-px bg-border" />
                                                            <ContextMenu.Label className="px-2.5 text-[13px] leading-[25px] text-muted">
                                                                Resize
                                                            </ContextMenu.Label>
                                                            <ContextMenu.Item
                                                                disabled={
                                                                    size.width === (isSSR ? 0 : window?.innerWidth)
                                                                }
                                                                className="group relative flex h-[25px] select-none items-center rounded px-2.5 text-sm leading-none text-primary hover:bg-accent outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-input-bg data-[disabled]:text-muted"
                                                                onClick={expandWindow}
                                                            >
                                                                Maximize
                                                                <div className="ml-auto pl-5 text-secondary group-data-[disabled]:text-muted group-data-[highlighted]:text-primary">
                                                                    <KeyboardShortcut text="Shift" size="xs" />
                                                                    <KeyboardShortcut
                                                                        text={
                                                                            <IconArrowRight className="size-3 inline-block -rotate-90" />
                                                                        }
                                                                        size="xs"
                                                                    />
                                                                </div>
                                                            </ContextMenu.Item>
                                                        </ContextMenu.Content>
                                                    </ContextMenu.Portal>
                                                </ContextMenu.Root>
                                            </>
                                        )}
                                        <Tooltip
                                            trigger={<OSButton size="md" onClick={handleClose} icon={<IconX />} />}
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <span>Close window</span>
                                                <div>
                                                    <KeyboardShortcut text="Shift" size="xs" />
                                                    &nbsp;
                                                    <KeyboardShortcut text="W" size="xs" />
                                                </div>
                                            </div>
                                        </Tooltip>
                                    </div>
                                </div>
                            )}
                            <div
                                ref={contentRef}
                                className={`size-full flex-grow ${
                                    chrome ? 'bg-light dark:bg-dark overflow-hidden' : ''
                                }`}
                            >
                                {(!animating || isSSR || item.appSettings?.size?.autoHeight) && (
                                    <Router
                                        minimizing={minimizing}
                                        onExit={() => {
                                            if (minimizing) {
                                                setMinimizing(false)
                                                if (siteSettings.experience === 'posthog') {
                                                    setAnimating(true)
                                                }
                                            }
                                        }}
                                        {...item.props}
                                    >
                                        {item.element}
                                    </Router>
                                )}
                            </div>
                            {!item.fixedSize && !item.minimal && (
                                <>
                                    <motion.div
                                        data-scheme="tertiary"
                                        className="group absolute right-0 top-0 w-1.5 bottom-6 cursor-ew-resize !transform-none"
                                        drag="x"
                                        dragMomentum={false}
                                        dragConstraints={{ left: 0, right: 0 }}
                                        onDrag={(_event, info) => handleResize(item, info, { x: true })}
                                    >
                                        <div className="relative w-full h-full">
                                            <div className="hidden group-hover:block absolute inset-y-0 right-0 w-[2px] bg-light-8" />
                                            <div className="hidden group-hover:block absolute -bottom-6 h-6 right-0 w-[2px] bg-light-8" />
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        data-scheme="tertiary"
                                        className="group absolute left-0 top-0 w-1.5 bottom-6 cursor-ew-resize !transform-none"
                                        drag="x"
                                        dragMomentum={false}
                                        dragConstraints={{ left: 0, right: 0 }}
                                        onDragStart={() => setLeftResizing(true)}
                                        onDrag={(_event, info) => handleResize(item, info, { x: true, fromLeft: true })}
                                        onDragEnd={() => setLeftResizing(false)}
                                    >
                                        <div className="relative w-full h-full">
                                            <div className="hidden group-hover:block absolute inset-y-0 left-0 w-[2px] bg-light-8" />
                                            <div className="hidden group-hover:block absolute -bottom-6 h-6 left-0 w-[2px] bg-light-8" />
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        data-scheme="tertiary"
                                        className="group absolute bottom-0 left-0 right-6 h-1.5 cursor-ns-resize !transform-none"
                                        drag="y"
                                        dragMomentum={false}
                                        dragConstraints={{ top: 0, bottom: 0 }}
                                        onDrag={(_event, info) => handleResize(item, info, { y: true })}
                                    >
                                        <div className="relative w-full h-full">
                                            <div className="hidden group-hover:block absolute inset-x-0 bottom-0 h-[2px] bg-light-8" />
                                            <div className="hidden group-hover:block absolute bottom-0 -right-6 w-6 h-[2px] bg-light-8" />
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        className="group absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-center justify-center !transform-none"
                                        drag
                                        dragMomentum={false}
                                        dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
                                        onDrag={(_event, info) => handleResize(item, info, { x: true, y: true })}
                                    >
                                        <div className="hidden group-hover:block relative w-full h-full border-b border-r border-transparent overflow-hidden rounded-bl">
                                            <div className="absolute -bottom-10 -right-10 group-hover:-bottom-5 group-hover:-right-5 transition-all h-8 w-8 bg-accent-2 border-t border-light-8 -rotate-45" />
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        className="group absolute bottom-0 left-0 w-6 h-6 cursor-sw-resize flex items-center justify-center !transform-none"
                                        drag
                                        dragMomentum={false}
                                        dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
                                        onDragStart={() => setLeftResizing(true)}
                                        onDrag={(_event, info) =>
                                            handleResize(item, info, { x: true, y: true, fromLeft: true })
                                        }
                                        onDragEnd={() => setLeftResizing(false)}
                                    >
                                        <div className="hidden group-hover:block relative w-full h-full border-b border-r border-transparent overflow-hidden rounded-bl">
                                            <div className="absolute -bottom-10 -left-10 group-hover:-bottom-5 group-hover:-left-5 transition-all h-8 w-8 bg-accent-2 border-t border-light-8 rotate-45" />
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </motion.div>
                    </>
                )}
            </WindowContainer>
        </WindowProvider>
    )
}
