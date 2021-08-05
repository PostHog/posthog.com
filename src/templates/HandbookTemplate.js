import React, { useState } from 'react'
import Header from 'components/Header'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { Link } from 'gatsby'
import { Disclosure } from '@headlessui/react'
import Scrollspy from 'react-scrollspy'
import planets from '../images/planets.svg'

const nav = [
    {
        name: 'Company',
        url: '/handbook/company/story',
        children: [
            {
                name: 'Story',
                url: '/handbook/company/story',
            },
            { name: 'Team', url: '/handbook/company/team' },
            { name: 'Investors', url: '/handbook/strategy/investors' },
        ],
    },
    {
        name: 'Strategy',
        url: '/handbook/strategy/strategy',
        children: [
            { name: 'Strategy overview', url: '/handbook/strategy/strategy' },
            { name: 'Business model', url: '/handbook/strategy/business-model' },
            { name: 'Roadmap', url: '/handbook/strategy/roadmap' },
            { name: 'Prioritization', url: '/handbook/strategy/prioritization' },
        ],
    },
    {
        name: 'Getting started',
        url: '/handbook/getting-started/start-here',
        children: [
            { name: 'Start here', url: '/handbook/getting-started/start-here' },
            { name: 'Meetings', url: '/handbook/getting-started/meetings' },
        ],
    },
    {
        name: 'How we work',
        url: '/handbook/company/culture',
        children: [
            { name: 'Culture', url: '/handbook/company/culture' },
            { name: 'Values', url: '/handbook/company/values' },
            { name: 'Diversity and inclusion', url: '/handbook/company/diversity' },
            { name: 'Communication', url: '/handbook/company/communication' },
            { name: 'Management at PostHog', url: '/handbook/company/management' },
            { name: 'Security', url: '/handbook/company/security' },
            { name: 'Branding', url: '/handbook/company/branding' },
            {
                name: 'Team Structure',
                url: '/handbook/people/team-structure/team-structure',
                children: [
                    { name: 'Team structure', url: '/handbook/people/team-structure/team-structure' },
                    { name: 'Why Small Teams', url: '/handbook/people/team-structure/why-small-teams' },
                    { name: 'Team Core Analytics', url: '/handbook/people/team-structure/core-analytics' },
                    { name: 'Team Core Experience', url: '/handbook/people/team-structure/core-experience' },
                    { name: 'Team Design', url: '/handbook/people/team-structure/design' },
                    { name: 'Team Extensibility', url: '/handbook/people/team-structure/extensibility' },
                    { name: 'Team Growth', url: '/handbook/people/team-structure/growth-engineering' },
                    {
                        name: 'Team Infrastructure & Deployments',
                        url: '/handbook/people/team-structure/infrastructure',
                    },
                    { name: 'Team Marketing', url: '/handbook/people/team-structure/marketing' },
                    { name: 'Team People', url: '/handbook/people/team-structure/people' },
                ],
            },
        ],
    },
]

function MainSidebar(props) {
    const { slug } = props
    const isActive = (children) => {
        return children.some((child) => {
            return child.url === slug || (child.children && isActive(child.children))
        })
    }
    const Menu = ({ menu, sub }) => {
        return (
            <Disclosure as="ul" className={`flex flex-col space-y-2 list-none p-0 my-0 ${sub ? 'ml-2' : ''}`}>
                {menu.map((child, index) => {
                    const active = child.children && isActive(child.children)
                    return (
                        <Disclosure.Button as="li" key={index}>
                            <Link
                                className={`dark:text-white dark:hover:text-white opacity-${
                                    active || slug === child.url ? '100' : '20'
                                } hover:opacity-100`}
                                to={child.url}
                            >
                                {child.name}
                            </Link>
                            {active && (
                                <Disclosure.Panel className="mt-2" static>
                                    <Menu menu={child.children} sub />
                                </Disclosure.Panel>
                            )}
                        </Disclosure.Button>
                    )
                })}
            </Disclosure>
        )
    }
    return (
        <nav>
            <Menu menu={nav} />
        </nav>
    )
}

