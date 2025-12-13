const plugin = require('./index.js')

// Test case: relative link
const testRelative = () => {
    const ast = {
        type: 'root',
        children: [
            {
                type: 'paragraph',
                children: [{ type: 'link', url: './architecture.md' }],
            },
        ],
    }

    const markdownNode = { parent: 'file-1' }
    const fileNode = {
        internal: { type: 'File' },
        sourceInstanceName: 'posthog-main-repo',
        relativePath: 'docs/published/ai/ai-platform.md',
    }

    plugin(
        {
            markdownAST: ast,
            markdownNode,
            getNode: (id) => (id === 'file-1' ? fileNode : null),
        },
        {
            repoConfigs: {
                'posthog-main-repo': {
                    stripPrefix: '/docs/published/',
                    pathPrefix: '/handbook/engineering',
                },
            },
        }
    )

    console.log('Relative link test:')
    console.log('  Input:  ./architecture.md')
    console.log('  Output:', ast.children[0].children[0].url)
    console.log('  Expected: /handbook/engineering/ai/architecture')
    console.log()
}

// Test case: absolute path (should be ignored)
const testAbsolute = () => {
    const ast = {
        type: 'root',
        children: [
            {
                type: 'paragraph',
                children: [{ type: 'link', url: '/handbook/engineering/ai/architecture' }],
            },
        ],
    }

    const markdownNode = { parent: 'file-1' }
    const fileNode = {
        internal: { type: 'File' },
        sourceInstanceName: 'posthog-main-repo',
        relativePath: 'docs/published/ai/ai-platform.md',
    }

    plugin(
        {
            markdownAST: ast,
            markdownNode,
            getNode: (id) => (id === 'file-1' ? fileNode : null),
        },
        {
            repoConfigs: {
                'posthog-main-repo': {
                    stripPrefix: '/docs/published/',
                    pathPrefix: '/handbook/engineering',
                },
            },
        }
    )

    console.log('Absolute path test:')
    console.log('  Input:  /handbook/engineering/ai/architecture')
    console.log('  Output:', ast.children[0].children[0].url)
    console.log('  Expected: /handbook/engineering/ai/architecture (unchanged)')
    console.log()
}

testRelative()
testAbsolute()
