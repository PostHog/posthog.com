import { MDXProvider } from '@mdx-js/react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { Check as CheckIcon, Close2 as CloseIcon } from '../components/Icons'
import Hero from 'components/ProductLayout/Hero'
import HeroCondensed from 'components/ProductLayout/HeroCondensed'
import { MainFeatures } from 'components/ProductLayout/Feature'
import { Sections, SectionWrapper } from 'components/ProductLayout/Section'
import Testimonial from 'components/ProductLayout/Testimonial'
import Comparison from 'components/ProductLayout/Comparison'
import BlogPosts from 'components/ProductLayout/BlogPosts'
import Roadmap from 'components/ProductLayout/Roadmap'
import CTA from 'components/ProductLayout/CTA'
import PairsWith from 'components/ProductLayout/PairsWith'
import Documentation from 'components/ProductLayout/Documentation'
import PostLayout from 'components/PostLayout'
import { IMenu } from 'components/PostLayout/types'
import { AbTesting, Analytics, FeatureFlags, SessionRecording } from 'components/ProductIcons'
import { Platform } from 'components/NotProductIcons'
import Tutorials from 'components/ProductLayout/Tutorials'
import { PlanComparison } from 'components/Pricing/PlanComparison'
import Questions from 'components/ProductLayout/Questions'
import Customers from 'components/ProductLayout/Customers'

const Check = (props: any) => <CheckIcon {...props} className="w-5 mx-auto" />
const Close = (props: any) => <CloseIcon {...props} className="w-5 mx-auto" />

const menu: IMenu[] = [
    {
        icon: <Analytics className="w-5" />,
        name: 'Product analytics',
        url: '/product-analytics',
        children: [
            { name: 'Features', url: '/product-analytics/features' },
            { name: 'Pricing', url: '/product-analytics/pricing' },
            { name: 'Comparisons', url: '/product-analytics/comparisons' },
            { name: 'Customers', url: '/product-analytics/customers' },
            { name: 'Docs', url: '/product-analytics/documentation' },
            { name: 'Tutorials', url: '/product-analytics/tutorials' },
            { name: 'Roadmap', url: '/product-analytics/roadmap' },
            { name: 'Questions', url: '/product-analytics/questions' },
        ],
    },
    {
        icon: <SessionRecording className="w-5" />,
        name: 'Session replay',
        url: '/session-replay',
        children: [
            { name: 'Features', url: '/session-replay/features' },
            { name: 'Pricing', url: '/session-replay/pricing' },
            { name: 'Comparisons', url: '/session-replay/comparisons' },
            { name: 'Roadmap', url: '/session-replay/roadmap' },
            { name: 'Docs', url: '/session-replay/documentation' },
            { name: 'Tutorials', url: '/session-replay/tutorials' },
            { name: 'Questions', url: '/session-replay/questions' },
        ],
    },
    {
        icon: <FeatureFlags className="w-5" />,
        name: 'Feature flags',
        url: '/feature-flags',
        children: [
            { name: 'Features', url: '/feature-flags/features' },
            { name: 'Pricing', url: '/feature-flags/pricing' },
            { name: 'Comparisons', url: '/feature-flags/comparisons' },
            { name: 'Docs', url: '/feature-flags/documentation' },
            { name: 'Tutorials', url: '/feature-flags/tutorials' },
            { name: 'Roadmap', url: '/feature-flags/roadmap' },
            { name: 'Questions', url: '/feature-flags/questions' },
        ],
    },
    {
        icon: <AbTesting className="w-5" />,
        name: 'A/B testing',
        url: '/ab-testing',
        children: [
            { name: 'Features', url: '/ab-testing/features' },
            { name: 'Pricing', url: '/ab-testing/pricing' },
            { name: 'Docs', url: '/ab-testing/documentation' },
            { name: 'Tutorials', url: '/ab-testing/tutorials' },
            { name: 'Roadmap', url: '/ab-testing/roadmap' },
            { name: 'Questions', url: '/ab-testing/questions' },
        ],
    },
    {
        icon: <Platform className="w-5" />,
        name: 'Product OS',
        url: '/product-os',
        children: [
            { name: 'Features', url: '/product-os/features' },
            { name: 'Pricing', url: '/product-os/pricing' },
            { name: 'Blog posts', url: '/product-os/posts' },
            { name: 'Roadmap', url: '/product-os/roadmap' },
            { name: 'Questions', url: '/product-os/questions' },
        ],
    },
]

