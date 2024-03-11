import chromium from 'chrome-aws-lambda'
import path from 'path'
import fs from 'fs'
import blogTemplate from '../src/templates/OG/blog.js'
import docsHandbookTemplate from '../src/templates/OG/docs-handbook.js'
import customerTemplate from '../src/templates/OG/customer.js'
import careersTemplate from '../src/templates/OG/careers.js'
import tutorialTemplate from '../src/templates/OG/tutorial.js'
import jobTemplate from '../src/templates/OG/job.js'
import { flattenMenu } from './utils'
import fetch from 'node-fetch'
import { GatsbyNode } from 'gatsby'
import pLimit from 'p-limit'
import qs from 'qs'
import dayjs from 'dayjs'
import slugify from 'slugify'
import { docsMenu, handbookSidebar } from '../src/navs/index.js'

const limit = pLimit(10)

const createOrUpdateStrapiPosts = async (posts, roadmaps) => {
    const apiHost = process.env.GATSBY_SQUEAK_API_HOST

    let allExistingStrapiPosts = []
    let allStrapiPostCategories = []

    const getAllStrapiPosts = async (page = 1) => {
        const query = qs.stringify({
            pagination: {
                page,
                pageSize: 100,
            },
            fields: ['id', 'path'],
        })

        const posts = await fetch(`${apiHost}/api/posts?${query}`).then((res) => res.json())
        if (posts.data) {
            allExistingStrapiPosts = [...allExistingStrapiPosts, ...posts.data]
        }
        if (posts?.meta?.pagination.page < posts?.meta?.pagination.pageCount) {
            await getAllStrapiPosts(page + 1)
        }
    }

    const getAllStrapiPostCategories = async (page = 1) => {
        const query = qs.stringify({
            pagination: {
                page,
                pageSize: 100,
            },
            fields: ['id', 'folder', 'label', 'post_tags'],
            populate: ['post_tags'],
        })

        const categories = await fetch(`${apiHost}/api/post-categories?${query}`).then((res) => res.json())
        if (categories.data) {
            allStrapiPostCategories = [...allStrapiPostCategories, ...categories.data]
        }
        if (categories?.meta?.pagination.page < categories?.meta?.pagination.pageCount) {
            await getAllStrapiPostCategories(page + 1)
        }
    }

    const createOrUpdateStrapiPost = async (data, id) => {
        const body = JSON.stringify({ data })
        return fetch(`${apiHost}/api/posts${id ? `/${id}` : ''}`, {
            method: id ? 'PUT' : 'POST',
            body,
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
                'content-type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then(({ error }) => {
                if (error) {
                    console.error(error, data?.path)
                }
            })
            .catch((err) => console.error(err))
    }

    const createTag = async (tag, category) => {
        const label = tag.charAt(0).toUpperCase() + tag.slice(1)
        console.log(`creating tag: ${label}`)
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
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
                'content-type': 'application/json',
            },
        })
            .then((res) => res.json())
            .catch((err) => console.error(err))
        category?.attributes?.post_tags?.data?.push(data)

        return data
    }

    const createCategory = async (folder) => {
        const label = (folder.charAt(0).toUpperCase() + folder.slice(1)).replaceAll('-', ' ')
        console.log(`creating category: ${label}`)
        const body = JSON.stringify({
            data: {
                label,
                folder,
            },
        })
        const { data } = await fetch(`${apiHost}/api/post-categories?populate=*`, {
            method: 'POST',
            body,
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
                'content-type': 'application/json',
            },
        })
            .then((res) => res.json())
            .catch((err) => console.error(err))
        allStrapiPostCategories.push(data)
        return allStrapiPostCategories.find((category) => category === data)
    }

    await getAllStrapiPosts()
    await getAllStrapiPostCategories()
    const postPromises: Promise<any>[] = []
    for (const {
        frontmatter: { title, date, featuredImage, authorData, category: postTag, tags: postTags, crosspost },
        fields: { slug },
        parent: { relativePath: path },
        rawBody,
        excerpt,
    } of posts) {
        const existingPost = allExistingStrapiPosts.find((post) => post?.attributes?.path === path)
        const category =
            allStrapiPostCategories.find((category) => category?.attributes?.folder === path.split('/')[0]) ||
            (await createCategory(path.split('/')[0]))

        let tags = []
        for (const tagLabel of postTag?.toLowerCase() ? [postTag.toLowerCase()] : postTags || []) {
            let tag = category?.attributes?.post_tags?.data?.find(
                (tag) => tag?.attributes?.label?.toLowerCase() === tagLabel?.toLowerCase()
            )
            if (!tag) {
                tag = await createTag(tagLabel, category)
            }
            tags.push(tag)
        }
        const authorIDs = authorData?.map(({ profile_id }) => profile_id)?.filter((id) => id) || []
        const data = {
            slug,
            path,
            title,
            date,
            featuredImage: {
                url: featuredImage?.childImageSharp?.gatsbyImageData?.images?.fallback?.src,
            },
            body: rawBody,
            excerpt,
            authors: {
                connect: authorIDs,
            },
            ...(category
                ? {
                      post_category: {
                          connect: [category.id],
                      },
                  }
                : null),
            ...(tags?.length > 0
                ? {
                      post_tags: {
                          connect: tags.map((tag) => tag.id),
                      },
                  }
                : null),
            ...(crosspost?.length > 0
                ? {
                      crosspost_categories: {
                          connect: crosspost.map(
                              (crosspostCategory) =>
                                  allStrapiPostCategories.find(
                                      (category) => category?.attributes?.label === crosspostCategory
                                  )?.id
                          ),
                      },
                  }
                : null),
        }
        postPromises.push(limit(() => createOrUpdateStrapiPost(data, existingPost?.id)))
    }
    await Promise.all(postPromises)
    await Promise.all(
        roadmaps.map(({ title, date: roadmapDate, media, description, cta }) => {
            const slug = slugify(title, { lower: true })
            const date = dayjs(roadmapDate)
            const year = date.format('YYYY')
            const path = `changelog/${year}/${slug}.mdx`
            const existingPost = allExistingStrapiPosts.find((post) => post?.attributes?.path === path)
            const category = allStrapiPostCategories.find((category) => category?.attributes?.folder === 'changelog')
            const data = {
                slug: `/changelog/${year}/${slug}`,
                path,
                title,
                date: date.toISOString(),
                featuredImage: {
                    url: media?.data?.attributes?.url,
                },
                body: description,
                CTA: {
                    label: cta?.label,
                    url: cta?.url,
                },
                ...(category
                    ? {
                          post_category: {
                              connect: [category.id],
                          },
                      }
                    : null),
            }

            return limit(() => createOrUpdateStrapiPost(data, existingPost?.id))
        })
    )
}

export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ graphql }) => {}
