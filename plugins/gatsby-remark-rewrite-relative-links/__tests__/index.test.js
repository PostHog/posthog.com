const assert = require('assert')
const plugin = require('..')

const runPlugin = (nodeUrl, fileRelativePath, options = {}) => {
    const markdownAST = {
        type: 'root',
        children: [
            {
                type: 'paragraph',
                children: [
                    {
                        type: 'link',
                        url: nodeUrl,
                    },
                ],
            },
        ],
    }

    return runPluginWithAst(markdownAST, fileRelativePath, options)
}

const runPluginWithAst = (markdownAST, fileRelativePath, options = {}) => {
    const markdownNode = { parent: 'file-node' }

    const fileNode = {
        internal: { type: 'File' },
        sourceInstanceName: 'posthog-main-repo',
        relativePath: fileRelativePath,
    }

    plugin(
        {
            markdownAST,
            markdownNode,
            getNode: (id) => {
                if (id === 'file-node') {
                    return fileNode
                }

                return null
            },
        },
        options
    )

    return markdownAST
}

const options = {
    repoConfigs: {
        'posthog-main-repo': {
            urlPrefix: 'handbook/engineering',
        },
    },
}

const tests = [
    {
        name: 'converts relative link to absolute path with stripped extension',
        run: () => {
            const result = runPlugin('./other.md', 'docs/published/handbook/intro.md', options)
            const linkNode = result.children[0].children[0]
            assert.strictEqual(linkNode.url, '/handbook/engineering/docs/published/handbook/other')
        },
    },
    {
        name: 'converts relative .mdx link to absolute path',
        run: () => {
            const result = runPlugin('./component.mdx', 'docs/published/handbook/intro.md', options)
            const linkNode = result.children[0].children[0]
            assert.strictEqual(linkNode.url, '/handbook/engineering/docs/published/handbook/component')
        },
    },
    {
        name: 'preserves anchors when converting to absolute',
        run: () => {
            const result = runPlugin('../databases/schema.md#plan', 'docs/published/handbook/intro.md', options)
            const linkNode = result.children[0].children[0]
            assert.strictEqual(linkNode.url, '/handbook/engineering/docs/published/databases/schema#plan')
        },
    },
    {
        name: 'preserves query parameters when converting to absolute',
        run: () => {
            const result = runPlugin('./file.md?foo=bar', 'docs/published/handbook/intro.md', options)
            const linkNode = result.children[0].children[0]
            assert.strictEqual(linkNode.url, '/handbook/engineering/docs/published/handbook/file?foo=bar')
        },
    },
    {
        name: 'leaves non-markdown links untouched',
        run: () => {
            const result = runPlugin('../images/screenshot.png', 'docs/published/handbook/intro.md', options)
            const linkNode = result.children[0].children[0]
            assert.strictEqual(linkNode.url, '../images/screenshot.png')
        },
    },
    {
        name: 'ignores links with protocols',
        run: () => {
            const result = runPlugin('https://example.com', 'docs/published/handbook/intro.md', options)
            const linkNode = result.children[0].children[0]
            assert.strictEqual(linkNode.url, 'https://example.com')
        },
    },
    {
        name: 'ignores absolute paths',
        run: () => {
            const result = runPlugin('/docs/user-guide', 'docs/published/handbook/intro.md', options)
            const linkNode = result.children[0].children[0]
            assert.strictEqual(linkNode.url, '/docs/user-guide')
        },
    },
    {
        name: 'normalizes posthog.com URLs to relative paths',
        run: () => {
            const result = runPlugin('https://posthog.com/docs/posthog-ai', 'docs/published/handbook/intro.md', options)
            const linkNode = result.children[0].children[0]
            assert.strictEqual(linkNode.url, '/docs/posthog-ai')
        },
    },
    {
        name: 'normalizes http posthog.com URLs',
        run: () => {
            const result = runPlugin('http://posthog.com/teams/data', 'docs/published/handbook/intro.md', options)
            const linkNode = result.children[0].children[0]
            assert.strictEqual(linkNode.url, '/teams/data')
        },
    },
    {
        name: 'preserves query params and anchors when normalizing posthog.com URLs',
        run: () => {
            const result = runPlugin(
                'https://posthog.com/blog/post?utm_source=docs#section',
                'docs/published/handbook/intro.md',
                options
            )
            const linkNode = result.children[0].children[0]
            assert.strictEqual(linkNode.url, '/blog/post?utm_source=docs#section')
        },
    },
    {
        name: 'handles reference-style definitions',
        run: () => {
            const ast = {
                type: 'root',
                children: [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                type: 'linkReference',
                                identifier: 'schema',
                                label: 'schema',
                                referenceType: 'shortcut',
                            },
                        ],
                    },
                    {
                        type: 'definition',
                        identifier: 'schema',
                        url: '../databases/schema.md#plan',
                    },
                ],
            }

            const result = runPluginWithAst(ast, 'docs/published/handbook/intro.md', options)

            const definitionNode = result.children.find((child) => child.type === 'definition')

            assert.strictEqual(definitionNode.url, '/handbook/engineering/docs/published/databases/schema#plan')
        },
    },
]

tests.forEach(({ name, run }) => {
    try {
        run()
        console.log(`✔ ${name}`)
    } catch (error) {
        console.error(`✖ ${name}`)
        throw error
    }
})

console.log(`\n${tests.length} tests passed`)
