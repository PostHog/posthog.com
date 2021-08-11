import React, { useState } from 'react'
import Header from 'components/Header'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { Link } from 'gatsby'
import Scrollspy from 'react-scrollspy'
import planets from '../images/planets.svg'
import footerLogo from '../images/posthog-logo-footer.svg'
import { DarkModeToggle } from '../components/DarkModeToggle'
import scrollTo from 'gatsby-plugin-smoothscroll'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import '../styles/handbook.scss'

function MenuItem({ item, slug }) {
    const isActive = (children) => {
        return (
            children &&
            children.some((child) => {
                return child.url === slug || isActive(child.children)
            })
        )
    }
    const opacity = item.url === slug || isActive(item.children) ? '1' : '40'
    const [open, setOpen] = useState(isActive(item.children))
    const handleClick = () => setOpen(!open)
    return (
        <li>
            <div className="flex items-center justify-between space-x-16">
                {item.url ? (
                    <Link
                        className={`transition-opacity text-[#200935] hover:text-[#200935] dark:text-white dark:hover:text-white opacity-${opacity} hover:opacity-75 ${
                            item.children ? 'font-bold' : 'text-[15px]'
                        }`}
                        to={item.url}
                    >
                        {item.name}
                    </Link>
                ) : (
                    <button
                        onClick={handleClick}
                        className={`dark:text-white dark:hover:text-white font-bold opacity-${opacity} hover:opacity-75 transition-opacity`}
                    >
                        {item.name}
                    </button>
                )}

                {item.children && (
                    <button onClick={handleClick}>
                        <svg
                            style={{ transform: `rotate(${open ? '180deg' : '0deg'})` }}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 transition-transform opacity-${opacity} hover:opacity-75 transition-opacity`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                )}
            </div>
            <div style={{ display: open ? 'block' : 'none' }}>
                <Menu slug={slug} className="mt-2" menu={item.children} sub />
            </div>
        </li>
    )
}

function Menu({ menu, sub, className, slug }) {
    return (
        <ul className={`${className} flex flex-col space-y-2 list-none p-0 my-0 ${sub ? 'ml-2' : ''}`}>
            {menu &&
                menu.map((item, index) => {
                    return <MenuItem key={index} slug={slug} item={item} />
                })}
        </ul>
    )
}

function MainSidebar({ slug, menu }) {
    return (
        <nav className="transition-opacity opacity-40 hover:opacity-100">
            <Menu menu={menu} slug={slug} />
        </nav>
    )
}

function InternalSidebar({ tableOfContents, className = '' }) {
    const [navBallLocation, setNavBallLocation] = useState(null)
    const [activeId, setActiveId] = useState(null)
    const handleInternalNavUpdate = (el) => {
        if (el) {
            const activeEl = document.querySelector('.active-link')
            setActiveId(el.id)
            setNavBallLocation(activeEl.offsetTop + 7)
        }
    }
    return (
        <aside className={`relative ${className}`}>
            <div className="xl:pl-7">
                <div
                    style={{ top: navBallLocation || 0, left: -5 }}
                    className="bg-[#200935] dark:bg-white rounded-full w-2 h-2 z-10 absolute transition-all hidden xl:block"
                />
                <p className="text-light-purple text-base mt-0 mb-4">On this page</p>
                <Scrollspy
                    onUpdate={handleInternalNavUpdate}
                    className="list-none m-0 p-0 flex flex-col space-y-2"
                    items={tableOfContents?.map((navItem) => navItem.url)}
                    currentClassName="active-link font-bold"
                >
                    {tableOfContents?.map((navItem, index) => {
                        return (
                            <li
                                style={activeId === navItem.url ? { opacity: '1' } : {}}
                                className="hover:opacity-100 lg:opacity-60 text-[15px]"
                                key={index}
                            >
                                <a
                                    className={`text-[#200935] hover:text-[#200935] dark:text-white dark:hover:text-white font-bold`}
                                    onClick={() => scrollTo(`[id="${navItem.url}"]`)}
                                >
                                    {navItem.name}
                                </a>
                            </li>
                        )
                    })}
                </Scrollspy>
            </div>
        </aside>
    )
}

