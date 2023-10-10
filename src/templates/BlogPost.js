import { MDXProvider } from '@mdx-js/react'
import { Blockquote } from 'components/BlockQuote'
import { InlineCode } from 'components/InlineCode'
import Link from 'components/Link'
import { Contributor } from 'components/PostLayout/Contributors'
import { SEO } from 'components/seo'
import { ZoomImage } from 'components/ZoomImage'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React, { useContext } from 'react'
import { MdxCodeBlock } from '../components/CodeBlock'
import { shortcodes } from '../mdxGlobalComponents'
import { Heading } from 'components/Heading'
import TutorialsSlider from 'components/TutorialsSlider'
import MobileSidebar from 'components/Docs/MobileSidebar'
import { useLayoutData } from 'components/Layout/hooks'
import { PostContext } from 'components/Edition/Posts'
import Title from 'components/Edition/Title'
import Upvote from 'components/Edition/Upvote'

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />

export const Intro = ({
    featuredImage,
    featuredVideo,
    title,
    featuredImageType,
    titlePosition = 'bottom',
    date,
    tags,
    imageURL,
}) => {
    return (
        <div className="lg:mb-7 mb-4 overflow-hidden">
            {featuredVideo && <iframe src={featuredVideo} />}
            {!featuredVideo && featuredImage && (
                <div className="relative flex flex-col">
                    <GatsbyImage
                        className={`rounded-sm z-0 relative ${
                            featuredImageType === 'full'
                                ? `before:h-3/4 before:left-0 before:right-0 ${
                                      titlePosition === 'bottom' ? 'before:bottom-0' : 'before:top-0'
                                  } before:z-[1] before:absolute ${
                                      titlePosition === 'bottom' ? 'before:bg-gradient-to-t' : 'before:bg-gradient-to-b'
                                  } before:from-black/75 [text-shadow:0_2px_10px_rgba(0,0,0,0.4)] lg:before:block before:hidden`
                                : ''
                        }`}
                        image={getImage(featuredImage)}
                    />
                    {featuredImageType === 'full' && (
                        <>
                            <div
                                className={`lg:absolute flex flex-col lg:px-8 lg:py-4 ${
                                    titlePosition === 'bottom' ? 'bottom-0' : 'top-0'
                                }`}
                            >
                                <p className="m-0 opacity-70 order-last lg:order-first lg:text-white">{date}</p>
                                <Title className="lg:text-white text-primary dark:text-white">{title}</Title>
                            </div>
                        </>
                    )}
                </div>
            )}
            {!featuredVideo && !featuredImage && (
                <>
                    <Title className="text-primary dark:text-primary-dark">{title}</Title>
                    <p className="m-0 ml-10 opacity-70 order-last">{date}</p>
                </>
            )}
            {(featuredVideo || featuredImageType !== 'full') && <Title>{title}</Title>}
        </div>
    )
}

export const Contributors = ({ contributors }) => {
    return (
        <>
            <div className="text-sm opacity-50 px-4 mb-2">Posted by</div>
            {contributors?.[0] && (
                <div className={`mb-4 flex flex-col gap-4`}>
                    {contributors.map(({ profile_id, image, name }) => (
                        <Contributor
                            url={profile_id && `/community/profiles/${profile_id}`}
                            image={image}
                            name={name}
                            key={name}
                            text
                        />
                    ))}
                </div>
            )}
        </>
    )
}

export default function BlogPost({ data, pageContext, location, mobile = false }) {
    const { postData } = data
    const { body, excerpt, fields } = postData
    const { date, title, featuredImage, featuredVideo, featuredImageType, contributors, description, tags, category } =
        postData?.frontmatter
    const lastUpdated = postData?.parent?.fields?.gitLogLatestDate
    const filePath = postData?.parent?.relativePath
    const components = {
        h1: (props) => Heading({ as: 'h1', ...props }),
        h2: (props) => Heading({ as: 'h2', ...props }),
        h3: (props) => Heading({ as: 'h3', ...props }),
        h4: (props) => Heading({ as: 'h4', ...props }),
        h5: (props) => Heading({ as: 'h5', ...props }),
        h6: (props) => Heading({ as: 'h6', ...props }),
        pre: MdxCodeBlock,
        inlineCode: InlineCode,
        blockquote: Blockquote,
        img: ZoomImage,
        video: (props) => (
            <ZoomImage>
                <video {...props} />
            </ZoomImage>
        ),
        a: A,
        TutorialsSlider,
        ...shortcodes,
    }
    const { tableOfContents } = pageContext
    const { fullWidthContent } = useLayoutData()

    return (
        <article className="@container">
            <SEO
                title={title + ' - PostHog'}
                description={description || excerpt}
                article
                image={
                    featuredImageType === 'full'
                        ? `/og-images/${fields.slug.replace(/\//g, '')}.jpeg`
                        : featuredImage?.publicURL
                }
            />

            <div className="flex flex-col-reverse items-start @3xl:flex-row gap-8 2xl:gap-12">
                <div className={`article-content flex-1 transition-all pt-8 w-full`}>
                    <div className={`mx-auto transition-all ${fullWidthContent ? 'max-w-full' : 'max-w-2xl px-0'}`}>
                        <Intro
                            title={title}
                            featuredImage={featuredImage}
                            featuredVideo={featuredVideo}
                            featuredImageType={featuredImageType}
                            contributors={contributors}
                            date={date}
                            tags={tags}
                        />
                        <MDXProvider components={components}>
                            <MDXRenderer>{body}</MDXRenderer>
                        </MDXProvider>
                    </div>
                </div>
                <aside
                    className={`shrink-0 basis-72 @3xl:reasonable:sticky @3xl:reasonable:overflow-auto max-h-64 overflow-auto @3xl:max-h-[calc(100vh_-_108px)] @3xl:top-[108px] w-full block border-x border-border dark:border-border-dark pt-4 ${
                        mobile ? 'lg:hidden' : ''
                    } `}
                >
                    <Upvote />
                    <Contributors contributors={contributors} />
                    <MobileSidebar tableOfContents={tableOfContents} mobile={false} contributors={contributors} />
                </aside>
            </div>
        </article>
    )
}

export const query = graphql`
    query BlogPostLayout($id: String!) {
        postData: mdx(id: { eq: $id }) {
            id
            body
            excerpt(pruneLength: 150)
            fields {
                slug
                pageViews
            }
            frontmatter {
                date(formatString: "MMM DD, YYYY")
                title
                sidebar
                showTitle
                tags
                category
                hideAnchor
                description
                featuredImageType
                featuredVideo
                featuredImage {
                    publicURL
                    childImageSharp {
                        gatsbyImageData
                    }
                }
                contributors: authorData {
                    id
                    image {
                        childImageSharp {
                            gatsbyImageData(width: 38, height: 38)
                        }
                    }
                    name
                    profile_id
                }
            }
            parent {
                ... on File {
                    relativePath
                    fields {
                        gitLogLatestDate(formatString: "MMM DD, YYYY")
                    }
                }
            }
        }
    }
`
