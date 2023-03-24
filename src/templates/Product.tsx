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
    FeatureGrid,
    Hero,
    MainFeatures,
    PairsWith,
    Roadmap,
    Sections,
    Testimonial,
} from 'components/ProductLayout'

import { Check as CheckIcon, Close as CloseIcon } from '../components/Icons'

const Check = (props) => <CheckIcon {...props} className="w-5" />
const Close = (props) => <CloseIcon {...props} className="w-5" />

const menuItemIDs = {
    Overview: 'overview',
    Features: 'features',
    'Pairs with': 'pairs-with',
    'PostHog vs...': 'comparison',
    Roadmap: 'roadmap',
}

export default function Product({ data, location }) {
    const { pageData, blogPosts, documentation } = data
    const {
        body,
        excerpt,
        fields: { slug },
    } = pageData
    const {
        title,
        subtitle,
        featuredImage,
        description,
        productFeatures,
        productSections,
        productTestimonial,
        productTeam,
        productMainCTA,
        productPricingCTA,
        productPairsWith,
        productMenuItems,
    } = pageData?.frontmatter

    const components = {
        Hero: (props) => (
            <Hero
                {...props}
                mainCTA={productMainCTA}
                pricingCTA={productPricingCTA}
                title={title}
                subtitle={subtitle}
                featuredImage={featuredImage}
                menuItems={productMenuItems?.map((title) => {
                    return { title, id: menuItemIDs[title] }
                })}
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
        BlogPosts: (props) => (
            <BlogPosts {...props} title={`Blog posts that mention ${title}`} posts={blogPosts?.edges} />
        ),
        Roadmap: (props) => (
            <Roadmap {...props} team={productTeam} subtitle={`Here's what the ${productTeam} Team is building next.`} />
        ),
        CTA: (props) => (
            <CTA title={productMainCTA?.title} subtitle={productMainCTA?.subtitle} image={productMainCTA?.image} />
        ),
        PairsWith: (props) => <PairsWith {...props} products={productPairsWith} />,
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
    query Product($id: String!, $blogTags: String!) {
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
                productMenuItems
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
                featuredImage {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
        }
        blogPosts: allMdx(filter: { frontmatter: { tags: { in: [$blogTags] } } }, limit: 6) {
            edges {
                node {
                    ...BlogFragment
                }
            }
        }
    }
`