const A = (props) => <a {...props} className="text-yellow hover:text-yellow font-bold" />
const Iframe = (props) => (
    <div style={{ position: 'relative', height: 0, paddingBottom: '56.25%' }}>
        <iframe {...props} className="absolute top-0 left-0 w-full h-full" />
    </div>
)

function SearchBar({ filePath, title }) {
    return (
        <div className="max-w-[800px] mx-auto handbook-search relative z-10">
            <div className="mt-14 w-full">
                <div className="flex space-x-3 text-[14px] items-center text-[#c4b7d1]  py-3 rounded px-4 bg-[#e4e0e9] dark:bg-[#371A51] shadow-xl dark:shadow-2xl">
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </span>

                    <input
                        className="bg-[#e4e0e9] w-full dark:bg-[#371A51] outline-none"
                        placeholder="Search handbook"
                    />
                    <div className="flex space-x-3 flex-shrink-0">
                        <a
                            className="text-[#c4b7d1] hover:text-[#c4b7d1] hidden sm:flex items-center space-x-1"
                            href={`https://github.com/PostHog/posthog.com/tree/master/contents${filePath}`}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.086 4.06683L13.8881 6.8689L14.5567 6.20022L11.7547 3.39816L11.086 4.06683Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M3.62558 11.5357L6.42725 14.3381L13.4016 7.3658L10.5999 4.56334L3.62558 11.5357Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M15.6623 5.12968C16.1126 4.67936 16.1126 3.95886 15.6623 3.50855L14.4914 2.33773C14.0411 1.88742 13.2756 1.88742 12.8703 2.33773L12.2849 2.92314L15.1219 5.76012L15.6623 5.12968Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M2.01767 15.487C1.97263 15.6221 2.01767 15.7572 2.10773 15.8472C2.15276 15.8923 2.24282 15.9373 2.33289 15.9373C2.37792 15.9373 2.42295 15.9373 2.46798 15.9373L5.84533 14.7214L3.23351 12.1096L2.01767 15.487Z"
                                    fill="currentColor"
                                />
                            </svg>
                            <span>Edit this page</span>
                        </a>
                        <a
                            className="text-[#c4b7d1] hover:text-[#c4b7d1] hidden sm:flex items-center space-x-2"
                            href={`https://github.com/PostHog/posthog.com/issues/new?title=Docs feedback on: ${title}&body=**Issue with: ${filePath}**\n\n`}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.34524 13.071C8.53769 13.071 7.88086 13.7281 7.88086 14.5356C7.88086 15.3432 8.53769 16 9.34524 16C10.1528 16 10.8098 15.3432 10.8098 14.5356C10.8098 13.7281 10.1528 13.071 9.34524 13.071Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M8.60145 12.5085H10.0893C10.1872 12.5085 10.272 12.4405 10.2929 12.3447L12.1858 3.75563C12.2001 3.69087 12.1828 3.62324 12.139 3.57335L10.8206 2.0711C10.7809 2.02588 10.7239 2 10.6638 2H8.0269C7.96681 2 7.90979 2.02588 7.87007 2.0711L6.55174 3.57335C6.50794 3.62324 6.49063 3.69087 6.50489 3.75563L8.39778 12.3447C8.41876 12.4405 8.50349 12.5085 8.60145 12.5085Z"
                                    fill="currentColor"
                                />
                            </svg>

                            <span>Raise an issue</span>
                        </a>
                        <DarkModeToggle />
                    </div>
                </div>
            </div>
        </div>
    )
}

