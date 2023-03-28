import { MDXProvider } from '@mdx-js/react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { Check as CheckIcon, Close2 as CloseIcon } from '../components/Icons'
import Hero from 'components/ProductLayout/Hero'
import { MainFeatures } from 'components/ProductLayout/Feature'
import { Sections, SectionWrapper } from 'components/ProductLayout/Section'
import Testimonial from 'components/ProductLayout/Testimonial'
import Comparison from 'components/ProductLayout/Comparison'
import BlogPosts from 'components/ProductLayout/BlogPosts'
import Roadmap from 'components/ProductLayout/Roadmap'
import CTA from 'components/ProductLayout/CTA'
import PairsWith from 'components/ProductLayout/PairsWith'
import Documentation from 'components/ProductLayout/Documentation'
import ProductLayout from 'components/ProductLayout'

const Check = (props: any) => <CheckIcon {...props} className="w-5" />
const Close2 = (props: any) => <CloseIcon {...props} className="w-5" />

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
        MainFeatures: (props: any) => <MainFeatures {...props} features={productFeatures} />,
        Sections: (props: any) => <Sections {...props} sections={productSections} />,
        Testimonial: (props: any) => <Testimonial {...props} {...productTestimonial} />,
        Check,
        Close2,
        Comparison: (props: any) => (
            <Comparison {...props} description={`How does PostHog ${title.toLowerCase()} compare?`} />
        ),
        BlogPosts: (props: any) => <BlogPosts {...props} title={productBlog?.title} posts={blogPosts?.edges} />,
        Roadmap: (props: any) => (
            <Roadmap {...props} team={productTeam} subtitle={`Here's what the ${productTeam} Team is building next.`} />
        ),
        CTA: (props: any) => (
            <CTA
                {...props}
                title={productMainCTA?.title}
                subtitle={productMainCTA?.subtitle}
                image={productMainCTA?.image}
            />
        ),
        PairsWith: (props: any) => <PairsWith {...props} products={productPairsWith} />,
        Documentation: (props: any) => (
            <div id="documentation">
                <SectionWrapper {...props}>
                    <Documentation
                        documentation={{
                            indexURL: pageContext?.documentationNav?.url,
                            pages: documentation?.nodes,
                        }}
                        title={title}
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
