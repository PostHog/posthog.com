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
import { AbTesting, Analytics, FeatureFlags, SessionRecording } from 'components/ProductIcons'
import { Platform } from 'components/NotProductIcons'
import Tutorials from 'components/ProductLayout/Tutorials'
import { PlanComparison } from 'components/Pricing/PlanComparison'
import Questions from 'components/ProductLayout/Questions'
import Customers from 'components/ProductLayout/Customers'
import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import { productMenu } from '../navs'
import { capitalize } from 'instantsearch.js/es/lib/utils'

const Check = (props: any) => <CheckIcon {...props} className="w-5 mx-auto" />
const Close = (props: any) => <CloseIcon {...props} className="w-5 mx-auto" />

const menu = [
    {
        icon: <Analytics className="w-5" />,
        name: 'Product analytics',
        url: '/product-analytics',
        children: [
            { name: 'Features', url: '/product-analytics' },
            { name: 'Pricing', url: '/product-analytics/pricing' },
            { name: 'Customers', url: '/product-analytics/customers' },
            { name: 'Comparisons', url: '/product-analytics/comparisons' },
            { name: 'Docs', url: '/product-analytics/documentation' },
            { name: 'Tutorials', url: '/product-analytics/tutorials' },
            { name: 'Roadmap', url: '/product-analytics/roadmap' },
            { name: 'Questions', url: '/product-analytics/questions' },
        ],
        Receipt: <StaticImage width={450} src="../../contents/images/products/product-analytics/receipt.png" />,
    },
    {
        icon: <SessionRecording className="w-5" />,
        name: 'Session replay',
        url: '/session-replay',
        children: [
            { name: 'Features', url: '/session-replay' },
            { name: 'Pricing', url: '/session-replay/pricing' },
            { name: 'Customers', url: '/session-replay/customers' },
            { name: 'Comparisons', url: '/session-replay/comparisons' },
            { name: 'Roadmap', url: '/session-replay/roadmap' },
            { name: 'Docs', url: '/session-replay/documentation' },
            { name: 'Tutorials', url: '/session-replay/tutorials' },
            { name: 'Questions', url: '/session-replay/questions' },
        ],
        Receipt: <StaticImage src="../../contents/images/products/product-analytics/receipt.png" />,
    },
    {
        icon: <FeatureFlags className="w-5" />,
        name: 'Feature flags',
        url: '/feature-flags',
        children: [
            { name: 'Features', url: '/feature-flags' },
            { name: 'Pricing', url: '/feature-flags/pricing' },
            { name: 'Customers', url: '/feature-flags/customers' },
            { name: 'Comparisons', url: '/feature-flags/comparisons' },
            { name: 'Docs', url: '/feature-flags/documentation' },
            { name: 'Tutorials', url: '/feature-flags/tutorials' },
            { name: 'Roadmap', url: '/feature-flags/roadmap' },
            { name: 'Questions', url: '/feature-flags/questions' },
        ],
        Receipt: <StaticImage src="../../contents/images/products/product-analytics/receipt.png" />,
    },
    {
        icon: <AbTesting className="w-5" />,
        name: 'A/B testing',
        url: '/ab-testing',
        children: [
            { name: 'Features', url: '/ab-testing' },
            { name: 'Pricing', url: '/ab-testing/pricing' },
            { name: 'Customers', url: '/ab-testing/customers' },
            { name: 'Comparisons', url: '/ab-testing/comparisons' },
            { name: 'Docs', url: '/ab-testing/documentation' },
            { name: 'Tutorials', url: '/ab-testing/tutorials' },
            { name: 'Roadmap', url: '/ab-testing/roadmap' },
            { name: 'Questions', url: '/ab-testing/questions' },
        ],
        Receipt: <StaticImage src="../../contents/images/products/product-analytics/receipt.png" />,
    },
    {
        icon: <Platform className="w-5" />,
        name: 'Product OS',
        url: '/product-os',
        children: [
            { name: 'Features', url: '/product-os' },
            { name: 'Pricing', url: '/product-os/pricing' },
            { name: 'Comparisons', url: '/product-os/comparisons' },
            { name: 'Roadmap', url: '/product-os/roadmap' },
            { name: 'Questions', url: '/product-os/questions' },
        ],
        Receipt: <StaticImage src="../../contents/images/products/product-analytics/receipt.png" />,
    },
]

