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
import React, { useEffect, useState } from 'react'
import { MdxCodeBlock } from '../components/CodeBlock'
import { shortcodes } from '../mdxGlobalComponents'
import { Heading } from 'components/Heading'
import TutorialsSlider from 'components/TutorialsSlider'
import MobileSidebar from 'components/Docs/MobileSidebar'
import { useLayoutData } from 'components/Layout/hooks'
import Title from 'components/Edition/Title'
import Upvote from 'components/Edition/Upvote'
import LikeButton from 'components/Edition/LikeButton'
import { Questions } from 'components/Squeak'
import { useLocation } from '@reach/router'
import qs from 'qs'
import Breadcrumbs from 'components/Edition/Breadcrumbs'

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
        <div className="mb-6">
            <div>
                <Title className="text-primary dark:text-primary-dark">{title}</Title>
                <p className="mb-1 opacity-70">{date}</p>
            </div>

            {featuredVideo && <iframe src={featuredVideo} />}
            {!featuredVideo && featuredImage && (
                <GatsbyImage
                    className={`rounded-sm z-0 bg-accent dark:bg-accent-dark rounded`}
                    image={getImage(featuredImage)}
                />
            )}
        </div>
    )
}

export const Contributors = ({ contributors }) => {
    return contributors?.[0] ? (
        <>
            <div className="text-sm opacity-50 px-4 mb-2">Posted by</div>
            <div className={`mb-4 flex flex-col gap-4`}>
                {contributors.map(({ profile_id, image, name, role }) => (
                    <Contributor
                        url={profile_id && `/community/profiles/${profile_id}`}
                        image={image}
                        name={name}
                        key={name}
                        role={role}
                        text
                    />
                ))}
            </div>
        </>
    ) : null
}

const ContributorsSmall = ({ contributors }) => {
    return contributors?.[0] ? (
        <div className="flex space-x-2 items-center mb-4">
            <div className="text-sm opacity-50">Posted by</div>

            <div>
                <ul className="flex list-none !m-0 !p-0 space-x-2">
                    {contributors.map(({ profile_id, image, name, role }) => {
                        const url = profile_id && `/community/profiles/${profile_id}`
                        const Container = url ? Link : 'div'
                        const gatsbyImage = image && getImage(image)
                        return (
                            <li className="!mb-0" key={name}>
                                <Container className="flex space-x-2 items-center" {...(url ? { to: url } : {})}>
                                    <span>
                                        {typeof image === 'string' ? (
                                            <img src={image} />
                                        ) : gatsbyImage ? (
                                            <GatsbyImage
                                                image={gatsbyImage}
                                                alt={name}
                                                className="w-6 h-6 border-border border dark:border-dark rounded-full"
                                            />
                                        ) : (
                                            ''
                                        )}
                                    </span>
                                    <span>{name}</span>
                                </Container>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    ) : null
}

export default function BlogPost({ data, pageContext, location, mobile = false }) {
    const { postData } = data
    const { body, excerpt, fields } = postData
    const { date, title, featuredImage, featuredVideo, featuredImageType, contributors, tags, seo } =
        postData?.frontmatter
    const lastUpdated = postData?.parent?.fields?.gitLogLatestDate
    const filePath = postData?.parent?.relativePath
    const category = postData?.parent?.category
    const components = {
        h1: (props) => Heading({ as: 'h1', ...props }),
        h2: (props) => Heading({ as: 'h2', ...props }),
        h3: (props) => Heading({ as: 'h3', ...props }),
        h4: (props) => Heading({ as: 'h4', ...props }),
        h5: (props) => Heading({ as: 'h5', ...props }),
        h6: (props) => Heading({ as: 'h6', ...props }),
        inlineCode: InlineCode,
        blockquote: Blockquote,
        pre: MdxCodeBlock,
        MultiLanguage: MdxCodeBlock,
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
    const { pathname } = useLocation()
    const [postID, setPostID] = useState()

    useEffect(() => {
        fetch(
            `${process.env.GATSBY_SQUEAK_API_HOST}/api/posts?${qs.stringify(
                {
                    fields: ['id'],
                    filters: {
                        slug: {
                            $eq: pathname,
                        },
                    },
                },
                { encodeValuesOnly: true }
            )}`
        )
            .then((res) => res.json())
            .then((posts) => {
                if (posts?.data?.length > 0) {
                    setPostID(posts.data[0].id)
                }
            })
    }, [pathname])

    return (
        <article className="@container">
            <SEO
                title={seo?.metaTitle || title + ' - PostHog'}
                description={seo?.metaDescription || excerpt}
                article
                image={`/og-images/${fields.slug.replace(/\//g, '')}.jpeg`}
            />

            <div className="flex flex-col-reverse @3xl:flex-row">
                <div className={`article-content flex-1 transition-all md:pt-8 w-full overflow-auto`}>
                    <div
                        className={`mx-auto transition-all ${
                            fullWidthContent ? 'max-w-full' : 'max-w-3xl'
                        }  md:px-8 2xl:px-12`}
                    >
                        <Breadcrumbs category={category} tags={tags} />
                        <Intro
                            title={title}
                            featuredImage={featuredImage}
                            featuredVideo={featuredVideo}
                            featuredImageType={featuredImageType}
                            contributors={contributors}
                            date={date}
                            tags={tags}
                        />
                        <div className="xl:hidden">
                            <ContributorsSmall contributors={contributors} />
                            <MobileSidebar tableOfContents={tableOfContents} />
                        </div>

                        <MDXProvider components={components}>
                            <MDXRenderer>{body}</MDXRenderer>
                        </MDXProvider>
                        <Upvote className="mt-6" />
                        <div className={`mt-12 mx-auto pb-20 ${fullWidthContent ? 'max-w-full' : 'max-w-4xl'}`}>
                            <Questions
                                disclaimer={false}
                                subject={false}
                                buttonText="Leave a comment"
                                slug={pathname}
                            />
                        </div>
                    </div>
                </div>
                <aside
                    className={`shrink-0 basis-72 @3xl:reasonable:sticky @3xl:reasonable:overflow-auto max-h-64 overflow-auto @3xl:max-h-[calc(100vh_-_108px)] @3xl:top-[108px] w-full border-x border-border dark:border-dark pt-4 xl:block hidden`}
                >
                    <Upvote id={postID} slug={fields.slug} className="px-4 mb-4" />
                    <Contributors contributors={contributors} />
                    <MobileSidebar tableOfContents={tableOfContents} />
                </aside>
            </div>
        </article>
    )
}

export const SEOFragment = graphql`
    fragment SEOFragment on FrontmatterSEO {
        metaTitle
        metaDescription
    }
`

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
                            gatsbyImageData
                        }
                    }
                    name
                    profile_id
                    role
                }
                seo {
                    ...SEOFragment
                }
            }
            parent {
                ... on File {
                    relativePath
                    category
                    fields {
                        gitLogLatestDate(formatString: "MMM DD, YYYY")
                    }
                }
            }
        }
    }
`
