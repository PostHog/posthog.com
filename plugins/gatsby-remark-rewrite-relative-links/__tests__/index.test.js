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
            stripPrefix: '/docs/published/',
            pathPrefix: '/handbook/engineering',
        },
    },
}

const tests = [
    {
        name: 'rewrites simple sibling links',
        run: () => {
            const result = runPlugin('other.md', 'docs/published/handbook/intro.md', options)
            const linkNode = result.children[0].children[0]
            assert.strictEqual(linkNode.url, '/handbook/engineering/handbook/other')
        },
    },
    {
        name: 'rewrites parent directory links with anchors',
        run: () => {
            const result = runPlugin(
                '../databases/schema-changes.md#plan',
                'docs/published/handbook/architecture/overview.md',
                options
            )
            const linkNode = result.children[0].children[0]
            assert.strictEqual(linkNode.url, '/handbook/engineering/handbook/databases/schema-changes#plan')
        },
    },
    {
        name: 'normalises README files to directory paths',
        run: () => {
            const result = runPlugin('./README.md', 'docs/published/handbook/architecture/overview.md', options)
            const linkNode = result.children[0].children[0]
            assert.strictEqual(linkNode.url, '/handbook/engineering/handbook/architecture')
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
            const result = runPlugin('https://posthog.com', 'docs/published/handbook/intro.md', options)
            const linkNode = result.children[0].children[0]
            assert.strictEqual(linkNode.url, 'https://posthog.com')
        },
    },
    {
        name: 'ignores files outside configured prefix',
        run: () => {
            const result = runPlugin('../../README.md', 'docs/published/handbook/architecture/overview.md', {
                repoConfigs: {
                    'posthog-main-repo': {
                        stripPrefix: '/docs/published/engineering/',
                        pathPrefix: '/handbook/engineering',
                    },
                },
            })
            const linkNode = result.children[0].children[0]
            assert.strictEqual(linkNode.url, '../../README.md')
        },
    },
    {
        name: 'rewrites reference-style definitions',
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
                        url: '../databases/schema-changes.md#plan',
                    },
                ],
            }

            const result = runPluginWithAst(ast, 'docs/published/handbook/architecture/overview.md', options)

            const definitionNode = result.children.find((child) => child.type === 'definition')

            assert.strictEqual(definitionNode.url, '/handbook/engineering/handbook/databases/schema-changes#plan')
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
