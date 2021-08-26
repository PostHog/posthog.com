import React from 'react'
import Link from 'components/Link'
import { DarkModeToggle } from 'components/DarkModeToggle'
import SearchBar from './SearchBar'
import { CircleArrow, Edit, Issue } from 'components/Icons/Icons'
import SectionLink from './SectionLink'

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
        <div className="max-w-screen-2xl mx-auto mb-8 md:mb-16 ">
            <div className="flex mt-4 items-center border-2 border-gray-accent-light dark:border-gray-accent-dark border-dashed border-l-0 border-r-0 ">
                <ul className="list-none p-0 m-0 flex">
                    <li className="py-2 px-5 border-r-2 border-gray-accent-light dark:border-gray-accent-dark border-dashed">
                        <Link className="text-yellow hover:text-yellow font-bold " to={breadcrumbBase.url}>
                            {breadcrumbBase.name}
                        </Link>
                    </li>
                    {breadcrumb.map((crumb, index) => {
                        return (
                            <li
                                key={index}
                                className="py-2 px-5 border-r-2 border-gray-accent-light dark:border-gray-accent-dark border-dashed"
                            >
                                <Link className="text-yellow hover:text-yellow font-bold" to={crumb.url}>
                                    {crumb.name}
                                </Link>
                            </li>
                        )
                    })}
                    <li className="py-2 px-5 text-almost-black dark:text-white font-bold">{title}</li>
                </ul>
                <ul className="list-none p-0 m-0 hidden md:flex ml-auto">
                    <li className="py-2 px-5">
                        <a
                            className="text-gray hover:text-almost-black dark:hover:text-white hidden lg:flex items-center space-x-1"
                            href={`https://github.com/PostHog/posthog.com/tree/master/contents${filePath}`}
                        >
                            <Edit />
                            <span>Edit this page</span>
                        </a>
                    </li>
                    <li className="py-2 px-5">
                        <a
                            className="text-gray hover:text-almost-black dark:hover:text-white flex items-center space-x-2"
                            href={`https://github.com/PostHog/posthog.com/issues/new?title=Docs feedback on: ${title}&body=**Issue with: ${filePath}**\n\n`}
                        >
                            <Issue />
                            <span>Raise an issue</span>
                        </a>
                    </li>
                </ul>
                <div className="ml-auto md:ml-0 py-2 px-5 border-l-2 border-gray-accent-light dark:border-gray-accent-dark border-dashed">
                    <DarkModeToggle className="m-0" />
                </div>
            </div>
            <div className="flex justify-end xl:justify-start items-center mt-4">
                <SectionLink link={previous} iconClass="transform rotate-180" className="hidden xl:flex flex-1" />
                <SearchBar
                    className="2xl:max-w-[800px] max-w-full md:max-w-[calc(100%-224px-4rem)] xl:max-w-[650px] w-full"
                    menuOpen={menuOpen}
                    handleMobileMenuClick={handleMobileMenuClick}
                    filePath={filePath}
                    title={title}
                />
                <SectionLink link={next} className="hidden xl:flex flex-1 justify-end" />
            </div>
        </div>
    )
}
