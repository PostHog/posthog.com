const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')
const vm = require('node:vm')
const ts = require('typescript')

test('Gatsby sources Squeak directly when configured, with a public-host fallback', async () => {
    const source = ts.createSourceFile(
        'sourceNodes.ts',
        fs.readFileSync(path.join(__dirname, '../gatsby/sourceNodes.ts'), 'utf8'),
        ts.ScriptTarget.Latest,
        true
    )
    const declarations = (statements) =>
        statements.filter(ts.isVariableStatement).flatMap((s) => [...s.declarationList.declarations])
    const hook = declarations(source.statements).find((d) => d.name.getText(source) === 'sourceNodes')
    const readers = ['createRoadmapItems', 'fetchAchievements', 'fetchAchievementGroups', 'fetchRewards']
    const selected = declarations(hook.initializer.body.statements).filter((d) =>
        ['squeakSourceHost', ...readers].includes(d.name.getText(source))
    )
    assert.equal(selected.length, 5)
    const code = selected.map((d) => `const ${d.getText(source)};`).join('\n')
    for (const direct of [undefined, 'http://127.0.0.1:1337']) {
        const env = { GATSBY_SQUEAK_API_HOST: 'https://squeak.example', SQUEAK_SOURCE_HOST: direct }
        const nodes = []
        const requests = []
        await vm.runInNewContext(
            `(async () => { ${code}\n await Promise.all([${readers.map((name) => `${name}()`).join(',')}]) })()`,
            {
                process: { env },
                qs: require('qs'),
                dayjs: require('dayjs'),
                createNode: (node) => nodes.push(node),
                createNodeId: (id) => id,
                createContentDigest: () => 'test',
                fetch: async (address) => {
                    const url = new URL(address)
                    requests.push(url)
                    const page = Number(url.searchParams.get('pagination[page]') || 1)
                    const attributes = {
                        complete: true,
                        dateCompleted: '2026-10-01',
                        title: 'Test',
                        topic: { data: { attributes: { label: 'Analytics' } } },
                        teams: { data: [{ attributes: { name: 'Test team' } }] },
                        achievements: { data: [{ id: 1 }] },
                    }
                    return {
                        json: async () => ({
                            data:
                                url.pathname === '/api/points/rewards'
                                    ? [{ handle: 'test-reward' }]
                                    : [{ id: page, attributes }],
                            meta: { pagination: { page, pageCount: 2 } },
                        }),
                    }
                },
            }
        )
        assert.ok(requests.every((url) => url.origin === (direct || env.GATSBY_SQUEAK_API_HOST)))
        assert.equal(requests.filter((url) => url.pathname === '/api/roadmaps').length, 2)
        assert.equal(nodes.filter((node) => node.internal.type === 'Roadmap').length, 2)
        const roadmap = nodes.find((node) => node.internal.type === 'Roadmap')
        assert.equal(roadmap.complete, true)
        assert.equal(roadmap.date, '2026-10-01')
        assert.equal(roadmap.topic.data.attributes.label, 'Analytics')
        assert.equal(roadmap.teams.data[0].attributes.name, 'Test team')
        assert.ok(nodes.some((node) => node.internal.type === 'Achievement'))
        assert.ok(nodes.some((node) => node.internal.type === 'Reward'))
        assert.ok(nodes.find((node) => node.internal.type === 'AchievementGroup').achievements.data.length)
        const module = { exports: {} }
        const load = require('node:module').createRequire(path.resolve(__dirname, '../gatsby-config.js'))
        vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../gatsby-config.js'), 'utf8'), {
            module,
            process: { env },
            __dirname: path.resolve(__dirname, '..'),
            require: Object.assign(
                (name) =>
                    name === 'dotenv' ? { config: () => {} } : name === './gatsby/algoliaConfig' ? {} : load(name),
                { resolve: load.resolve }
            ),
        })
        assert.equal(
            module.exports.plugins.find((plugin) => plugin.resolve === 'gatsby-source-squeak').options.apiHost,
            direct || env.GATSBY_SQUEAK_API_HOST
        )
        assert.equal(env.GATSBY_SQUEAK_API_HOST, 'https://squeak.example', 'The browser address is unchanged')
    }
})
