#!/usr/bin/env node
// Lists JSX components that an MDX file renders but neither imports nor gets from a template's
// MDXProvider. MDX 1 rendered an empty <div> for those (with a console warning); MDX 3 throws.
// "Provided" is what the template that renders the folder provides (TEMPLATES below).
// Usage: node scripts/astro-migration/check-mdx-components.mjs
import { createProcessor } from '@mdx-js/mdx'
import fg from 'fast-glob'
import fs from 'node:fs'
import path from 'node:path'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

const ROOT = process.cwd()
// Not compiled as MDX: the home and wizard pages give their raw text to MDXEditor, which has its own
// component list, and hosthog/london has no title, so it gets no page.
const IGNORE = ['contents/index.mdx', 'contents/wizard.mdx', 'contents/hosthog/london.mdx']
const processor = createProcessor({ remarkPlugins: [remarkFrontmatter, remarkGfm] })

/** Keys of the object literal that starts at `start` (an opening brace). */
function objectKeys(source, start) {
    let depth = 0
    let end = start
    for (; end < source.length; end++) {
        if (source[end] === '{') depth++
        else if (source[end] === '}' && --depth === 0) break
    }
    const body = source
        .slice(start + 1, end)
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*$/gm, '')
    const keys = new Set()
    // Top-level keys only: drop nested braces and parentheses first.
    let flat = ''
    let level = 0
    for (const char of body) {
        if ('{(['.includes(char)) level++
        if (level === 0) flat += char
        if ('})]'.includes(char)) level--
    }
    for (const part of flat.split(',')) {
        const match = part.trim().match(/^(?:\.\.\.)?([A-Za-z_$][\w$]*)/)
        if (match) keys.add(match[1])
    }
    return keys
}

/** Keys of every `components`/`shortcodes`-like object literal in a source file. */
function providedBy(file) {
    const source = fs.readFileSync(file, 'utf8')
    const keys = new Set()
    for (const match of source.matchAll(/(?:components|shortcodes|mdxComponents|Components)\s*(?:=\{|=|:)\s*\{/g)) {
        objectKeys(source, match.index + match[0].length - 1).forEach((key) => keys.add(key))
    }
    return keys
}

// The template that renders each content folder, and so provides its MDX components. Blog posts and
// docs pass their components to ReaderView, which provides them.
const shortcodes = providedBy('src/mdxGlobalComponents.js')
const TEMPLATES = [
    [
        /^contents\/(blog|newsletter|compare|founders|product-engineers|spotlight|library|tutorials|customers|features)\//,
        'src/templates/BlogPost.tsx',
    ],
    [/^(contents\/(docs|handbook|product-engineer)\/|\.cache\/posthog-main-repo\/)/, 'src/templates/Handbook.tsx'],
    [/^contents\/hogpedia\//, 'src/templates/Hogpedia.tsx'],
    [/^contents\/templates\//, 'src/templates/Template.tsx'],
    [/^contents\/pocket-guides\//, 'src/components/PocketGuides/bookComponents.tsx'],
    [/^contents\/apps\//, 'src/templates/App.jsx'],
    [/^contents\/about\.mdx$/, 'src/views/about.tsx'],
    [/^contents\/[^_]/, 'src/templates/Plain.tsx'],
]
const templateKeys = new Map(TEMPLATES.map(([, file]) => [file, new Set([...providedBy(file), ...shortcodes])]))
// Includes can be imported from any page: check them against every template.
const anyTemplate = new Set([...templateKeys.values()].flatMap((keys) => [...keys]))
const providedFor = (file) => {
    const template = TEMPLATES.find(([pattern]) => pattern.test(file))?.[1]
    return template ? templateKeys.get(template) : anyTemplate
}

let problems = 0
for (const file of fg.sync(['contents/**/*.mdx', '.cache/posthog-main-repo/docs/**/*.mdx'], { ignore: IGNORE })) {
    const source = fs.readFileSync(file, 'utf8')
    let tree
    try {
        tree = processor.parse(source)
    } catch {
        continue
    }
    const declared = new Set()
    const used = new Map()
    visit(tree, (node) => {
        if (node.type === 'mdxjsEsm') {
            for (const statement of node.data?.estree?.body ?? []) {
                for (const specifier of statement.specifiers ?? []) declared.add(specifier.local.name)
                for (const declaration of statement.declaration?.declarations ?? []) declared.add(declaration.id?.name)
                if (statement.declaration?.id) declared.add(statement.declaration.id.name)
            }
        }
        if ((node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') && node.name) {
            const root = node.name.split('.')[0]
            if (/^[A-Z]/.test(root) && !used.has(root)) used.set(root, node.position?.start.line)
        }
    })
    for (const [name, line] of used) {
        if (declared.has(name) || providedFor(file).has(name)) continue
        problems++
        console.log(`${path.relative(ROOT, file)}:${line}: <${name}> is not imported or provided`)
    }
}
console.log(`\n${problems} missing components`)
process.exitCode = problems ? 1 : 0
