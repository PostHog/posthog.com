import { useLocation } from '@reach/router'
import React, { useEffect, useState } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import { push as PushMenu } from 'react-burger-menu'
import { ICrumb, INextPost, IProps, ITopic } from './types'

import { MobileMenu } from 'components/Icons'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import { DocsPageSurvey } from 'components/DocsPageSurvey'
import SidebarSearchBox from 'components/Search/SidebarSearchBox'

import TableOfContents from './TableOfContents'
import Sidebar from './Sidebar'

export { ShareLinks } from './ShareLinks'
export { Contributors } from './Contributors'
export { SidebarSection } from './Sidebar'

export const Topics = ({ topics }: { topics: ITopic[] }) => {
    const buttonClasses = `px-4 py-2 inline-block bg-gray-accent-light border-black/80 rounded-sm font-semibold text-sm leading-none`
    return (
        <ul className="list-none p-0 flex items-start flex-wrap -m-1">
            {topics.map(({ name, url, state }: ITopic) => {
                return (
                    <li className="m-1" key={name}>
                        {url ? (
                            <Link className={`${buttonClasses} text-red dark:text-red`} to={url} state={state}>
                                {name}
                            </Link>
                        ) : (
                            <span className={`${buttonClasses} dark:text-black`}>{name}</span>
                        )}
                    </li>
                )
            })}
        </ul>
    )
}

export const PageViews = ({ pageViews }: { pageViews: string | number }) => {
    return <p className="m-0 opacity-50 font-semibold">{pageViews} views</p>
}

export const Text = ({ children }: { children: React.ReactNode }) => {
    return <p className="m-0 opacity-50 font-semibold flex items-center space-x-2 text-[14px]">{children}</p>
}

const Breadcrumb = ({ crumbs }: { crumbs: ICrumb[] }) => {
    return (
        <ul className="list-none flex mt-8 lg:mt-0 p-0 mb-2 whitespace-nowrap overflow-auto">
            {crumbs.map(({ name, url }, index) => {
                const active = index === crumbs.length - 1
                return (
                    <li
                        key={index}
                        className={`after:mx-2 after:text-gray-accent-light last:after:hidden after:content-["/"]`}
                    >
                        {active ? (
                            <span className="text-black/40 dark:text-white/40 font-semibold">{name}</span>
                        ) : (
                            <Link to={url}>{name}</Link>
                        )}
                    </li>
                )
            })}
        </ul>
    )
}

const NextPost = ({ contentContainerClasses = '', excerpt, frontmatter, fields }: INextPost) => {
    return (
        <div className="py-8 border-t border-gray-accent-light dark:border-gray-accent-dark border-dashed">
            <div className={contentContainerClasses}>
                <p className="text-lg text-black/40 dark:text-white/40 m-0 font-bold">Next article</p>
                <h3 className="text-xl font-bold m-0 my-1">{frontmatter?.title}</h3>
                <p className="relative max-h-24 overflow-hidden">
                    {excerpt}
                    <span className="bg-gradient-to-t from-tan dark:from-primary to-transparent absolute w-full h-full inset-0" />
                </p>
                <CallToAction to={fields?.slug}>Read next article</CallToAction>
            </div>
        </div>
    )
}

const Survey = ({ contentContainerClasses = '' }) => {
    return (
        <div className="py-8 border-t border-gray-accent-light dark:border-gray-accent-dark border-dashed">
            <div className={contentContainerClasses}>
                <DocsPageSurvey />
            </div>
        </div>
    )
}

const defaultMenuWidth = { left: 265, right: 265 }

