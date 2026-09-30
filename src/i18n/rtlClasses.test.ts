/**
 * Guards the RTL-safe areas of the site against physical Tailwind classes.
 *
 * `ml-4` and `ms-4` look identical in English and diverge only in an RTL locale, so
 * a physical class is invisible until someone reads the site in Arabic. This test
 * fails the build instead of waiting for that.
 *
 * Only classes with an exact logical equivalent are listed. `left-`, `right-`,
 * `space-x-`, `inset-x-`, and `translate-x-` are deliberately absent: they are
 * usually symmetric, decorative, or transform-based, so a blanket ban would be wrong.
 *
 * Run: pnpm test:rtl-classes
 */
import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, relative } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..', '..')

/** Areas that render in an RTL locale and must stay direction-agnostic. */
const RTL_AWARE = [
    'src/pages/index.tsx',
    'src/components/Home',
    'src/components/Wrapper',
    'src/components/AppContainer',
    'src/components/TaskBarMenu',
    'src/components/ActiveWindowsPanel',
]

/**
 * `src/components/AppWindow` and `src/components/Desktop` are intentionally absent.
 * The desktop canvas is pinned to `dir="ltr"` (see `components/Wrapper`), because
 * window positions are container-relative coordinates rendered as framer-motion
 * transforms. Physical classes are correct inside that canvas.
 */
const SKIP_DIRS = ['lotties']

const RULES: { physical: string; logical: string; pattern: RegExp }[] = [
    { physical: 'ml-', logical: 'ms-', pattern: /(?:^|[^a-z-])ml-(?=[\d[]|px|auto|full)/ },
    { physical: 'mr-', logical: 'me-', pattern: /(?:^|[^a-z-])mr-(?=[\d[]|px|auto|full)/ },
    { physical: 'pl-', logical: 'ps-', pattern: /(?:^|[^a-z-])pl-(?=[\d[]|px|auto|full)/ },
    { physical: 'pr-', logical: 'pe-', pattern: /(?:^|[^a-z-])pr-(?=[\d[]|px|auto|full)/ },
    { physical: 'text-left', logical: 'text-start', pattern: /(?:^|[^a-z-])text-left\b/ },
    { physical: 'text-right', logical: 'text-end', pattern: /(?:^|[^a-z-])text-right\b/ },
    { physical: 'border-l', logical: 'border-s', pattern: /(?:^|[^a-z-])border-l\b/ },
    { physical: 'border-r', logical: 'border-e', pattern: /(?:^|[^a-z-])border-r\b/ },
    { physical: 'rounded-tl', logical: 'rounded-ss', pattern: /(?:^|[^a-z-])rounded-tl\b/ },
    { physical: 'rounded-tr', logical: 'rounded-se', pattern: /(?:^|[^a-z-])rounded-tr\b/ },
    { physical: 'rounded-bl', logical: 'rounded-es', pattern: /(?:^|[^a-z-])rounded-bl\b/ },
    { physical: 'rounded-br', logical: 'rounded-ee', pattern: /(?:^|[^a-z-])rounded-br\b/ },
    { physical: 'rounded-l', logical: 'rounded-s', pattern: /(?:^|[^a-z-])rounded-l\b/ },
    { physical: 'rounded-r', logical: 'rounded-e', pattern: /(?:^|[^a-z-])rounded-r\b/ },
    { physical: 'float-left', logical: 'float-start', pattern: /(?:^|[^a-z-])float-left\b/ },
    { physical: 'float-right', logical: 'float-end', pattern: /(?:^|[^a-z-])float-right\b/ },
]

/** Test files describe the rules, so scanning them would flag this file itself. */
const isScannable = (name: string) => /\.(tsx|ts|js)$/.test(name) && !/\.test\.(tsx|ts|js)$/.test(name)

function walk(target: string): string[] {
    const abs = join(root, target)
    let stats
    try {
        stats = statSync(abs)
    } catch {
        return []
    }
    if (stats.isFile()) return isScannable(abs) ? [abs] : []
    return readdirSync(abs, { withFileTypes: true }).flatMap((entry) => {
        if (SKIP_DIRS.includes(entry.name)) return []
        if (entry.isDirectory()) return walk(join(target, entry.name))
        return isScannable(entry.name) ? [join(abs, entry.name)] : []
    })
}

describe('RTL-safe areas use logical Tailwind properties', () => {
    for (const target of RTL_AWARE) {
        test(target, () => {
            const offences: string[] = []
            for (const file of walk(target)) {
                readFileSync(file, 'utf8')
                    .split('\n')
                    .forEach((line, i) => {
                        for (const { physical, logical, pattern } of RULES) {
                            if (pattern.test(line)) {
                                offences.push(`${relative(root, file)}:${i + 1}  ${physical} -> use ${logical}`)
                            }
                        }
                    })
            }
            assert.deepEqual(
                offences,
                [],
                `Physical Tailwind classes in an RTL-safe area. They look correct in English and break in Arabic:\n  ${offences.join(
                    '\n  '
                )}\n`
            )
        })
    }
})
