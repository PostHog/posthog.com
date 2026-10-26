/**
 * Offline tests for the docs eval runner: eval file validation, rendering, the Gauge
 * spec and the docs-read report. Nothing here calls Gauge or the network.
 *
 * Run: pnpm test:evals
 */
import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { toGaugeSpecs } from './adapters/gauge.ts'
import { assertionName, assertionRubric, parseAssertion } from './assertions.ts'
import { extractRunIds, normalizeDocsUrl, readRun } from './docs-read.ts'
import { checkKey, renderChecks, renderPrompt, skillName, type RenderedCheck } from './render.ts'
import { changedSelection, parseArgs, select } from './run.ts'
import {
    loadEvalFiles,
    loadShared,
    pageForEvalFile,
    pageForSourceFile,
    pageIndex,
    parseEvalFile,
    type EvalFile,
} from './spec.ts'

const shared = loadShared()
const everyPage = () => true
const parse = (path: string, raw: unknown) => parseEvalFile(path, raw, shared, everyPage)
const messages = (path: string, raw: unknown) => parse(path, raw).problems.map((p) => p.message)

const answerOnly = {
    checks: [
        {
            id: 'ask',
            prompt: 'How do I do the thing?',
            criteria: { shared: ['answers-directly'], rubrics: { 'names-the-button': 'It names the button.' } },
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
        assert.equal(pageForEvalFile('evals/journeys/pick-an-sdk.eval.yaml'), null)
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

    test('criteria takes only shared, assertions and rubrics', () => {
        const found = messages('contents/docs/a.eval.yaml', {
            checks: [{ id: 'x', prompt: 'p', criteria: { use: ['builds'], 'my-rubric': 'text' } }],
        })
        assert.ok(found.some((m) => m.includes('unknown key "criteria.use"')))
        assert.ok(found.some((m) => m.includes('unknown key "criteria.my-rubric"')))
        assert.ok(found.some((m) => m.includes('criteria needs at least one')))
    })

    test('shared criteria and fixtures must exist', () => {
        const found = messages('contents/docs/a.eval.yaml', {
            checks: [{ id: 'x', prompt: 'p', workspace: { fixture: 'nope' }, criteria: { shared: ['nope'] } }],
        })
        assert.ok(found.some((m) => m.includes('no fixture "nope"')))
        assert.ok(found.some((m) => m.includes('no shared criterion "nope"')))
    })

    test('{folder} needs a fixture', () => {
        const found = messages('contents/docs/a.eval.yaml', {
            checks: [{ id: 'x', prompt: 'Change {folder}/', criteria: { rubrics: { c: 'ok' } } }],
        })
        assert.ok(found.some((m) => m.includes('{folder} needs a workspace fixture')))
    })

    test('a check reads at most four pages', () => {
        const pages = ['docs/b', 'docs/c', 'docs/d', 'docs/e']
        const found = messages('contents/docs/a.eval.yaml', {
            ...answerOnly,
            checks: [{ ...answerOnly.checks[0], pages }],
        })
        assert.ok(found.some((m) => m.includes('the limit is 4')))
    })

    test('journeys need an owner and pages', () => {
        const found = messages('evals/journeys/j.eval.yaml', answerOnly)
        assert.ok(found.includes('journeys need an owner'))
        assert.ok(found.includes('journeys need at least one page in pages'))
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

const fileFor = (path: string, raw: unknown): EvalFile => {
    const { file, problems } = parse(path, raw)
    assert.deepEqual(problems, [])
    return file!
}

describe('descriptions, suites and assertions', () => {
    const codeCheck = {
        id: 'x',
        description: 'Why this check exists.',
        workspace: { fixture: 'acme-nextjs' },
        prompt: 'Tie events in {folder}/ to the signed-in user.',
        criteria: { shared: ['stays-in-folder'] },
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

    test('assertions parse to one kind each, with fixed names and rubrics', () => {
        const calls = parseAssertion({ calls: 'posthog.reset', in: 'src/store.js' }).assertion!
        assert.equal(assertionName(calls), 'assert-calls-posthog-reset')
        assert.equal(
            assertionRubric(calls),
            'The code in {folder}/src/store.js calls `posthog.reset`. Cite the file and line.'
        )
        assert.equal(assertionName(parseAssertion({ 'no-literal-token': true }).assertion!), 'assert-no-literal-token')
        assert.match(parseAssertion({ dependency: 'a', command: 'b' }).problem!, /exactly one/)
        assert.match(parseAssertion({ command: 'make', in: 'x' }).problem!, /only goes with/)
        assert.match(parseAssertion({ 'file-exists': '../secrets' }).problem!, /inside the fixture folder/)
    })

    test('workspace assertions need a fixture; mentions does not', () => {
        const found = messages('contents/docs/a.eval.yaml', {
            checks: [
                {
                    ...answerOnly.checks[0],
                    criteria: {
                        shared: ['answers-directly'],
                        assertions: [{ dependency: 'posthog-js' }, { mentions: 'formula mode' }],
                    },
                },
            ],
        })
        assert.deepEqual(found, ['check ask: dependency assertions need a workspace fixture'])
    })

    test('rubric names cannot take the assert- prefix', () => {
        const found = messages('contents/docs/a.eval.yaml', {
            checks: [{ ...answerOnly.checks[0], criteria: { rubrics: { 'assert-mine': 'x' } } }],
        })
        assert.ok(found.some((m) => m.includes('names starting with assert- are for assertions')))
    })
})

describe('selection and the page index', () => {
    const anchor = fileFor('contents/docs/a.eval.yaml', {
        ...answerOnly,
        checks: [{ ...answerOnly.checks[0], pages: ['docs/b'] }],
    })
    const other = fileFor('contents/docs/b.eval.yaml', answerOnly)
    const draft = fileFor('contents/docs/c.eval.yaml', { ...answerOnly, status: 'draft' })

    test('a check is indexed under its own page and every page it lists', () => {
        const index = pageIndex([anchor, other])
        assert.deepEqual(
            index.get('docs/b')?.map((hit) => hit.file.path),
            ['contents/docs/a.eval.yaml', 'contents/docs/b.eval.yaml']
        )
    })

    test('--changed picks every check that reads a changed page', () => {
        const keys = changedSelection([anchor, other], ['contents/docs/b.mdx'])
        assert.deepEqual([...keys].sort(), ['contents/docs/a.eval.yaml#ask', 'contents/docs/b.eval.yaml#ask'])
    })

    test('drafts are counted, not selected, and unverified harnesses are left out', () => {
        const { selections, harnesses, inactive } = select([anchor, draft], shared, parseArgs(['plan']), null)
        assert.equal(selections.length, 1)
        assert.equal(inactive, 1)
        assert.ok(harnesses.every((h) => h.verified))
    })

    test('--page and --arm narrow the selection', () => {
        const { selections } = select(
            [anchor, other],
            shared,
            parseArgs(['plan', '--page', 'a', '--arm', 'link']),
            null
        )
        assert.deepEqual(
            selections.map((s) => [s.file.path, s.arms]),
            [['contents/docs/a.eval.yaml', ['link']]]
        )
    })
})

describe('rendering', () => {
    const pageText = async (page: string) => `# Page ${page}\n\nBody.\n`

    test('baseline sends the prompt as written; other arms add only a tail', async () => {
        const pages = ['docs/a', 'docs/b']
        assert.equal(await renderPrompt('Do it.', 'baseline', pages, 'https://posthog.com', pageText), 'Do it.')
        const link = await renderPrompt('Do it.', 'link', pages, 'https://preview.example', pageText)
        assert.ok(link.includes('https://preview.example/docs/a.md\nhttps://preview.example/docs/b.md'))
        const inline = await renderPrompt('Do it.', 'inline', pages, 'https://posthog.com', pageText)
        assert.ok(inline.includes('<docs-page url="https://posthog.com/docs/b.md">\n# Page docs/b'))
        const skill = await renderPrompt('Do it.', 'skill', ['docs/a'], 'https://posthog.com', pageText)
        assert.ok(skill.includes(`the ${skillName('docs/a')} skill`))
    })

    test('check keys fit Gauge: lowercase-kebab, at most 64 characters, unique', () => {
        const long = fileFor('contents/docs/product-analytics/trends/statistical-analysis.eval.yaml', {
            ...answerOnly,
            checks: [{ ...answerOnly.checks[0], id: 'a-very-long-check-id-that-keeps-going' }],
        })
        const keys = (['baseline', 'link'] as const).map((arm) => checkKey(long, long.checks[0], arm))
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
                    description: 'Checks the fixture folder fills in.',
                    workspace: { fixture: 'acme-nextjs' },
                    criteria: { shared: ['stays-in-folder'], assertions: [{ dependency: 'posthog-js' }] },
                },
            ],
        })
        const ask = fileFor('contents/docs/b.eval.yaml', answerOnly)
        const harnesses = shared.matrix.harnesses.slice(0, 1)
        const checks = await renderChecks(
            [
                { file: code, check: code.checks[0], arms: ['baseline'] },
                { file: ask, check: ask.checks[0], arms: ['baseline'] },
            ],
            harnesses,
            shared,
            'https://posthog.com',
            pageText
        )
        assert.equal(checks[0].prompt, 'Edit apps/web/.')
        assert.equal(checks[0].criteria[0].rubric, 'Every changed or added file is inside apps/web/.')
        assert.deepEqual(checks[0].criteria[1], {
            name: 'assert-dependency-posthog-js',
            rubric: 'apps/web/package.json lists `posthog-js` as a dependency.',
        })
        const [spec] = toGaugeSpecs(checks, 1)
        assert.equal(spec.cases[0].config.repoUrl, 'https://github.com/gauge-sh/acme-dispatch-nextjs')
        assert.equal(spec.cases[1].config.repoUrl, null)
    })

    test('Gauge specs hold at most 20 Gauge cases each', () => {
        const one = {
            key: 'k',
            prompt: 'p',
            criteria: [],
            harnesses: shared.matrix.harnesses,
            fixture: null,
            skillRefs: [],
        } as unknown as RenderedCheck
        const specs = toGaugeSpecs(
            Array.from({ length: 45 }, (_, i) => ({ ...one, key: `k-${i}` })),
            1
        )
        assert.deepEqual(
            specs.map((s) => s.cases.length),
            [20, 20, 5]
        )
    })
})

describe('docs-read report', () => {
    const rendered = {
        key: 'product-analytics-identify-ask-link',
        arm: 'link',
        pages: ['docs/product-analytics/identify'],
        prompt: 'How?\n\nFollow this guide and rely on it rather than on what you already know:\nhttps://posthog.com/docs/product-analytics/identify.md',
    } as RenderedCheck

    test('URLs compare equal across hosts, .md and trailing slashes', () => {
        assert.equal(
            normalizeDocsUrl('https://preview.example/docs/A/b.md#x'),
            normalizeDocsUrl('https://posthog.com/docs/a/b/')
        )
    })

    test('a URL that only appears in the prompt is not a fetch', () => {
        const logs = JSON.stringify({ events: [{ prompt: rendered.prompt }] })
        const read = readRun('run_1', `{"key":"${rendered.key}"}`, logs, [rendered])
        assert.deepEqual(read.fetchedPages, { 'docs/product-analytics/identify': false })
    })

    test("the agent's own fetch counts", () => {
        const logs = `${rendered.prompt}\nWebFetch https://posthog.com/docs/product-analytics/identify.md`
        const read = readRun('run_1', rendered.key, logs, [rendered])
        assert.deepEqual(read.fetchedPages, { 'docs/product-analytics/identify': true })
    })

    test('run ids come from the wait payload', () => {
        assert.deepEqual(extractRunIds(JSON.stringify({ batches: [{ runs: [{ id: 'a' }, { id: 'b' }] }] })), ['a', 'b'])
    })
})
