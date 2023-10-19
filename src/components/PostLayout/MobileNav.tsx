import { Chevron, RightArrow } from 'components/Icons'
import { AnimatePresence, useDragControls, useMotionValue, useTransform, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { usePost } from './hooks'
import { IMenu } from './types'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import slugify from 'slugify'

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

export const MenuContainer = ({
    children,
    setOpen,
    className = '',
    onClose,
}: {
    children: React.ReactNode
    setOpen: (open: null | string) => void
    className?: string
    onClose: () => void
}) => {
    const dragControls = useDragControls()
    const y = useMotionValue(0)
    const input = [0, 200]
    const output = [1, 0]
    const opacity = useTransform(y, input, output)
    const [yState, setYState] = useState(y.get())

    const handleClose = () => {
        onClose?.()
        setOpen(null)
    }

    const handleDragEnd = () => {
        if (yState < 200) {
            y.stop()
            y.set(0)
        } else {
            handleClose()
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
            className="fixed w-full h-full bg-accent/60 dark:bg-accent-dark/60 top-0 left-0 z-[99999999]"
        >
            <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ translateY: '100%', opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: '100%', opacity: 0 }}
                className="fixed bottom-0 w-full left-0"
            >
                <motion.div
                    dragConstraints={{ top: 0 }}
                    style={{ y, opacity }}
                    onDragEnd={handleDragEnd}
                    dragControls={dragControls}
                    drag="y"
                    dragListener={false}
                    className={`bg-white dark:bg-accent-dark pb-4 pt-2 px-4 border-t border-border dark:border-dark shadow ${className}`}
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

export default function MobileNav({ className = '', menu: postMenu }) {
    if (!postMenu) return null
    const { title } = usePost()
    const [open, setOpen] = useState<null | string>(null)
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
            setOpen(null)
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
        <>
            <button
                onClick={() => setOpen('menu')}
                className={`font-bold px-5 py-2 flex w-full items-center justify-between border-b border-border dark:border-border-dark group -mt-1 ${className}`}
            >
                <span className="flex items-center space-x-2 group-active:top-[0.5px] group-active:scale-[.98] transition-all">
                    {menu?.parent?.name && <span>{menu?.parent?.name}</span>}
                    {menu?.parent?.name && <span className="opacity-60">→</span>}
                    <span>{title}</span>
                </span>
                <Chevron
                    className={`w-4 h-4 origin-[center_40%] transition-all group-active:top-[0.5px] group-active:scale-[.98] ${
                        open ? 'rotate-180' : 'opacity-60'
                    }`}
                />
            </button>
            <AnimatePresence>
                {open === 'menu' && (
                    <MenuContainer setOpen={setOpen}>
                        <motion.ul
                            key={menu?.parent?.name}
                            {...motionListContainer}
                            className="list-none m-0 p-0 h-[40vh] overflow-auto"
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
                )}
            </AnimatePresence>
        </>
    )
}
