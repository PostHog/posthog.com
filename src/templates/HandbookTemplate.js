import React, { useState } from 'react'
import Header from 'components/Header'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { Link } from 'gatsby'
import Scrollspy from 'react-scrollspy'
import planets from '../images/planets.svg'
import footerLogo from '../images/posthog-logo-footer.svg'
import { DarkModeToggle } from '../components/DarkModeToggle'
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
    const opacity = item.url === slug || isActive(item.children) ? '1' : '.4'
    const [open, setOpen] = useState(isActive(item.children))
    const handleClick = () => setOpen(!open)
    return (
        <li>
            <div className="flex items-center justify-between">
                {item.url ? (
                    <Link
                        style={{ opacity }}
                        className={`transition-opacity text-[#200935] hover:text-[#200935] dark:text-white dark:hover:text-white hover:opacity-100`}
                        to={item.url}
                    >
                        {item.name}
                    </Link>
                ) : (
                    <button
                        style={{ opacity }}
                        onClick={handleClick}
                        className={`dark:text-white dark:hover:text-white`}
                    >
                        {item.name}
                    </button>
                )}

                {item.children && (
                    <button className="transition-opacity opacity-0 group-hover:opacity-100" onClick={handleClick}>
                        <svg
                            style={{ transform: `rotate(${open ? '180deg' : '0deg'})`, opacity }}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 transition-transform`}
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
        <nav className="group">
            <Menu menu={menu} slug={slug} />
        </nav>
    )
}

function InternalSidebar(props) {
    const { tableOfContents } = props
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
        <div className="relative">
            <div
                style={{ top: navBallLocation || 0 }}
                className="bg-[#200935] dark:bg-white rounded-full w-2 h-2 z-10 absolute -left-7 transition-all hidden lg:block"
            />
            <p className="text-light-purple text-base mt-0 mb-2">On this page</p>
            <Scrollspy
                onUpdate={handleInternalNavUpdate}
                className="list-none m-0 p-0 flex flex-col space-y-2"
                items={tableOfContents?.map((navItem) => navItem.url)}
                currentClassName="active-link"
            >
                {tableOfContents?.map((navItem, index) => {
                    return (
                        <li
                            style={activeId === navItem.url ? { opacity: '1' } : {}}
                            className="hover:opacity-100 lg:opacity-60"
                            key={index}
                        >
                            <a
                                className={`text-[#200935] hover:text-[#200935] dark:text-white dark:hover:text-white`}
                                href={`#${navItem.url}`}
                            >
                                {navItem.name}
                            </a>
                        </li>
                    )
                })}
            </Scrollspy>
        </div>
    )
}

const A = (props) => <a {...props} className="text-yellow hover:text-yellow font-bold" />

function SearchBar(props) {
    return (
        <div className="lg:pl-[200px] max-w-screen-2xl mx-auto handbook-search px-4">
            <div className="mt-14 max-w-4xl w-full lg:pr-16">
                <div className="flex space-x-3 text-base items-center text-[#c4b7d1] dark:text-white py-3 rounded px-4 bg-[#e4e0e9] dark:bg-[#371A51] shadow-xl dark:shadow-2xl">
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
                    <input
                        className="bg-[#e4e0e9] dark:bg-[#371A51] w-full outline-none"
                        placeholder="Search handbook"
                    />
                    <DarkModeToggle />
                </div>
            </div>
        </div>
    )
}

function Footer({ contributors }) {
    return (
        <footer className=" text-white pb-52">
            <div className="bg-[#371A51] px-4">
                <div className="py-14 max-w-screen-2xl mx-auto ">
                    <div className="lg:pl-[200px] max-w-4xl w-full relative">
                        <img className="absolute -top-20" src={footerLogo} />
                        <h2>Reach out</h2>
                        <p>
                            If you need help on any of the above, feel free to create an issue on our repo, or join our
                            Slack where a member of our team can assist you! Chances are that if you have a problem or
                            question, someone else does too - so please don't hesitate to create a new issue or ask us a
                            question.
                        </p>
                        <div className="my-10">
                            <h3 className="text-base">Contributors</h3>
                            <ul className="list-none m-0 p-0 flex space-x-2 mt-2">
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
                                <ul className="m-0 p-0 list-none">
                                    <li>
                                        <a className="text-white hover:text-white" href="">
                                            Edit this page
                                        </a>
                                    </li>
                                    <li>
                                        <a className="text-white hover:text-white" href="">
                                            Raise an issue
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-base">Community & support</h3>
                                <ul className="m-0 p-0 list-none">
                                    <li>
                                        <a className="text-yellow hover:text-yellow" href="">
                                            Join our Slack community
                                        </a>
                                    </li>
                                    <li>
                                        <a className="text-yellow hover:text-yellow" href="">
                                            Add a feature request
                                        </a>
                                    </li>
                                    <li>
                                        <a className="text-yellow hover:text-yellow" href="">
                                            Email us at hey@posthog.com
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default function Handbook({ data: { post }, pageContext: { menu, next, breadcrumb = [] } }) {
    const {
        body,
        frontmatter,
        tableOfContents,
        fields: { slug, contributors },
    } = post
    const { title } = frontmatter
    const lastUpdated = post.parent.mtime
    const components = {
        a: A,
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

    return (
        <div className="bg-white dark:bg-[#220f3f] handbook-container">
            <Header onPostPage className="max-w-screen-2xl mx-auto" />
            <SearchBar />
            <div className="relative px-4">
                <div className="dark:text-white pt-16 flex max-w-screen-2xl mx-auto items-start relative z-10">
                    <aside className="flex-shrink-0 max-w-[200px] w-full sticky top-10 pr-5 mb-14 hidden sm:block">
                        <MainSidebar menu={menu} slug={slug} />
                    </aside>
                    <main className="flex flex-grow relative items-start flex-col-reverse lg:flex-row">
                        <article className="max-w-4xl w-full relative  pb-14">
                            <section className="mb-16 relative">
                                {breadcrumb && (
                                    <ul className="text-[#765494] list-none p-0 m-0 flex font-semibold space-x-2 mb-2 -mt-2 absolute -top-4">
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
                            <div className="lg:pr-16">
                                <MDXProvider components={components}>
                                    <MDXRenderer>{body}</MDXRenderer>
                                </MDXProvider>
                            </div>
                            <div
                                style={{ height: 'calc(100% - 35vh)' }}
                                className="w-[1px] absolute bottom-0 right-0 bg-[#765494] hidden lg:flex justify-center"
                            />
                            {next && (
                                <section className="pt-9 mt-9 border-t border-[#765494]">
                                    <p className="dark:text-white opacity-70 font-bold m-0">NEXT UP</p>

                                    <Link
                                        className="text-yellow hover:text-yellow text-lg flex items-center space-x-1"
                                        to={next.url}
                                    >
                                        <span>{next.name}</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
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
                            )}
                        </article>
                        <aside className="lg:max-w-[350px] lg:flex-shrink-0 lg:sticky lg:top-10 lg:mt-[35vh] lg:pl-6 mb-14">
                            <InternalSidebar tableOfContents={tocFlattened} />
                        </aside>
                    </main>
                </div>
                <img className="absolute top-0 right-0 w-[35vw]" src={planets} />
            </div>
            <Footer contributors={contributors} />
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
            }
            parent {
                ... on File {
                    mtime(formatString: "MMM D, YYYY")
                }
            }
        }
    }
`
