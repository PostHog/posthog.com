import { MDXProvider } from '@mdx-js/react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import ProductLayout, {
    BlogPosts,
    Comparison,
    CTA,
    Documentation,
    FeatureGrid,
    Hero,
    MainFeatures,
    PairsWith,
    Roadmap,
    Sections,
    SectionWrapper,
    StickyNav,
    Testimonial,
} from 'components/ProductLayout'
import GithubSlugger from 'github-slugger'

import { Check as CheckIcon, Close as CloseIcon, RightArrow } from '../components/Icons'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const Check = (props) => <CheckIcon {...props} className="w-5" />
const Close = (props) => <CloseIcon {...props} className="w-5" />

const menuItemIDs = {
    Overview: 'overview',
    Features: 'features',
    'Pairs with': 'pairs-with',
    'PostHog vs...': 'comparison',
    Roadmap: 'roadmap',
    Documentation: 'documentation',
}

export default function Product({ data, location, pageContext }) {
    const { pageData, blogPosts, documentation, tutorials } = data
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
        productDocumentation,
        productBlog,
    } = pageData?.frontmatter

    console.log(documentation)

    const components = {
        Hero: (props) => (
            <Hero
                {...props}
                mainCTA={productMainCTA}
                pricingCTA={productPricingCTA}
                title={title}
                subtitle={subtitle}
                image={productHero}
            />
        ),
        MainFeatures: (props) => <MainFeatures {...props} features={productFeatures} />,
        Sections: (props) => <Sections {...props} sections={productSections} />,
        Testimonial: (props) => <Testimonial {...props} {...productTestimonial} />,
        Check,
        Close,
        Comparison: (props) => (
            <Comparison {...props} description={`How does PostHog ${title.toLowerCase()} compare?`} />
        ),
        BlogPosts: (props) => <BlogPosts {...props} title={productBlog?.title} posts={blogPosts?.edges} />,
        Roadmap: (props) => (
            <Roadmap {...props} team={productTeam} subtitle={`Here's what the ${productTeam} Team is building next.`} />
        ),
        CTA: (props) => (
            <CTA title={productMainCTA?.title} subtitle={productMainCTA?.subtitle} image={productMainCTA?.image} />
        ),
        PairsWith: (props) => <PairsWith {...props} products={productPairsWith} />,
        Documentation: (props) => (
            <div id="documentation">
                <SectionWrapper {...props}>
                    <Documentation
                        documentation={{
                            indexURL: pageContext?.documentationNav?.url,
                            pages: documentation?.nodes,
                        }}
                        title={title}
                        image={productDocumentation?.image}
                        tutorials={tutorials?.nodes}
                    />
                </SectionWrapper>
            </div>
        ),
    }

    return (
        <Layout>
            <SEO
                image={`/images/product/${slug.split('/')[2]}.png`}
                title={`${title} - PostHog`}
                description={description || excerpt}
            />

            <ProductLayout title={title}>
                <MDXProvider components={components}>
                    <MDXRenderer>{body}</MDXRenderer>
                </MDXProvider>
            </ProductLayout>
        </Layout>
    )
}

export const query = graphql`
    query Product($id: String!, $blogTags: [String!]!, $tutorialTags: [String!]!, $documentationURLs: [String!]!) {
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
                productDocumentation {
                    image {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
                productSections {
                    title
                    subtitle
                    content
                    align
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
                }
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
    }
`
