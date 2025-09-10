import { MDXProvider } from '@mdx-js/react'
import { Blockquote } from 'components/BlockQuote'
import { InlineCode } from 'components/InlineCode'
import Link from 'components/Link'
import { Contributor } from 'components/PostLayout/Contributors'
import { SEO } from 'components/seo'
import { ZoomImage } from 'components/ZoomImage'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React, { useEffect, useMemo, useState } from 'react'
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
import { CallToAction } from 'components/CallToAction'
import { IconFilter, IconSort, IconSpinner } from '@posthog/icons'
import { NewsletterForm } from 'components/NewsletterForm'
import BuiltBy from '../components/BuiltBy'
import TeamMember from 'components/TeamMember'
import CloudinaryImage from 'components/CloudinaryImage'
import AskMax from 'components/AskMax'
import ImageSlider from 'components/ImageSlider'
import ReaderView from 'components/ReaderView'
import { usePosts } from 'components/Edition/hooks/usePosts'
import { TreeMenu } from 'components/TreeMenu'
import { postsMenu as menu } from '../navs/posts'
import MenuBar from 'components/RadixUI/MenuBar'
const A = (props) => <Link {...props} state={{ newWindow: true }} />

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
                <GatsbyImage className={`rounded-sm z-0 bg-accent rounded`} image={getImage(featuredImage)} />
            )}
        </div>
    )
}

