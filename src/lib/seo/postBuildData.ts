// /post-build-data.json: the data the GitHub Actions read after a production deploy, to build OG images
// and sync posts to Strapi (scripts/run-post-build-tasks.ts). Those scripts read the shape
// `{ <name>: { nodes: [...] } }`.
import dayjs from 'dayjs'
import path from 'node:path'
import { nodes } from '../../data-layer'
import { type ContentNode, excerpt, getContent } from '../../data-layer/content'
import { type ImageData, imageData } from '../../data-layer/images'
import { ROOT } from '../../data-layer/paths'
import type { AshbyJobPostingNode, RoadmapCta, RoadmapNode } from '../../data-layer/types'
import { authorsFor, gitHistory } from '../content/people'

interface FrontmatterImage {
    publicURL: string
    childImageSharp?: { cloudName: string; publicId: string }
}

interface Nodes<T> {
    nodes: T[]
}

export interface PostBuildData {
    allRoadmap: Nodes<{
        title: string
        description: string | null
        date: string | null
        cta: RoadmapCta | null
        media: { data: { attributes: { url: string } } | null } | null
    }>
    allMDXPosts: Nodes<{
        parent: { relativePath: string }
        fields: { slug: string }
        frontmatter: {
            title: string | null
            date: string | null
            category: string | null
            tags: string[] | null
            authorData: { name: string; profile_id: number | null }[] | null
            featuredImage: { publicURL: string; childImageSharp: { gatsbyImageData: ImageData | null } | null } | null
            crosspost: string[] | null
            hideFromIndex: boolean | null
        }
        excerpt: string
    }>
    blog: Nodes<{
        fields: { slug: string }
        frontmatter: {
            title: string | null
            featuredImage: { publicURL: string } | null
            authorData:
                { name: string; role: string | null; profile: { avatar: { url: string } | null } | null }[] | null
        }
    }>
    docsHandbook: Nodes<{
        fields: { slug: string; contributors: { username: string; avatar: string | null }[] }
        frontmatter: {
            title: string | null
            description: string | null
            showTitle: boolean | null
            hideAnchor: boolean | null
            hideLastUpdated: boolean | null
            availability: { free: unknown; selfServe: unknown; enterprise: unknown } | null
        }
        parent: { fields: { lastUpdated: string | null } }
        timeToRead: number
        excerpt: string
    }>
    tutorials: Nodes<{ fields: { slug: string }; frontmatter: { featuredImage: { publicURL: string } | null } }>
    customers: Nodes<{
        fields: { slug: string }
        frontmatter: {
            featuredImage: { publicURL: string } | null
            logo: { publicURL: string } | null
            title: string | null
        }
    }>
    careers: Nodes<{
        title: string
        fields: { slug: string }
        parent: { customFields: { title: string; value: string | null }[] } | null
    }>
}

const matching = (pattern: RegExp) => getContent().filter((node) => pattern.test(node.fields.slug))
const fm = <T>(node: ContentNode, key: string): T | null => (node.frontmatter[key] as T | undefined) ?? null
const publicUrl = (image: unknown) => {
    const url = (image as FrontmatterImage | undefined)?.publicURL
    return url ? { publicURL: url } : null
}
const authors = (node: ContentNode) => {
    const list = authorsFor([node.frontmatter.author].flat().filter(Boolean))
    return list.length ? list : null
}
const relativeFile = (node: ContentNode) => path.relative(ROOT, node.fileAbsolutePath).split(path.sep).join('/')

