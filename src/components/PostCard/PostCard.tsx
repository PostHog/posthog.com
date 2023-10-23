import Byline from 'components/Blog/BlogAuthor/Byline'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'
import { AuthorsData } from 'types'
import { CallToAction } from '../CallToAction'

export interface PostType {
    id: string
    excerpt: string
    fields: {
        slug: string
    }
    frontmatter: {
        date: string
        title: string
        featuredImage: {
            publicURL: string | null
            childImageSharp: {
                gatsbyImageData: IGatsbyImageData
            } | null
        } | null
    }
}

type PostTypeWithImage = PostType & {
    frontmatter: PostType['frontmatter'] & {
        featuredImage: {
            publicURL: string
        }
    }
}

const ReadPostHome = ({ to }: { to: string }) => {
    return (
        <CallToAction type="primary" icon="IconBook" iconBg="bg-white relative" to={to} width="full" className="">
            Read Post
        </CallToAction>
    )
}

const FeaturedPost = ({ post, authorDetails }: { post: PostTypeWithImage; authorDetails?: [AuthorsData] }) => {
    const MetaContent = ({ className }: { className: string }): JSX.Element => (
        <div
            className={`lg:max-w-xl backdrop-blur ${className}`}
            style={{
                background: 'rgba(25, 123, 165, 0.8)',
                padding: 'min(2rem, 4vw) min(4rem, 8vw)',
                textDecoration: 'inherit',
            }}
        >
            <h2
                className="text-white text-4xl text-gray-100 font-sans normal-case my-1"
                style={{ textDecoration: 'inherit' }}
            >
                {post.frontmatter.title}
            </h2>
            <Byline date={post.frontmatter.date} authorDetails={authorDetails} classes="text-white" />
        </div>
    )
    return (
        <div className="w-full my-8">
            <Link
                to={post.fields.slug}
                className="text-gray-100 hover:text-gray-100 dark:text-gray-100 dark:hover:text-gray-100"
            >
                <div
                    className="w-full py-4 mx-auto rounded-t md:rounded-lg overflow-hidden relative"
                    style={{
                        backgroundImage: `url(${post.frontmatter.featuredImage.publicURL})`,
                        backgroundSize: 'cover',
                        paddingTop: '52.25%',
                        textDecoration: 'inherit',
                    }}
                >
                    <MetaContent className="hidden md:block absolute bottom-0 left-0 rounded-tr-3xl" />
                </div>
                <MetaContent className="block md:hidden rounded-b" />
            </Link>
        </div>
    )
}

const LandingPageLatestPost = ({ post, authorDetails }: { post: PostTypeWithImage; authorDetails?: AuthorsData }) => {
    return (
        <div className="w-full flex flex-col justify-between items-center">
            <div className="w-full rounded overflow-hidden flex items-center justify-center pt-4">
                <Link to={post.fields.slug} className="featured-post-img">
                    <img
                        className="w-full h-auto block rounded shadow-lg mb-0"
                        src={post.frontmatter.featuredImage.publicURL}
                    />
                </Link>
            </div>
            <div className="w-full py-4">
                <h2 className="text-2xl text-white font-sans normal-case my-1">
                    <Link to={post.fields.slug} className="text-white hover:text-white hover:underline">
                        {post.frontmatter.title}
                    </Link>
                </h2>
                <Byline date={post.frontmatter.date} authorDetails={authorDetails} />
                <div className="text-white text-opacity-75 mt-2 text-sm leading-relaxed post-preview-fade">
                    {post.excerpt}
                </div>
                <ReadPostHome to={post.fields.slug} />
            </div>
        </div>
    )
}

const LandingPageSnippet = ({ post, authorDetails }: { post: PostTypeWithImage; authorDetails?: AuthorsData }) => {
    return (
        <div className="w-full flex flex-col justify-between items-center">
            <div className="w-full rounded overflow-hidden flex items-center justify-center pt-4">
                <Link to={post.fields.slug} className="featured-post-img">
                    <img
                        className="w-full h-auto block rounded shadow-lg mb-0"
                        src={post.frontmatter.featuredImage.publicURL}
                    />
                </Link>
            </div>
            <div className="w-full py-2">
                <h2 className="text-lg text-white font-sans normal-case my-1 leading-tight">
                    <Link to={post.fields.slug} className="text-white hover:text-white hover:underline">
                        {post.frontmatter.title}
                    </Link>
                </h2>
                <Byline date={post.frontmatter.date} authorDetails={authorDetails} />
            </div>
        </div>
    )
}

const addDefaultImage = (post: PostType, defaultImage: string): PostTypeWithImage => ({
    ...(post || {}),
    frontmatter: {
        ...(post.frontmatter || {}),
        featuredImage: {
            ...(post.frontmatter.featuredImage || {}),
            publicURL: post.frontmatter.featuredImage?.publicURL || defaultImage,
            childImageSharp: post.frontmatter.featuredImage?.childImageSharp || null,
        },
    },
})

const PostCard = ({
    post: sourcePost,
    featured = false,
    landingPage = false,
    snippet = false,
    authorDetails,
}: {
    post: PostType
    featured?: boolean
    landingPage?: boolean
    snippet?: boolean
    authorDetails?: AuthorsData
}): JSX.Element => {
    const { site } = useStaticQuery(query)
    const { defaultImage } = site.siteMetadata
    const post = addDefaultImage(sourcePost, defaultImage)
    const staticImageSrc = post.frontmatter.featuredImage.publicURL || defaultImage
    const { gatsbyImageData } = post.frontmatter.featuredImage?.childImageSharp || {}

    return (
        <div>
            {featured ? (
                <FeaturedPost post={post} authorDetails={authorDetails} />
            ) : landingPage ? (
                <LandingPageLatestPost post={post} authorDetails={authorDetails} />
            ) : snippet ? (
                <LandingPageSnippet post={post} authorDetails={authorDetails} />
            ) : (
                <div className="flex flex-col mb-6">
                    <h5 className="mb-0 font-bold font-sans normal-case leading-tight">
                        <Link to={post.fields.slug} className="dark:text-primary-dark text-primary">
                            <div className="w-full rounded mb-3 overflow-hidden flex items-center justify-center">
                                <Link to={post.fields.slug} className="featured-post-img overflow-hidden">
                                    {gatsbyImageData ? (
                                        <GatsbyImage
                                            className="w-full rounded-md"
                                            image={gatsbyImageData}
                                            alt={post.excerpt}
                                        />
                                    ) : (
                                        <img className="w-full rounded-md" src={staticImageSrc} />
                                    )}
                                </Link>
                            </div>
                            {post.frontmatter.title}
                        </Link>
                    </h5>
                    <Byline date={post.frontmatter.date} authorDetails={authorDetails} />
                </div>
            )}
        </div>
    )
}

const query = graphql`
    query DefaultMetaImage {
        site {
            siteMetadata {
                defaultImage: image
            }
        }
    }
`

export default PostCard
