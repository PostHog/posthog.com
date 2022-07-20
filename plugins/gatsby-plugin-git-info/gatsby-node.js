const path = require('path')
const glob = require('glob')
const git = require(`simple-git`)

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
                n: 1,
                format: {
                    file: path.resolve(process.cwd(), file),
                    date: `%ai`,
                    authorName: `%an`,
                    authorEmail: '%ae',
                },
            })
        })
    )

    commitLogs
        .filter((commits) => commits.total > 0)
        .forEach((commits) => {
            const { file, ...commit } = commits.latest
            latestCommits[file] = commit
        })
}

exports.onCreateNode = async function ({ node, actions }) {
    const { createNodeField } = actions

    if (node.internal.type !== `File`) return

    const latest = latestCommits[node.absolutePath]

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