export default function PostLayout({
    tableOfContents,
    children,
    sidebar,
    contentWidth = 650,
    menuWidth = defaultMenuWidth,
    questions,
    menu,
    article = true,
    title,
    filePath,
    breadcrumb,
    hideSidebar,
    nextPost,
    hideSurvey,
    hideSearch,
    contentContainerClassName,
    menuType = 'standard',
    searchFilter,
}: IProps) {
    const { hash } = useLocation()
    const [view, _setView] = useState<'Article'>('Article')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [fullWidthContent, setFullWidthContent] = useState(hideSidebar || !sidebar)

    const handleMobileMenuClick = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    useEffect(() => {
        if (hash && !hideSearch) {
            scroll.scrollMore(-50)
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

    const contentContainerClasses =
        contentContainerClassName ||
        `px-5 lg:px-6 xl:px-12 w-full transition-all ${
            hideSidebar ? 'lg:max-w-5xl' : !fullWidthContent ? 'lg:max-w-3xl' : 'lg:max-w-full'
        } ${menu ? 'mx-auto' : 'lg:ml-auto'}`

    return (
        <div id="menu-wrapper" className="border-t border-dashed border-gray-accent-light dark:border-gray-accent-dark">
            {menu && (
                <div className="block lg:hidden py-2 px-4 border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark flex justify-between sticky top-[-2px] bg-tan dark:bg-primary z-30">
                    <button onClick={handleMobileMenuClick} className="py-2 px-3">
                        <MobileMenu style={{ transform: `rotate(${mobileMenuOpen ? '180deg' : '0deg'})` }} />
                    </button>
                </div>
            )}

            {menu && (
                <PushMenu
                    width="calc(100vw - 80px)"
                    customBurgerIcon={false}
                    customCrossIcon={false}
                    styles={{
                        bmOverlay: {
                            background: 'transparent',
                        },
                        bmMenuWrap: {
                            height: '80%',
                        },
                    }}
                    onClose={() => setMobileMenuOpen(false)}
                    pageWrapId="content-menu-wrapper"
                    outerContainerId="menu-wrapper"
                    overlayClassName="backdrop-blur"
                    isOpen={mobileMenuOpen}
                >
                    <div className="h-full border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark pt-6 px-6">
                        <TableOfContents
                            menuType={menuType}
                            handleLinkClick={() => setMobileMenuOpen(false)}
                            menu={menu}
                        />
                    </div>
                </PushMenu>
            )}
            <div
                style={{
                    gridAutoColumns: menu
                        ? `${menuWidth?.left ?? defaultMenuWidth?.left}px 1fr 1fr ${
                              menuWidth?.right ?? defaultMenuWidth?.right
                          }px`
                        : `1fr minmax(auto, ${contentWidth}px) minmax(max-content, 1fr)`,
                }}
                className="w-full relative lg:grid lg:grid-flow-col items-stretch -mb-20"
            >
                {menu && (
                    <div className="h-full border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark lg:block hidden relative z-20">
                        <aside
                            className={`lg:sticky bg-tan dark:bg-primary top-0 flex-shrink-0 w-full justify-self-end px-4 lg:box-border my-10 lg:my-0 mr-auto overflow-y-auto overscroll-contain lg:h-screen pb-10 ${
                                hideSearch ? 'pt-5' : ''
                            }`}
                        >
                            {!hideSearch && (
                                <div className="lg:sticky top-0 z-20 pt-4 -mx-2 px-1 bg-tan dark:bg-primary relative">
                                    <SidebarSearchBox />
                                </div>
                            )}
                            <TableOfContents menuType={menuType} menu={menu} />
                        </aside>
                    </div>
                )}
                <article
                    key={`${title}-article`}
                    id="content-menu-wrapper"
                    className="col-span-2 lg:border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark lg:pt-12 lg:pb-8 ml-auto w-full h-full box-border"
                >
                    <div className={contentContainerClasses}>
                        {breadcrumb && <Breadcrumb crumbs={breadcrumb} />}
                        <div>{children}</div>
                        {questions}
                    </div>
                    {!hideSurvey && <Survey contentContainerClasses={contentContainerClasses} />}
                    {nextPost && <NextPost {...nextPost} contentContainerClasses={contentContainerClasses} />}
                </article>
                {!hideSidebar && (
                    <Sidebar
                        title={title}
                        view={view}
                        filePath={filePath}
                        tableOfContents={tableOfContents}
                        fullWidthContent={fullWidthContent}
                        handleFullWidthContentChange={handleFullWidthContentChange}
                    >
                        {sidebar}
                    </Sidebar>
                )}
            </div>
        </div>
    )
}
