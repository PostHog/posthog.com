import React from 'react'
import Link from 'components/Link'
import { DarkModeToggle } from 'components/DarkModeToggle'
import SearchBar from './SearchBar'
import { CircleArrow, Edit, Issue, MobileMenu } from 'components/Icons/Icons'

export default function Navigation({
    breadcrumb,
    breadcrumbBase,
    filePath,
    title,
    menuOpen,
    handleMobileMenuClick,
    next,
    previous,
}) {
    return (
        <div
            style={{
                transition: 'all 0.5s ease 0s',
                zIndex: 1001,
                transform: menuOpen ? 'translate3d(calc(100vw - 80px), 0px, 0px)' : 'none',
            }}
            className="max-w-screen-3xl mx-auto sticky -top-1"
        >
            <div className="bg-tan dark:bg-almost-black flex items-center mt-4 border border-gray-accent-light dark:border-gray-accent-dark border-dashed border-l-0 border-r-0 ">
                <button onClick={handleMobileMenuClick} className="py-2 px-3 block md:hidden">
                    <MobileMenu style={{ transform: `rotate(${menuOpen ? '180deg' : '0deg'})` }} />
                </button>
                <ul className="list-none p-0 m-0 hidden md:flex">
                    <li className="border-r border-gray-accent-light dark:border-gray-accent-dark border-dashed">
                        <Link
                            className="text-yellow hover:text-yellow font-bold py-2 px-3 block"
                            to={breadcrumbBase.url}
                        >
                            {breadcrumbBase.name}
                        </Link>
                    </li>
                    {breadcrumb &&
                        breadcrumb.map((crumb, index) => {
                            return (
                                <li
                                    key={index}
                                    className="py-2 px-3 border-r border-gray-accent-light dark:border-gray-accent-dark border-dashed"
                                >
                                    <Link className="text-yellow hover:text-yellow font-bold" to={crumb.url}>
                                        {crumb.name}
                                    </Link>
                                </li>
                            )
                        })}
                    <li className="py-2 px-3 text-almost-black dark:text-white font-bold">{title}</li>
                </ul>

                <div className="flex-grow border-r border-l border-gray-accent-light dark:border-gray-accent-dark border-dashed">
                    <div className="w-full flex space-x-2 md:space-x-0 text-gray dark:text-gray-accent-light">
                        <SearchBar base={breadcrumbBase.name.toLowerCase()} />
                    </div>
                </div>

                <ul className="list-none p-0 m-0 hidden lg:flex ml-auto">
                    <li className="py-2 px-3">
                        <a
                            className="text-gray text-xs hover:text-almost-black dark:hover:text-white flex items-center space-x-1"
                            href={`https://github.com/PostHog/posthog.com/tree/master/contents${filePath}`}
                        >
                            <Edit />
                            <span>Edit this page</span>
                        </a>
                    </li>
                    <li className="py-2 px-3">
                        <a
                            className="text-gray text-xs hover:text-almost-black dark:hover:text-white flex items-center space-x-2"
                            href={`https://github.com/PostHog/posthog.com/issues/new?title=Docs feedback on: ${title}&body=**Issue with: ${filePath}**\n\n`}
                        >
                            <Issue />
                            <span>Raise an issue</span>
                        </a>
                    </li>
                </ul>
                <div className="ml-auto md:ml-0 py-2 px-3">
                    <DarkModeToggle className="m-0" />
                </div>
            </div>
        </div>
    )
}