function InternalSidebar(props) {
    const { tableOfContents } = props
    const [navBallLocation, setNavBallLocation] = useState(null)
    const handleInternalNavUpdate = () => {
        const el = document.querySelector('.active-link')
        if (el) {
            setNavBallLocation(el.offsetTop + 7)
        }
    }
    return (
        <div className="relative">
            <div
                style={{ top: navBallLocation || 0 }}
                className="bg-white rounded-full w-2 h-2 z-10 absolute -left-7 transition-all"
            />
            <p className="text-light-purple text-base mt-0 mb-2">On this page</p>
            <Scrollspy
                onUpdate={handleInternalNavUpdate}
                className="list-none m-0 p-0 flex flex-col space-y-2"
                items={tableOfContents?.map((navItem) => navItem.url)}
                currentClassName="active-link opacity-100"
            >
                {tableOfContents?.map((navItem, index) => {
                    return (
                        <li className="hover:opacity-100 opacity-50" key={index}>
                            <a className={`dark:text-white dark:hover:text-white`} href={`#${navItem.url}`}>
                                {navItem.name}
                            </a>
                        </li>
                    )
                })}
            </Scrollspy>
        </div>
    )
}

const A = (props) => <a {...props} className="dark:text-yellow font-bold" />

export default function Handbook({ data: { post } }) {
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
        <>
            <Header className="max-w-screen-2xl" />
            <div className="relative px-5">
                <div className="dark:text-white pt-16 flex max-w-screen-2xl mx-auto items-start">
                    <aside className="flex-shrink-0 max-w-[200px] w-full sticky top-10 pr-5">
                        <MainSidebar slug={slug} />
                    </aside>
                    <main className="flex flex-grow space-x-16 relative items-start">
                        <div className="max-w-3xl w-full relative  pb-14">
                            <section className="mb-16">
                                <h1 className="dark:text-white text-5xl m-0">{title}</h1>
                                <p className="dark:text-light-purple mt-1 mb-0">
                                    Last updated: <time>{lastUpdated}</time>
                                </p>
                            </section>
                            <article>
                                <MDXProvider components={components}>
                                    <MDXRenderer>{body}</MDXRenderer>
                                </MDXProvider>
                            </article>

                            <div
                                style={{ height: 'calc(100% - 35vh)' }}
                                className="w-[1px] absolute bottom-0 -right-16 bg-[#765494] flex justify-center"
                            />
                        </div>
                        <aside className="max-w-[350px] flex-shrink-0 sticky top-10 mt-[35vh] pl-6">
                            <InternalSidebar tableOfContents={tocFlattened} />
                        </aside>
                    </main>
                </div>
                <img className="absolute top-0 right-0 w-[35vw]" src={planets} />
            </div>
            <footer className="bg-[#200935] dark:text-white pb-52">
                <div className="bg-[#371A51] px-5">
                    <div className="py-14 max-w-screen-2xl mx-auto ">
                        <div className="ml-[200px] max-w-3xl w-full">
                            <h2>Reach out</h2>
                            <p>
                                If you need help on any of the above, feel free to create an issue on our repo, or join
                                our Slack where a member of our team can assist you! Chances are that if you have a
                                problem or question, someone else does too - so please don't hesitate to create a new
                                issue or ask us a question.
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
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-base">Docs</h3>
                                    <ul className="m-0 p-0 list-none">
                                        <li>
                                            <a className="dark:text-white" href="">
                                                Edit this page
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dark:text-white" href="">
                                                Raise an issue
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-base">Community & support</h3>
                                    <ul className="m-0 p-0 list-none">
                                        <li>
                                            <a className="dark:text-yellow" href="">
                                                Join our Slack community
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dark:text-yellow" href="">
                                                Add a feature request
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dark:text-yellow" href="">
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
        </>
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
