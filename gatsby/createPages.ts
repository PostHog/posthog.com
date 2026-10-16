import { GatsbyNode } from 'gatsby'
import path from 'path'
import slugify from 'slugify'
import { replacePath } from './utils'
const Slugger = require('github-slugger')

export const createPages: GatsbyNode['createPages'] = async ({ actions: { createPage }, graphql }) => {
    const BlogPostTemplate = path.resolve(`src/templates/BlogPost.tsx`)
    const BlogCategoryTemplate = path.resolve(`src/templates/BlogCategory.tsx`)
    const BlogTagTemplate = path.resolve(`src/templates/BlogTag.tsx`)
    const PaginationTemplate = path.resolve(`src/templates/Pagination.tsx`)
    const PostListingTemplate = path.resolve(`src/templates/PostListing.tsx`)
    const PlainTemplate = path.resolve(`src/templates/Plain.js`)

    function formatToc(headings: any[]) {
        const slugger = new Slugger()
        return headings.map((heading: any) => {
            const cleanValue = heading.value.replace(/\s*<([a-z]+).+?>.+?<\/\1>/g, '')
            return {
                ...heading,
                depth: heading.depth - 2,
                url: slugger.slug(cleanValue),
                value: cleanValue,
            }
        })
    }

    const createPaginatedPages = ({ postsPerPage = 20, totalCount, base, template, extraContext = {} }: any) => {
        const numPages = Math.ceil(totalCount / postsPerPage) || 1
        Array.from({ length: numPages }).forEach((_, i) => {
            const context = {
                ...extraContext,
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages,
                currentPage: i + 1,
                base,
            }
            createPage({
                path: i === 0 ? base : `${base}/${i + 1}`,
                component: template,
                context,
            })
        })
    }

    const result: any = await graphql(`
        {
            blogPosts: allMdx(
                sort: { order: DESC, fields: [frontmatter___date] }
                filter: {
                    isFuture: { ne: true }
                    frontmatter: { date: { ne: null } }
                    fields: { slug: { regex: "/^/blog/" } }
                }
            ) {
                totalCount
                nodes {
                    id
                    headings {
                        depth
                        value
                    }
                    fields {
                        slug
                    }
                }
            }
            libraryArticles: allMdx(
                filter: {
                    isFuture: { ne: true }
                    frontmatter: { date: { ne: null } }
                    fields: { slug: { regex: \"/^/library|^/founders|^/product-engineers|^/features|^/newsletter/\" } }
                }
            ) {
                nodes {
                    id
                    headings {
                        depth
                        value
                    }
                    fields {
                        slug
                    }
                }
            }
            categories: allMdx(
                filter: {
                    isFuture: { ne: true }
                    frontmatter: { date: { ne: null } }
                    fields: { slug: { regex: "/^/blog/" } }
                }
            ) {
                categories: group(field: frontmatter___category) {
                    totalCount
                    category: fieldValue
                }
                tags: group(field: frontmatter___tags) {
                    totalCount
                    tag: fieldValue
                }
            }
            standalonePages: allMdx(
                filter: {
                    fileAbsolutePath: { regex: "/contents/[^/]+\\\\.(md|mdx)$/" }
                    frontmatter: { title: { nin: [""] } }
                }
            ) {
                nodes {
                    id
                    fields {
                        slug
                    }
                }
            }
        }
    `)

    if (result.errors) {
        console.error('Error fetching blog data for createPages:', result.errors)
        return
    }

    // 1. Create individual Blog Post pages (/blog/[slug])
    result.data?.blogPosts?.nodes?.forEach((node: any) => {
        const { slug } = node.fields
        const tableOfContents = node.headings && formatToc(node.headings)
        createPage({
            path: replacePath(slug),
            component: BlogPostTemplate,
            context: {
                id: node.id,
                tableOfContents,
                slug,
                post: true,
                article: true,
            },
        })
    })

    // 1b. Library, founders, product-engineers, features, newsletter articles
    result.data?.libraryArticles?.nodes?.forEach((node: any) => {
        const { slug } = node.fields
        const tableOfContents = node.headings && formatToc(node.headings)
        createPage({
            path: replacePath(slug),
            component: BlogPostTemplate,
            context: { id: node.id, tableOfContents, slug, post: true, article: true },
        })
    })

    // 2. Create Blog Category pages (/blog/categories/[slug])
    result.data?.categories?.categories?.forEach(({ category, totalCount }: any) => {
        if (!category) return
        const slug = slugify(category, { lower: true })
        const base = `/blog/categories/${slug}`
        createPaginatedPages({
            totalCount,
            base,
            template: BlogCategoryTemplate,
            extraContext: { category, slug },
        })
    })

    // 3. Create Blog Tag pages (/blog/tags/[slug])
    result.data?.categories?.tags?.forEach(({ tag, totalCount }: any) => {
        if (!tag) return
        const slug = slugify(tag, { lower: true })
        const base = `/blog/tags/${slug}`
        createPaginatedPages({
            totalCount,
            base,
            template: BlogTagTemplate,
            extraContext: { tag, slug },
        })
    })

    // 4. Create Paginated Blog list (/blog/all and /blog/all/2, ...)
    createPaginatedPages({
        totalCount: result.data?.blogPosts?.totalCount || 0,
        base: '/blog/all',
        template: PaginationTemplate,
        extraContext: {
            regex: '/^/blog/',
            title: 'Blog',
        },
    })

    // 5. Create main Blog listing at /blog
    createPage({
        path: '/blog',
        component: PostListingTemplate,
        context: {
            post: true,
            title: 'Blog',
            article: false,
            root: 'blog',
        },
    })

    // 6. Create standalone content pages (/faq, /community-incubator, etc.)
    result.data?.standalonePages?.nodes?.forEach((node: any) => {
        const slug = node.fields?.slug
        if (!slug || slug === '/' || slug === '/about' || slug === '/home') return
        createPage({
            path: replacePath(slug),
            component: PlainTemplate,
            context: {
                id: node.id,
            },
        })
    })

    console.log(`[createPages] Created ${result.data?.blogPosts?.nodes?.length || 0} blog posts and categories successfully.`)
}
