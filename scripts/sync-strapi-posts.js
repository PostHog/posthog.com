/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const { globSync } = require('glob')
const matter = require('gray-matter')
const fetch = require('node-fetch')
const qs = require('qs')

const CONTENTS_DIR = path.resolve(__dirname, '../contents')
const AUTHORS_FILE = path.resolve(__dirname, '../src/data/authors.json')
const POST_FOLDERS = new Set([
    'blog',
    'tutorials',
    'customers',
    'spotlight',
    'founders',
    'product-engineers',
    'features',
    'newsletter',
])
const POST_FOLDERS_GLOB = `{${[...POST_FOLDERS].join(',')}}`

const toArray = (value) => {
    if (!value) return []
    return Array.isArray(value) ? value : [value]
}

const toPosixPath = (value) => value.split(path.sep).join('/')

const collectMarkdownFiles = (directory) =>
    globSync(`${POST_FOLDERS_GLOB}/**/*.{md,mdx}`, {
        cwd: directory,
        absolute: true,
        nodir: true,
    })

const readRepoPosts = () => {
    const authorRows = JSON.parse(fs.readFileSync(AUTHORS_FILE, 'utf8'))
    const profileIdByHandle = new Map(authorRows.map(({ handle, profile_id: profileId }) => [handle, profileId]))

    const sourceFiles = collectMarkdownFiles(CONTENTS_DIR)

    const posts = []
    for (const filePath of sourceFiles) {
        const raw = fs.readFileSync(filePath, 'utf8')
        const { data: frontmatter } = matter(raw)
        if (!frontmatter?.date || !frontmatter?.title) continue

        const relativePath = toPosixPath(path.relative(CONTENTS_DIR, filePath))
        const withoutExtension = relativePath.replace(/\.(md|mdx)$/i, '')
        const slugPath = withoutExtension.replace(/\/index$/i, '')
        const slug = `/${slugPath}`
        const featuredImage =
            typeof frontmatter.featuredImage === 'string'
                ? frontmatter.featuredImage
                : frontmatter.featuredImage?.publicURL || null

        const authorIds = toArray(frontmatter.author)
            .map((handle) => profileIdByHandle.get(handle))
            .filter(Boolean)
        const tags = toArray(frontmatter.tags).filter(Boolean)
        const crosspost = toArray(frontmatter.crosspost).filter(Boolean)

        posts.push({
            slug,
            path: relativePath,
            title: frontmatter.title,
            date: frontmatter.date,
            featuredImage,
            authorIds,
            tags,
            crosspost,
            hideFromIndex: Boolean(frontmatter.hideFromIndex),
        })
    }

    return posts
}

