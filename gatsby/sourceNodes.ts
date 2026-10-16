import { GatsbyNode } from 'gatsby'
import fetch from 'node-fetch'

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({ actions, createContentDigest, createNodeId }) => {
    const { createNode } = actions

    // 1. PostCategory nodes (needed by PostListing and Blog templates)
    const fallbackCategories = [
        { id: 1, attributes: { folder: 'blog', label: 'Blog', post_tags: { data: [] } } },
        { id: 2, attributes: { folder: 'news', label: 'PostHog news', post_tags: { data: [] } } },
        { id: 3, attributes: { folder: 'engineering', label: 'Engineering', post_tags: { data: [] } } },
        { id: 4, attributes: { folder: 'product', label: 'Product', post_tags: { data: [] } } },
        { id: 5, attributes: { folder: 'culture', label: 'Culture', post_tags: { data: [] } } },
        { id: 6, attributes: { folder: 'startups', label: 'Startups', post_tags: { data: [] } } },
    ]

    let categoriesToCreate = fallbackCategories
    if (process.env.GATSBY_SQUEAK_API_HOST) {
        try {
            const controller = new AbortController()
            const timeout = setTimeout(() => controller.abort(), 2000)
            const res = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/post-categories?populate=*`, {
                signal: controller.signal,
            })
            clearTimeout(timeout)
            if (res.ok) {
                const data: any = await res.json()
                if (Array.isArray(data?.data) && data.data.length > 0) {
                    categoriesToCreate = data.data
                }
            }
        } catch (e) {
            // Use fallback categories
        }
    }

    categoriesToCreate.forEach(({ id, ...other }: any) => {
        createNode({
            id: createNodeId(`post-category-${id}`),
            internal: {
                type: `PostCategory`,
                contentDigest: createContentDigest(other),
            },
            ...other,
        })
    })

    // 2. Dummy ProductData node to satisfy any residual schema queries
    createNode({
        id: createNodeId('product-data-singleton'),
        products: [],
        internal: {
            type: 'ProductData',
            contentDigest: createContentDigest('empty-product-data'),
        },
    })

    // 3. Dummy SqueakProfile node to satisfy BuiltBy useStaticQuery
    createNode({
        id: createNodeId('squeak-profile-dummy'),
        squeakId: 1,
        github: '',
        firstName: 'PostHog',
        lastName: 'Team',
        companyRole: 'Team',
        avatar: {
            url: '',
            formats: {
                thumbnail: { url: '' },
            },
        },
        internal: {
            type: 'SqueakProfile',
            contentDigest: createContentDigest('dummy-squeak-profile'),
        },
    })

    console.log(`[sourceNodes] Sourced ${categoriesToCreate.length} post categories (lightweight blog mode).`)
}
