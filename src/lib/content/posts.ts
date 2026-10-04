// Dated posts: the blog, the newsletter, comparisons, tutorials, customer stories, the founder and
// product engineer hubs, spotlights, and the library. Every post renders templates/BlogPost.tsx;
// the listings (/blog/all, /blog/categories/*, /tutorials/all, ...) and the index views
// (/blog, /newsletter, /compare, ...) read the summaries built here.
import { getCollection, type CollectionEntry } from 'astro:content'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import slugify from 'slugify'
import { nodes } from '../../data-layer'
import { contentById, excerpt, type ContentNode } from '../../data-layer/content'
import { CLOUDINARY_CLOUD_NAME, MINIMAL_BUILD } from '../../data-layer/env'
import { imageData, isCloudinaryUrl, type ImageData, type ImageOptions } from '../../data-layer/images'
import type { PageViewsNode, PostCategoryNode, SqueakProfileNode } from '../../data-layer/types'
import { getPublicID } from '../../data-layer/utils'
import { entryPath, isViewPath } from '../routes/views'
import { authorsFor, type Author } from './people'
import { tableOfContents, type TocItem } from './readerPage'

dayjs.extend(utc)

export type PostCollection =
    | 'blog'
    | 'newsletter'
    | 'compare'
    | 'founders'
    | 'productEngineers'
    | 'spotlight'
    | 'library'
    | 'tutorials'
    | 'customers'
export type PostEntry = CollectionEntry<PostCollection>

/** The URL prefix of each post collection. */
export const POST_SECTIONS: Record<PostCollection, string> = {
    blog: '/blog',
    newsletter: '/newsletter',
    compare: '/compare',
    founders: '/founders',
    productEngineers: '/product-engineers',
    spotlight: '/spotlight',
    library: '/library',
    tutorials: '/tutorials',
    customers: '/customers',
}

const POST_COLLECTIONS = Object.keys(POST_SECTIONS) as PostCollection[]
const POSTS_PER_PAGE = 20

// Frontmatter dates format in UTC, so a date never shifts to the day before.
const formatDate = (date: Date, format: string) => dayjs.utc(date).format(format)
const isFuture = (entry: PostEntry) => entry.data.date > new Date()
const byDateDesc = (a: PostEntry, b: PostEntry) => b.data.date.getTime() - a.data.date.getTime()
export const postUrl = (collection: PostCollection, entry: PostEntry) => entryPath(POST_SECTIONS[collection], entry.id)

let contentByPath: Map<string, ContentNode> | undefined
function contentNode(entry: PostEntry): ContentNode | undefined {
    contentByPath ??= new Map()
    const id = `/${entry.filePath}`
    if (!contentByPath.has(id)) {
        const node = contentById(id)
        if (node) contentByPath.set(id, node)
    }
    return contentByPath.get(id)
}

let viewsByPath: Map<string, number> | undefined
/** Recent pageviews for a URL (0 when the build ran without PostHog credentials). */
function pageViews(url: string): number {
    viewsByPath ??= new Map(nodes<PageViewsNode>('PageViews').map((node) => [node.pathname, node.count]))
    return viewsByPath.get(url) ?? 0
}

/** Frontmatter image URL → responsive image data. */
export function frontmatterImage(url: string | null | undefined, options?: ImageOptions): ImageData | null {
    if (!url) return null
    if (!isCloudinaryUrl(url)) return { src: url }
    return imageData({ cloudName: CLOUDINARY_CLOUD_NAME(), publicId: getPublicID(url) }, options)
}

/** Posts that get pages: tutorials and customer stories always; other posts once their date has passed. */
const isPublished = (collection: PostCollection, entry: PostEntry) =>
    collection === 'tutorials' || collection === 'customers' || !isFuture(entry)

const collectionCache = new Map<PostCollection, PostEntry[]>()
/** Every entry of a post collection, newest first. */
async function entriesOf(collection: PostCollection): Promise<PostEntry[]> {
    let entries = collectionCache.get(collection)
    if (!entries) {
        entries = ((await getCollection(collection)) as PostEntry[]).sort(byDateDesc)
        collectionCache.set(collection, entries)
    }
    return entries
}

