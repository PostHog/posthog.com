/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const fetch = require('node-fetch')

let DEBUG = false

const log = (...args) => {
    if (DEBUG) {
        console.log.apply(null, args)
    }
}

/** Return date (without time) in ISO format. */
const formatDate = (date) => {
    return date.toISOString().slice(0, 10)
}

const redirectText = (from, to) => {
    return `
[[redirects]]
    from = "${from}"
    to = "${to}"
`
}

const redirectWithDateCommentText = (date, redirect) => {
    return `

# Added: ${formatDate(date)}${redirect}`
}

// Rules
const samePath = ({ fromPath, toPath }) => {
    return fromPath === toPath
}

const mdToMdx = ({ fromPath, toPath }) => {
    // # old rule
    // # return '.mdx' not in from_paths[i] and '.mdx' in to_paths[i]
    return fromPath.endsWith('.md') && toPath.endsWith('.mdx')
}

const redirectExists = ({ redirect, localConfig, remoteConfig }) => {
    return localConfig.indexOf(redirect.trim()) !== -1 || remoteConfig.indexOf(redirect.trim()) !== -1
}

const fromDotStar = ({ fromPath }) => {
    return fromPath == '(.*)'
}

const isSnippetsRename = ({ fromPath, toPath }) => {
    return fromPath.indexOf('/snippets/') !== -1 || toPath.indexOf('/snippets') !== -1
}

const skipRules = {
    samePath,
    mdToMdx,
    redirectExists,
    fromDotStar,
    isSnippetsRename,
}

// # Load existing remote redirect config
const getRemoteConfig = async () => {
    const response = await fetch('https://raw.githubusercontent.com/PostHog/posthog.com/master/netlify.toml')
    return await response.text()
}

// # Load existing redirect file to be used to avoid duplicates
const getLocalConfig = async () => {
    return await fs.promises.readFile('./netlify.toml', 'utf8')
}

const appendToLocalConfig = async (newRedirects) => {
    await fs.promises.appendFile('./netlify.toml', newRedirects)
}

const getRedirects = async ({ gitDiff, localConfig, remoteConfig, debug = false }) => {
    DEBUG = debug
    log(gitDiff)

    const renameFromRegex = new RegExp('rename from contents(.*).md', 'g')
    const renameToRegex = new RegExp('rename to contents(.*).md', 'g')

    const fromPaths = Array.from(gitDiff.matchAll(renameFromRegex), (m) => m[1])
    const toPaths = Array.from(gitDiff.matchAll(renameToRegex), (m) => m[1])

    log(fromPaths, toPaths)

    const newRedirects = []
    if (fromPaths.length > 0 && fromPaths.length === toPaths.length) {
        for (let i = 0; i < fromPaths.length; ++i) {
            // handle index default directory files. /path/index will become /path
            const fromPath = fromPaths[i].replace(/\/index$/, '', fromPaths[i])
            const toPath = toPaths[i].replace(/\/index$/, '', toPaths[i])

            const redirect = redirectText(fromPath, toPath)
            // console.log(redirect)

            log(`Testing if redirects are required for: "${fromPath}" to "${toPath}"`)

            let skipRedirect = false
            for (const [skipRuleName, skipRuleFunction] of Object.entries(skipRules)) {
                if (skipRedirect === false) {
                    skipRedirect = skipRuleFunction({ fromPath, toPath, redirect, localConfig, remoteConfig })
                    log(`Rule: "${skipRuleName}"', 'skipRedirect?', ${skipRedirect}`)
                }
            }

            if (skipRedirect === false) {
                newRedirects.push(redirectWithDateCommentText(new Date(), redirect))
            } else {
                log('Not including redirect', redirect)
            }
        }
    } else {
        log('No path changes found')
    }

    return newRedirects
}

const main = async () => {
    try {
        const gitDiff = await fs.promises.readFile('./pr_diff', 'utf8')

        const remoteConfig = await getRemoteConfig()
        const localConfig = await getLocalConfig()
        const debug = process.env.DEBUG
        const redirects = await getRedirects({ gitDiff, localConfig, remoteConfig, debug })

        if (redirects.length > 0) {
            log('Writing', redirects)
            await appendToLocalConfig(redirects.join(''))
        }
    } catch (error) {
        console.error(error)
    }
}

if (process.env.RUN_AS_SCRIPT === 'true') {
    main()
}

module.exports = {
    getRedirects,
}
