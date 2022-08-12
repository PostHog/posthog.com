import Link from 'components/Link'
import React from 'react'
import RightCol from '../RightCol'
import CallToAction from '../CallToAction'
import { Wrapper } from '../Wrapper'
import SearchBar from 'components/Docs/SearchBar'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

interface ColMenuItems {
    title: string
    description: string
    url: string
}

interface Tutorial {
    title: string
    slug: string
    frontmatter: {
        featuredImage: any
    }
}

export default function UsingPosthog({ referenceElement }: { referenceElement: HTMLDivElement }) {
    const {
        tutorials: { nodes },
    } = useStaticQuery(query)

    const resources: ColMenuItems[] = [
        {
            title: 'Customer stories',
            description: 'See how PostHog is supporting industry leaders',
            url: '/customers',
        },
        {
            title: 'Marketplace',
            description: 'Companies and products who can help with PostHog',
            url: '/marketplace',
        },
        {
            title: 'Apps',
            description: 'Browse 50ish apps that help you get more out of PostHog',
            url: '/apps',
        },
        {
            title: 'FAQ',
            description: 'Questions, but frequently asked',
            url: '/faq',
        },
        {
            title: 'Contact sales',
            description: 'Licensing, upgrade, or demo inquiries',
            url: '/signup/self-host/get-in-touch#contact',
        },
        {
            title: 'PostHog on GitHub',
            description: 'See recent activity, browse libraries, request a feature, or file an issue',
            url: 'https://github.com/posthog',
        },
    ]

    const userGuides: ColMenuItems[] = [
        {
            title: 'Product analytics',
            description: 'Insights, funnels, graphs & trends, path analysis + 5 more',
            url: '/using-posthog#product-analytics',
        },
        {
            title: 'Visualize',
            description: 'Session recording, Heatmaps',
            url: '/using-posthog#visualize',
        },
        {
            title: 'Optimize',
            description: 'Feature flags, experimentation & A/B testing + 1 more',
            url: '/using-posthog#optimize',
        },
        {
            title: 'Data',
            description: 'Actions, cohorts, data management, sessions + 4 more',
            url: '/using-posthog#data',
        },
        {
            title: 'Project settings',
            description: 'Team collaboration, organization and projects, toolbar + 3 more',
            url: '/using-posthog#project-settings',
        },
    ]

    return (
        <Wrapper referenceElement={referenceElement} placement="bottom-start">
            <section className="flex md:flex-col flex-col-reverse">
                <div className="md:flex md:p-0 p-5">
                    <div className="md:border-r border-gray-accent-light border-dashed md:w-[500px]">
                        <div className="md:p-6 md:mb-0 mb-4">
                            <div className="flex items-center w-full justify-between opacity-70">
                                <h3 className="text-[18px] font-bold m-0 text-black pl-2">User guides</h3>
                                <SearchBar
                                    label={false}
                                    className="flex-grow-0 !p-0 w-auto dark:text-white"
                                    base={'docs'}
                                />
                            </div>
                            <ol className="m-0 list-none p-0 mt-2">
                                {userGuides.map(({ title, description, url }: ColMenuItems, index) => {
                                    return (
                                        <li key={title}>
                                            <Link
                                                className="rounded-md md:px-2 py-2 hover:bg-tan/50 flex items-start space-x-2 relative active:top-[1px] active:scale-[.99]"
                                                to={url}
                                            >
                                                <span className="text-[14px] text-black/30 text-center leading-none font-semibold dark:text-white mt-1 w-4">
                                                    {index + 1}.
                                                </span>
                                                <div>
                                                    <h3 className="text-base m-0 opacity-70">{title}</h3>
                                                    <p className="text-sm opacity-50 m-0 text-black font-medium dark:text-white">
                                                        {description}
                                                    </p>
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ol>
                            <CallToAction className="inline-block mt-4 !w-full" to="/docs/user-guides">
                                Visit user guides
                            </CallToAction>
                        </div>
                        <div className="py-7 md:px-6 border-t md:border-b-0 border-b md:mb-0 mb-4 border-gray-accent-light border-dashed">
                            <div className="opacity-70">
                                <h3 className="text-[18px] font-bold m-0 text-black ">Latest tutorials</h3>
                            </div>
                            <ul className="m-0 list-none p-0 mt-2 grid grid-cols-2 gap-4">
                                {nodes.map(({ slug, title, frontmatter: { featuredImage } }: Tutorial) => {
                                    const image = featuredImage && getImage(featuredImage)
                                    return (
                                        <li key={slug}>
                                            <Link
                                                className="inline-block relative active:top-[1px] active:scale-[.99]"
                                                to={slug}
                                            >
                                                <GatsbyImage
                                                    className="rounded bg-tan dark:bg-[#444] pointer-events-none"
                                                    image={image}
                                                    alt={title}
                                                />
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                            <CallToAction className="inline-block mt-4 !w-full" to="/tutorials">
                                Visit tutorials
                            </CallToAction>
                        </div>
                    </div>
                    <RightCol title="Resources">
                        <ol className="m-0 list-none p-0">
                            {resources.map(({ title, description, url }: ColMenuItems) => {
                                return (
                                    <li key={title}>
                                        <Link
                                            className="rounded-sm py-2 px-3 block hover:bg-tan/50 relative active:top-[1px] active:scale-[.99]"
                                            to={url}
                                        >
                                            <h3 className="text-base m-0 opacity-70 text-black">{title}</h3>
                                            <p className="text-sm opacity-50 m-0 text-black font-medium dark:text-white">
                                                {description}
                                            </p>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ol>
                    </RightCol>
                </div>
            </section>
        </Wrapper>
    )
}

const query = graphql`
    {
        tutorials: allMdx(
            filter: { fields: { slug: { regex: "/^/tutorials/" } } }
            limit: 2
            sort: { fields: frontmatter___date, order: DESC }
        ) {
            nodes {
                slug
                frontmatter {
                    featuredImage {
                        childImageSharp {
                            gatsbyImageData(placeholder: NONE)
                        }
                    }
                }
            }
        }
    }
`