export function postBuildData(): PostBuildData {
    const posts = matching(
        /^\/blog|^\/compare|^\/tutorials|^\/customers|^\/spotlight|^\/founders|^\/product-engineers|^\/features|^\/newsletter/
    ).filter((node) => node.frontmatter.date)

    const careers = nodes<AshbyJobPostingNode>('AshbyJobPosting')
        .filter((job) => job.isListed)
        .map((job) => ({
            title: job.title,
            fields: { slug: job.fields.slug },
            parent: job.parent
                ? {
                      customFields: (job.parent.customFields || [])
                          .filter(({ title }) => ['Timezone(s)', 'Salary'].includes(title))
                          .map(({ title, value }) => ({ title, value })),
                  }
                : null,
        }))

    return {
        allRoadmap: {
            nodes: nodes<RoadmapNode>('Roadmap')
                .filter((roadmap) => roadmap.complete !== false)
                .map((roadmap) => ({
                    title: roadmap.title,
                    description: roadmap.description,
                    date: roadmap.date,
                    cta: roadmap.cta ? { url: roadmap.cta.url, label: roadmap.cta.label } : null,
                    media: roadmap.media
                        ? {
                              data: roadmap.media.data
                                  ? { attributes: { url: roadmap.media.data.attributes.url } }
                                  : null,
                          }
                        : null,
                })),
        },
        allMDXPosts: {
            nodes: posts.map((node) => {
                const image = node.frontmatter.featuredImage as FrontmatterImage | undefined
                return {
                    parent: { relativePath: node.parent.relativePath },
                    fields: { slug: node.fields.slug },
                    frontmatter: {
                        title: fm<string>(node, 'title'),
                        date: fm<string>(node, 'date'),
                        category: fm<string>(node, 'category'),
                        tags: fm<string[]>(node, 'tags'),
                        authorData:
                            authors(node)?.map(({ name, profile_id }) => ({ name, profile_id: profile_id ?? null })) ??
                            null,
                        featuredImage: image?.publicURL
                            ? {
                                  publicURL: image.publicURL,
                                  childImageSharp: image.childImageSharp
                                      ? {
                                            gatsbyImageData: imageData(image.childImageSharp, {
                                                width: 650,
                                                height: 350,
                                            }),
                                        }
                                      : null,
                              }
                            : null,
                        crosspost: fm<string[]>(node, 'crosspost'),
                        hideFromIndex: fm<boolean>(node, 'hideFromIndex'),
                    },
                    excerpt: excerpt(node, 250),
                }
            }),
        },
        blog: {
            nodes: matching(/^\/blog|^\/spotlight|^\/founders|^\/product-engineers/).map((node) => ({
                fields: { slug: node.fields.slug },
                frontmatter: {
                    title: fm<string>(node, 'title'),
                    featuredImage: publicUrl(node.frontmatter.featuredImage),
                    authorData:
                        authors(node)?.map(({ name, role, profile }) => ({
                            name,
                            role: role ?? null,
                            profile: profile ? { avatar: profile.avatar } : null,
                        })) ?? null,
                },
            })),
        },
        docsHandbook: {
            nodes: matching(/^\/handbook|^\/docs/).map((node) => {
                const history = gitHistory(relativeFile(node))
                const availability = fm<Record<string, unknown>>(node, 'availability')
                return {
                    fields: {
                        slug: node.fields.slug,
                        contributors: history.contributors.map(({ username, avatar }) => ({
                            username,
                            avatar: avatar ?? null,
                        })),
                    },
                    frontmatter: {
                        title: fm<string>(node, 'title'),
                        description: fm<string>(node, 'description'),
                        showTitle: fm<boolean>(node, 'showTitle'),
                        hideAnchor: fm<boolean>(node, 'hideAnchor'),
                        hideLastUpdated: fm<boolean>(node, 'hideLastUpdated'),
                        availability: availability
                            ? {
                                  free: availability.free ?? null,
                                  selfServe: availability.selfServe ?? null,
                                  enterprise: availability.enterprise ?? null,
                              }
                            : null,
                    },
                    parent: {
                        fields: {
                            lastUpdated: history.lastUpdated ? dayjs(history.lastUpdated).format('MMM D, YYYY') : null,
                        },
                    },
                    timeToRead: node.timeToRead,
                    excerpt: excerpt(node, 500),
                }
            }),
        },
        tutorials: {
            nodes: matching(/^\/tutorials/).map((node) => ({
                fields: { slug: node.fields.slug },
                frontmatter: { featuredImage: publicUrl(node.frontmatter.featuredImage) },
            })),
        },
        customers: {
            nodes: matching(/^\/customers/).map((node) => ({
                fields: { slug: node.fields.slug },
                frontmatter: {
                    featuredImage: publicUrl(node.frontmatter.featuredImage),
                    logo: publicUrl(node.frontmatter.logo),
                    title: fm<string>(node, 'title'),
                },
            })),
        },
        careers: { nodes: careers },
    }
}