export const Contributors = ({ contributors }) => {
    return contributors?.[0] ? (
        <>
            <div className="text-sm opacity-50 px-4 mb-2">Posted by</div>
            <div className={`mb-4 flex flex-col gap-4`}>
                {contributors.map(({ profile_id, image, name, role, profile }) => {
                    return (
                        <Contributor
                            url={profile_id && `/community/profiles/${profile_id}`}
                            image={profile?.avatar?.url || image}
                            name={profile ? [profile.firstName, profile.lastName].filter(Boolean).join(' ') : name}
                            key={name}
                            role={profile?.companyRole || role}
                            text
                        />
                    )
                })}
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
                    {contributors.map(({ profile_id, name, profile, ...other }) => {
                        const image = profile?.avatar?.url || other?.image
                        const url = profile_id && `/community/profiles/${profile_id}`
                        const Container = url ? Link : 'div'
                        const gatsbyImage = image && getImage(image)
                        return (
                            <li className="!mb-0" key={name}>
                                <Container className="flex space-x-2 items-center" {...(url ? { to: url } : {})}>
                                    <span>
                                        {typeof image === 'string' ? (
                                            <CloudinaryImage
                                                width={50}
                                                className="w-6 h-6 border border-primary rounded-full"
                                                src={image}
                                            />
                                        ) : gatsbyImage ? (
                                            <GatsbyImage
                                                image={gatsbyImage}
                                                alt={name}
                                                className="w-6 h-6 border border-primary rounded-full"
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

const categoriesHideFromIndex = ['tutorials', 'customers', 'spotlight', 'changelog']
export const tagsHideFromIndex = ['Comparisons']

export const sortOptions = [
    {
        sort: ['score:desc', 'date:desc'],
        label: 'Popularity',
    },
    {
        sort: ['date:desc'],
        label: 'Newest',
    },
]

export const getParams = (root, tag, sort) => {
    return {
        sort,
        filters: {
            $and: [
                ...(root
                    ? [
                          {
                              $or: [
                                  {
                                      post_category: {
                                          folder: {
                                              $eq: root,
                                          },
                                      },
                                  },
                                  {
                                      crosspost_categories: {
                                          folder: {
                                              $eq: root,
                                          },
                                      },
                                  },
                              ],
                          },
                      ]
                    : [
                          {
                              post_category: {
                                  folder: {
                                      $notIn: categoriesHideFromIndex,
                                  },
                              },
                          },
                      ]),
                ...(tag
                    ? [
                          {
                              post_tags: {
                                  label: {
                                      $in: [tag],
                                  },
                              },
                          },
                      ]
                    : [
                          {
                              $or: [
                                  {
                                      post_tags: {
                                          label: {
                                              $notIn: tagsHideFromIndex,
                                          },
                                      },
                                  },
                                  {
                                      post_tags: {
                                          label: {
                                              $null: true,
                                          },
                                      },
                                  },
                              ],
                          },
                          {
                              $or: [
                                  {
                                      hideFromIndex: {
                                          $eq: false,
                                      },
                                  },
                                  {
                                      hideFromIndex: {
                                          $null: true,
                                      },
                                  },
                              ],
                          },
                      ]),
            ],
        },
    }
}

export const getSortOption = (root?: string) =>
    sortOptions[['blog', 'changelog', 'newsletter', 'spotlight'].includes(root) ? 1 : 0]

const Filters = ({ tag, setTag, sort, setSort, activeMenu }) => {
    return activeMenu?.children?.length > 0 ? (
        <div className="mb-1 flex items-center justify-between sticky top-0 bg-primary">
            <h5 className="m-0 text-sm font-semibold">{activeMenu?.name}</h5>
            <div className="flex items-center">
                <MenuBar
                    menus={[
                        {
                            trigger: <IconFilter className="size-4" />,
                            items: [
                                {
                                    type: 'item',
                                    label: 'All',
                                    onClick: () => setTag(undefined),
                                    active: !tag,
                                },
                                ...activeMenu?.children?.map((child) => {
                                    return {
                                        type: 'item',
                                        label: child.name,
                                        onClick: () => {
                                            setTag(child.tag || child.name)
                                        },
                                        active: tag ? tag === child.tag || tag === child.name : false,
                                    }
                                }),
                            ],
                        },
                    ]}
                />
                <MenuBar
                    menus={[
                        {
                            trigger: <IconSort className="size-4" />,
                            items: sortOptions.map((option) => {
                                return {
                                    type: 'item',
                                    label: option.label,
                                    onClick: () => setSort(option),
                                    active: sort.label === option.label,
                                }
                            }),
                        },
                    ]}
                />
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
        NewsletterForm,
        BuiltBy,
        TeamMember,
        ImageSlider,
        ...shortcodes,
    }
    const initialTag = undefined
    const { tableOfContents, askMax } = pageContext
    const { fullWidthContent, theoMode } = useLayoutData()
    const { pathname } = useLocation()
    const [postID, setPostID] = useState()
    const [posthogInstance, setPosthogInstance] = useState()

    const activeMenu = useMemo(() => {
        return menu.find(({ url }) => url?.split('/')[1] === pathname.split('/')[1])
    }, [])
    const [root, setRoot] = useState(pathname.split('/')[1] !== 'posts' ? pathname.split('/')[1] : undefined)
    const [sort, setSort] = useState(getSortOption(root))
    const [tag, setTag] = useState(initialTag)

    const [params, setParams] = useState(getParams(root, initialTag, getSortOption(root).sort))

    const { posts, isLoading, isValidating, fetchMore, mutate, hasMore } = usePosts({ params })

    useEffect(() => {
        if (window) {
            const instanceCookie = document.cookie
                .split('; ')
                ?.filter((row) => row.startsWith('ph_current_instance='))
                ?.map((c) => c.split('=')?.[1])?.[0]
            if (instanceCookie) {
                setPosthogInstance(instanceCookie)
            }
        }
    }, [])

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

    useEffect(() => {
        setParams(getParams(root, tag, sort.sort))
    }, [root, tag, sort])

    return (
        <>
            <SEO
                title={seo?.metaTitle || title + ' - PostHog'}
                description={seo?.metaDescription || excerpt}
                article
                image={`${process.env.GATSBY_CLOUDFRONT_OG_URL}/${fields.slug.replace(/\//g, '')}.jpeg`}
                imageType="absolute"
            />

            <ReaderView
                leftSidebar={
                    <>
                        <Filters tag={tag} setTag={setTag} sort={sort} setSort={setSort} activeMenu={activeMenu} />
                        {isLoading ? (
                            <div className="space-y-2">
                                {Array.from({ length: 20 }).map((_, index) => (
                                    <div key={index} className="bg-accent h-8 w-full rounded-md animate-pulse" />
                                ))}
                            </div>
                        ) : (
                            <TreeMenu
                                key={`posts-${posts?.length}`}
                                items={posts?.map((post) => {
                                    return {
                                        name: post.attributes.title,
                                        url: post.attributes.slug,
                                    }
                                })}
                            />
                        )}
                        {hasMore && (
                            <CallToAction
                                disabled={isValidating}
                                size="sm"
                                width="full"
                                className="my-2"
                                onClick={() => fetchMore()}
                            >
                                {isValidating ? <IconSpinner className="size-5 mx-auto animate-spin" /> : 'Load more'}
                            </CallToAction>
                        )}
                    </>
                }
                body={{ type: 'mdx', content: body, featuredImage, contributors, date, featuredVideo }}
                title={title}
                tableOfContents={tableOfContents}
                mdxComponents={components}
                homeURL={`/${root}`}
            />
        </>
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
                commits {
                    author {
                        avatar_url
                        html_url
                        login
                    }
                    date
                    message
                    url
                }
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
                    name
                    profile_id
                    role
                    profile {
                        firstName
                        lastName
                        companyRole
                        avatar {
                            url
                        }
                    }
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
