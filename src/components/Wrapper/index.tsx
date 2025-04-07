import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import {
    IconCollapse45,
    IconExpand45,
    IconMinus,
    IconX,
    IconCode,
    IconTextWidth,
    IconLightBulb,
    IconDay,
    IconNight,
    IconLaptop,
    IconChevronRight,
} from '@posthog/icons'
import { useApp } from '../../context/App'
import { Provider as WindowProvider } from '../../context/Window'
import Desktop from 'components/Desktop'
import { DarkModeToggle } from 'components/DarkModeToggle'
import { Popover } from 'components/RadixUI/Popover'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import { Fieldset } from 'components/OSFieldset'
import * as Menubar from '@radix-ui/react-menubar'

const getSizeDefaults = () => ({
    max: {
        width: window.innerWidth * 0.9,
        height: window.innerHeight * 0.9,
    },
    min: {
        width: window.innerWidth * 0.2,
        height: window.innerHeight * 0.2,
    },
})

const Window = ({ item, constraintsRef }: { item: any; constraintsRef: any }) => {
    const { minimizeWindow, bringToFront, closeWindow, focusedWindow } = useApp()
    const controls = useDragControls()
    const [sizeDefaults, setSizeDefaults] = useState(getSizeDefaults())
    const [previousSize, setPreviousSize] = useState({ width: sizeDefaults.max.width, height: sizeDefaults.max.height })
    const [size, setSize] = useState({ width: sizeDefaults.max.width, height: sizeDefaults.max.height })
    const [previousPosition, setPreviousPosition] = useState({ x: 0, y: 0 })
    const [position, setPosition] = useState(() => ({
        x: window.innerWidth / 2 - size.width / 2,
        y: window.innerHeight / 2 - size.height / 2,
    }))

    useEffect(() => {
        const handleResize = () => {
            setSizeDefaults(getSizeDefaults())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleDoubleClick = () => {
        setSize((prev) => (prev.width === sizeDefaults.max.width ? sizeDefaults.min : sizeDefaults.max))
    }

    const expandWindow = () => {
        setPreviousSize(size)
        setPreviousPosition(position)
        const taskbarHeight = document.querySelector('#taskbar')?.getBoundingClientRect().height || 0
        setPosition({ x: 0, y: 0 })
        setSize({ width: window.innerWidth, height: window.innerHeight - taskbarHeight })
    }

    const collapseWindow = () => {
        setSize(previousSize)
        setPosition(previousPosition)
    }

    return (
        <WindowProvider appWindow={item}>
            <AnimatePresence>
                {!item.minimized && (
                    <motion.div
                        className={`absolute flex flex-col border rounded overflow-hidden !select-auto  ${
                            focusedWindow === item
                                ? 'shadow-2xl border-light-7 dark:border-dark-7'
                                : 'shadow-lg border-light-4 dark:border-dark-4'
                        }`}
                        style={{
                            width: size.width,
                            height: size.height,
                            zIndex: item.zIndex,
                        }}
                        drag
                        dragControls={controls}
                        dragListener={false}
                        dragMomentum={false}
                        dragConstraints={constraintsRef}
                        onDragEnd={(event, info) => {
                            if (!constraintsRef.current) return

                            const bounds = constraintsRef.current.getBoundingClientRect()
                            const newX = position.x + info.offset.x
                            const newY = position.y + info.offset.y

                            const constrainedX = Math.round(Math.min(Math.max(0, newX), bounds.width - size.width))
                            const constrainedY = Math.round(Math.min(Math.max(0, newY), bounds.height - size.height))

                            setPosition({
                                x: constrainedX,
                                y: constrainedY,
                            })
                        }}
                        animate={{ x: Math.round(position.x), y: Math.round(position.y) }}
                        onMouseDown={() => bringToFront(item)}
                    >
                        <div
                            data-scheme="tertiary"
                            onDoubleClick={handleDoubleClick}
                            className="flex-shrink-0 w-full flex items-center justify-between p-2 bg-primary cursor-move"
                            onPointerDown={(e) => controls.start(e)}
                        >
                            <p className="m-0 text-sm font-semibold line-clamp-1">
                                {item.meta?.title && item.meta.title}
                            </p>
                            <div className="flex space-x-2">
                                <button onClick={() => minimizeWindow(item)}>
                                    <IconMinus className="size-4" />
                                </button>
                                <button onClick={size.width >= window?.innerWidth ? collapseWindow : expandWindow}>
                                    {size.width >= window?.innerWidth ? (
                                        <IconCollapse45 className="size-4" />
                                    ) : (
                                        <IconExpand45 className="size-4" />
                                    )}
                                </button>
                                <button onClick={() => closeWindow(item)}>
                                    <IconX className="size-4" />
                                </button>
                            </div>
                        </div>
                        <div className="w-full flex-grow overflow-auto">{item.element}</div>
                        <motion.div
                            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
                            drag
                            dragMomentum={false}
                            dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
                            onDrag={(_event, info) => {
                                setSize((prev) => ({
                                    width: Math.min(
                                        Math.max(prev.width + info.delta.x, sizeDefaults.min.width),
                                        sizeDefaults.max.width
                                    ),
                                    height: Math.min(
                                        Math.max(prev.height + info.delta.y, sizeDefaults.min.height),
                                        sizeDefaults.max.height
                                    ),
                                }))
                            }}
                        />
                        <motion.div
                            className="absolute right-0 top-0 w-1 h-full cursor-ew-resize"
                            drag="x"
                            dragMomentum={false}
                            dragConstraints={{ left: 0, right: 0 }}
                            onDrag={(_event, info) => {
                                setSize((prev) => ({
                                    ...prev,
                                    width: Math.min(
                                        Math.max(prev.width + info.delta.x, sizeDefaults.min.width),
                                        sizeDefaults.max.width
                                    ),
                                }))
                            }}
                        />
                        <motion.div
                            className="absolute bottom-0 left-0 w-full h-1 cursor-ns-resize"
                            drag="y"
                            dragMomentum={false}
                            dragConstraints={{ top: 0, bottom: 0 }}
                            onDrag={(_event, info) => {
                                setSize((prev) => ({
                                    ...prev,
                                    height: Math.min(
                                        Math.max(prev.height + info.delta.y, sizeDefaults.min.height),
                                        sizeDefaults.max.height
                                    ),
                                }))
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </WindowProvider>
    )
}

const colorModeOptions: ToggleOption[] = [
    {
        label: 'System',
        value: 'system',
        icon: <IconLaptop className="size-5" />,
    },
    {
        label: 'Light',
        value: 'light',
        icon: <IconDay className="size-5" />,
        default: true,
    },
    {
        label: 'Dark',
        value: 'dark',
        icon: <IconNight className="size-5" />,
    },
]

const SiteOptionsButton = () => {
    const [colorMode, setColorMode] = useState('system')
    const handleColorModeChange = (value: string) => {
        window.__setPreferredTheme(value)
        setColorMode(value)
    }

    useEffect(() => {
        const colorMode = localStorage.getItem('theme') || 'system'
        setColorMode(colorMode)
    }, [])

    return (
        <Popover title="Settings" dataScheme="secondary" trigger={<span>Site options</span>} contentClassName="w-80">
            <div className="w-full h-full bg-primary text-primary">
                <Fieldset legend="Display">
                    <div className="grid grid-cols-2 gap-2">
                        <label className="pt-1.5 text-[15px]">Color mode</label>
                        <ToggleGroup
                            title="Color mode"
                            options={colorModeOptions}
                            onValueChange={handleColorModeChange}
                            value={colorMode}
                        />
                    </div>
                </Fieldset>
            </div>
        </Popover>
    )
}

const MenuBar = () => {
    return (
        <motion.div
            id="taskbar"
            data-scheme="secondary"
            initial={{ translateY: '100%' }}
            animate={{ translateY: 0 }}
            exit={{ translateY: '100%' }}
            className="fixed top-0 left-0 w-full p-0.5 bg-primary border-b border-primary z-50"
        >
            <Menubar.Root data-scheme="tertiary" className="flex gap-1">
                <Menubar.Menu>
                    <Menubar.Trigger className="flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[13px] font-medium leading-none text-primary outline-none data-[highlighted]:bg-accent hover:bg-primary data-[state=open]:bg-accent">
                        File
                    </Menubar.Trigger>
                    <Menubar.Portal>
                        <Menubar.Content
                            className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
                            align="start"
                            sideOffset={5}
                            alignOffset={-3}
                            data-scheme="primary"
                        >
                            <Menubar.Item className="hover-invert group relative flex h-[25px] select-none items-center rounded px-2.5 text-[13px] leading-none text-primary hover:bg-primary outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accent data-[highlighted]:bg-input-bg data-[disabled]:text-muted data-[highlighted]:data-[state=open]:text-secondary data-[highlighted]:bg-text-secondary data-[state=open]:text-secondary">
                                New Tab{' '}
                                <div className="ml-auto pl-5 text-mauve9 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
                                    ⌘ T
                                </div>
                            </Menubar.Item>
                            <Menubar.Item className="hover-invert group relative flex h-[25px] select-none items-center rounded px-2.5 text-[13px] leading-none text-primary hover:bg-primary outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accent data-[disabled]:text-muted data-[highlighted]:data-[state=open]:text-secondary data-[highlighted]:bg-text-secondary data-[state=open]:text-secondary">
                                New Window{' '}
                                <div className="ml-auto pl-5 text-mauve9 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
                                    ⌘ N
                                </div>
                            </Menubar.Item>
                            <Menubar.Item
                                className="hover-invert group relative flex h-[25px] select-none items-center rounded px-2.5 text-[13px] leading-none text-muted outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-violet4 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-mauve8 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:text-violet11"
                                disabled
                            >
                                New Incognito Window
                            </Menubar.Item>
                            <Menubar.Separator className="m-[5px] h-px bg-border" />
                            <Menubar.Sub>
                                <Menubar.SubTrigger className="hover-invert group relative flex h-[25px] select-none items-center rounded px-2.5 text-[13px] leading-none text-primary hover:bg-primary outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-primary data-[disabled]:text-muted data-[highlighted]:data-[state=open]:text-secondary data-[highlighted]:bg-text-secondary data-[state=open]:text-secondary">
                                    Share
                                    <div className="ml-auto pl-5 text-secondary group-data-[disabled]:text-muted group-data-[highlighted]:text-primary">
                                        <IconChevronRight className="size-4" />
                                    </div>
                                </Menubar.SubTrigger>
                                <Menubar.Portal>
                                    <Menubar.SubContent
                                        className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
                                        alignOffset={-5}
                                        data-scheme="primary"
                                    >
                                        <Menubar.Item className="hover-invert group relative flex h-[25px] select-none items-center rounded px-2.5 text-[13px] leading-none text-primary hover:bg-primary outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-primary data-[disabled]:text-muted data-[highlighted]:data-[state=open]:text-secondary data-[highlighted]:bg-text-secondary data-[state=open]:text-secondary">
                                            Email Link
                                        </Menubar.Item>
                                        <Menubar.Item className="hover-invert group relative flex h-[25px] select-none items-center rounded px-2.5 text-[13px] leading-none text-primary hover:bg-primary outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-primary data-[disabled]:text-muted data-[highlighted]:data-[state=open]:text-secondary data-[highlighted]:bg-text-secondary data-[state=open]:text-secondary">
                                            Messages
                                        </Menubar.Item>
                                        <Menubar.Item className="hover-invert group relative flex h-[25px] select-none items-center rounded px-2.5 text-[13px] leading-none text-primary hover:bg-primary outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-primary data-[disabled]:text-muted data-[highlighted]:data-[state=open]:text-secondary data-[highlighted]:bg-text-secondary data-[state=open]:text-secondary">
                                            Notes
                                        </Menubar.Item>
                                    </Menubar.SubContent>
                                </Menubar.Portal>
                            </Menubar.Sub>
                            <Menubar.Separator className="m-[5px] h-px bg-border" />
                            <Menubar.Item className="group relative flex h-[25px] select-none items-center rounded px-2.5 text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1">
                                Print…{' '}
                                <div className="ml-auto pl-5 text-mauve9 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
                                    ⌘ P
                                </div>
                            </Menubar.Item>
                        </Menubar.Content>
                    </Menubar.Portal>
                </Menubar.Menu>
                <Menubar.Menu>
                    <Menubar.Trigger>Edit</Menubar.Trigger>
                    <Menubar.Portal>
                        <Menubar.Content>
                            <Menubar.Label>Options</Menubar.Label>
                            <Menubar.Item>New Tab</Menubar.Item>

                            <Menubar.Group>
                                <Menubar.Item>New Window</Menubar.Item>
                                <Menubar.Item>Open File…</Menubar.Item>
                            </Menubar.Group>

                            <Menubar.CheckboxItem checked>
                                Show Toolbar
                                <Menubar.ItemIndicator>✓</Menubar.ItemIndicator>
                            </Menubar.CheckboxItem>

                            <Menubar.RadioGroup value="auto">
                                <Menubar.RadioItem value="auto">
                                    Auto Save
                                    <Menubar.ItemIndicator>●</Menubar.ItemIndicator>
                                </Menubar.RadioItem>
                                <Menubar.RadioItem value="manual">
                                    Manual Save
                                    <Menubar.ItemIndicator>●</Menubar.ItemIndicator>
                                </Menubar.RadioItem>
                            </Menubar.RadioGroup>

                            <Menubar.Sub>
                                <Menubar.SubTrigger>Export</Menubar.SubTrigger>
                                <Menubar.Portal>
                                    <Menubar.SubContent>
                                        <Menubar.Item>As PDF</Menubar.Item>
                                        <Menubar.Item>As DOCX</Menubar.Item>
                                    </Menubar.SubContent>
                                </Menubar.Portal>
                            </Menubar.Sub>

                            <Menubar.Separator />
                            <Menubar.Item>Exit</Menubar.Item>
                            <Menubar.Arrow />
                        </Menubar.Content>
                    </Menubar.Portal>
                </Menubar.Menu>
            </Menubar.Root>
        </motion.div>
    )
}

const TaskBar = () => {
    const { windows, focusedWindow, bringToFront, minimizeWindow } = useApp()
    return (
        <AnimatePresence>
            {windows.length > 0 && (
                <motion.div
                    id="taskbar"
                    data-scheme="secondary"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                    exit={{ translateY: '100%' }}
                    className="fixed bottom-0 left-0 w-full p-0.5 bg-primary border-t border-primary z-50 flex justify-between"
                >
                    <ul className="m-0 p-0 list-none flex space-x-1">
                        {windows.map((appWindow) => {
                            const active = !appWindow.minimized && focusedWindow === appWindow
                            return (
                                <li key={appWindow.key}>
                                    <button
                                        onClick={() => (active ? minimizeWindow(appWindow) : bringToFront(appWindow))}
                                        className={`text-sm py-1 px-2 font-semibold border border-border dark:border-dark ${
                                            active ? 'bg-white dark:bg-black' : ''
                                        }`}
                                    >
                                        {appWindow.meta?.title}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                    <SiteOptionsButton />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default function Wrapper() {
    const constraintsRef = useRef(null)
    const { windows } = useApp()
    return (
        <div ref={constraintsRef} className="fixed inset-0 size-full">
            <MenuBar />
            <Desktop />
            {windows.map((item) => (
                <Window item={item} key={item.key} constraintsRef={constraintsRef} />
            ))}
            <TaskBar />
        </div>
    )
}