const Footer = ({ location }) => {
    const currentMenu = menu.find(({ url }) => location.pathname.startsWith('/' + url.split('/')[1]))
    return (
        currentMenu?.children &&
        currentMenu?.children?.length > 0 && (
            <>
                <section className="mt-8 -mx-5 px-5 md:mx-0 md:px-0">
                    <h4>More about {currentMenu.name.toLowerCase()}</h4>
                    <ul className="flex m-0 px-0 pb-2.5 md:pb-0 relative after:w-full after:md:border-t after:border-gray-accent-light after:border-solid after:absolute after:top-0  w-full overflow-x-auto">
                        {currentMenu?.children?.map(({ name, url }) => {
                            const active = location.pathname === url.split('?')[0]
                            return (
                                <li
                                    className="flex items-center !text-primary/75 hover:border-gray-accent-light mb-1.5 pt-0.5 text-sm [font-variation-settings:_'wght'_700] whitespace-nowrap rounded relative z-20 hover:scale-[1.01] active:scale-[.99] tracking-[-.1px] group"
                                    key={url}
                                >
                                    <Link
                                        className={`${
                                            active
                                                ? 'text-red font-bold before:bg-red'
                                                : 'text-black font-normal text-primary/75 hover:text-primary hover:bg-gray-accent-light rounded-sm relative mt-1'
                                        } relative px-4 border-solid py-1.5 before:absolute before:h-[2px] before:-top-1 before:left-0 before:w-full`}
                                        to={url}
                                    >
                                        {name}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </section>
                {/* <div className="">{currentMenu.Receipt}</div> */}
            </>
        )
    )
}

export default function Product({ data, location, pageContext }) {
    const { pageData, blogPosts, tutorials, customers } = data
    const {
        body,
        excerpt,
        fields: { slug },
        parent,
    } = pageData
    const {
        title,
        subtitle,
        postHogDoesThat,
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
                postHogDoesThat={postHogDoesThat}
                image={productHero}
                customers={customers}
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
                <Documentation title={title} />
            </SectionWrapper>
        ),
        Tutorials: (props: any) => <Tutorials tutorials={tutorials?.nodes} />,
        PlanComparison: (props: any) => (
            <div className="max-w-screen-2xl mx-auto">
                <PlanComparison {...props} showCTA={false} />
            </div>
        ),
        Questions,
        Customers: (props: any) => (
            <Customers
                {...props}
                initialCustomer={location.state?.customer}
                customers={customers?.nodes.sort(
                    (a, b) =>
                        pageContext?.customerURLs.indexOf(a.fields.slug) -
                        pageContext?.customerURLs.indexOf(b.fields.slug)
                )}
            />
        ),
    }

    return (
        <Layout parent={productMenu}>
            <SEO
                image={`/images/product/${slug.split('/')[1]}.png`}
                title={`${title} ${parent.name} - PostHog`}
                description={description || excerpt}
            />

            <PostLayout
                fullWidthContent
                menuWidth={{ left: 180 }}
                title={parent.name === 'index' ? 'Features' : capitalize(parent.name)}
                hideSidebar
                hideSearch
                hideSurvey
                darkMode={false}
                contentContainerClassName="px-5 lg:px-6 xl:px-12 w-full transition-all mx-auto"
            >
                <MDXProvider components={components}>
                    <MDXRenderer>{body}</MDXRenderer>
                </MDXProvider>
                {/* <Footer location={location} /> */}
            </PostLayout>
        </Layout>
    )
}

export const query = graphql`
    query Product($id: String!, $blogTags: [String!]!, $tutorialTags: [String!]!, $customerURLs: [String!]!) {
        pageData: mdx(id: { eq: $id }) {
            parent {
                ... on File {
                    name
                }
            }
            body
            excerpt(pruneLength: 150)
            fields {
                slug
            }
            frontmatter {
                title
                subtitle
                postHogDoesThat
                description
                productTeam
                productBlog {
                    title
                }
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
                            imageDark
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
                    marquee {
                        text
                        url
                    }
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
                        featuresType
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
        customers: allMdx(filter: { fields: { slug: { in: $customerURLs } } }) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    customer
                    title
                    logo {
                        publicURL
                    }
                    logoDark {
                        publicURL
                    }
                }
                body
            }
        }
    }
`
