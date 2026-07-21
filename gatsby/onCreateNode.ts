import { replacePath, stripFrontmatter } from './utils'
import { createFilePath, createRemoteFileNode } from 'gatsby-source-filesystem'

import GitUrlParse from 'git-url-parse'
import slugify from 'slugify'
import { JSDOM } from 'jsdom'
import { GatsbyNode } from 'gatsby'
import fs from 'fs'
import path from 'path'
import { PAGEVIEW_CACHE_KEY } from './onPreBootstrap'

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
})

// const popularity = {}

// exports.onPreBuild = async () => {}

const isValidUrl = (url: string): boolean => {
    try {
        const newUrl = new URL(url)
        return newUrl.protocol === 'http:' || newUrl.protocol === 'https:'
    } catch (err) {
        return false
    }
}

exports.onPreInit = async function (_, options) {
    const { strapiURL, strapiKey } = options
    if (!strapiURL || !strapiKey) return
    const createStrapiPageNodes = async (limit = 100, page = 1) => {
        const strapiPages = await fetch(
            `${strapiURL}/api/markdowns?pagination[pageSize]=${limit}&pagination[page]=${page}`,
            {
                headers: {
                    Authorization: `Bearer ${strapiKey}`,
                },
            }
        ).then((res) => res.json())
        const { data, meta } = strapiPages
        if (data) {
            data.forEach(({ id, attributes }) => {
                files[attributes.path] = { contributors: attributes.contributors, lastUpdated: attributes.lastUpdated }
            })
        }
        if (meta?.pagination?.pageCount > page) {
            return await createStrapiPageNodes(limit, page + 1)
        }
    }

    await createStrapiPageNodes()
}

const cloudinaryCache = {}
// Persisted copy of the Cloudinary resource list. Produced by the master cache-warmup job and
// restored in the preview build (see .github/workflows/{cache-warmup,deploy-preview}.yml), this
// lets preview builds skip the multi-minute Cloudinary crawl in onPreInit below.
const CLOUDINARY_CACHE_FILE = path.resolve(__dirname, '../.cloudinary-resources.json')

let templateListPromise: Promise<any[]> | null = null
async function getTemplateList() {
    if (!templateListPromise) {
        templateListPromise = fetch('https://us.posthog.com/api/public_hog_function_templates?limit=350/')
            .then((res) => {
                if (res.status !== 200) throw `Got status code ${res.status}`
                return res.json()
            })
            .then((body) => body.results)
    }
    return templateListPromise
}

const REPO_CONFIGS = {
    'posthog-main-repo': {
        stripPrefix: '/docs/published/',
        pathPrefix: '',
    },
}

/**
 * Minimal YAML frontmatter parser for ingested SKILL.md files. They only carry
 * `name` and `description` (description may be a folded `>-` scalar), so a tiny
 * line-based parser is enough and avoids adding a gray-matter dependency.
 */
