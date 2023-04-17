import { DarkModeToggle } from 'components/DarkModeToggle'
import { Bookmark, InfoOutlined, Chevron, RightArrow, TableOfContents } from 'components/Icons'
import { AnimatePresence, useDragControls, useMotionValue, useTransform, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { usePost } from './hooks'
import { IMenu } from './types'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import { Crumbs } from './Breadcrumb'
import InternalSidebarLink from 'components/Docs/InternalSidebarLink'
import slugify from 'slugify'

const menuButtonClasses = `bg-white flex space-x-2 items-center font-semibold active:top-[0.5px]
active:scale-[.98] transition-transform text-black shadow-md`

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.01,
        },
    },
}

const motionListContainer = {
    initial: 'hidden',
    animate: 'show',
    variants: container,
}

interface IGetActiveMenu {
    menu: IMenu[]
    parent?: {
        name: string
        menu: IMenu[]
    }
}

const getActiveMenu = ({
    menu,
    url,
    ...other
}: {
    menu: IMenu[]
    menuItem?: IMenu
    url?: string
    parent?: { menu: IMenu[]; name: string }
}): IGetActiveMenu | undefined => {
    let parent = other.parent
    for (const menuItem of menu) {
        if (url && !menuItem.children ? menuItem.url === url : menuItem === other.menuItem) return { menu, parent }
        if (menuItem.children) parent = { menu, name: menuItem.name }
        const activeMenu =
            menuItem?.children &&
            getActiveMenu({
                menu: menuItem?.children,
                menuItem: other.menuItem,
                url,
                parent,
            })
        if (activeMenu) return activeMenu
        continue
    }
}

const MenuContainer = ({
    children,
    setOpen,
    className = '',
}: {
    children: React.ReactNode
    setOpen: (open: null | string) => void
    className?: string
}) => {
    const dragControls = useDragControls()
    const y = useMotionValue(0)
    const input = [0, 200]
    const output = [1, 0]
    const opacity = useTransform(y, input, output)
    const [yState, setYState] = useState(y.get())

    const handleClose = () => {
        setOpen(null)
    }

    const handleDragEnd = () => {
        if (yState < 200) {
            y.stop()
            y.set(0)
        } else {
            setOpen(null)
        }
    }

    const startDrag = (e) => {
        dragControls.start(e)
    }

    useEffect(() => {
        const unsubscribe = y.onChange(setYState)
        return unsubscribe
    }, [])

    return (
        <motion.div
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed w-full h-full bg-black/70 dark:bg-black/70 top-0 left-0"
        >
            <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ translateY: '100%', opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: '100%', opacity: 0 }}
                className="px-4 fixed bottom-0 w-full left-0"
            >
                <motion.div
                    dragConstraints={{ top: 0 }}
                    style={{ y, opacity }}
                    onDragEnd={handleDragEnd}
                    dragControls={dragControls}
                    drag="y"
                    dragListener={false}
                    className={`bg-white dark:bg-gray-accent-dark pb-4 pt-2 px-6 rounded-tr-md rounded-tl-md shadow ${className}`}
                >
                    <div
                        onPointerDown={startDrag}
                        className=" w-full h-8 mb-2 flex justify-center items-center space-x-1 group"
                    >
                        <div className="w-1 h-1 bg-black dark:bg-white rounded-full group-active:opacity-80 transition-all opacity-30" />
                        <div className="w-1 h-1 bg-black dark:bg-white rounded-full group-active:opacity-80 transition-all opacity-30" />
                        <div className="w-1 h-1 bg-black dark:bg-white rounded-full group-active:opacity-80 transition-all opacity-30" />
                    </div>
                    <div>{children}</div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