export interface PublishedPost {
    collection: PostCollection
    entry: PostEntry
    url: string
}

/** The posts that get a page, for one collection, newest first. Skips URLs a view in src/views owns. */
export async function publishedPosts(collection: PostCollection): Promise<PublishedPost[]> {
    return (await entriesOf(collection))
        .filter((entry) => isPublished(collection, entry))
        .map((entry) => ({ collection, entry, url: postUrl(collection, entry) }))
        .filter((post) => !isViewPath(post.url))
}

/** Posts from the given collections with a date that has passed, newest first. */
async function currentPosts(collections: PostCollection[]): Promise<PublishedPost[]> {
    const all = await Promise.all(
        collections.map(async (collection) =>
            (await entriesOf(collection))
                .filter((entry) => !isFuture(entry))
                .map((entry) => ({ collection, entry, url: postUrl(collection, entry) }))
        )
    )
    return all.flat().sort((a, b) => byDateDesc(a.entry, b.entry))
}

// Post pages

export interface BlogPostPage {
    /** Content module key for MDXRenderer. */
    body: string
    /** URL path, e.g. /blog/hello-world. */
    slug: string
    title: string
    excerpt: string
    seo?: { metaTitle?: string; metaDescription?: string }
    /** "MMM DD, YYYY". */
    date: string
    tags: string[]
    featuredImage: ImageData | null
    featuredImageCaption?: string
    featuredVideo?: string
    contributors: Author[]
    tableOfContents: TocItem[]
}

export function blogPostPage(collection: PostCollection, entry: PostEntry): BlogPostPage {
    const { data } = entry
    const node = contentNode(entry)
    return {
        body: `/${entry.filePath}`,
        slug: postUrl(collection, entry),
        title: data.title,
        excerpt: node ? excerpt(node, 150) : '',
        seo: data.seo,
        date: formatDate(data.date, 'MMM DD, YYYY'),
        tags: data.tags,
        featuredImage: frontmatterImage(data.featuredImage),
        featuredImageCaption: data.featuredImageCaption,
        featuredVideo: data.featuredVideo,
        contributors: authorsFor(data.author),
        tableOfContents: tableOfContents(entry),
    }
}

// Listing pages (templates/BlogCategory, BlogTag, Pagination, tutorials/index, tutorials/TutorialsCategory)

/** One post card in a listing (components/Blog `Posts`). */
export interface PostCard {
    id: string
    slug: string
    title: string
    /** "MMM D, YYYY". */
    date: string
    category?: string
    featuredImage: ImageData | null
    authors: { name: string; avatar?: string }[]
}

function postCard({ entry, url }: PublishedPost): PostCard {
    return {
        id: entry.filePath ?? url,
        slug: url,
        title: entry.data.title,
        date: formatDate(entry.data.date, 'MMM D, YYYY'),
        category: entry.data.category,
        featuredImage: frontmatterImage(entry.data.featuredImage, { width: 480, height: 270 }),
        authors: authorsFor(entry.data.author).map((author) => ({
            name: author.name,
            avatar: author.profile?.avatar?.url,
        })),
    }
}

export interface PageInfo {
    currentPage: number
    numPages: number
    /** The first page's URL; later pages are `${base}/N`. */
    base: string
}

export interface ListingRoute {
    /** URL path. */
    path: string
    /** Page component module for the page island. */
    module: string
    props: Record<string, unknown>
}

/** Splits a listing into pages of 20 at `base`, `base/2`, …. `count` sets the number of pages. */
function paginate(
    base: string,
    count: number,
    pageProps: (page: PageInfo, range: [number, number]) => Omit<ListingRoute, 'path'>
): ListingRoute[] {
    const numPages = Math.ceil(count / POSTS_PER_PAGE)
    return Array.from({ length: numPages }, (_, index) => {
        const page = { currentPage: index + 1, numPages, base }
        const range: [number, number] = [index * POSTS_PER_PAGE, (index + 1) * POSTS_PER_PAGE]
        return { path: index === 0 ? base : `${base}/${index + 1}`, ...pageProps(page, range) }
    })
}

