/**
 * Offline tests for the docs eval runner: eval file validation, selection, prompts
 * and the Gauge spec. Nothing here calls Gauge or the network.
 *
 * Run: pnpm test:evals
 */
import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { toGaugeSpecs, toSessionResults } from './gauge/send-to-gauge.ts'
import { definitionFor, groupByName, isCurrent, type SavedEval } from './gauge/saved-evals.ts'
import { appendDocs, buildPrompts, checkKey, checkName, type CheckPrompt } from './build-eval-prompts.ts'
import { cantRunReason, changedSelection, duplicateKeys, parseArgs, select, sessionsFor, setupOf } from './run.ts'
import {
    loadEvalFiles,
    loadShared,
    pageForEvalFile,
    pageForSourceFile,
    pageIndex,
    parseEvalFile,
    type EvalFile,
} from './load-eval-files.ts'

const shared = loadShared()
const gaugeHarnesses = new Map([
    ['claude-code', 'CLAUDE_CODE'],
    ['codex', 'CODEX_CLI'],
])
const everyPage = () => true
const parse = (path: string, raw: unknown) => parseEvalFile(path, raw, shared, everyPage)
const messages = (path: string, raw: unknown) => parse(path, raw).problems.map((p) => p.message)

const answerOnly = {
    checks: [
        {
            id: 'ask',
            prompt: 'How do I do the thing?',
            criteria: { shared: ['docs-read'], rubrics: { 'names-the-button': 'It names the button.' } },
        },
    ],
}

describe('eval file paths', () => {
    test('a flat page and a folder page map to the slug Gatsby builds', () => {
        assert.equal(
            pageForEvalFile('contents/docs/product-analytics/identify.eval.yaml'),
            'docs/product-analytics/identify'
        )
        assert.equal(
            pageForEvalFile('contents/docs/product-analytics/installation/index.eval.yaml'),
            'docs/product-analytics/installation'
        )
        assert.equal(pageForEvalFile('evals/e2e-evals/pick-an-sdk.eval.yaml'), null)
    })

    test('changed source files map to pages, snippets do not', () => {
        assert.equal(
            pageForSourceFile('contents/docs/product-analytics/identify.mdx'),
            'docs/product-analytics/identify'
        )
        assert.equal(
            pageForSourceFile('contents/docs/product-analytics/installation/index.mdx'),
            'docs/product-analytics/installation'
        )
        assert.equal(pageForSourceFile('contents/docs/product-analytics/_snippets/thing.mdx'), null)
    })

    test('a changed snippet selects the pages that import it', () => {
        const { files } = loadEvalFiles(shared)
        const keys = changedSelection(files, [
            'contents/docs/product-analytics/installation/_snippets/pa-installation-wrapper.tsx',
        ])
        assert.ok(keys.has('contents/docs/product-analytics/installation/go.eval.yaml#install'))
        assert.equal(changedSelection(files, ['contents/docs/product-analytics/_snippets/nothing.mdx']).size, 0)
    })

    test('two checks that make the same key are reported', () => {
        const react = fileFor('contents/docs/product-analytics/installation/react.eval.yaml', {
            checks: [{ ...answerOnly.checks[0], id: 'native-install' }],
        })
        const native = fileFor('contents/docs/product-analytics/installation/react-native.eval.yaml', {
            checks: [{ ...answerOnly.checks[0], id: 'install' }],
        })
        assert.equal(duplicateKeys([react, native]).length, 1)
        assert.deepEqual(duplicateKeys(loadEvalFiles(shared).files), [])
    })
})

