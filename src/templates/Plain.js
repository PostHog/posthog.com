import { MDXProvider } from '@mdx-js/react'
import { FeatureSnapshot } from 'components/FeatureSnapshot'
import { ProductScreenshot } from 'components/ProductScreenshot'
import { ProductVideo } from 'components/ProductVideo'
import { PrivateLink } from 'components/PrivateLink'
import { Hero } from 'components/Hero'
import { Check, Close } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { Section } from 'components/Section'
import { SEO } from 'components/seo'
import TutorialsSlider from 'components/TutorialsSlider'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { MdxCodeBlock } from '../components/CodeBlock'
import { shortcodes } from '../mdxGlobalComponents'

const articleWidth = {
    lg: 'max-w-screen-2xl',
    md: 'max-w-5xl',
    sm: 'max-w-2xl',
    full: 'w-full px-0',
}

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />

export default function Plain({ data }) {
    const { pageData } = data
    const { body, excerpt } = pageData
    const { title, featuredImage, showTitle, width = 'sm', noindex, images, isInFrame, seo } = pageData?.frontmatter
    const components = {
        pre: MdxCodeBlock,
        Hero,
        Section,
        ProductScreenshot,
        ProductVideo,
        FeatureSnapshot,
        PrivateLink,
        Check,
        Close,
        a: A,
        TutorialsSlider,
        ...shortcodes,
    }

    const Wrapper = isInFrame ? 'div' : Layout

    return (
        <Wrapper className={isInFrame ? 'flex justify-center items-center h-screen' : undefined}>
            <SEO
                title={seo?.metaTitle || title + ' - PostHog'}
                description={seo?.metaDescription || excerpt}
                article
                image={featuredImage?.publicURL}
                noindex={isInFrame || noindex}
            />
            <article className={`mx-auto my-12 md:my-24 px-4 article-content ${articleWidth[width || 'sm']}`}>
                {showTitle && <h1 className="text-center">{title}</h1>}
                <MDXProvider components={components}>
                    <MDXRenderer images={images}>{body}</MDXRenderer>
                </MDXProvider>
            </article>
        </Wrapper>
    )
}

export const query = graphql`
    query PlainLayout($id: String!) {
        pageData: mdx(id: { eq: $id }) {
            body
            excerpt(pruneLength: 150)
            fields {
                slug
            }
            frontmatter {
                title
                showTitle
                featuredImageType
                featuredImage {
                    publicURL
                }
                images {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
                width
                noindex
                isInFrame
                seo {
                    ...SEOFragment
                }
            }
        }
    }
`