const popular = (posts: PublishedPost[]) => [...posts].sort((a, b) => pageViews(b.url) - pageViews(a.url))

function groupBy(posts: PublishedPost[], keys: (post: PublishedPost) => string[]) {
    const groups = new Map<string, PublishedPost[]>()
    for (const post of posts) {
        for (const key of keys(post)) groups.set(key, [...(groups.get(key) ?? []), post])
    }
    return groups
}

/** Recent and popular cards for one page of a filtered listing. */
function recentAndPopular(posts: PublishedPost[], [start, end]: [number, number]) {
    return {
        recent: posts.slice(start, end).map(postCard),
        popular: popular(posts).slice(start, end).map(postCard),
    }
}

/** `/<section>/all[/N]`: every post in a section (templates/Pagination.tsx). */
const ALL_POSTS_TITLES: Partial<Record<PostCollection, string>> = {
    blog: 'Blog',
    library: 'Library',
    founders: 'Founders',
    productEngineers: 'Product engineers',
}

const listingCache = new Map<PostCollection, Promise<ListingRoute[]>>()

/** The listing pages under a post section: /blog/all, /blog/categories/*, /blog/tags/*, /tutorials/all, …. */
export function sectionListings(collection: PostCollection): Promise<ListingRoute[]> {
    let listings = listingCache.get(collection)
    if (!listings) {
        listings = buildSectionListings(collection)
        listingCache.set(collection, listings)
    }
    return listings
}

async function buildSectionListings(collection: PostCollection): Promise<ListingRoute[]> {
    const section = POST_SECTIONS[collection]
    const routes: ListingRoute[] = []

    const title = ALL_POSTS_TITLES[collection]
    if (title) {
        const posts = await currentPosts([collection])
        routes.push(
            ...paginate(`${section}/all`, posts.length, (page, [start, end]) => ({
                module: '/src/templates/Pagination.tsx',
                props: { ...page, title, posts: posts.slice(start, end).map(postCard) },
            }))
        )
    }

    if (collection === 'blog') {
        // The page count comes from blog posts only, but the listing includes any dated post with the
        // category or tag.
        const blogPosts = (await entriesOf('blog')).filter((entry) => !isFuture(entry))
        const pool = await currentPosts(POST_COLLECTIONS)
        const byCategory = groupBy(pool, ({ entry }) => (entry.data.category ? [entry.data.category] : []))
        const byTag = groupBy(pool, ({ entry }) => entry.data.tags)
        const counts = (key: (entry: PostEntry) => string[]) => {
            const totals = new Map<string, number>()
            for (const entry of blogPosts)
                for (const value of key(entry)) totals.set(value, (totals.get(value) ?? 0) + 1)
            return totals
        }

        for (const [category, count] of counts((entry) => (entry.data.category ? [entry.data.category] : []))) {
            const slug = slugify(category, { lower: true })
            const posts = byCategory.get(category) ?? []
            routes.push(
                ...paginate(`/blog/categories/${slug}`, count, (page, range) => ({
                    module: '/src/templates/BlogCategory.tsx',
                    props: { ...page, category, slug, ...recentAndPopular(posts, range) },
                }))
            )
        }
        for (const [tag, count] of counts((entry) => entry.data.tags)) {
            const posts = byTag.get(tag) ?? []
            routes.push(
                ...paginate(`/blog/tags/${slugify(tag, { lower: true })}`, count, (page, range) => ({
                    module: '/src/templates/BlogTag.tsx',
                    props: { ...page, tag, ...recentAndPopular(posts, range) },
                }))
            )
        }
    }

    if (collection === 'tutorials') {
        const all = (await entriesOf('tutorials')).map((entry) => ({
            collection,
            entry,
            url: postUrl(collection, entry),
        }))
        const current = all.filter(({ entry }) => !isFuture(entry))
        routes.push(
            ...paginate('/tutorials/all', all.length, (page, [start, end]) => ({
                module: '/src/templates/tutorials/index.tsx',
                props: { ...page, posts: current.slice(start, end).map(postCard) },
            }))
        )
        for (const [tag, posts] of groupBy(all, ({ entry }) => entry.data.tags)) {
            const slug = slugify(tag, { lower: true })
            routes.push(
                ...paginate(`/tutorials/categories/${slug}`, posts.length, (page, range) => ({
                    module: '/src/templates/tutorials/TutorialsCategory.tsx',
                    props: { ...page, activeFilter: tag, ...recentAndPopular(posts, range) },
                }))
            )
        }
    }

    return dedupe(routes)
}