const MobileMenu = ({ setOpen }: { setOpen: (open: null | string) => void }) => {
    const { menu: postMenu, breadcrumb } = usePost()
    if (!postMenu) return null
    const { pathname } = useLocation()
    const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward')
    const previousMenu = useRef<IGetActiveMenu>()
    const [menu, setMenu] = useState<IGetActiveMenu>(
        getActiveMenu({ menu: postMenu, url: pathname }) || { menu: postMenu }
    )
    const handleClick = ({ url, ...other }: { url?: string; menu?: IMenu[] }) => {
        if (other.menu) {
            const newMenu = getActiveMenu({
                menu: postMenu,
                menuItem: other.menu[0],
            })
            if (newMenu) {
                previousMenu.current = menu
                setMenu(newMenu)
            }
        } else if (url) {
            navigate(url)
        }
    }

    useEffect(() => {
        const menuReversed = [...menu.menu].reverse()
        for (const menuItem of menuReversed.slice(
            menuReversed.findIndex(
                (menuItem) =>
                    (menuItem.children && menuItem.children === previousMenu.current?.menu) || menuItem.url === pathname
            )
        )) {
            if (menuItem.url === undefined) {
                const id = `mobile-nav-${slugify(menuItem.name, { lower: true })}`
                document.getElementById(id)?.scrollIntoView()
                break
            }
        }
    }, [menu])

    const item = {
        hidden: {
            translateX: animationDirection === 'forward' ? '-50%' : '50%',
            opacity: 0,
        },
        show: { translateX: 0, opacity: 1 },
    }

    return (
        <MenuContainer setOpen={setOpen}>
            {breadcrumb && (
                <div className="pb-4 mb-4 border-b border-dashed border-gray-accent-light dark:border-gray-accent-light/20 ">
                    <Crumbs crumbs={breadcrumb} />
                </div>
            )}

            <motion.ul
                key={menu?.parent?.name}
                {...motionListContainer}
                className="list-none m-0 p-0 max-h-[40vh] overflow-auto"
            >
                {menu?.parent?.menu && (
                    <motion.li
                        initial={{ translateX: '100%', opacity: 0 }}
                        animate={{ translateX: 0, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="pb-1 mb-2 flex flex-start items-center relative"
                    >
                        <button
                            className="inline-block font-bold bg-gray-accent-light dark:bg-gray-accent-dark mr-2 rounded-sm p-1"
                            onClick={() => {
                                setAnimationDirection('backward')
                                handleClick({ menu: menu?.parent?.menu })
                            }}
                        >
                            <RightArrow className="w-6 rotate-180" />
                        </button>
                        <h5 className="m-0 text-base font-bold">{menu?.parent?.name}</h5>
                    </motion.li>
                )}
                {menu?.menu?.map(({ name, url, children }, index) => {
                    return (
                        <motion.li
                            variants={item}
                            exit={{ opacity: 0 }}
                            className={`${url === undefined ? 'mt-5' : ''} relative`}
                            key={name + index + url}
                        >
                            <div className={`text-base`}>
                                {url === undefined ? (
                                    <h5
                                        id={`mobile-nav-${slugify(name, { lower: true })}`}
                                        className="m-0 text-lg pb-2"
                                    >
                                        {name}
                                    </h5>
                                ) : (
                                    <button
                                        className={`${
                                            url === pathname ? 'active-product opacity-90' : 'opacity-50'
                                        } hover:opacity-100 border-b border-gray-accent-light/50 dark:border-gray-accent-dark border-solid font-semibold flex w-full justify-between space-x-1 items-center py-2`}
                                        onClick={() => {
                                            setAnimationDirection('forward')
                                            handleClick({ url, menu: children })
                                        }}
                                    >
                                        <span className="text-left">{name}</span>
                                        {children && <Chevron className="w-3 opacity-75 -rotate-90" />}
                                    </button>
                                )}
                            </div>
                        </motion.li>
                    )
                })}
            </motion.ul>
        </MenuContainer>
    )
}

const MobileTOC = ({ setOpen }: { setOpen: (open: null | string) => void }) => {
    const { tableOfContents } = usePost()
    if (!tableOfContents) return null
    const item = {
        hidden: {
            translateX: '50%',
            opacity: 0,
        },
        show: { translateX: 0, opacity: 1 },
    }
    return (
        <MenuContainer setOpen={setOpen}>
            <p className="opacity-40 text-base mt-0 mb-3 font-semibold">On this page</p>
            <motion.ul
                {...motionListContainer}
                className="list-none m-0 p-0 flex flex-col space-y-1 px-6 max-h-[40vh] overflow-auto"
            >
                {tableOfContents?.map((navItem, index) => {
                    return (
                        <motion.li variants={item} exit={{ opacity: 0 }} key={index}>
                            <InternalSidebarLink
                                onClick={() => setOpen(null)}
                                url={navItem.url}
                                name={navItem.value}
                                depth={navItem.depth}
                                className="jumpTo text-[15px] pl-6"
                            />
                        </motion.li>
                    )
                })}
            </motion.ul>
        </MenuContainer>
    )
}

const MobileSidebar = ({ setOpen }: { setOpen: (open: null | string) => void }) => {
    const { sidebar, filePath, title, darkMode } = usePost()
    return (
        <MenuContainer className="py-0" setOpen={setOpen}>
            <div className={`flex flex-col`}>
                {sidebar && <div className="mobile-sidebar-container max-h-[40vh] overflow-auto">{sidebar}</div>}
                <div
                    className={`mt-auto flex text-sm ${
                        sidebar
                            ? 'border-t border-dashed border-gray-accent-light dark:border-gray-accent-light/20'
                            : ''
                    }`}
                >
                    {filePath && (
                        <a
                            className="p-3"
                            href={`https://github.com/PostHog/posthog.com/tree/master/contents/${filePath}`}
                        >
                            Edit this page
                        </a>
                    )}
                    {filePath && title && (
                        <a
                            className="p-3 border-l border-gray-accent-light dark:border-gray-accent-light/20 border-dashed"
                            href={`https://github.com/PostHog/posthog.com/issues/new?title=Feedback on: ${title}&body=**Issue with: /${filePath}**\n\n`}
                        >
                            Raise an issue
                        </a>
                    )}
                    {darkMode && (
                        <div className="ml-auto p-3 border-l border-gray-accent-light dark:border-gray-accent-light/20 border-dashed">
                            <DarkModeToggle />
                        </div>
                    )}
                </div>
            </div>
        </MenuContainer>
    )
}

export default function MobileNav() {
    const [open, setOpen] = useState<null | string>(null)
    const { tableOfContents, filePath, title, sidebar, darkMode } = usePost()
    return (
        <div className="sticky bottom-0 px-4 pb-4 z-[99999999] block lg:hidden">
            <div className="flex">
                <button onClick={() => setOpen('menu')} className={`py-2 px-4 rounded-full ${menuButtonClasses}`}>
                    <Bookmark />
                    <span>Menu</span>
                </button>
                <div className="ml-auto flex justify-end divide-x divide-dashed divide-gray-accent-light">
                    {tableOfContents && tableOfContents?.length > 0 && (
                        <button
                            onClick={() => setOpen('toc')}
                            className={`aspect-square h-full flex items-center justify-center rounded-tl-full rounded-bl-full ${menuButtonClasses}`}
                        >
                            <TableOfContents />
                        </button>
                    )}
                    {(filePath && title) || sidebar ? (
                        <button
                            onClick={() => setOpen('sidebar')}
                            className={`aspect-square h-full flex items-center justify-center ${
                                tableOfContents?.length ? ' rounded-tr-full rounded-br-full' : 'rounded-full'
                            }  ${menuButtonClasses}`}
                        >
                            <InfoOutlined />
                        </button>
                    ) : (
                        darkMode && (
                            <div className={`py-2 px-4 rounded-full ${menuButtonClasses}`}>
                                <DarkModeToggle />
                            </div>
                        )
                    )}
                </div>
            </div>
            <AnimatePresence>
                {open === 'menu' && <MobileMenu setOpen={setOpen} />}
                {open === 'toc' && <MobileTOC setOpen={setOpen} />}
                {open === 'sidebar' && <MobileSidebar setOpen={setOpen} />}
            </AnimatePresence>
        </div>
    )
}
