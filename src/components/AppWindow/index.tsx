import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
    IconTerminal,
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
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'

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

const Router = React.memo(function Router(props: any) {
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
})

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
    const [dragging, setDragging] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)
    const [pageOptions, setPageOptions] = useState<MenuItemType[]>()
    const [closing, setClosing] = useState(false)
    const [closed, setClosed] = useState(false)
    const [minimizing, setMinimizing] = useState(false)
    const [animating, setAnimating] = useState(siteSettings.experience === 'posthog' && !siteSettings.performanceBoost)
    const animationStartTimeRef = useRef<number | null>(null)
    const posthog = usePostHog()
    const [view, setView] = useState<'marketing' | 'developer'>('marketing')
    const [hasDeveloperMode, setHasDeveloperMode] = useState(false)

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

    // Resize/drag preview - pure DOM manipulation, no React during drag
    const resizeRef = useRef<{
        x: number
        y: number
        w: number
        h: number
        px: number
        py: number
        left: boolean
    } | null>(null)
    const dragRef = useRef<{
        startX: number
        startY: number
        startPosX: number
        startPosY: number
    } | null>(null)
    const previewRef = useRef<HTMLDivElement>(null)

    const startResize = useCallback(
        (e: React.PointerEvent, left = false) => {
            e.preventDefault()
            ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
            document.body.classList.add('resizing-window')

            const preview = previewRef.current
            if (preview) {
                preview.style.display = 'block'
                preview.style.left = `${position.x}px`
                preview.style.top = `${position.y}px`
                preview.style.width = `${size.width}px`
                preview.style.height = `${size.height}px`
            }

            resizeRef.current = {
                x: e.clientX,
                y: e.clientY,
                w: size.width,
                h: size.height,
                px: position.x,
                py: position.y,
                left,
            }
        },
        [size.width, size.height, position.x, position.y]
    )

    const onResize = useCallback(
        (e: React.PointerEvent) => {
            const r = resizeRef.current
            const preview = previewRef.current
            if (!r || !preview) return

            const dx = e.clientX - r.x
            const dy = e.clientY - r.y
            const w = Math.max(r.left ? r.w - dx : r.w + dx, sizeConstraints.min.width)
            const h = Math.max(r.h + dy, sizeConstraints.min.height)
            const x = r.left ? r.px + r.w - w : r.px

            preview.style.left = `${x}px`
            preview.style.width = `${w}px`
            preview.style.height = `${h}px`
        },
        [sizeConstraints.min.width, sizeConstraints.min.height]
    )

    const endResize = useCallback(
        (e: React.PointerEvent) => {
            const r = resizeRef.current
            const preview = previewRef.current
            if (!r) return
            ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
            document.body.classList.remove('resizing-window')

            // Get final values from DOM
            const w = parseInt(preview?.style.width || '0')
            const h = parseInt(preview?.style.height || '0')
            const x = parseInt(preview?.style.left || '0')

            if (preview) preview.style.display = 'none'

            updateWindow(item, {
                size: { width: w, height: h },
                ...(r.left && { position: { x } }),
            })

            resizeRef.current = null
        },
        [item, updateWindow]
    )

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

    // Drag preview - pure DOM manipulation, no React during drag
    const startDrag = useCallback(
        (e: React.PointerEvent) => {
            if (siteSettings.experience === 'boring') return
            e.preventDefault()
            ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
            document.body.classList.add('window-dragging')

            const preview = previewRef.current
            if (preview) {
                preview.style.display = 'block'
                preview.style.left = `${position.x}px`
                preview.style.top = `${position.y}px`
                preview.style.width = `${size.width}px`
                preview.style.height = `${size.height}px`
            }

            dragRef.current = {
                startX: e.clientX,
                startY: e.clientY,
                startPosX: position.x,
                startPosY: position.y,
            }
            setDragging(true)
        },
        [position.x, position.y, size.width, size.height, siteSettings.experience]
    )

    const onDrag = useCallback(
        (e: React.PointerEvent) => {
            const d = dragRef.current
            const preview = previewRef.current
            if (!d || !preview || !constraintsRef.current) return

            const bounds = constraintsRef.current.getBoundingClientRect()
            const dx = e.clientX - d.startX
            const dy = e.clientY - d.startY

            // Constrain to bounds
            const newX = Math.max(0, Math.min(d.startPosX + dx, bounds.width - size.width))
            const newY = Math.max(0, Math.min(d.startPosY + dy, bounds.height - size.height))

            preview.style.left = `${newX}px`
            preview.style.top = `${newY}px`

            // Check for snap indicators
            if (!item.fixedSize) {
                const newSnapIndicator =
                    newX < -snapThreshold ? 'left' : newX > bounds.width - size.width + snapThreshold ? 'right' : null

                if (newSnapIndicator !== snapIndicator) {
                    setSnapIndicator(newSnapIndicator)
                }
            }
        },
        [size.width, size.height, item.fixedSize, snapIndicator, constraintsRef]
    )

    const endDrag = useCallback(
        (e: React.PointerEvent) => {
            const d = dragRef.current
            const preview = previewRef.current
            if (!d) return
            ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
            document.body.classList.remove('window-dragging')

            // Get final position from preview
            const newX = parseInt(preview?.style.left || '0')
            const newY = parseInt(preview?.style.top || '0')

            if (preview) preview.style.display = 'none'

            // Handle snap
            if (!item.fixedSize && snapIndicator !== null) {
                handleSnapToSide(snapIndicator)
                setSnapIndicator(null)
            } else {
                updateWindow(item, {
                    position: { x: newX, y: newY },
                })
            }

            dragRef.current = null
            setDragging(false)
        },
        [item, updateWindow, snapIndicator, handleSnapToSide]
    )

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
            navigate(`${item.path}${item.location?.search || ''}`, { state: { newWindow: true } })
        } else {
            bringToFront(item)
        }
    }

    const handleRouterExit = useCallback(() => {
        if (minimizing) {
            setMinimizing(false)
            if (siteSettings.experience === 'posthog') {
                setAnimating(true)
            }
        }
    }, [minimizing, siteSettings.experience])

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
                label: 'Ask PostHog AI about this page',
                items: [
                    {
                        type: 'item',
                        label: 'New PostHog AI chat',
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
            setPageOptions={setPageOptions}
            activeInternalMenu={activeInternalMenu}
            setActiveInternalMenu={setActiveInternalMenu}
            internalMenu={internalMenu}
            parent={parent}
            view={view}
            setView={setView}
            hasDeveloperMode={hasDeveloperMode}
            setHasDeveloperMode={setHasDeveloperMode}
        >
            <WindowContainer closing={closing}>
                {!item.minimized && !closed && (
                    <>
                        <div
                            className={`fixed inset-4 border-2 border-blue bg-blue/40 pointer-events-none rounded-md transition-opacity duration-150 ${
                                snapIndicator ? 'opacity-30' : 'opacity-0 pointer-events-none'
                            }`}
                            style={{
                                left: snapIndicator === 'left' ? 0 : '50%',
                                width: '50%',
                                top: taskbarHeight,
                                height: `calc(100% - ${taskbarHeight}px)`,
                                visibility: snapIndicator ? 'visible' : 'hidden',
                            }}
                        />
                        {/* Resize/drag preview outline - always mounted, toggled via display */}
                        <div
                            ref={previewRef}
                            className="absolute border-2 border-blue rounded pointer-events-none"
                            style={{ display: 'none', zIndex: item.zIndex + 1 }}
                        />
                        <motion.div
                            ref={windowRef}
                            data-app="AppWindow"
                            data-scheme="tertiary"
                            data-menu-container
                            suppressHydrationWarning
                            className={`@container absolute !select-auto flex flex-col ${
                                item.appSettings?.size?.fixed ? 'bg-transparent' : 'bg-transparent'
                            } ${
                                siteSettings.experience === 'boring' && !item.appSettings?.size?.fixed
                                    ? 'border-b border-primary'
                                    : `${
                                          dragging
                                              ? '!shadow-none border-primary'
                                              : focusedWindow === item
                                              ? 'shadow-2xl border-primary'
                                              : 'shadow-lg border-input'
                                      } ${
                                          item.minimal
                                              ? '!shadow-none'
                                              : `flex flex-col ${
                                                    siteSettings.experience === 'boring' ? '' : 'border rounded'
                                                }`
                                      }`
                            } ${chrome ? 'overflow-hidden' : ''} [contain: strict]`}
                            style={{
                                zIndex: item.zIndex,
                                willChange: 'transform',
                                transform: 'translateZ(0)',
                                backfaceVisibility: 'hidden',
                            }}
                            initial={{
                                scale: 0.08,
                                x: item.fromOrigin?.x || windowPosition?.x || Math.round(position.x),
                                y: item.fromOrigin?.y || windowPosition?.y || Math.round(position.y),
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
                                    x: { duration: 0 },
                                    y: { duration: 0 },
                                    width: { duration: 0 },
                                    height: { duration: 0 },
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
                                    onPointerDown={startDrag}
                                    onPointerMove={onDrag}
                                    onPointerUp={endDrag}
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
                                        {hasDeveloperMode ? (
                                            <ToggleGroup
                                                title="View mode"
                                                hideTitle
                                                options={[
                                                    {
                                                        label: 'Slides',
                                                        value: 'marketing',
                                                    },
                                                    {
                                                        label: 'Dev mode',
                                                        value: 'developer',
                                                    },
                                                ]}
                                                value={view}
                                                onValueChange={(value) => setView(value as 'marketing' | 'developer')}
                                            />
                                        ) : menu && menu.length > 0 ? (
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
                                style={{ pointerEvents: dragging ? 'none' : 'auto' }}
                            >
                                {(!animating || isSSR || item.appSettings?.size?.autoHeight) && (
                                    <Router minimizing={minimizing} onExit={handleRouterExit} {...item.props}>
                                        {item.element}
                                    </Router>
                                )}
                            </div>
                            {!item.fixedSize && !item.minimal && (
                                <>
                                    {/* Right edge */}
                                    <div
                                        className="absolute right-0 top-0 w-1.5 bottom-6 cursor-ew-resize touch-none"
                                        onPointerDown={(e) => startResize(e)}
                                        onPointerMove={onResize}
                                        onPointerUp={endResize}
                                    />
                                    {/* Left edge */}
                                    <div
                                        className="absolute left-0 top-0 w-1.5 bottom-6 cursor-ew-resize touch-none"
                                        onPointerDown={(e) => startResize(e, true)}
                                        onPointerMove={onResize}
                                        onPointerUp={endResize}
                                    />
                                    {/* Bottom edge */}
                                    <div
                                        className="absolute bottom-0 left-6 right-6 h-1.5 cursor-ns-resize touch-none"
                                        onPointerDown={(e) => startResize(e)}
                                        onPointerMove={onResize}
                                        onPointerUp={endResize}
                                    />
                                    {/* Bottom-right corner */}
                                    <div
                                        className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize touch-none"
                                        onPointerDown={(e) => startResize(e)}
                                        onPointerMove={onResize}
                                        onPointerUp={endResize}
                                    />
                                    {/* Bottom-left corner */}
                                    <div
                                        className="absolute bottom-0 left-0 w-6 h-6 cursor-sw-resize touch-none"
                                        onPointerDown={(e) => startResize(e, true)}
                                        onPointerMove={onResize}
                                        onPointerUp={endResize}
                                    />
                                </>
                            )}
                        </motion.div>
                    </>
                )}
            </WindowContainer>
        </WindowProvider>
    )
}