/** Two routes can share a path; keep the last one. */
function dedupe(routes: ListingRoute[]): ListingRoute[] {
    return [...new Map(routes.map((route) => [route.path, route])).values()]
}

// Post category pages from Strapi (templates/PostListing.tsx and templates/Hub/Tag.tsx)

const HUB_FOLDERS = ['founders', 'product-engineers']
// These folders have their own index views in src/views.
const FOLDERS_WITH_INDEX_VIEW = ['newsletter', 'blog', 'compare']

/** /posts, /<folder> and /<folder>/<tag> for each Strapi post category. Post pages win on a clash. */
export async function postCategoryListings(): Promise<ListingRoute[]> {
    const routes: ListingRoute[] = [{ path: '/posts', module: '/src/templates/PostListing.tsx', props: {} }]
    const categories = nodes<PostCategoryNode>('PostCategory').filter(
        ({ attributes: { folder, label } }) =>
            folder && !['customers', 'changelog'].includes(folder) && label !== 'Customers'
    )
    for (const { attributes } of categories) {
        const folder = attributes.folder!
        const isHub = HUB_FOLDERS.includes(folder)
        if (!isHub && !FOLDERS_WITH_INDEX_VIEW.includes(folder)) {
            routes.push({ path: `/${folder}`, module: '/src/templates/PostListing.tsx', props: { root: folder } })
        }
        for (const { attributes: tag } of attributes.post_tags?.data ?? []) {
            routes.push({
                path: `/${folder}/${slugify(tag.label, { lower: true, strict: true })}`,
                module: isHub ? '/src/templates/Hub/Tag.tsx' : '/src/templates/PostListing.tsx',
                props: isHub
                    ? { root: folder, selectedTag: tag.label, title: tag.label }
                    : { root: folder, selectedTag: tag.label },
            })
        }
    }

    const taken = new Set<string>()
    for (const collection of POST_COLLECTIONS) {
        for (const post of await publishedPosts(collection)) taken.add(post.url)
        for (const listing of await sectionListings(collection)) taken.add(listing.path)
    }
    return dedupe(routes).filter((route) => !taken.has(route.path) && !isViewPath(route.path))
}

// Index views (src/views/blog.tsx, compare.tsx, newsletter.tsx, sparks-joy/onlyhogs, hogbook.tsx)

/** A post in the shape components/PostsIndex reads (see its PostSummary type). */
export interface PostSummary {
    id: string
    fields: { slug: string; wordCount: number; pageViews: number }
    excerpt: string
    frontmatter: {
        title: string
        shortDate: string
        fullDate: string
        tags: string[]
        seo?: { metaDescription?: string }
        featuredImage?: { publicURL: string; childImageSharp: { gatsbyImageData: ImageData | null } }
        authors: { name: string }[]
    }
}

function postSummary({ entry, url }: PublishedPost): PostSummary {
    const node = contentNode(entry)
    const { data } = entry
    return {
        id: entry.filePath ?? url,
        fields: { slug: url, wordCount: node?.fields.wordCount ?? 0, pageViews: pageViews(url) },
        excerpt: node ? excerpt(node, 200) : '',
        frontmatter: {
            title: data.title,
            shortDate: formatDate(data.date, 'MMM D'),
            fullDate: formatDate(data.date, 'MMM D, YYYY'),
            tags: data.tags,
            seo: data.seo,
            featuredImage: data.featuredImage
                ? {
                      publicURL: data.featuredImage,
                      childImageSharp: { gatsbyImageData: frontmatterImage(data.featuredImage, { width: 1600 }) },
                  }
                : undefined,
            authors: authorsFor(data.author).map(({ name }) => ({ name })),
        },
    }
}

