/* eslint-disable @typescript-eslint/no-var-requires */
const getRedirects = require('./safe_rename').getRedirects

const debug = false

const singleRenameGitDiff = `
rename from contents/docs/one.md
rename to contents/docs/two.md`

const multiRenameGitDiff = `
rename from contents/docs/one.md
rename to contents/docs/two.md

rename from contents/docs/cheese.md
rename to contents/docs/mushroom.md

rename from contents/docs/fish.md
rename to contents/docs/monkey.md`

const emptyConfig = ``
const existingRedirectConfig = `
# Added: 2021-08-03
[[redirects]]
    from = "/docs/one"
    to = "/docs/two"`

test('redirect will be added for single file rename', async () => {
    const gitDiff = singleRenameGitDiff

    const localConfig = emptyConfig
    const remoteConfig = emptyConfig

    const redirects = await getRedirects({ gitDiff, localConfig, remoteConfig, debug })

    expect(redirects.length).toBe(1)
    expect(redirects[0]).toContain('from = "/docs/one"')
    expect(redirects[0]).toContain('to = "/docs/two"')
})

test('redirect will be added for multi file rename', async () => {
    const gitDiff = multiRenameGitDiff

    const localConfig = emptyConfig
    const remoteConfig = emptyConfig

    const redirects = await getRedirects({ gitDiff, localConfig, remoteConfig, debug })

    expect(redirects.length).toBe(3)
    expect(redirects[0]).toContain('from = "/docs/one"')
    expect(redirects[0]).toContain('to = "/docs/two"')
    expect(redirects[1]).toContain('from = "/docs/cheese"')
    expect(redirects[1]).toContain('to = "/docs/mushroom"')
    expect(redirects[2]).toContain('from = "/docs/fish"')
    expect(redirects[2]).toContain('to = "/docs/monkey"')
})

test('redirect will only be added for non-existing redirects in multi file rename', async () => {
    const gitDiff = multiRenameGitDiff

    const localConfig = emptyConfig
    const remoteConfig = existingRedirectConfig

    const redirects = await getRedirects({ gitDiff, localConfig, remoteConfig, debug })

    expect(redirects.length).toBe(2)
    expect(redirects[0]).toContain('from = "/docs/cheese"')
    expect(redirects[0]).toContain('to = "/docs/mushroom"')
    expect(redirects[1]).toContain('from = "/docs/fish"')
    expect(redirects[1]).toContain('to = "/docs/monkey"')
})

test('redirect will not be added if it already exists in the remote config', async () => {
    const gitDiff = singleRenameGitDiff

    const localConfig = emptyConfig
    const remoteConfig = existingRedirectConfig

    const redirects = await getRedirects({ gitDiff, localConfig, remoteConfig, debug })

    expect(redirects.length).toBe(0)
})

test('redirect will not be added if it already exists in the local config', async () => {
    const gitDiff = singleRenameGitDiff

    const localConfig = existingRedirectConfig
    const remoteConfig = emptyConfig

    const redirects = await getRedirects({ gitDiff, localConfig, remoteConfig, debug })

    expect(redirects.length).toBe(0)
})

test('redirect will not be added if rename from /name to /name/index.mdx', async () => {
    const gitDiff = `
    rename from contents/docs/filename
    rename to contents/docs/name/index.mdx`

    const localConfig = emptyConfig
    const remoteConfig = emptyConfig

    const redirects = await getRedirects({ gitDiff, localConfig, remoteConfig, debug })

    expect(redirects.length).toBe(0)
})

test('redirect will not be added if rename from /name to /name/index.md', async () => {
    const gitDiff = `
    rename from contents/docs/name
    rename to contents/docs/name/index.md`

    const localConfig = emptyConfig
    const remoteConfig = emptyConfig

    const redirects = await getRedirects({ gitDiff, localConfig, remoteConfig, debug })

    expect(redirects.length).toBe(0)
})

test('redirect will not be added if rename from .md to .mdx', async () => {
    const gitDiff = `
    rename from contents/docs/filename.md
    rename to contents/docs/filename.mdx`

    const localConfig = emptyConfig
    const remoteConfig = emptyConfig

    const redirects = await getRedirects({ gitDiff, localConfig, remoteConfig, debug })

    expect(redirects.length).toBe(0)
})

test('redirect will not be added when renaming snippets', async () => {
    const gitDiff = `
    rename from contents/docs/snippets/js/capture.mdx
    rename to contents/docs/snippets/js/special-capture.mdx`

    const localConfig = emptyConfig
    const remoteConfig = emptyConfig

    const redirects = await getRedirects({ gitDiff, localConfig, remoteConfig, debug })

    expect(redirects.length).toBe(0)
})
