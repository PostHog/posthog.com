import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, test } from 'node:test'

import { POCKET_GUIDE_VOLUMES } from '../../constants/pocketGuides.ts'

const repoRoot = path.resolve(import.meta.dirname, '../../..')
// Each volume's guide lives at contents/learn/<id>/pocket-guide/.
const guidesDir = path.join(repoRoot, 'contents/learn')
const volumeIds = new Set(POCKET_GUIDE_VOLUMES.map((volume) => volume.id))

function readRepoFile(relativePath: string): string {
    return readFileSync(path.join(repoRoot, relativePath), 'utf8')
}

function listGuidePages(dir: string): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const entryPath = path.join(dir, entry.name)
        if (entry.isDirectory()) return listGuidePages(entryPath)
        return /\.mdx?$/.test(entry.name) && entry.name !== 'SKILL.md' ? [entryPath] : []
    })
}

function keysOfRecord(source: string, recordName: string): string[] {
    const body = source.match(new RegExp(`${recordName}[^=]*=\\s*{([^}]*)}`))?.[1]
    assert.ok(body, `${recordName} not found`)
    return [...body.matchAll(/'([^']+)'\s*:/g)].map((match) => match[1])
}

const guidePages = listGuidePages(guidesDir)

describe('pocket guide pages', () => {
    test('never import hoggies – a volume gets one, from VOLUME_ART', () => {
        const pagesWithHoggies = guidePages.filter((page) =>
            readFileSync(page, 'utf8').includes('@posthog/brand/hoggies')
        )
        assert.deepEqual(pagesWithHoggies, [])
    })

    test('write a lone code block or table as Markdown, not inside a figure', () => {
        const volumesPredatingTheRule = ['data-stack']
        const figureWrappingOnlyMarkdown = /<\w+Figure\b[^>]*>\s*(```[\s\S]*?```|(?:\|[^\n]*\n\s*)+)\s*<\/\w+Figure>/
        const pagesWithMarkdownFigures = guidePages
            .filter((page) => !volumesPredatingTheRule.includes(path.relative(guidesDir, page).split(path.sep)[0]))
            .filter((page) => figureWrappingOnlyMarkdown.test(readFileSync(page, 'utf8')))
        assert.deepEqual(pagesWithMarkdownFigures, [])
    })

    test('show the wizard command through <Setup />, never as a raw command', () => {
        const pagesWithRawCommand = guidePages.filter((page) =>
            /npx (-y )?@posthog\/wizard/.test(readFileSync(page, 'utf8'))
        )
        assert.deepEqual(pagesWithRawCommand, [])
    })
})

describe('pocket guide volumes', () => {
    test('each has a content directory', () => {
        const missing = [...volumeIds].filter(
            (id) => !existsSync(path.join(guidesDir, id, 'pocket-guide', 'index.mdx'))
        )
        assert.deepEqual(missing, [])
    })

    test('VOLUME_ART only names real volumes', () => {
        const unknown = keysOfRecord(readRepoFile('src/components/PocketGuides/volumeArt.tsx'), 'VOLUME_ART').filter(
            (id) => !volumeIds.has(id)
        )
        assert.deepEqual(unknown, [])
    })

    test('VOLUME_SUBCOMMAND only names real volumes', () => {
        const unknown = keysOfRecord(
            readRepoFile('src/components/PocketGuides/Action.tsx'),
            'VOLUME_SUBCOMMAND'
        ).filter((id) => !volumeIds.has(id))
        assert.deepEqual(unknown, [])
    })

    test('a volume with a Learn tab is wired to its product', () => {
        const productData = readdirSync(path.join(repoRoot, 'src/hooks/productData'))
            .filter((file) => file.endsWith('.tsx'))
            .map((file) => readRepoFile(`src/hooks/productData/${file}`))
            .join('\n')
        // The Learn tab lives at /learn/<product slug>, which differs from the docs slug for some
        // products (Warehouse docs are /docs/data-warehouse, its product page is /warehouse).
        const tools = readRepoFile('src/data/tools.ts')
        const productSlug = (handle: string) =>
            tools.match(new RegExp(`handle: '${handle}',[\\s\\S]*?slug: '([^']+)'`))?.[1]
        // Chapter pages are generated from the volume's learnPath, so there is no route file to check.
        const volumesWithoutLearnTab = POCKET_GUIDE_VOLUMES.filter(
            (volume) => volume.productHandle && !volume.comingSoon
        )
            .filter(
                (volume) =>
                    !productData.includes(`pocketGuideVolume: '${volume.id}'`) ||
                    !volume.learnPath?.startsWith(`/learn/${productSlug(volume.productHandle as string)}/`)
            )
            .map((volume) => volume.id)
        assert.deepEqual(volumesWithoutLearnTab, [])
    })
})
