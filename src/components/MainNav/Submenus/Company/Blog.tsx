import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import RightCol from '../RightCol'
import Link from 'components/Link'
import slugify from 'slugify'
import CallToAction from '../CallToAction'

interface Category {
    fieldValue: string
    totalCount: number
}

interface Links {
    title: string
    url: string
    description: string
}

export default function Blog() {
    const {
        blogPosts,
        categories: { group },
    } = useStaticQuery(query)

    const {
        fields: { slug },
        frontmatter: { featuredImage, date, title },
    } = blogPosts.nodes[0]

    const image = getImage(featuredImage)
    const categories = group.sort((a: Category, b: Category) => {
        return b.totalCount - a.totalCount
    })

    const links: Links[] = [
        { title: 'Questions?', description: 'Ask us anything', url: '/questions' },
        {
            title: 'Contact sales',
            description: 'Demo, license questions, dad jokes',
            url: '/signup/self-host/get-in-touch#contact',
        },
        { title: 'Media', description: 'Logos and things', url: '/media' },
    ]

    return (
        <RightCol>
            <div className="flex flex-col h-full">
                <div>
                    <h2 className="text-[18px] opacity-70 font-bold m-0 mb-2 text-black">Blog</h2>
                    <Link className="text-inherit hover:text-inherit mt-2 inline-block" to={slug}>
                        {image && (
                            <GatsbyImage
                                alt="Blog featured image"
                                image={image}
                                className="rounded-sm pointer-events-none"
                            />
                        )}
                        <h4 className="text-[14px] font-bold m-0 text-black opacity-70 mt-2">{title}</h4>
                        <p className="text-[14px] m-0 text-black opacity-50 dark:text-white">{date}</p>
                    </Link>
                    <h4 className="text-[15px] font-bold opacity-50 mt-4 mb-1">Categories</h4>
                    <ul className="list-none m-0 p-0">
                        {categories.slice(0, 5).map(({ fieldValue }: Category) => {
                            const slug = slugify(fieldValue, { lower: true })
                            const url = `/blog/categories/${slug}`
                            return (
                                <li key={url} className="group">
                                    <Link
                                        to={url}
                                        className="py-2 block border-b border-gray-accent-light border-dashed group group-last:border-b-0"
                                    >
                                        <h3 className="text-base m-0 opacity-70 group-hover:text-red group-hover:opacity-100 transition-all">
                                            {fieldValue}
                                        </h3>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    <CallToAction to="/blog" className="mt-2">
                        Visit the PostHog Blog
                    </CallToAction>
                </div>
                <ul className="list-none m-0 p-0 md:mt-auto mt-7">
                    {links.map(({ title, url, description }: Links) => {
                        return (
                            <li key={title}>
                                <Link className="rounded-md px-2 py-2 block hover:bg-tan hover:bg-opacity-50" to={url}>
                                    <h3 className="text-base m-0 opacity-70">{title}</h3>
                                    <p className="m-0 text-[14px] text-black opacity-50 dark:text-white">
                                        {description}
                                    </p>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </RightCol>
    )
}

const query = graphql`
    {
        blogPosts: allMdx(
            filter: {
                isFuture: { eq: false }
                fields: { slug: { regex: "/^/blog/" } }
                frontmatter: { date: { ne: null } }
            }
            sort: { order: DESC, fields: frontmatter___date }
            limit: 1
        ) {
            nodes {
                id
                fields {
                    slug
                }
                frontmatter {
                    categories
                    date(formatString: "MMMM DD, YYYY")
                    title
                    featuredImage {
                        id
                        childImageSharp {
                            gatsbyImageData(width: 250)
                        }
                    }
                }
            }
        }
        categories: allMdx(
            filter: {
                isFuture: { eq: false }
                fields: { slug: { regex: "/^/blog/" } }
                frontmatter: { date: { ne: null } }
            }
        ) {
            group(field: frontmatter___categories) {
                fieldValue
                totalCount
            }
        }
    }
`
