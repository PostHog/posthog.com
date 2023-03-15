import { MDXProvider } from '@mdx-js/react'
import Breadcrumbs from 'components/Breadcrumbs'
import FooterCTA from 'components/FooterCTA'
import CTA from 'components/Product/CTA'
import { Check2, Close, RightArrow } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { Section } from 'components/Section'
import { SEO } from 'components/seo'
import TutorialsSlider from 'components/TutorialsSlider'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import GithubSlugger from 'github-slugger'
import React from 'react'
import { shortcodes } from '../mdxGlobalComponents'
import SectionLinks from 'components/SectionLinks'
import PostLayout from 'components/PostLayout'
import {
    AbTesting,
    Analytics,
    API,
    AppLibrary,
    CorrelationAnalysis,
    DataWarehouse,
    EventPipelines,
    Experiments,
    FeatureFlags,
    Funnels,
    Heatmaps,
    PathAnalysis,
    PosthogMonochrome,
    SelfHosting,
    SessionRecording,
    TeamCollaboration,
    TopFeatures,
    Trends,
} from 'components/ProductIcons'
import { BusinessModel } from 'components/NotProductIcons'
import { Check } from 'components/Icons/Icons'
import { CallToAction } from 'components/CallToAction'

const features = [
    { name: 'Product analytics' },
    {
        name: 'Funnels',
        url: '/product/funnels',
        icon: <Funnels />,
    },
    {
        name: 'Graphs & trends',
        url: '/product/trends',
        icon: <Trends />,
    },
    {
        name: 'Path analysis',
        url: '/product/user-paths',
        icon: <PathAnalysis />,
    },
    {
        name: 'Team collaboration',
        url: '/product/collaboration',
        icon: <TeamCollaboration />,
    },
    { name: 'Visualization' },
    {
        name: 'Session recording',
        url: '/product/session-recording',
        icon: <SessionRecording />,
    },
    {
        name: 'Heatmaps',
        url: '/product/heatmaps',
        icon: <Heatmaps />,
    },
    { name: 'Experimentation' },
    {
        name: 'Feature flags',
        url: '/product/feature-flags',
        icon: <FeatureFlags />,
    },
    {
        name: 'Experiments',
        url: '/product/experimentation-suite',
        icon: <Experiments />,
    },
    {
        name: 'Correlation analysis',
        url: '/product/correlation-analysis',
        icon: <CorrelationAnalysis />,
    },
]

const menu = [
    {
        name: 'Overview',
        url: '/product#overview',
        icon: <PosthogMonochrome />,
    },
    {
        name: 'Top features',
        url: '/product#top-features',
        icon: <TopFeatures />,
        children: features.map(({ name, url }) => ({ name, url })),
    },
    { name: 'Apps', url: '/product#apps', icon: <AppLibrary /> },
    { name: 'Event pipelines', url: '/product#event-pipelines', icon: <EventPipelines /> },
    { name: 'Data warehouse', url: '/product#data-warehouse', icon: <DataWarehouse /> },
    { name: 'Self-hosting', url: '/product#self-hosting', icon: <SelfHosting /> },
    { name: 'API', url: '/product#api', icon: <API /> },
]

const nav = [
    {
        label: 'Product analytics',
        url: '/product-analytics',
        icon: <Analytics className="w-5" />,
    },
    {
        label: 'Session recording',
        url: '/session-recording',
        icon: <SessionRecording className="w-5" />,
    },
    {
        label: 'Feature flags',
        url: '/feature-flags',
        icon: <FeatureFlags className="w-5" />,
    },
    {
        label: 'A/B testing',
        url: 'ab-testing',
        icon: <AbTesting className="w-5" />,
    },
]

const Container = ({ children }) => <div className="max-w-5xl mx-auto px-5 lg:px-6 xl:px-12">{children}</div>

const getTailwindGridCol = (length) => `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${length}`

const FeatureGrid = ({ children, className = '' }) => {
    const length = children?.length ?? 1
    return (
        <ul
            className={`px-5 lg:px-6 xl:px-12 grid list-none m-0 mt-12 mb-0 border-t border-dashed border-gray-accent-light divide-x divide-dashed divide-gray-accent-light ${getTailwindGridCol(
                length
            )} ${className}`}
        >
            {children}
        </ul>
    )
}

const FeatureTitle = ({ children, className = '' }) => <h3 className={`text-base m-0 ${className}`}>{children}</h3>

