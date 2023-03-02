import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import Slugger from 'github-slugger'

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
        <div className="grid grid-cols-3 gap-x-6 pb-6 mb-6 border-b border-gray/20">
            <div className="w-full bg-gray-accent-light"></div>
            <div className="col-span-2 py-6 space-y-8">
                <div className="space-y-3">
                    <h1 className="flex items-center my-0">
                        <span className="w-8 text-black/20 text-[24px] mt-1">{num}.</span> <span>{title}</span>
                    </h1>
                    <p className="ml-8 !text-sm text-gray">{description}</p>
                </div>

                <ol className="list-decimal list-inside marker:text-black/20">
                    {headings.map((heading) => (
                        <li key={heading.link} className="px-3 py-2 hover:bg-gray-accent-light">
                            <a href={heading.link}>{heading.title}</a>
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
