import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import Slugger from 'github-slugger'
import { CallToAction } from 'components/CallToAction'
import { GatsbyImage, getImage, ImageDataLike, StaticImage } from 'gatsby-plugin-image'

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
                    featuredImage {
                        childImageSharp {
                            gatsbyImageData(placeholder: NONE)
                        }
                    }
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
            const slugger = new Slugger()
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
    url: string
    headings: {
        title: string
        link: string
    }[]
    children?: React.ReactNode
    image?: ImageDataLike
}

const Chapter: React.FC<ChapterProps> = ({ num, title, url, headings, children, image }) => {
    const gatsbyImage = image && getImage(image)
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 pb-6 mb-6">
            {gatsbyImage && (
                <div className="hidden sm:block max-w-[150px] aspect-square md:max-w-full h-auto bg-gray-accent-light dark:bg-gray-accent-dark rounded">
                    <GatsbyImage alt={title} image={gatsbyImage} />
                </div>
            )}
            <div className="md:col-span-2 pt-2 pb-6 space-y-8">
                <div className="flex items-center justify-between border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark pb-6">
                    <div className="">
                        <span className="text-black/20 dark:text-white/60 font-semibold">Chapter {num}</span>
                        <h3 className="flex items-center !my-0">
                            <span>{title}</span>
                        </h3>
                    </div>
                    <CallToAction type="secondary" size="sm" to={url}>
                        Visit section
                    </CallToAction>
                </div>

                <span className="block text-sm text-black/40 dark:text-white/60 font-semibold mt-6 !mb-3">
                    Jump to:
                </span>
                <ol className="list-none !m-0 font-semibold space-y-4 pl-0">
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
        frontmatter: { title, description, featuredImage },
    } = data.allMdx.nodes.find((node: any) => node.fields.slug === '/docs/getting-started/install')

    return (
        <Chapter
            image={featuredImage}
            num={1}
            title={title}
            url="/docs/getting-started/install"
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
        frontmatter: { title, description, featuredImage },
        headings,
    } = node

    const filteredHeadings = filterHeadings(node.fields.slug, headings)

    return (
        <Chapter
            image={featuredImage}
            num={2}
            title={title}
            url={node.fields.slug}
            headings={filteredHeadings}
        ></Chapter>
    )
}

export const IdentifyUsersChapter: React.FC = () => {
    const data = useStaticQuery(query)
    const node = data.allMdx.nodes.find((node: any) => node.fields.slug === '/docs/getting-started/identify-users')
    const {
        frontmatter: { title, description, featuredImage },
        headings,
    } = node

    const filteredHeadings = filterHeadings(node.fields.slug, headings)

    return (
        <Chapter
            image={featuredImage}
            num={3}
            title={title}
            url={node.fields.slug}
            headings={filteredHeadings}
        ></Chapter>
    )
}

export const UserPropertiesChapter: React.FC = () => {
    const data = useStaticQuery(query)
    const node = data.allMdx.nodes.find((node: any) => node.fields.slug === '/docs/getting-started/person-properties')
    const {
        frontmatter: { title, description, featuredImage },
        headings,
    } = node

    const filteredHeadings = filterHeadings(node.fields.slug, headings)

    return (
        <Chapter
            image={featuredImage}
            num={4}
            title={title}
            url={node.fields.slug}
            headings={filteredHeadings}
        ></Chapter>
    )
}

export const ActionsAndInsightsChapter: React.FC = () => {
    const data = useStaticQuery(query)
    const node = data.allMdx.nodes.find(
        (node: any) => node.fields.slug === '/docs/getting-started/actions-and-insights'
    )
    const {
        frontmatter: { title, description, featuredImage },
        headings,
    } = node

    const filteredHeadings = filterHeadings(node.fields.slug, headings)

    return (
        <Chapter
            image={featuredImage}
            num={5}
            title={title}
            url={node.fields.slug}
            headings={filteredHeadings}
        ></Chapter>
    )
}

export const GroupAnalyticsChapter: React.FC = () => {
    const data = useStaticQuery(query)
    const node = data.allMdx.nodes.find((node: any) => node.fields.slug === '/docs/getting-started/group-analytics')
    const {
        frontmatter: { title, description, featuredImage },
        headings,
    } = node

    const filteredHeadings = filterHeadings(node.fields.slug, headings)

    return (
        <Chapter image={featuredImage} num={6} title={title} url={node.fields.slug} headings={filteredHeadings}>
            <p>Identify users</p>
        </Chapter>
    )
}