function parseSkillFrontmatter(raw: string): { name?: string; description?: string; body: string } {
    const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/)
    if (!match) return { body: raw }
    const [, frontmatter, body] = match
    const lines = frontmatter.split('\n')
    const fields: Record<string, string> = {}
    for (let i = 0; i < lines.length; i++) {
        const keyMatch = lines[i].match(/^(\w[\w-]*):\s?(.*)$/)
        if (!keyMatch) continue
        const [, key, rawValue] = keyMatch
        let value = rawValue.trim()
        // Folded/literal block scalar (>- > | |-): gather the indented lines below.
        if (/^[>|][-+]?$/.test(value) || value === '') {
            const collected: string[] = []
            while (i + 1 < lines.length && (/^\s+\S/.test(lines[i + 1]) || lines[i + 1].trim() === '')) {
                collected.push(lines[i + 1].trim())
                i++
            }
            value = collected.join(' ').trim()
        }
        fields[key] = value.replace(/^['"]|['"]$/g, '')
    }
    return { name: fields.name, description: fields.description, body }
}

export const onPreInit: GatsbyNode['onPreInit'] = async function ({ actions }) {
    if (
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET ||
        !process.env.GATSBY_CLOUDINARY_CLOUD_NAME
    ) {
        console.warn('Cloudinary credentials not found')
        return
    }

    // Reuse a previously fetched resource list when available. The crawl below paginates the
    // entire Cloudinary library (~2 min over the network), so skipping it greatly speeds up
    // preview builds. A missing entry only omits image dimensions in onCreateNode (logged as a
    // warning), so a stale cache degrades gracefully.
    if (fs.existsSync(CLOUDINARY_CACHE_FILE)) {
        try {
            const cached = JSON.parse(fs.readFileSync(CLOUDINARY_CACHE_FILE, 'utf-8'))
            Object.assign(cloudinaryCache, cached)
            console.log(`Loaded ${Object.keys(cached).length} Cloudinary resources from cache`)
            return
        } catch {
            // Corrupted/unreadable cache file — fall through to a fresh crawl
        }
    }

    console.log('Fetching cloudinary data')

    const cloudinaryAuth = `Basic ${Buffer.from(
        `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`
    ).toString('base64')}`

    const fetchCloudinaryImages = async (nextCursor = null) => {
        const { resources, next_cursor } = await fetch(
            `https://api.cloudinary.com/v1_1/${
                process.env.GATSBY_CLOUDINARY_CLOUD_NAME
            }/resources/image?type=upload&max_results=500${nextCursor ? `&next_cursor=${nextCursor}` : ``}`,
            { headers: { Authorization: cloudinaryAuth } }
        ).then((res) => res.json())
        resources.forEach((resource) => {
            cloudinaryCache[resource.public_id] = resource
        })

        if (next_cursor) {
            await fetchCloudinaryImages(next_cursor)
        }
    }

    await fetchCloudinaryImages()

    // Persist for reuse by later builds (saved to the Actions cache by the master warmup job).
    fs.writeFileSync(CLOUDINARY_CACHE_FILE, JSON.stringify(cloudinaryCache))
}

function getPublicID(image: string) {
    const imagePath = image.split('/upload/')[1]
    return imagePath.substring(0, imagePath.lastIndexOf('.'))
}

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({
    node,
    getNode,
    actions,
    store,
    cache,
    createNodeId,
    createContentDigest,
}) => {
    const { createNodeField, createNode } = actions

    // Canonical agent skills from the monorepo (products/<product>/skills/<name>/SKILL.md).
    // These File nodes are blocked from MDX transformation, so we parse them into
    // typed AgentSkill nodes here. Failures degrade to "skip this file", never break the build.
    if (
        node.internal.type === 'File' &&
        (node as any).sourceInstanceName === 'posthog-main-repo' &&
        (node as any).name === 'SKILL' &&
        (((node as any).relativeDirectory as string) || '').includes('/skills/')
    ) {
        try {
            const absolutePath = (node as any).absolutePath as string
            const relativeDirectory = ((node as any).relativeDirectory as string) || ''
            const parts = relativeDirectory.split('/') // products/<product>/skills/<skill-name>
            const product = parts[0] === 'products' ? parts[1] : undefined
            const skillName = parts[0] === 'products' ? parts[3] : undefined
            if (product && skillName) {
                const raw = fs.readFileSync(absolutePath, 'utf-8')
                const { name, description, body } = parseSkillFrontmatter(raw)
                const mcpTools = Array.from(
                    new Set(Array.from(body.matchAll(/posthog:([a-z0-9-]+)/g)).map((m) => m[1]))
                )
                const id = createNodeId(`agent-skill-${(node as any).id}`)
                createNode({
                    id,
                    parent: (node as any).id,
                    children: [],
                    product,
                    name: name || skillName,
                    description: description || '',
                    sourcePath: relativeDirectory,
                    mcpTools,
                    internal: {
                        type: 'AgentSkill',
                        contentDigest: createContentDigest({ product, skillName, name, description, mcpTools }),
                    },
                })
            }
        } catch (err) {
            console.warn(`Failed to parse agent skill from ${(node as any).absolutePath}:`, err)
        }
        return
    }

    if (node.internal.type === `MarkdownRemark` || node.internal.type === 'Mdx') {
        const parent = getNode(node.parent)
        if (parent?.internal.type === 'PostHogPull' || parent?.internal.type === 'PostHogIssue') return

        const imageFields = ['featuredImage', 'thumbnail', 'logo', 'logoDark', 'icon']
        imageFields.forEach((field) => {
            if (node.frontmatter?.[field] && new URL(node.frontmatter[field]).hostname === 'res.cloudinary.com') {
                const publicId = getPublicID(node.frontmatter?.[field])
                const cloudinaryData = cloudinaryCache[publicId]
                if (!cloudinaryData) {
                    console.warn(`Cloudinary data not found for ${publicId}`)
                }
                node.frontmatter[field] = {
                    publicURL: node.frontmatter?.[field],
                    childImageSharp: {
                        cloudName: process.env.GATSBY_CLOUDINARY_CLOUD_NAME,
                        publicId,
                        originalFormat: cloudinaryData?.format,
                        originalWidth: cloudinaryData?.width,
                        originalHeight: cloudinaryData?.height,
                    },
                }
            }
        })

        const images = node.frontmatter?.images
        if (images?.length > 0) {
            node.frontmatter.images = images.map((image) => {
                const publicId = getPublicID(image)
                const cloudinaryData = cloudinaryCache[publicId]
                if (!cloudinaryData) {
                    console.warn(`Cloudinary data not found for ${publicId}`)
                }
                return {
                    publicURL: image,
                    childImageSharp: {
                        cloudName: process.env.GATSBY_CLOUDINARY_CLOUD_NAME,
                        publicId,
                        originalFormat: cloudinaryData?.format,
                        originalWidth: cloudinaryData?.width,
                        originalHeight: cloudinaryData?.height,
                    },
                }
            })
        }

        let slug = createFilePath({ node, getNode, basePath: `pages` })
        if (parent?.sourceInstanceName) {
            const config = REPO_CONFIGS[parent.sourceInstanceName]
            if (config) {
                if (slug.startsWith(config.stripPrefix)) {
                    slug = slug.substring(config.stripPrefix.length)
                }
                // Ensure slug starts with / before concatenating
                if (!slug.startsWith('/')) {
                    slug = `/${slug}`
                }
                slug = `${config.pathPrefix}${slug}`
            }
        }

        createNodeField({
            node,
            name: `slug`,
            value: replacePath(slug),
        })

        if (slug) {
            const pageViews = await cache.get(PAGEVIEW_CACHE_KEY)

            if (pageViews && slug.slice(0, -1) in pageViews) {
                createNodeField({
                    node,
                    name: `pageViews`,
                    value: pageViews[slug.slice(0, -1)],
                })
            } else {
                createNodeField({
                    node,
                    name: `pageViews`,
                    value: 0,
                })
            }
        }

        if (/^\/docs\/(apps|cdp)/.test(slug) && node?.frontmatter?.github && process.env.GITHUB_API_KEY) {
            const { name, owner } = GitUrlParse(node.frontmatter.github)

            try {
                if (name && owner) {
                    const repo = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
                        headers: {
                            Authorization: `token ${process.env.GITHUB_API_KEY}`,
                        },
                    })

                    if (repo.status !== 200) {
                        throw `Got status code ${repo.status}`
                    }

                    const { default_branch } = await repo.json()

                    const res = await fetch(
                        `https://raw.githubusercontent.com/${owner}/${name}/${default_branch}/plugin.json`,
                        {
                            headers: {
                                Authorization: `token ${process.env.GITHUB_API_KEY}`,
                            },
                        }
                    )

                    if (res.status !== 200) {
                        throw `Got status code ${res.status}`
                    }

                    const body = await res.text()
                    const { config } = JSON.parse(body)

                    if (config) {
                        createNodeField({
                            node,
                            name: `appConfig`,
                            value: config,
                        })
                    }
                }
            } catch (error) {
                console.error(`Error fetching plugin.json from ${owner}/${name}: ${error}`)
            }
        }

        if (/^\/docs\/(apps|cdp)/.test(slug) && node?.frontmatter?.templateId) {
            const templateIds = node.frontmatter.templateId

            try {
                const results = await getTemplateList()
                const templateConfigs: { templateId: string; inputs_schema: any; name: string; type: string }[] = []
                for (const templateId of templateIds) {
                    const config = results.find((template: { id: string }) => template?.id === templateId)
                    const inputs_schema = config?.inputs_schema
                    const name = config?.name
                    const type = config?.type

                    if (config) {
                        templateConfigs.push({ templateId, inputs_schema, name, type })
                    }
                }

                createNodeField({
                    node,
                    name: `templateConfigs`,
                    value: templateConfigs,
                })
            } catch (error) {
                console.error(`Error fetching input_schema for ${templateIds}: ${error}`)
            }
        }
    }

    if (node.internal.type === 'Plugin' && new URL(node.url).hostname === 'github.com' && process.env.GITHUB_API_KEY) {
        const { name, owner } = GitUrlParse(node.url)
        const { download_url } = await fetch(`https://api.github.com/repos/${owner}/${name}/readme`, {
            headers: {
                Authorization: `token ${process.env.GITHUB_API_KEY}`,
            },
        }).then((res) => res.json())

        const markdown =
            download_url &&
            (await createRemoteFileNode({
                url: download_url,
                parentNodeId: node.id,
                createNode,
                createNodeId,
                cache,
                store,
            }))

        if (markdown) {
            node.markdown___NODE = markdown.id
            node.slug = `/integrations/${slugify(node.name, { lower: true })}`
        }

        const { default_branch } = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
            headers: {
                Authorization: `token ${process.env.GITHUB_API_KEY}`,
            },
        }).then((res) => res.json())

        const imageURL = `https://raw.githubusercontent.com/${owner}/${name}/${default_branch}/logo.png`
        let image
        try {
            image = await createRemoteFileNode({
                url: imageURL,
                parentNodeId: node.id,
                createNode,
                createNodeId,
                cache,
                store,
            })
        } catch (e) {
            // Ignore
        }

        if (image) {
            node.logo___NODE = image && image.id
        }
    }

    const getAshbyLocationName = async (id) =>
        fetch(`https://api.ashbyhq.com/location.info`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Basic ${Buffer.from(`${process.env.ASHBY_API_KEY}:`).toString('base64')}`,
            },
            body: JSON.stringify({ locationId: id }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data?.results?.name) {
                    console.log('No name found for location', data)
                }
                return data?.results?.name
            })
            .catch((e) => {
                console.error('Error fetching Ashby location name', e)
                return null
            })

    if (node.internal.type === 'AshbyJobPosting') {
        const title = node.title.replace(' (Remote)', '')
        const slug = `/careers/${slugify(title, { lower: true })}`
        const locations = [
            await getAshbyLocationName(node.locationIds.primaryLocationId),
            ...(await Promise.all(node.locationIds.secondaryLocationIds.map((id) => getAshbyLocationName(id)))),
        ]
            .map((location) => location.replace(/\(|\)|remote/gi, '').trim())
            .filter(Boolean)
        createNodeField({
            node,
            name: 'locations',
            value: locations,
        })
        createNodeField({
            node,
            name: `title`,
            value: title,
        })
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
        if (node.info.descriptionHtml) {
            let html = node.info.descriptionHtml
            const tableOfContents = []
            if (html.includes('<h2>')) {
                const dom = JSDOM.fragment(
                    `<section><details open><summary><h2>${html
                        .split('<h2>')
                        .slice(1)
                        .join('</details><details open><summary><h2>')
                        .split('</h2>')
                        .join('</h2></summary>')}</summary></details></section>`
                )
                const details = dom.querySelectorAll('details')
                for (let i = 0; i < details.length; i++) {
                    const node = details[i]
                    const heading = node.querySelector('h2')
                    if (heading.textContent.toLowerCase() === 'benefits') {
                        node.remove()
                    } else {
                        const textContent = heading.textContent
                        const id = slugify(textContent, { lower: true })
                        tableOfContents.push({ value: textContent, url: id, depth: 0 })
                        heading.id = id
                    }
                }
                html = dom.firstChild.outerHTML
            }
            createNodeField({
                node,
                name: `tableOfContents`,
                value: tableOfContents,
            })
            createNodeField({
                node,
                name: `html`,
                value: html,
            })
        }
    }
    if (node.internal.type === 'SlackEmoji') {
        const { url } = node
        if (isValidUrl(url)) {
            const local = await createRemoteFileNode({
                url,
                parentNodeId: node.id,
                createNode,
                createNodeId,
                cache,
                store,
            })
            if (local) {
                createNodeField({ node, name: 'localFile', value: local.id })
            }
        }
    }
    if (node.internal.type === 'PostHogWorkflowTemplate') {
        const slug = slugify(node.name, { lower: true, strict: true })
        createNodeField({
            node,
            name: 'slug',
            value: slug,
        })
    }
}
