import CloudinaryImage from 'components/CloudinaryImage'
import Link from 'components/Link'
import Logo from 'components/Logo'
import { layoutLogic } from '../../logic/layoutLogic'
import { useValues } from 'kea'
import * as icons from '@posthog/icons'
import { useLocation } from '@reach/router'
import { useLayoutData } from 'components/Layout/hooks'
import React, { useEffect, useState } from 'react'
import topLevelNav from '../../navs/topLevelNav'
import { IMenu } from 'components/PostLayout/types'

const MenuItem = ({ name, children, url, icon, color, depth = 0 }: IMenu & { depth?: number }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const { pathname } = useLocation()
    const hasChildren = children && children.length > 0
    const IconComponent = icon ? icons[icon as keyof typeof icons] : null

    useEffect(() => {
        const isOpen = (children?: IMenu[]): boolean | undefined => {
            return (
                children &&
                children.some((child: IMenu) => {
                    return child.url === pathname || isOpen(child.children)
                })
            )
        }
        setIsOpen(url === pathname || (children && isOpen(children)) || false)
        setIsActive(url?.split('?')[0] === pathname)
    }, [pathname])

    return (
        <li
            className={`${depth === 1 ? 'ml-0' : depth === 2 ? 'pl-5' : ''} ${
                depth === 2 && isActive
                    ? 'bg-accent  dark:bg-accent-dark py-4 !-my-3.5  font-bold relative before:absolute before:top-0 before:-right-px before:w-full before:h-4 before:bg-light dark:before:bg-dark before:border-r before:border-b before:border-light dark:before:border-dark before:rounded-br-[10px] after:absolute after:bottom-0 after:-right-px after:w-full after:h-4 after:bg-light dark:after:bg-dark after:border-r after:border-t after:border-light dark:after:border-dark after:rounded-tr-[10px]'
                    : ''
            }`}
        >
            <div
                className={`flex items-center px-1 ${
                    depth === 2 && isActive
                        ? 'before:absolute before:border-r before:border-accent dark:before:border-accent-dark before:top-2 before:bottom-2 before:right-0 before:translate-x-full before:w-px before:z-[-1]'
                        : ''
                }`}
            >
                {hasChildren ? (
                    // top-level accordion
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`flex items-center justify-between w-full p-1 hover:bg-accent dark:hover:bg-accent-dark rounded text-sm relative z-10 border border-b-2 border-transparent hover:border-light dark:hover:border-dark hover:-top-px active:top-[.5px] ${
                            depth === 0 && isActive ? 'font-bold' : ''
                        } ${depth === 2 && isActive ? ' hover:border-transparent' : 'font-semibold'}`}
                    >
                        <span className="flex items-center gap-1">
                            {IconComponent && <IconComponent className={`size-5 text-${color || 'current'}`} />}
                            {name}
                        </span>
                        {isOpen ? <icons.IconMinus className="size-4" /> : <icons.IconPlus className="size-4" />}
                    </button>
                ) : (
                    // top-level item
                    <Link
                        to={url}
                        className={`relative z-10 w-full flex items-center gap-1 text-sm py-1 px-2 rounded border border-b-2  ${
                            isActive
                                ? 'border-transparent'
                                : 'hover:border-light dark:hover:border-dark hover:-top-px active:top-[.5px] hover:bg-accent dark:hover:bg-accent-dark border-transparent'
                        }`}
                    >
                        {IconComponent && <IconComponent className={`size-5 text-${color || 'current'}`} />}
                        <span>{name}</span>
                    </Link>
                )}
            </div>
            {hasChildren && (
                <ul
                    className={`px-0 py-px m-0 mt-px space-y-px list-none transition-all duration-100 ease-in-out ${
                        isOpen ? 'max-h-[1000px] opacity-300 mb-2' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                >
                    {children.map((item: any) => (
                        <MenuItem key={`${item.name}-${item.url}`} {...item} depth={depth + 1} />
                    ))}
                </ul>
            )}
        </li>
    )
}

const Navigation: React.FC<{ className?: string }> = ({ className }) => {
    const { enterpriseMode } = useLayoutData()
    const { websiteTheme } = useValues(layoutLogic)

    return (
        <nav className={className}>
            <Link
                className="flex justify-center m-2 pt-1.5 pb-2 px-1 rounded hover:bg-accent dark:hover:bg-accent-dark grow-0 shrink-0 basis-[auto] dark:text-primary-dark relative mb-2 border border-b-2 border-transparent hover:border-light dark:hover:border-dark hover:-top-px active:top-[.5px]"
                to="/"
            >
                {enterpriseMode ? (
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/MainNav/posthog-tm.png"
                        className="h-6 mx-6"
                    />
                ) : (
                    <Logo
                        color={websiteTheme === 'dark' && 'white'}
                        className="h-[24px] fill-current relative px-2 box-content"
                    />
                )}
            </Link>

            <ul className="px-0 py-px m-0 list-none flex-1 overflow-y-auto overflow-x-hidden">
                {topLevelNav.map((item) => (
                    <MenuItem key={`${item.name}-${item.url}`} {...item} />
                ))}
            </ul>
        </nav>
    )
}

export default Navigation
