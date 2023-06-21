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
    } = usePost()

    const handleArticleTransitionEnd = (e) => {
        const hash = window?.location?.hash
        if (e?.propertyName === 'max-width' && hash) {
            document.getElementById(hash?.replace('#', ''))?.scrollIntoView()
        }
    }

    return (
        <div className="">
            <div className={`w-full relative lg:flex mx-auto ${fullWidthContent ? '' : 'max-w-screen-xl'}`}>
                {menu && (
                    <div
                        style={{ maxWidth: menuWidth?.left }}
                        className="h-full w-full flex-shrink-0 lg:block hidden relative z-20"
                    >
                        <aside
                            className={`lg:sticky top-[108px] flex-shrink-0 w-full justify-self-end px-4 lg:box-border my-10 lg:my-0 mr-auto overflow-y-auto lg:h-screen pb-10 ${
                                hideSearch ? 'pt-5' : ''
                            }`}
                        >
                            {!hideSearch && (
                                <div className="lg:sticky top-0 z-20 pt-4 -mx-2 px-1 relative">
                                    <SidebarSearchBox filter={searchFilter} />
                                </div>
                            )}
                            <TableOfContents />
                        </aside>
                    </div>
                )}
                <article
                    key={`${title}-article`}
                    id="content-menu-wrapper"
                    className="lg:py-6 py-4 box-border flex-shrink"
                >
                    <div onTransitionEnd={handleArticleTransitionEnd} className={contentContainerClasses}>
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
                        style={{ maxWidth: menuWidth?.right }}
                        className="flex-shrink-0 w-full justify-self-end my-10 lg:my-0 mr-auto h-full lg:px-0 px-4 box-border lg:flex hidden flex-col"
                    >
                        <div className={`${stickySidebar ? 'sticky top-[108px]' : ''} z-10`}>{sidebar}</div>
                        <div className="flex flex-grow items-end">
                            <div className="sticky bottom-0 w-full">
                                {tableOfContents && tableOfContents?.length > 0 && (
                                    <div className="px-4 lg:px-8 lg:pb-4 lg:block hidden">
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
                                )}
                            </div>
                        </div>
                    </aside>
                )}
            </div>
        </div>
    )
}