function Footer({ contributors, filePath, title }) {
    return (
        <footer className=" text-white pb-52">
            <div className="bg-[#371A51] px-4">
                <div className="py-14 max-w-[650px] 2xl:max-w-[800px] mx-auto relative">
                    <img className="absolute -top-6" src={footerLogo} />
                    <h2>Reach out</h2>
                    <p>
                        If you need help on any of the above, feel free to create an issue on our repo, or join our
                        Slack where a member of our team can assist you! Chances are that if you have a problem or
                        question, someone else does too - so please don't hesitate to create a new issue or ask us a
                        question.
                    </p>
                    <div className="my-10">
                        <h3 className="text-base">Contributors</h3>
                        <ul className="list-none m-0 p-0 flex space-x-2 mt-2 flex-wrap">
                            {contributors.map((contributor, index) => {
                                const { avatar_url, html_url, login } = contributor.author
                                return (
                                    <li key={index}>
                                        <a href={html_url}>
                                            <img className="rounded-full max-w-[37px]" src={avatar_url} />
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-base">Docs</h3>
                            <ul className="m-0 p-0 list-none flex flex-col space-y-2">
                                <li>
                                    <a
                                        className="text-white hover:text-white flex items-center space-x-1"
                                        href={`https://github.com/PostHog/posthog.com/tree/master/contents${filePath}`}
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M11.086 4.06683L13.8881 6.8689L14.5567 6.20022L11.7547 3.39816L11.086 4.06683Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M3.62558 11.5357L6.42725 14.3381L13.4016 7.3658L10.5999 4.56334L3.62558 11.5357Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M15.6623 5.12968C16.1126 4.67936 16.1126 3.95886 15.6623 3.50855L14.4914 2.33773C14.0411 1.88742 13.2756 1.88742 12.8703 2.33773L12.2849 2.92314L15.1219 5.76012L15.6623 5.12968Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M2.01767 15.487C1.97263 15.6221 2.01767 15.7572 2.10773 15.8472C2.15276 15.8923 2.24282 15.9373 2.33289 15.9373C2.37792 15.9373 2.42295 15.9373 2.46798 15.9373L5.84533 14.7214L3.23351 12.1096L2.01767 15.487Z"
                                                fill="white"
                                            />
                                        </svg>
                                        <span>Edit this page</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="text-white hover:text-white flex items-center space-x-1"
                                        href={`https://github.com/PostHog/posthog.com/issues/new?title=Docs feedback on: ${title}&body=**Issue with: ${filePath}**\n\n`}
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.34524 13.071C8.53769 13.071 7.88086 13.7281 7.88086 14.5356C7.88086 15.3432 8.53769 16 9.34524 16C10.1528 16 10.8098 15.3432 10.8098 14.5356C10.8098 13.7281 10.1528 13.071 9.34524 13.071Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M8.60145 12.5085H10.0893C10.1872 12.5085 10.272 12.4405 10.2929 12.3447L12.1858 3.75563C12.2001 3.69087 12.1828 3.62324 12.139 3.57335L10.8206 2.0711C10.7809 2.02588 10.7239 2 10.6638 2H8.0269C7.96681 2 7.90979 2.02588 7.87007 2.0711L6.55174 3.57335C6.50794 3.62324 6.49063 3.69087 6.50489 3.75563L8.39778 12.3447C8.41876 12.4405 8.50349 12.5085 8.60145 12.5085Z"
                                                fill="white"
                                            />
                                        </svg>

                                        <span>Raise an issue</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-base">Community & support</h3>
                            <ul className="m-0 p-0 list-none">
                                <li>
                                    Join our{' '}
                                    <Link className="text-yellow hover:text-yellow" to="/slack">
                                        Slack community
                                    </Link>
                                </li>
                                <li>
                                    Add a{' '}
                                    <a
                                        className="text-yellow hover:text-yellow"
                                        href="https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement&template=feature_request.md&title="
                                    >
                                        feature request
                                    </a>
                                </li>
                                <li>
                                    Email us at{' '}
                                    <a className="text-yellow hover:text-yellow" href="mailto:hey@posthog.com">
                                        hey@posthog.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default function Handbook({ data: { post }, pageContext: { menu, next, breadcrumb = [], breadcrumbBase } }) {
    const {
        body,
        frontmatter,
        tableOfContents,
        fields: { slug, contributors },
    } = post
    const { title, hideAnchor } = frontmatter
    const { parent } = post
    const lastUpdated = parent?.fields?.gitLogLatestDate
    const filePath = `/${parent?.relativePath}`
    const components = {
        a: A,
        iframe: Iframe,
    }

    function flatten(items) {
        return items.reduce((acc, item) => {
            if (item.url) {
                acc.push({ url: item.url.slice(1), name: item.title })
            }
            if (item.items) {
                acc.push(...flatten(item.items))
            }
            return acc
        }, [])
    }

    const tocFlattened = tableOfContents.items && flatten(tableOfContents.items)
    const breakpoints = useBreakpoint()

    return (
        <div className="bg-white dark:bg-[#220f3f] handbook-container">
            <Header onPostPage className="max-w-screen-2xl mx-auto" />
            <div className="relative px-4">
                <SearchBar filePath={filePath} title={title} />
                <div className="dark:text-white pt-20 flex max-w-screen-2xl mx-auto items-start relative z-10">
                    <aside className="hidden md:block flex-shrink-0 2xl:flex-1 sticky top-10 mb-14 max-w-[224px]">
                        <MainSidebar menu={menu} slug={slug} />
                    </aside>
                    <main className="relative md:pl-16 xl:px-32">
                        <article className="2xl:max-w-[800px] xl:max-w-[650px] max-w-full pb-14">
                            <section className="pb-8 xl:mb-16 relative">
                                {breadcrumb && (
                                    <ul className="text-[#765494] list-none p-0 m-0 flex font-semibold space-x-2 mb-2 -mt-2 absolute -top-4">
                                        <li className="flex items-center space-x-2">
                                            <span>{breadcrumbBase}</span>

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                />
                                            </svg>
                                        </li>
                                        {breadcrumb.map((crumb, index) => {
                                            return (
                                                <li key={index} className="flex items-center space-x-2">
                                                    <span>{crumb}</span>
                                                    {breadcrumb[index + 1] && (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                            />
                                                        </svg>
                                                    )}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )}
                                <h1 className="dark:text-white text-5xl mt-0 mb-2">{title}</h1>
                                <p className="dark:text-light-purple mt-1 mb-0">
                                    Last updated: <time>{lastUpdated}</time>
                                </p>
                            </section>
                            {breakpoints.lg && !hideAnchor && (
                                <InternalSidebar
                                    className="bg-[#e4e0e9] dark:bg-white p-4 rounded dark:bg-opacity-10 mb-10"
                                    tableOfContents={tocFlattened}
                                />
                            )}
                            <section className="article-content">
                                <MDXProvider components={components}>
                                    <MDXRenderer>{body}</MDXRenderer>
                                </MDXProvider>
                            </section>
                            {!hideAnchor && (
                                <div
                                    style={{ height: 'calc(100% - 35vh)' }}
                                    className="w-[1px] absolute bottom-0  right-0 bg-[#765494] hidden xl:flex justify-center"
                                />
                            )}
                            {next && (
                                <>
                                    <hr
                                        style={{ width: hideAnchor || breakpoints.lg ? '100%' : 'calc(100% + 8rem)' }}
                                        className="bg-[#765494] my-9"
                                    />
                                    <section className="">
                                        <p className="dark:text-white opacity-70 font-bold m-0 text-base">NEXT UP</p>

                                        <Link
                                            className="text-yellow hover:text-yellow flex items-center space-x-1 text-base font-bold"
                                            to={next.url}
                                        >
                                            <span>{next.name}</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                />
                                            </svg>
                                        </Link>
                                    </section>
                                </>
                            )}
                        </article>
                    </main>
                    {!breakpoints.lg && !hideAnchor && (
                        <InternalSidebar
                            className="flex-shrink-0 2xl:flex-1 sticky top-10 mt-[35vh] mb-14"
                            tableOfContents={tocFlattened}
                        />
                    )}
                </div>
                <img className="absolute top-0 right-0 w-[35vw] hidden lg:block" src={planets} />
            </div>
            <Footer title={title} filePath={filePath} contributors={contributors} />
        </div>
    )
}

export const query = graphql`
    query HandbookQuery($id: String!) {
        post: mdx(id: { eq: $id }) {
            id
            body
            tableOfContents
            fields {
                slug
                contributors {
                    author {
                        avatar_url
                        html_url
                        login
                    }
                }
            }
            frontmatter {
                title
                hideAnchor
            }
            parent {
                ... on File {
                    relativePath
                    fields {
                        gitLogLatestDate(formatString: "MMM D, YYYY")
                    }
                }
            }
        }
    }
`