const syncToStrapi = async ({ posts, apiHost, strapiToken }) => {
    const existingPostByPath = new Map()
    let allStrapiPostCategories = []

    const authedHeaders = {
        Authorization: `Bearer ${strapiToken}`,
        'content-type': 'application/json',
    }

    const getAllStrapiPosts = async (page = 1) => {
        const query = qs.stringify({
            pagination: {
                page,
                pageSize: 100,
            },
            fields: ['id', 'path'],
        })
        const response = await fetch(`${apiHost}/api/posts?${query}`).then((res) => res.json())
        if (response.data) {
            response.data.forEach((strapiPost) => {
                const postPath = strapiPost?.attributes?.path
                if (postPath) {
                    existingPostByPath.set(postPath, strapiPost)
                }
            })
        }
        if (response?.meta?.pagination?.page < response?.meta?.pagination?.pageCount) {
            await getAllStrapiPosts(page + 1)
        }
    }

    const getAllStrapiPostCategories = async (page = 1) => {
        const query = qs.stringify({
            pagination: {
                page,
                pageSize: 100,
            },
            populate: ['post_tags'],
        })
        const response = await fetch(`${apiHost}/api/post-categories?${query}`).then((res) => res.json())
        if (response.data) {
            allStrapiPostCategories = [...allStrapiPostCategories, ...response.data]
        }
        if (response?.meta?.pagination?.page < response?.meta?.pagination?.pageCount) {
            await getAllStrapiPostCategories(page + 1)
        }
    }

    const createOrUpdateStrapiPost = async (data, id) => {
        const body = JSON.stringify({ data })
        return fetch(`${apiHost}/api/posts${id ? `/${id}` : ''}`, {
            method: id ? 'PUT' : 'POST',
            body,
            headers: authedHeaders,
        })
            .then((res) => res.json())
            .then(({ error }) => {
                if (error) {
                    console.error(error, data?.path)
                }
            })
    }

    const createTag = async (tag, category) => {
        const label = tag.charAt(0).toUpperCase() + tag.slice(1)
        const body = JSON.stringify({
            data: {
                label,
                post_category: {
                    connect: [category?.id],
                },
            },
        })
        const { data } = await fetch(`${apiHost}/api/post-tags`, {
            method: 'POST',
            body,
            headers: authedHeaders,
        }).then((res) => res.json())
        category?.attributes?.post_tags?.data?.push(data)
        return data
    }

    const createCategory = async (folder) => {
        const label = (folder.charAt(0).toUpperCase() + folder.slice(1)).replaceAll('-', ' ')
        const body = JSON.stringify({
            data: {
                label,
                folder,
            },
        })
        const { data } = await fetch(`${apiHost}/api/post-categories?populate=*`, {
            method: 'POST',
            body,
            headers: authedHeaders,
        }).then((res) => res.json())

        allStrapiPostCategories.push(data)
        return allStrapiPostCategories.find((category) => category === data)
    }

    await getAllStrapiPosts()
    await getAllStrapiPostCategories()

    for (const post of posts) {
        const existingPost = existingPostByPath.get(post.path)
        const folder = post.path.split('/')[0]
        const category =
            allStrapiPostCategories.find((strapiCategory) => strapiCategory?.attributes?.folder === folder) ||
            (await createCategory(folder))

        const tags = []
        for (const tagLabel of post.tags) {
            let tag = category?.attributes?.post_tags?.data?.find(
                (existingTag) => existingTag?.attributes?.label?.toLowerCase() === tagLabel?.toLowerCase()
            )
            if (!tag) {
                tag = await createTag(tagLabel, category)
            }
            tags.push(tag)
        }

        const crosspostCategoryIds = post.crosspost
            .map(
                (crosspostCategory) =>
                    allStrapiPostCategories.find(
                        (strapiCategory) => strapiCategory?.attributes?.label === crosspostCategory
                    )?.id
            )
            .filter(Boolean)

        const data = {
            slug: post.slug,
            path: post.path,
            title: post.title,
            date: post.date,
            featuredImage: {
                url: post.featuredImage,
            },
            authors: {
                connect: post.authorIds,
            },
            hideFromIndex: post.hideFromIndex,
            ...(category
                ? {
                      post_category: {
                          connect: [category.id],
                      },
                  }
                : null),
            ...(tags.length > 0
                ? {
                      post_tags: {
                          connect: tags.map((tag) => tag.id),
                      },
                  }
                : null),
            ...(crosspostCategoryIds.length > 0
                ? {
                      crosspost_categories: {
                          connect: crosspostCategoryIds,
                      },
                  }
                : null),
        }

        await createOrUpdateStrapiPost(data, existingPost?.id)
    }
}

const main = async () => {
    const apiHost = process.env.GATSBY_SQUEAK_API_HOST
    const strapiToken = process.env.STRAPI_TOKEN

    if (!apiHost) {
        throw new Error('Missing required env var: GATSBY_SQUEAK_API_HOST')
    }
    if (!strapiToken) {
        throw new Error('Missing required env var: STRAPI_TOKEN')
    }

    const posts = readRepoPosts()
    console.log(`Discovered ${posts.length} Markdown/MDX posts to sync`)

    await syncToStrapi({ posts, apiHost, strapiToken })
    console.log('Finished syncing posts to Strapi')
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