describe('eval file validation', () => {
    test('every eval file in the repo is valid', () => {
        const { files, problems } = loadEvalFiles(shared)
        assert.deepEqual(problems, [])
        assert.ok(files.length > 0)
    })

    test('a minimal answer-only file passes', () => {
        assert.deepEqual(messages('contents/docs/a.eval.yaml', answerOnly), [])
    })

    test('unknown keys, bad ids and missing prompts are reported', () => {
        const found = messages('contents/docs/a.eval.yaml', {
            version: 2,
            checks: [{ id: 'Bad_Id', criteria: { rubrics: { ok: 'fine' } }, sampleCount: 3 }],
        })
        assert.ok(found.includes('unknown key "version"'))
        assert.ok(found.some((m) => m.includes('id must be kebab-case')))
        assert.ok(found.some((m) => m.includes('prompt is required')))
        assert.ok(found.some((m) => m.includes('unknown key "sampleCount"')))
    })

    test('criteria takes only shared and rubrics', () => {
        const found = messages('contents/docs/a.eval.yaml', {
            checks: [{ id: 'x', prompt: 'p', criteria: { use: ['builds'], 'my-rubric': 'text' } }],
        })
        assert.ok(found.some((m) => m.includes('unknown key "criteria.use"')))
        assert.ok(found.some((m) => m.includes('unknown key "criteria.my-rubric"')))
        assert.ok(found.some((m) => m.includes('criteria needs at least one')))
    })

    test('shared criteria and codebases must exist', () => {
        const found = messages('contents/docs/a.eval.yaml', {
            checks: [{ id: 'x', prompt: 'p', codebase_to_test: 'nope', criteria: { shared: ['nope'] } }],
        })
        assert.ok(found.some((m) => m.includes('no codebase "nope"')))
        assert.ok(found.some((m) => m.includes('no shared criterion "nope"')))
    })

    test('{folder} needs a codebase', () => {
        const found = messages('contents/docs/a.eval.yaml', {
            checks: [{ id: 'x', prompt: 'Change {folder}/', criteria: { rubrics: { c: 'ok' } } }],
        })
        assert.ok(found.some((m) => m.includes('{folder} needs a codebase')))
    })

    test('a check reads at most four pages', () => {
        const pages = ['docs/b', 'docs/c', 'docs/d', 'docs/e']
        const found = messages('contents/docs/a.eval.yaml', {
            ...answerOnly,
            checks: [{ ...answerOnly.checks[0], pages }],
        })
        assert.ok(found.some((m) => m.includes('the limit is 4')))
    })

    test('an e2e file in a subfolder gets the subfolder in its check key', () => {
        const file = fileFor('evals/e2e-evals/product-analytics/e2e.eval.yaml', {
            ...answerOnly,
            owner: 'product-analytics',
            pages: ['docs/product-analytics/identify'],
        })
        assert.equal(checkKey(file, file.checks[0]), 'e2e-product-analytics-e2e-ask')
    })

    test('files in e2e-evals need an owner and pages, and may read up to 8 pages', () => {
        const found = messages('evals/e2e-evals/j.eval.yaml', answerOnly)
        assert.ok(found.includes('files in evals/e2e-evals/ need an owner'))
        assert.ok(found.includes('files in evals/e2e-evals/ need at least one page in pages'))
        const eight = ['docs/a', 'docs/b', 'docs/c', 'docs/d', 'docs/e', 'docs/f', 'docs/g', 'docs/h']
        assert.deepEqual(messages('evals/e2e-evals/j.eval.yaml', { ...answerOnly, owner: 'docs', pages: eight }), [])
        const nine = messages('evals/e2e-evals/j.eval.yaml', {
            owner: 'docs',
            pages: eight,
            checks: [{ ...answerOnly.checks[0], pages: ['docs/i'] }],
        })
        assert.ok(nine.some((m) => m.includes('9 pages; the limit is 8')))
    })

    test('a listed page that does not exist fails', () => {
        const result = parseEvalFile(
            'contents/docs/a.eval.yaml',
            { ...answerOnly, checks: [{ ...answerOnly.checks[0], pages: ['docs/gone'] }] },
            shared,
            (page) => page !== 'docs/gone'
        )
        assert.ok(result.problems.some((p) => p.message.includes('no page at contents/docs/gone')))
    })
})

