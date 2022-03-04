import cntl from 'cntl'
import { DarkModeToggle } from 'components/DarkModeToggle'
import { Edit, Issue, MobileMenu } from 'components/Icons/Icons'
import Link from 'components/Link'
import React from 'react'
import SearchBar from './SearchBar'

const crumbText = (classes = '') => cntl`
    font-bold
    py-2
    px-3
    block
    text-xs
    ${classes}
`

const CommunityLink = ({ icon, text, url }) => {
    return (
        <li className="py-2 px-3">
            <a
                className={`text-xs text-gray hover:text-gray-2 dark:hover:text-white flex items-center font-normal space-x-1`}
                href={url}
            >
                {icon}
                <span>{text}</span>
            </a>
        </li>
    )
}

const Crumb = ({ url, text, className }) => {
    // If crumbs get more complex, create a conditional wrapper component to keep code DRY
    return (
        <li
            className={`border-r border-gray-accent-light dark:border-gray-accent-dark border-dashed text-primary dark:text-primary-dark ${className}`}
        >
            {url ? (
                <Link className={crumbText(`text-red hover:text-red`)} to={url}>
                    {text}
                </Link>
            ) : (
                <span className={crumbText()}>{text}</span>
            )}
        </li>
    )
}

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
            className="max-w-screen-3xl mx-auto sticky top-[-1px]"
        >
            <div className="bg-tan dark:bg-almost-black flex items-center mt-4 border border-gray-accent-light dark:border-gray-accent-dark border-dashed border-l-0 border-r-0 ">
                <button onClick={handleMobileMenuClick} className="py-2 px-3 block md:hidden">
                    <MobileMenu style={{ transform: `rotate(${menuOpen ? '180deg' : '0deg'})` }} />
                </button>
                <ul className="list-none p-0 m-0 hidden md:flex">
                    <Crumb url={breadcrumbBase.url} text={breadcrumbBase.name} />
                    {breadcrumb &&
                        breadcrumb.map((crumb, index) => {
                            return <Crumb key={index} url={crumb.url} text={crumb.name} />
                        })}
                    <Crumb text={title} className="border-r-0" />
                </ul>
                <div className="flex-grow">
                    <div className="w-full flex space-x-2 md:space-x-0 text-gray dark:text-gray-accent-light">
                        <SearchBar base={breadcrumbBase.name.toLowerCase()} />
                    </div>
                </div>
                {filePath && (
                    <ul className="list-none p-0 m-0 hidden lg:flex ml-auto border-r border-gray-accent-light dark:border-gray-accent-dark border-dashed">
                        <CommunityLink
                            icon={<Edit />}
                            text={'Edit this page'}
                            url={`https://github.com/PostHog/posthog.com/tree/master/contents${filePath}`}
                        />
                        <CommunityLink
                            icon={<Issue />}
                            text={'Raise an issue'}
                            url={`https://github.com/PostHog/posthog.com/issues/new?title=${breadcrumbBase.name} feedback on: ${title}&body=**Issue with: ${filePath}**\n\n`}
                        />
                    </ul>
                )}
                <DarkModeToggle className="m-0" />
            </div>
        </div>
    )
}