const FeatureDescription = ({ children, className = '' }) => <p className={`m-0 text-sm ${className}`}>{children}</p>

const Feature = ({ title, description, icon }) => {
    return (
        <li className="p-6 pb-8">
            <BusinessModel className="w-5 h-5 mb-2" />
            <FeatureTitle>{title}</FeatureTitle>
            <FeatureDescription>{description}</FeatureDescription>
        </li>
    )
}

const SectionHeading = ({ title, subtitle }) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl m-0">{title}</h2>
            <p className="text-base m-0">{subtitle}</p>
        </div>
    )
}

export default function Product({ data, location }) {
    const { pageData, documentation } = data
    const {
        body,
        excerpt,
        fields: { slug },
    } = pageData
    const { title, subtitle, featuredImage, description } = pageData?.frontmatter
    const slugger = new GithubSlugger()
    let feature
    let next
    let previous
    features.some((menuItem, index) => {
        if (menuItem?.url?.replace(/\/$/, '') === location.pathname.replace(/\/$/, '')) {
            feature = menuItem
            next = features[index + 1]
            previous = features[index - 1]
            return true
        }
    })
    const Documentation = () => {
        return (
            <div className="flex space-x-4">
                <div className="max-w-lg w-full flex-shrink-0 bg-tan z-10">
                    <h4 className="m-0 mb-4">Docs & resources</h4>
                    <ul className="m-0 p-0 list-none mb-6">
                        {documentation.headings?.slice(0, 5).map((heading) => {
                            const id = slugger.slug(heading.value)
                            return (
                                <li key={id}>
                                    <Link
                                        className="text-base group font-semibold pb-3 mb-3 border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark flex justify-between items-center"
                                        to={`${documentation.fields?.slug}#${id}`}
                                    >
                                        <span>{heading.value}</span>
                                        <RightArrow className="w-6 h-6 text-gray bounce" />
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    <CallToAction size="sm" type="secondary">
                        View {title} manual
                    </CallToAction>
                </div>
                <div className="">
                    <TutorialsSlider border={false} topic={title.toLowerCase()} />
                </div>
            </div>
        )
    }

    return (
        <Layout>
            <SEO
                image={`/images/product/${slug.split('/')[2]}.png`}
                title={`${title} - PostHog`}
                description={description || excerpt}
            />

            <nav className="border-b border-gray-accent-light border-dashed mb-12">
                <ul className="list-none m-0 flex items-center space-x-4 justify-center max-w-screen-2xl mx-auto">
                    {nav.map((navItem) => {
                        const { label, url, icon } = navItem
                        return (
                            <li key={label}>
                                <Link className="py-4 px-2 flex space-x-2 items-center !text-black" to={url}>
                                    <span>{icon}</span>
                                    <span>{label}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <article>
                <Container>
                    <h1 className="text-5xl m-0 mb-5 text-center">{title}? PostHog does that.</h1>
                    <p className="text-center">{subtitle}</p>
                    <GatsbyImage image={getImage(featuredImage)} />
                </Container>
                <div>
                    <MDXProvider
                        components={{
                            ...shortcodes,
                            Section,
                            TutorialsSlider,
                            Documentation,
                            Container,
                            Feature,
                            FeatureGrid,
                            SectionHeading,
                            FeatureTitle,
                            FeatureDescription,
                            Check: (props) => <Check2 className="w-5 h-5 mx-auto" {...props} />,
                            Close: (props) => <Close opacity="1" className="w-4 h-4 mx-auto" {...props} />,
                        }}
                    >
                        <MDXRenderer>{body}</MDXRenderer>
                    </MDXProvider>
                </div>
            </article>
            <CTA />
        </Layout>
    )
}

// export const query = graphql`
//     query Product($id: String!, $documentation: String!) {
//         pageData: mdx(id: { eq: $id }) {
//             body
//             excerpt(pruneLength: 150)
//             fields {
//                 slug
//             }
//             frontmatter {
//                 title
//                 subtitle
//                 description
//                 featuredImage {
//                     childImageSharp {
//                         gatsbyImageData
//                     }
//                 }
//             }
//         }
//         documentation: mdx(fields: { slug: { eq: $documentation } }) {
//             fields {
//                 slug
//             }
//             headings {
//                 depth
//                 value
//             }
//         }
//     }
// `