export default function Product({ data, location, pageContext }) {
    const { pageData, blogPosts, documentation, tutorials, customers } = data
    const {
        body,
        excerpt,
        fields: { slug },
    } = pageData
    const {
        title,
        subtitle,
        description,
        productFeatures,
        productSections,
        productTestimonial,
        productTeam,
        productMainCTA,
        productPricingCTA,
        productPairsWith,
        productHero,
        productBlog,
    } = pageData?.frontmatter

    const components = {
        Hero: (props: any) => (
            <Hero
                {...props}
                mainCTA={productMainCTA}
                pricingCTA={productPricingCTA}
                title={title}
                subtitle={subtitle}
                image={productHero}
            />
        ),
        HeroCondensed: (props: any) => (
            <HeroCondensed
                {...props}
                mainCTA={productMainCTA}
                pricingCTA={productPricingCTA}
                title={title}
                subtitle={subtitle}
                image={productHero}
            />
        ),
        MainFeatures: (props: any) => <MainFeatures {...props} features={productFeatures} />,
        Sections: (props: any) => (
            <div id="features">
                <Sections {...props} sections={productSections} />
            </div>
        ),
        Testimonial: (props: any) => (
            <div id="customers">
                <Testimonial {...props} {...productTestimonial} />
            </div>
        ),
        Check,
        Close,
        Comparison: (props: any) => (
            <div id="comparisons">
                <Comparison {...props} description={`How does PostHog compare?`} />
            </div>
        ),
        BlogPosts: (props: any) => (
            <div id="posts">
                <BlogPosts {...props} title={productBlog?.title} posts={blogPosts?.edges} />
            </div>
        ),
        Roadmap: (props: any) => (
            <div id="roadmap">
                <Roadmap
                    {...props}
                    team={productTeam}
                    subtitle={`Here's what the ${productTeam} Team is building next.`}
                />
            </div>
        ),
        CTA: (props: any) => (
            <CTA
                {...props}
                title={productMainCTA?.title}
                subtitle={productMainCTA?.subtitle}
                image={productMainCTA?.image}
                mainCTA={productMainCTA}
                pricingCTA={productPricingCTA}
            />
        ),
        PairsWith: (props: any) => <PairsWith {...props} products={productPairsWith} />,
        Documentation: (props: any) => (
            <SectionWrapper {...props}>
                <Documentation
                    documentation={{
                        indexURL: pageContext?.documentationNav?.url,
                        pages: documentation?.nodes,
                    }}
                    title={title}
                />
            </SectionWrapper>
        ),
        Tutorials: (props: any) => <Tutorials tutorials={tutorials?.nodes} />,
        PlanComparison: (props: any) => (
            <div className="max-w-screen-2xl mx-auto">
                <PlanComparison {...props} showCTA={false} />
            </div>
        ),
        Questions,
        Customers: (props: any) => <Customers {...props} customers={customers?.nodes} />,
    }

    return (
        <Layout>
            <SEO
                image={`/images/product/${slug.split('/')[2]}.png`}
                title={`${title} - PostHog`}
                description={description || excerpt}
            />

            <PostLayout
                menu={menu}
                title={title}
                hideSidebar
                hideSearch
                hideSurvey
                darkMode={false}
                contentContainerClassName="px-5 lg:px-6 xl:px-12 w-full transition-all mx-auto"
            >
                <MDXProvider components={components}>
                    <MDXRenderer>{body}</MDXRenderer>
                </MDXProvider>
            </PostLayout>
        </Layout>
    )
}

export const query = graphql`
    query Product(
        $id: String!
        $blogTags: [String!]!
        $tutorialTags: [String!]!
        $documentationURLs: [String!]!
        $customerURLs: [String!]!
    ) {
        pageData: mdx(id: { eq: $id }) {
            body
            excerpt(pruneLength: 150)
            fields {
                slug
            }
            frontmatter {
                title
                subtitle
                description
                productTeam
                productBlog {
                    title
                }
                productMenuItems
                productHero {
                    image {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                    width
                    height
                }
                productPairsWith {
                    title
                    description
                    icon
                    url
                }
                productMainCTA {
                    title
                    subtitle
                    url
                    image {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
                productPricingCTA {
                    title
                    url
                }
                productTestimonial {
                    author {
                        name
                        role
                        image
                        company {
                            name
                            image
                        }
                    }
                    quote
                    image {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
                productFeatures {
                    title
                    description
                    icon
                }
                productSections {
                    title
                    subtitle
                    content
                    align
                    callout {
                        content
                        cta {
                            label
                            url
                        }
                    }
                    sections {
                        features {
                            title
                            description
                        }
                    }
                    features {
                        title
                        description
                    }
                    imageFrame
                    image {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
            }
        }
        blogPosts: allMdx(filter: { frontmatter: { tags: { in: $blogTags } } }, limit: 6) {
            edges {
                node {
                    ...BlogFragment
                }
            }
        }
        tutorials: allMdx(filter: { frontmatter: { tags: { in: $tutorialTags } } }, limit: 6) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    title
                    tags
                    featuredVideo
                    authorData {
                        name
                    }
                }
                body
            }
        }
        documentation: allMdx(filter: { fields: { slug: { in: $documentationURLs } } }) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    title
                }
                headings {
                    depth
                    value
                }
            }
        }
        customers: allMdx(filter: { fields: { slug: { in: $customerURLs } } }) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    title
                    logo {
                        publicURL
                    }
                }
                body
            }
        }
    }
`
