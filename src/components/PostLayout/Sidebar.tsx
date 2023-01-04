import React, { useEffect, useRef, useState } from 'react'
import Scrollspy from 'react-scrollspy'
import { IProps, ISidebarAction } from './types'

import { Edit, ExpandDocument, InfoOutlined, Issue } from 'components/Icons'
import Link from 'components/Link'
import InternalSidebarLink from 'components/Docs/InternalSidebarLink'
import { DarkModeToggle } from 'components/DarkModeToggle'
import { Popover } from 'components/Popover'
import Tooltip from 'components/Tooltip'

export const SidebarSection = ({
    title,
    children,
    className = '',
}: {
    title?: string
    children: React.ReactNode
    className?: string
}) => {
    return (
        <div className={`py-4 px-6 ${className}`}>
            {title && <h3 className="text-black dark:text-white font-semibold opacity-25 m-0 mb-2 text-sm">{title}</h3>}
            {children}
        </div>
    )
}

export const sidebarButtonClasses =
    'hover:bg-gray-accent-light rounded-[3px] h-8 w-8 flex justify-center items-center hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark my-1 space-x-[1px] transition-colors dark:text-white/50 dark:hover:text-white/100 text-black/50 hover:text-black/100 transition active:top-[0.5px] active:scale-[.9]'

const SidebarAction = ({ children, title, width, className = '', href, onClick }: ISidebarAction) => {
    return (
        <li style={width ? { width } : {}} className={`flex items-center justify-center ${className}`}>
            <Tooltip className="flex" content={title}>
                <span className="relative flex">
                    {href ? (
                        <Link className={sidebarButtonClasses} to={href}>
                            {children}
                        </Link>
                    ) : onClick ? (
                        <button className={sidebarButtonClasses} onClick={onClick}>
                            {children}
                        </button>
                    ) : (
                        children
                    )}
                </span>
            </Tooltip>
        </li>
    )
}

type SidebarProps = Pick<IProps, 'tableOfContents' | 'sidebar' | 'title' | 'filePath'> & {
    view: 'Article'
    fullWidthContent: boolean
    handleFullWidthContentChange: () => void
}

const Sidebar: React.FC<SidebarProps> = ({
    view,
    tableOfContents = [],
    sidebar,
    title,
    filePath,
    fullWidthContent,
    handleFullWidthContentChange,
}) => {
    const [showTocButton, setShowTocButton] = useState<boolean>(false)
    const topSidebarSection = useRef<HTMLDivElement>(null)
    const bottomSidebarSection = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setShowTocButton(false)
    }, [tableOfContents])

    useEffect(() => {
        if (showTocButton === null && topSidebarSection.current && bottomSidebarSection.current) {
            setShowTocButton(
                topSidebarSection.current.getBoundingClientRect().bottom >=
                    bottomSidebarSection.current.getBoundingClientRect().top
            )
        }
    }, [showTocButton])

    return (
        <aside
            key={`${title}-sidebar`}
            className="flex-shrink-0 w-full justify-self-end my-10 lg:my-0 mr-auto h-full lg:px-0 px-4 box-border"
        >
            <div className="h-full flex flex-col divide-y divide-gray-accent-light dark:divide-gray-accent-dark divide-dashed">
                <div className="relative h-full">
                    <div ref={topSidebarSection} className="pt-4 top-10 sticky">
                        {sidebar}
                    </div>
                </div>

                <div ref={bottomSidebarSection} className="lg:pt-6 !border-t-0 mt-auto lg:sticky bottom-0">
                    {view === 'Article' && tableOfContents.length > 1 && !showTocButton && (
                        <div
                            style={{ visibility: showTocButton === null ? 'hidden' : 'visible' }}
                            className="px-4 lg:px-8 lg:pb-4 lg:block hidden"
                        >
                            <h4 className="text-black dark:text-white font-semibold opacity-25 m-0 mb-1 text-sm">
                                Jump to:
                            </h4>
                            <Scrollspy
                                offset={-50}
                                className="list-none m-0 p-0 flex flex-col"
                                items={tableOfContents?.map((navItem) => navItem.url)}
                                currentClassName="active-product"
                            >
                                {tableOfContents.map((navItem) => (
                                    <li className="relative leading-none m-0" key={navItem.url}>
                                        <InternalSidebarLink
                                            url={navItem.url}
                                            name={navItem.value}
                                            depth={navItem.depth}
                                            className="hover:opacity-100 opacity-60 text-[14px] py-1 block relative active:top-[0.5px] active:scale-[.99]"
                                        />
                                    </li>
                                ))}
                            </Scrollspy>
                        </div>
                    )}
                    <ul className="list-none pl-2 pr-3 py-1 flex mt-0 mb-10 lg:mb-0 border-t border-gray-accent-light border-dashed dark:border-gray-accent-dark items-center bg-tan/40 dark:bg-primary/40 backdrop-blur">
                        {view === 'Article' && tableOfContents.length > 1 && showTocButton && (
                            <SidebarAction title="On this page">
                                <Popover
                                    button={
                                        <span className={sidebarButtonClasses}>
                                            <InfoOutlined />
                                        </span>
                                    }
                                >
                                    <div className="p-4 w-[250px] text-left">
                                        <h4 className="text-[13px] mb-2">On this page</h4>
                                        <Scrollspy
                                            offset={-50}
                                            className="list-none m-0 p-0 flex flex-col"
                                            items={tableOfContents?.map((navItem) => navItem.url)}
                                            currentClassName="active-product"
                                        >
                                            {tableOfContents.map((navItem) => (
                                                <li className="relative leading-none m-0" key={navItem.url}>
                                                    <InternalSidebarLink
                                                        url={navItem.url}
                                                        name={navItem.value}
                                                        depth={navItem.depth}
                                                        className="hover:opacity-100 opacity-60 text-[14px] py-1 block relative active:top-[0.5px] active:scale-[.99]"
                                                    />
                                                </li>
                                            ))}
                                        </Scrollspy>
                                    </div>
                                </Popover>
                            </SidebarAction>
                        )}
                        {filePath && (
                            <>
                                <SidebarAction
                                    href={`https://github.com/PostHog/posthog.com/tree/master/contents/${filePath}`}
                                    title="Edit this page"
                                >
                                    <Edit />
                                </SidebarAction>
                                <SidebarAction
                                    title="Raise an issue"
                                    href={`https://github.com/PostHog/posthog.com/issues/new?title=Feedback on: ${title}&body=**Issue with: /${filePath}**\n\n`}
                                >
                                    <Issue />
                                </SidebarAction>
                            </>
                        )}
                        <div className="ml-auto flex">
                            <SidebarAction
                                className="hidden xl:block"
                                title="Toggle content width"
                                onClick={handleFullWidthContentChange}
                            >
                                <ExpandDocument expanded={fullWidthContent} />
                            </SidebarAction>
                            <SidebarAction className="ml-2" width="auto" title="Toggle dark mode">
                                <DarkModeToggle />
                            </SidebarAction>
                        </div>
                    </ul>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
