import { useLocation } from '@reach/router'
import React, { RefObject, useEffect, useRef, useState } from 'react'
import { usePost } from './hooks'
import { animateScroll as scroll, Link as ScrollLink } from 'react-scroll'
import { defaultMenuWidth } from './context'
import SidebarSearchBox from 'components/Search/SidebarSearchBox'
import TableOfContents from './TableOfContents'
import Breadcrumb from './Breadcrumb'
import ShareLinks from './ShareLinks'
import Survey from './Survey'
import NextPost from './NextPost'
import MobileNav from './MobileNav'
import Scrollspy from 'react-scrollspy'
import InternalSidebarLink from 'components/Docs/InternalSidebarLink'
import SidebarAction from './SidebarAction'
import { Edit, ExpandDocument, Issue } from 'components/Icons'
import { DarkModeToggle } from 'components/DarkModeToggle'

export default function Post({ children }: { children: React.ReactNode }) {
    const {
        tableOfContents,
        sidebar,
        contentWidth,
        menuWidth,
        questions,
        menu,
        title,
        filePath,
        breadcrumb,
        hideSidebar,
        nextPost,
        hideSurvey,
        hideSearch,
        mobileMenu,
        darkMode,
        fullWidthContent,
        setFullWidthContent,
        contentContainerClasses,
        stickySidebar,
    } = usePost()
    const { hash, href } = useLocation()

    const sidebarRef = useRef<HTMLDivElement>(null)
    const actionsRef = useRef<HTMLUListElement>(null)
    const [tocHeight, setTocHeight] = useState<string | number>('auto')

    useEffect(() => {
        if (hash && !hideSearch) {
            scroll.scrollMore(-50)
        }
        if (stickySidebar && typeof window !== 'undefined') {
            const adjustTocHeight = () => {
                const sidebar = sidebarRef?.current?.getBoundingClientRect()
                const actions = actionsRef?.current?.getBoundingClientRect()
                if (sidebar && actions) {
                    const height = Math.min(window.innerHeight, actions?.bottom) - sidebar?.bottom - actions?.height
                    setTocHeight(height)
                }
            }
            adjustTocHeight()
            window.addEventListener('scroll', adjustTocHeight)
            window.addEventListener('resize', adjustTocHeight)

            return () => {
                window.removeEventListener('scroll', adjustTocHeight)
                window.removeEventListener('resize', adjustTocHeight)
            }
        }
    }, [])

    const handleFullWidthContentChange = () => {
        localStorage.setItem('full-width-content', !fullWidthContent + '')
        setFullWidthContent(!fullWidthContent)
    }

    useEffect(() => {
        if (!hideSidebar && sidebar) {
            setFullWidthContent(localStorage.getItem('full-width-content') === 'true')
        } else {
            setFullWidthContent(true)
        }
    }, [sidebar, hideSidebar])

    return (
        <div className="sm:border-t border-dashed border-gray-accent-light dark:border-gray-accent-dark">
            <div
                style={{
                    gridAutoColumns: menu ? `${menuWidth?.left ?? defaultMenuWidth?.left}px 1fr` : `1fr 1fr`,
                }}
                className="w-full relative lg:grid lg:grid-flow-col"
            >
                {menu && (
                    <div className="h-full border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark lg:block hidden relative z-20">
                        <aside
                            className={`lg:sticky bg-tan dark:bg-primary top-0 flex-shrink-0 w-full justify-self-end px-4 lg:box-border my-10 lg:my-0 mr-auto overflow-y-auto lg:h-screen pb-10 ${
                                hideSearch ? 'pt-5' : ''
                            }`}
                        >
                            {!hideSearch && (
                                <div className="lg:sticky top-0 z-20 pt-4 -mx-2 px-1 bg-tan dark:bg-primary relative">
                                    <SidebarSearchBox />
                                </div>
                            )}
                            <TableOfContents />
                        </aside>
                    </div>
                )}
                <div className="flex flex-col">
                    {breadcrumb && breadcrumb?.length > 0 && (
                        <section
                            style={{
                                gridAutoColumns: menu
                                    ? `1fr ${menuWidth?.right ?? defaultMenuWidth?.right}px`
                                    : `minmax(auto, ${contentWidth}px) minmax(max-content, 1fr)`,
                            }}
                            className={
                                'sm:pt-4 sm:pb-4 pb-0 sm:border-b border-gray-accent-light dark:border-gray-accent-dark border-dashed lg:grid lg:grid-flow-col items-center'
                            }
                        >
                            <div className={`${contentContainerClasses} grid-cols-1`}>
                                <Breadcrumb />
                            </div>

                            {!hideSidebar && (
                                <div className="ml-auto px-6 lg:mt-0 mt-4 lg:block hidden">
                                    <ShareLinks />
                                </div>
                            )}
                        </section>
                    )}

                    <div
                        className="lg:grid lg:grid-flow-col items-start flex-grow"
                        style={{
                            gridAutoColumns: menu
                                ? `1fr ${menuWidth?.right ?? defaultMenuWidth?.right}px`
                                : `minmax(auto, ${contentWidth}px) minmax(max-content, 1fr)`,
                        }}
                    >
                        <article
                            key={`${title}-article`}
                            id="content-menu-wrapper"
                            className="lg:border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark lg:py-12 py-4 ml-auto w-full h-full box-border lg:overflow-auto"
                        >
                            <div className={contentContainerClasses}>
                                <div>{children}</div>
                                {questions}
                            </div>
                            {!hideSurvey && <Survey />}
                            {nextPost && <NextPost />}
                            {menu && mobileMenu && <MobileNav />}
                        </article>
                        {!hideSidebar && sidebar && (
                            <aside
                                key={`${title}-sidebar`}
                                className="flex-shrink-0 w-full justify-self-end my-10 lg:my-0 mr-auto h-full lg:px-0 px-4 box-border lg:flex hidden flex-col"
                            >
                                <div
                                    ref={sidebarRef}
                                    className={`${stickySidebar ? 'sticky top-0' : ''} bg-tan dark:bg-primary z-10`}
                                >
                                    {sidebar}
                                </div>
                                <div className="flex flex-grow items-end">
                                    <div className="!border-t-0 sticky bottom-0 w-full">
                                        {tableOfContents && tableOfContents?.length > 1 && (
                                            <div
                                                style={{ height: tocHeight }}
                                                className="lg:pt-6 px-4 lg:px-8 lg:pb-4 lg:flex hidden overflow-auto"
                                            >
                                                <div className="mt-auto">
                                                    <h4 className="text-black dark:text-white font-semibold opacity-25 m-0 mb-1 text-sm">
                                                        Jump to:
                                                    </h4>
                                                    <Scrollspy
                                                        offset={-50}
                                                        className="list-none m-0 p-0 flex flex-col"
                                                        items={tableOfContents?.map((navItem) => navItem.url)}
                                                        currentClassName="active-product"
                                                    >
                                                        {tableOfContents.map((navItem, index) => (
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
                                            </div>
                                        )}
                                        <ul
                                            ref={actionsRef}
                                            className="list-none p-0 flex mt-0 mb-10 lg:mb-0 border-t border-gray-accent-light border-dashed dark:border-gray-accent-dark items-center bg-tan/40 dark:bg-primary/40 backdrop-blur"
                                        >
                                            {filePath && (
                                                <div className="flex divide-x divide-dashed divide-gray-accent-light dark:divide-gray-accent-dark border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark">
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
                                                </div>
                                            )}
                                            <div className="ml-auto flex">
                                                <SidebarAction
                                                    className="hidden xl:block border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark"
                                                    title="Toggle content width"
                                                    onClick={handleFullWidthContentChange}
                                                >
                                                    <ExpandDocument expanded={fullWidthContent} />
                                                </SidebarAction>
                                                {darkMode && (
                                                    <SidebarAction
                                                        className="pl-2 pr-2"
                                                        width="auto"
                                                        title="Toggle dark mode"
                                                    >
                                                        <DarkModeToggle />
                                                    </SidebarAction>
                                                )}
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </aside>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
