import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import Slugger from 'github-slugger'
import { CallToAction } from 'components/CallToAction'

const slugger = new Slugger()

const query = graphql`
    query Chapters {
        allMdx(filter: { fileAbsolutePath: { regex: "/docs/getting-started/" } }) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    title
                    description
                }
                headings {
                    depth
                    value
                }
            }
        }
    }
`

const filterHeadings = (slug: string, headings: any[]) => {
    return headings
        .filter((heading: any) => heading.depth === 2)
        .map((heading: any) => {
            const cleanHeading = heading.value
                .replace(/^[0-9]+\.\s/, '')
                .replace(/<[^>]*>[\w\d\s]*<\/[^>]*>/gm, '')
                .trim()

            return {
                title: cleanHeading,
                link: `${slug}#${slugger.slug(heading.value)}`,
            }
        })
}

type ChapterProps = {
    num: number
    title: string
    description: string
    headings: {
        title: string
        link: string
    }[]
    children?: React.ReactNode
}

const Chapter: React.FC<ChapterProps> = ({ num, title, description, headings, children }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 pb-6 mb-6">
            <div className="w-full h-48 md:h-auto bg-gray-accent-light dark:bg-gray-accent-dark rounded"></div>
            <div className="md:col-span-2 pt-2 pb-6 space-y-8">
                <div className="flex items-center justify-between border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark pb-6">
                    <div className="">
                        <span className="text-black/20 dark:text-white/60 font-semibold">Chapter {num}</span>
                        <h3 className="flex items-center !my-0">
                            <span>{title}</span>
                        </h3>
                    </div>
                    <CallToAction type="secondary" size="sm">
                        Visit section
                    </CallToAction>
                </div>

                <span className="block text-sm text-black/40 dark:text-white/60 font-semibold mt-6 !mb-3">
                    Jump to:
                </span>
                <ol className="list-none !m-0 font-semibold space-y-4">
                    {headings.map((heading) => (
                        <li key={heading.link} className="pl-6 jumpTo group flex items-center leading-none">
                            <Link
                                to={heading.link}
                                className="text-black/80 dark:text-white/60 group-hover:text-black/90 dark:group-hover:text-white/90"
                            >
                                <span className="">{heading.title}</span>
                            </Link>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export const InstallChapter: React.FC = () => {
    const data = useStaticQuery(query)

    const {
        frontmatter: { title, description },
    } = data.allMdx.nodes.find((node: any) => node.fields.slug === '/docs/getting-started/install')

    return (
        <Chapter
            num={1}
            title={title}
            description={description}
            headings={[
                { title: 'Snippet', link: '/docs/getting-started/install?tab=snippet' },
                { title: 'SDKs', link: '/docs/getting-started/install?tab=sdks' },
                { title: 'Integrations', link: '/docs/getting-started/install?tab=integrations' },
                { title: 'API', link: '/docs/getting-started/install?tab=api' },
            ]}
        ></Chapter>
    )
}

export const SendEventsChapter: React.FC = () => {
    const data = useStaticQuery(query)
    const node = data.allMdx.nodes.find((node: any) => node.fields.slug === '/docs/getting-started/send-events')
    const {
        frontmatter: { title, description },
        headings,
    } = node

    const filteredHeadings = filterHeadings(node.fields.slug, headings)

    return <Chapter num={2} title={title} description={description} headings={filteredHeadings}></Chapter>
}

export const IdentifyUsersChapter: React.FC = () => {
    const data = useStaticQuery(query)
    const node = data.allMdx.nodes.find((node: any) => node.fields.slug === '/docs/getting-started/identify-users')
    const {
        frontmatter: { title, description },
        headings,
    } = node

    const filteredHeadings = filterHeadings(node.fields.slug, headings)

    return <Chapter num={3} title={title} description={description} headings={filteredHeadings}></Chapter>
}

export const ActionsAndInsightsChapter: React.FC = () => {
    const data = useStaticQuery(query)
    const node = data.allMdx.nodes.find(
        (node: any) => node.fields.slug === '/docs/getting-started/actions-and-insights'
    )
    const {
        frontmatter: { title, description },
        headings,
    } = node

    const filteredHeadings = filterHeadings(node.fields.slug, headings)

    return <Chapter num={4} title={title} description={description} headings={filteredHeadings}></Chapter>
}

export const GroupAnalyticsChapter: React.FC = () => {
    const data = useStaticQuery(query)
    const node = data.allMdx.nodes.find((node: any) => node.fields.slug === '/docs/getting-started/group-analytics')
    const {
        frontmatter: { title, description },
        headings,
    } = node

    const filteredHeadings = filterHeadings(node.fields.slug, headings)

    return (
        <Chapter num={5} title={title} description={description} headings={filteredHeadings}>
            <p>Identify users</p>
        </Chapter>
    )
}