describe('what a check attaches', () => {
    const check = (keys: Record<string, unknown>) => ({ checks: [{ ...answerOnly.checks[0], ...keys }] })

    test('the four keys pass alone and together', () => {
        assert.deepEqual(
            messages(
                'contents/docs/a.eval.yaml',
                check({ append_docs_link: true, append_docs_content: true, attach_mcp: 'posthog', attach_skill: true })
            ),
            []
        )
    })

    test('arms is rejected with a pointer to the new keys', () => {
        const found = messages('contents/docs/a.eval.yaml', check({ arms: ['baseline', 'link'] }))
        assert.ok(found.some((m) => m.includes('arms is gone; use append_docs_link')))
    })

    test('the flags take only true, and attach_mcp must name a server in run-config', () => {
        const found = messages(
            'contents/docs/a.eval.yaml',
            check({ append_docs_link: 'yes', attach_skill: false, attach_mcp: 'nope' })
        )
        assert.ok(found.includes('check ask: append_docs_link must be true, or left out'))
        assert.ok(found.includes('check ask: attach_skill must be true, or left out'))
        assert.ok(found.some((m) => m.includes('attach_mcp must be one of posthog')))
    })
})

const fileFor = (path: string, raw: unknown): EvalFile => {
    const { file, problems } = parse(path, raw)
    assert.deepEqual(problems, [])
    return file!
}

describe('descriptions and suites', () => {
    const codeCheck = {
        id: 'x',
        description: 'Why this check exists.',
        codebase_to_test: 'acme-dispatch-nextjs',
        prompt: 'Tie events in {folder}/ to the signed-in user.',
        criteria: { shared: ['builds'] },
    }

    test('code checks need a description', () => {
        const found = messages('contents/docs/a.eval.yaml', {
            checks: [{ ...codeCheck, description: undefined }],
        })
        assert.ok(found.some((m) => m.includes('code checks need a description')))
    })

    test('suite must be smoke or deep, and --suite filters on it', () => {
        assert.ok(
            messages('contents/docs/a.eval.yaml', { checks: [{ ...codeCheck, suite: 'nightly' }] }).some((m) =>
                m.includes('suite must be one of')
            )
        )
        const deep = fileFor('contents/docs/a.eval.yaml', { checks: [{ ...codeCheck, suite: 'deep' }] })
        const smoke = fileFor('contents/docs/b.eval.yaml', answerOnly)
        const { selections } = select([deep, smoke], shared, parseArgs(['plan', '--suite', 'smoke']), null)
        assert.deepEqual(
            selections.map((s) => s.file.path),
            ['contents/docs/b.eval.yaml']
        )
    })
})

