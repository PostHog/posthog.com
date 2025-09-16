import { MDXProvider } from '@mdx-js/react'
import { FeatureSnapshot } from 'components/FeatureSnapshot'
import { ProductScreenshot } from 'components/ProductScreenshot'
import { ProductVideo } from 'components/ProductVideo'
import Link from 'components/Link'
import { PrivateLink } from 'components/PrivateLink'
import ImageSlider from 'components/ImageSlider'
import { Hero } from 'components/Hero'
import { Check, Close } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import { Section } from 'components/Section'
import { SEO } from 'components/seo'
import TutorialsSlider from 'components/TutorialsSlider'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React, { useEffect } from 'react'
import { MdxCodeBlock } from '../components/CodeBlock'
import { shortcodes } from '../mdxGlobalComponents'
import { OverflowXSection } from '../components/OverflowXSection'
import { Tweet } from 'components/Tweet'
import ReaderView from 'components/ReaderView'
import { useApp } from '../context/App'

const A = (props) => <Link {...props} />

export default function Plain({ data }) {
    const { updateSiteSettings, siteSettings } = useApp()
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
        OverflowXSection,
        Check,
        Close,
        a: A,
        TutorialsSlider,
        ImageSlider,
        ...shortcodes,
    }

    useEffect(() => {
        if (isInFrame) {
            updateSiteSettings({
                ...siteSettings,
                experience: 'boring',
            })
        }
    }, [])

    return (
        <ReaderView hideLeftSidebar showQuestions={!isInFrame}>
            <SEO
                title={seo?.metaTitle || title + ' - PostHog'}
                description={seo?.metaDescription || excerpt}
                article
                image={featuredImage?.publicURL}
                noindex={isInFrame || noindex}
            />
            <section className="py-12">
                {showTitle && <h1 className="text-center">{title}</h1>}
                <MDXProvider components={components}>
                    <MDXRenderer images={images}>{body}</MDXRenderer>
                </MDXProvider>
            </section>
        </ReaderView>
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
