const path = require('path')
const glob = require('glob')
const git = require(`simple-git`)
const uniqBy = require('lodash.uniqby')
const fetch = require('node-fetch')
const getGravatar = require('gravatar')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const latestCommits = {}

exports.onPreInit = async function (_, options) {
    const files = await new Promise((res, rej) => {
        glob(options.match || '**/*', { nosort: true, nodir: true }, (error, matches) => {
            if (error) {
                rej(error)
            }

            res(matches)
        })
    })

    const gitRepo = git(process.cwd())
    const commitLogs = await Promise.all(
        files.map((file) => {
            return gitRepo.log({
                file,
                n: 5,
                format: {
                    file: path.resolve(process.cwd(), file),
                    date: `%ai`,
                    authorName: `%an`,
                    authorEmail: '%ae',
                },
            })
        })
    )

    commitLogs.forEach((commits) => {
        if (commits.total > 0) {
            const { file } = commits.latest
            latestCommits[file] = commits
        }
    })
}

exports.onCreateNode = async function ({ node, actions, getNode, store, cache, createNodeId }) {
    const { createNodeField, createNode } = actions

    if (node.internal.type === `File`) {
        const commits = latestCommits[node.absolutePath]
        const latest = commits?.latest
        if (!latest) return

        createNodeField({
            node,
            name: 'gitLogLatestAuthorName',
            value: latest.authorName,
        })
        createNodeField({
            node,
            name: 'gitLogLatestAuthorEmail',
            value: latest.authorEmail,
        })
        createNodeField({
            node,
            name: 'gitLogLatestDate',
            value: latest.date,
        })
    }

    if (node.internal.type === `Mdx`) {
        const parent = getNode(node.parent)
        const commits = latestCommits[parent.absolutePath]
        const all = commits?.all
        if (!all) return

        const contributorsNode = await Promise.all(
            uniqBy(all, (contributor) => contributor.authorEmail).map(async (contributor) => {
                const { authorName, authorEmail } = contributor
                let avatar
                const gravatar = getGravatar.url(authorEmail)
                avatar = await fetch(`https:${gravatar}?d=404`)
                    .then((res) => (res.ok && `https:${gravatar}`) || '')
                    .catch((err) => console.error(err))
                const fileNode =
                    avatar &&
                    (await createRemoteFileNode({
                        url: avatar,
                        parentNodeId: node.id,
                        createNode,
                        createNodeId,
                        cache,
                        store,
                    }))
                return {
                    avatar___NODE: fileNode && fileNode.id,
                    url: null,
                    username: authorName,
                }
            })
        )

        createNodeField({
            node,
            name: `contributors`,
            value: contributorsNode,
        })
    }
}