describe('prompts', () => {
    const pageText = async (page: string) => `# Page ${page}\n\nBody.\n`

    test('no append keys sends the prompt as written; each key adds a tail, link first', async () => {
        const pages = ['docs/a', 'docs/b']
        const none = { link: false, content: false }
        assert.equal(await appendDocs('Do it.', none, pages, 'https://posthog.com', pageText), 'Do it.')
        const link = await appendDocs('Do it.', { ...none, link: true }, pages, 'https://preview.example', pageText)
        assert.ok(link.includes('https://preview.example/docs/a.md\nhttps://preview.example/docs/b.md'))
        const content = await appendDocs('Do it.', { ...none, content: true }, pages, 'https://posthog.com', pageText)
        assert.ok(content.includes('<docs-page url="https://posthog.com/docs/b.md">\n# Page docs/b'))
        const both = await appendDocs('Do it.', { link: true, content: true }, pages, 'https://posthog.com', pageText)
        assert.ok(both.indexOf('https://posthog.com/docs/a.md\n') < both.indexOf('<docs-page'))
    })

    test('check keys fit Gauge: lowercase-kebab, at most 64 characters, unique', () => {
        const long = fileFor('contents/docs/product-analytics/trends/statistical-analysis.eval.yaml', {
            ...answerOnly,
            checks: [
                { ...answerOnly.checks[0], id: 'a-very-long-check-id-that-keeps-going' },
                { ...answerOnly.checks[0], id: 'a-very-long-check-id-that-keeps-going-no-docs' },
            ],
        })
        const keys = long.checks.map((check) => checkKey(long, check))
        for (const key of keys) {
            assert.match(key, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
            assert.ok(key.length <= 64)
        }
        assert.notEqual(keys[0], keys[1])
    })

    test('{folder} and shared rubrics resolve, and answer-only checks have no repo', async () => {
        const code = fileFor('contents/docs/a.eval.yaml', {
            checks: [
                {
                    id: 'x',
                    prompt: 'Edit {folder}/.',
                    description: 'Checks the codebase folder fills in.',
                    codebase_to_test: 'acme-dispatch-nextjs',
                    criteria: {
                        shared: ['builds'],
                        rubrics: { 'has-sdk': '{folder}/package.json lists posthog-js.' },
                    },
                },
            ],
        })
        const ask = fileFor('contents/docs/b.eval.yaml', answerOnly)
        const harnesses = shared.runConfig.harnesses.slice(0, 1)
        const checks = await buildPrompts(
            [
                { file: code, check: code.checks[0] },
                { file: ask, check: ask.checks[0] },
            ],
            harnesses,
            shared,
            'https://posthog.com',
            pageText
        )
        assert.equal(checks[0].prompt, 'Edit apps/web/.')
        assert.equal(checks[0].criteria[0].name, 'builds')
        assert.deepEqual(checks[0].criteria[1], { name: 'has-sdk', rubric: 'apps/web/package.json lists posthog-js.' })
        const [spec] = toGaugeSpecs(checks, 1, gaugeHarnesses)
        assert.deepEqual(spec.cases[0].config.agents, [{ agent: 'CLAUDE_CODE', models: ['claude-sonnet-5-5'] }])
        assert.equal(spec.cases[0].config.repoUrl, 'https://github.com/gauge-sh/acme-dispatch-nextjs')
        assert.equal(spec.cases[1].config.repoUrl, null)
        assert.equal(setupOf(checks[0]), 'no docs')
    })

    test('<ph_posthog_js_defaults> becomes the snapshot the docs code blocks show', async () => {
        const file = fileFor('contents/docs/a.eval.yaml', {
            checks: [
                {
                    ...answerOnly.checks[0],
                    criteria: { rubrics: { 'uses-defaults': "defaults is '<ph_posthog_js_defaults>'." } },
                },
            ],
        })
        const [built] = await buildPrompts(
            [{ file, check: file.checks[0] }],
            shared.runConfig.harnesses.slice(0, 1),
            shared,
            'https://posthog.com',
            pageText
        )
        assert.match(shared.posthogJsDefaults, /^\d{4}-\d{2}-\d{2}$/)
        assert.equal(built.criteria[0].rubric, `defaults is '${shared.posthogJsDefaults}'.`)
    })

    test('MCP and skill checks are skipped until they can run', async () => {
        const file = fileFor('contents/docs/a.eval.yaml', {
            checks: [
                { ...answerOnly.checks[0], id: 'mcp', attach_mcp: 'posthog' },
                { ...answerOnly.checks[0], id: 'skill', attach_skill: true, append_docs_link: true },
            ],
        })
        const [mcp, skill] = await buildPrompts(
            file.checks.map((check) => ({ file, check })),
            shared.runConfig.harnesses.slice(0, 1),
            shared,
            'https://posthog.com',
            pageText
        )
        assert.equal(setupOf(skill), 'docs link + skill')
        assert.match(cantRunReason(skill, shared)!, /attach_skill is a placeholder/)
        assert.deepEqual(mcp.mcp, { name: 'posthog', url: 'https://mcp.posthog.com/mcp' })
        assert.match(cantRunReason(mcp, shared)!, /attach_mcp posthog has no Gauge server pinned/)
    })

    test('a run counts one session per harness model per sample', () => {
        const harnesses = [
            { id: 'a', models: ['m1'], verified: true },
            { id: 'b', models: ['m2', 'm3'], verified: false },
        ]
        const checks = [{ harnesses }, { harnesses: harnesses.slice(0, 1) }] as unknown as CheckPrompt[]
        assert.equal(sessionsFor(checks, 1), 4)
        assert.equal(sessionsFor(checks, 3), 12)
    })

    test('Gauge specs hold at most 20 Gauge cases each', () => {
        const one = {
            key: 'k',
            prompt: 'p',
            criteria: [],
            harnesses: shared.runConfig.harnesses,
            codebase: null,
        } as unknown as CheckPrompt
        const specs = toGaugeSpecs(
            Array.from({ length: 45 }, (_, i) => ({ ...one, key: `k-${i}` })),
            1,
            gaugeHarnesses
        )
        assert.deepEqual(
            specs.map((s) => s.cases.length),
            [20, 20, 5]
        )
    })
})

describe('saved evals', () => {
    const check = {
        key: 'product-analytics-installation-go-install',
        name: '[posthog.com/docs/product-analytics/installation/go] install',
        prompt: 'Set up PostHog.',
        criteria: [{ name: 'builds', rubric: 'It builds.' }],
        codebase: { name: 'starter-go', repo: 'https://github.com/gauge-sh/starter-go', ref: 'abc', folder: '.' },
        harnesses: [{ id: 'claude-code', models: ['claude-sonnet-5-5'], verified: true }],
        mcp: null,
    } as unknown as CheckPrompt
    const wanted = definitionFor(check, 1, gaugeHarnesses)
    const saved: SavedEval = {
        id: 'e1',
        name: wanted.name,
        promptText: wanted.prompt,
        criteria: wanted.criteria,
        repoUrl: wanted.repoUrl,
        repoRef: wanted.repoRef,
        agents: wanted.agents,
        sampleCount: 1,
        mcpRefs: [],
        tags: [...wanted.tags].reverse(),
    }

    test("a saved eval is named [posthog.com/<path>] <check id>, so sync never touches anyone else's", () => {
        const page = fileFor('contents/docs/product-analytics/installation/go.eval.yaml', answerOnly)
        assert.equal(checkName(page, page.checks[0]), '[posthog.com/docs/product-analytics/installation/go] ask')
        const e2e = fileFor('evals/e2e-evals/flows/signup.eval.yaml', {
            owner: 'growth',
            pages: ['docs/a'],
            ...answerOnly,
        })
        assert.equal(checkName(e2e, e2e.checks[0]), '[posthog.com/evals/e2e-evals/flows/signup] ask')
        assert.equal(wanted.name, check.name)
        assert.deepEqual(wanted.agents, [{ agent: 'CLAUDE_CODE', models: ['claude-sonnet-5-5'] }])
    })

    test('two saved evals with one name are both kept, so sync and run can report it', () => {
        const byName = groupByName([saved, { ...saved, id: 'e2' }])
        assert.equal(byName.get(check.name)?.length, 2)
    })

    test('a saved eval that matches is current, whatever the tag order', () => {
        assert.ok(isCurrent(saved, wanted))
    })

    test('any change to the prompt, criteria, codebase, agents, samples or MCP makes it out of date', () => {
        assert.ok(!isCurrent({ ...saved, mcpRefs: ['mcp.posthog.com@v2'] }, wanted))
        assert.ok(!isCurrent({ ...saved, promptText: 'Set up PostHog now.' }, wanted))
        assert.ok(!isCurrent({ ...saved, criteria: [{ name: 'builds', rubric: 'It compiles.' }] }, wanted))
        assert.ok(!isCurrent({ ...saved, repoRef: 'def' }, wanted))
        assert.ok(!isCurrent({ ...saved, agents: [{ agent: 'CLAUDE_CODE', models: ['claude-opus-5-5'] }] }, wanted))
        assert.ok(!isCurrent({ ...saved, sampleCount: 3 }, wanted))
    })
})

describe('results', () => {
    test("Gauge's verdict becomes one neutral result per session", () => {
        const verdict = {
            batches: [
                {
                    runs: [
                        {
                            agent: 'CLAUDE_CODE',
                            model: 'claude-sonnet-5-5',
                            result: 'QUALITY_FAILED',
                            url: 'https://example.com/run',
                            criterionResults: [{ name: 'builds', passed: false, reasoning: 'It fails.' }],
                        },
                    ],
                },
            ],
        }
        assert.deepEqual(toSessionResults('go-install', verdict, gaugeHarnesses), [
            {
                check: 'go-install',
                harness: 'claude-code',
                model: 'claude-sonnet-5-5',
                passed: false,
                criteria: [{ name: 'builds', passed: false, reason: 'It fails.' }],
                url: 'https://example.com/run',
            },
        ])
    })
})