/** Data for /blog: blog posts, except comparisons. */
export async function blogIndexData() {
    const posts = (await currentPosts(['blog'])).filter(({ entry }) => !entry.data.tags.includes('Comparisons'))
    return { posts: posts.map(postSummary) }
}

/** Data for /compare and /newsletter. */
export async function sectionIndexData(collection: 'compare' | 'newsletter') {
    return { posts: (await currentPosts([collection])).map(postSummary) }
}

/** Data for /sparks-joy/onlyhogs: the six newest blog and newsletter posts. */
export async function onlyHogsData() {
    return { posts: (await currentPosts(['blog', 'newsletter'])).slice(0, 6).map(postSummary) }
}

export interface HogbookArticle {
    title: string
    url: string
    excerpt: string
    /** "MMM D, YYYY". */
    date: string
}

export interface HogbookFriend {
    squeakId: number
    firstName: string | null
    lastName: string | null
    avatar: { url: string } | null
}

/** Data for /hogbook: the latest blog posts and newsletters, and the team. */
export async function hogbookData() {
    const article =
        (pruneLength: number) =>
        ({ entry, url }: PublishedPost): HogbookArticle => {
            const node = contentNode(entry)
            return {
                title: entry.data.title,
                url,
                excerpt: node ? excerpt(node, pruneLength) : '',
                date: formatDate(entry.data.date, 'MMM D, YYYY'),
            }
        }
    const friends: HogbookFriend[] = nodes<SqueakProfileNode>('SqueakProfile')
        .filter((profile) => profile.squeakId !== 28378 && profile.teams?.data?.some((team) => team.id != null))
        .map(({ squeakId, firstName, lastName, avatar }) => ({
            squeakId,
            firstName: firstName ?? null,
            lastName: lastName ?? null,
            avatar: avatar?.url ? { url: avatar.url } : null,
        }))
    return {
        blog: (await currentPosts(['blog'])).slice(0, 3).map(article(150)),
        newsletter: (await currentPosts(['newsletter'])).slice(0, 4).map(article(170)),
        friends,
    }
}

// Route helpers for src/pages/<section>/[...slug].astro and src/pages/[folder]/[...tag].astro

export type PostSectionRoute =
    { kind: 'post'; collection: PostCollection; entry: PostEntry } | { kind: 'listing'; listing: ListingRoute }

export interface PageIslandInput {
    module: string
    props: Record<string, unknown>
    content?: string
}

/** Static paths for a post section: its posts, and its listings at URLs no post takes. */
export async function postSectionPaths(collection: PostCollection) {
    const section = POST_SECTIONS[collection]
    const slugOf = (path: string) => path.slice(section.length + 1) || undefined
    const posts = await publishedPosts(collection)
    const postUrls = new Set(posts.map((post) => post.url))
    const listings = MINIMAL_BUILD()
        ? []
        : (await sectionListings(collection)).filter(
              (listing) => !postUrls.has(listing.path) && !isViewPath(listing.path)
          )
    return [
        ...listings.map((listing) => ({
            params: { slug: slugOf(listing.path) },
            props: { kind: 'listing', listing } as PostSectionRoute,
        })),
        ...posts.map(({ entry, url }) => ({
            params: { slug: slugOf(url) },
            props: { kind: 'post', collection, entry } as PostSectionRoute,
        })),
    ]
}

/** The page island input for a post section route. */
export function postSectionPage(route: PostSectionRoute): PageIslandInput {
    if (route.kind === 'listing') return { module: route.listing.module, props: route.listing.props }
    const post = blogPostPage(route.collection, route.entry)
    return {
        module: '/src/templates/BlogPost.tsx',
        props: { post, askMax: route.collection === 'tutorials' },
        content: post.body,
    }
}
