import { useLocation } from '@reach/router'
import React, { useEffect, useState } from 'react'
import { usePost } from './hooks'
import { animateScroll as scroll, Link as ScrollLink } from 'react-scroll'
import { defaultMenuWidth } from './context'
import SidebarSearchBox from 'components/Search/SidebarSearchBox'
import TableOfContents from './TableOfContents'
import ShareLinks from './ShareLinks'
import Survey from './Survey'
import NextPost from './NextPost'
import MobileNav from './MobileNav'
import Scrollspy from 'react-scrollspy'
import InternalSidebarLink from 'components/Docs/InternalSidebarLink'
import SidebarAction from './SidebarAction'
import { Edit, ExpandDocument, Issue } from 'components/Icons'
import { DarkModeToggle } from 'components/DarkModeToggle'
import { useLayoutData } from 'components/Layout/hooks'

export default function Post({ children }: { children: React.ReactNode }) {
    const {
        tableOfContents,
        sidebar,
        contentWidth,
        menuWidth,
        questions,
        menu,
        title,
        hideSidebar,
        nextPost,
        hideSurvey,
        hideSearch,
        mobileMenu,
        contentContainerClasses,
        stickySidebar,
        searchFilter,
        fullWidthContent,
        hashSpy,
    } = usePost()
    const { compact } = useLayoutData()

    const handleArticleTransitionEnd = (e) => {
        const hash = window?.location?.hash
        if (e?.propertyName === 'max-width' && hash) {
            document.getElementById(hash?.replace('#', ''))?.scrollIntoView()
        }
    }

    return (
        <div className="">
            {menu && mobileMenu && <MobileNav className={`flex ${compact ? '' : 'md:hidden'}`} menu={menu} />}
            <div
                className={`w-full relative md:flex justify-between mx-auto transition-all ${
                    fullWidthContent ? 'max-w-full' : 'max-w-screen-2xl'
                }`}
            >
                {!compact && menu && (
                    <div
                        style={{ maxWidth: menuWidth?.left ?? defaultMenuWidth.left }}
                        className="w-full flex-shrink-0 md:block hidden relative z-20"
                    >
                        <aside
                            className={`md:sticky md:top-0 reasonable:top-[108px] max-h-screen reasonable:h-[calc(100vh_-_108px)] flex-shrink-0 w-full justify-self-end px-4 md:box-border my-10 md:my-0 mr-auto overflow-y-auto pt-6 pb-10 bg-light dark:bg-dark border-r border-light dark:border-dark ${
                                hideSearch ? 'pt-5' : ''
                            }`}
                        >
                            {/*
                            {!hideSearch && (
                                <div className="lg:sticky top-0 z-20 pt-4 -mx-2 px-1 relative">
                                    <SidebarSearchBox filter={searchFilter} />
                                </div>
                            )}
                            */}
                            <TableOfContents />
                        </aside>
                    </div>
                )}
                <article
                    style={contentWidth && !fullWidthContent ? { width: '100%', maxWidth: contentWidth } : {}}
                    key={`${title}-article`}
                    id="content-menu-wrapper"
                    className={`py-4 box-border w-full flex-shrink mx-auto transition-all min-w-0 ${
                        !fullWidthContent && sidebar && !hideSidebar ? ' max-w-3xl' : 'max-w-screen-2xl'
                    }`}
                >
                    <div onTransitionEnd={handleArticleTransitionEnd} className={contentContainerClasses}>
                        <div>{children}</div>
                        {questions}
                    </div>
                    {!hideSurvey && <Survey />}
                    {nextPost && <NextPost />}
                </article>
                {!hideSidebar && sidebar && (
                    <aside
                        key={`${title}-sidebar`}
                        style={{ maxWidth: menuWidth?.right ?? defaultMenuWidth.right }}
                        className="flex-shrink-0 pt-4 pl-4 w-full justify-self-end my-10 lg:my-0 box-border hidden xl:flex flex-col reasonable:sticky reasonable:top-[108px] mr-8 border-l border-light dark:border-dark"
                    >
                        <div
                            className={`${
                                stickySidebar ? 'reasonable:sticky reasonable:top-[108px]' : ''
                            } bg-light dark:bg-dark z-10`}
                        >
                            {sidebar}
                        </div>
                        <div className="flex flex-grow items-end">
                            <div className="sticky bottom-0 w-full">
                                {tableOfContents && tableOfContents?.length > 0 && (
                                    <div className="px-0 -mx-1 lg:pb-4 lg:block hidden">
                                        <h4 className="text-black dark:text-white font-semibold opacity-25 m-0 mb-1 text-sm">
                                            Jump to:
                                        </h4>
                                        <ul className="list-none m-0 p-0 flex flex-col">
                                            {tableOfContents.map((navItem, index) => (
                                                <li className="relative leading-none m-0" key={navItem.url}>
                                                    <InternalSidebarLink
                                                        hashSpy={hashSpy}
                                                        url={navItem.url}
                                                        name={navItem.value}
                                                        depth={navItem.depth}
                                                        className="hover:opacity-100 opacity-60 text-[14px] py-1 block relative active:top-[0.5px] active:scale-[.99]"
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>
                )}
            </div>
        </div>
    )
}
