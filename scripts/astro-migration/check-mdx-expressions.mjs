#!/usr/bin/env node
// Lists `{...}` expressions in MDX text that reference names the file does not define. MDX 1 printed
// `{name}` in prose as text; MDX 3 evaluates it, so `Hi {name}` throws "name is not defined".
// Expressions inside JSX attributes, comments, and literals are fine and not reported.
// --fix escapes the brace (`\{name}`, the MDX 3 way to write a literal brace) when the expression is
// only identifiers (`{name}`, `{team-name}`), which is placeholder text, not code.
// Usage: node scripts/astro-migration/check-mdx-expressions.mjs [--fix]
import { createProcessor } from '@mdx-js/mdx'
import fg from 'fast-glob'
import fs from 'node:fs'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

const GLOBALS = new Set([
    'props',
    'undefined',
    'Math',
    'Date',
    'JSON',
    'String',
    'Number',
    'Object',
    'Array',
    'window',
    'document',
    'location',
])
const processor = createProcessor({ remarkPlugins: [remarkFrontmatter, remarkGfm] })

/** Free identifiers of an estree program (rough: every Identifier not used as a property key or member property). */
function identifiers(node, out = new Set(), parent = null, key = null) {
    if (!node || typeof node !== 'object') return out
    if (Array.isArray(node)) {
        node.forEach((child) => identifiers(child, out, parent, key))
        return out
    }
    if (node.type === 'Identifier') {
        const isProperty =
            (parent?.type === 'MemberExpression' && key === 'property' && !parent.computed) ||
            (parent?.type === 'Property' && key === 'key' && !parent.computed)
        if (!isProperty) out.add(node.name)
        return out
    }
    if (node.type === 'JSXIdentifier' || node.type === 'JSXAttribute') return out
    for (const [childKey, child] of Object.entries(node)) {
        if (childKey === 'loc' || childKey === 'range' || childKey === 'start' || childKey === 'end') continue
        if (child && typeof child === 'object') identifiers(child, out, node, childKey)
    }
    return out
}

const fix = process.argv.includes('--fix')
/** `name`, `a.b`, `team-name`: placeholder text that MDX 1 printed as is. */
const isPlaceholder = (node) =>
    node.type === 'Identifier' ||
    (node.type === 'MemberExpression' && !node.computed && isPlaceholder(node.object)) ||
    (node.type === 'BinaryExpression' && node.operator === '-' && isPlaceholder(node.left) && isPlaceholder(node.right))

let problems = 0
let fixed = 0
for (const file of fg.sync(['contents/**/*.mdx', '.cache/posthog-main-repo/docs/**/*.mdx'], {
    ignore: ['contents/index.mdx', 'contents/wizard.mdx'],
})) {
    const source = fs.readFileSync(file, 'utf8')
    let tree
    try {
        tree = processor.parse(source)
    } catch {
        continue
    }
    const declared = new Set()
    const offsets = []
    visit(tree, 'mdxjsEsm', (node) => {
        for (const statement of node.data?.estree?.body ?? []) {
            for (const specifier of statement.specifiers ?? []) declared.add(specifier.local.name)
            for (const declaration of statement.declaration?.declarations ?? []) declared.add(declaration.id?.name)
            if (statement.declaration?.id) declared.add(statement.declaration.id.name)
        }
    })
    // Attribute expressions (`<X a={b} />`) run too; they are checked, but never auto-fixed.
    const expressions = []
    visit(tree, (node) => {
        if (node.type === 'mdxTextExpression' || node.type === 'mdxFlowExpression') expressions.push(node)
        for (const attribute of node.attributes ?? []) {
            const value = attribute.type === 'mdxJsxExpressionAttribute' ? attribute : attribute.value
            if (value?.data?.estree) expressions.push({ ...value, position: node.position, attribute: true })
        }
    })
    for (const node of expressions) {
        const estree = node.data?.estree
        if (!estree?.body?.length) continue // comment-only
        // Function parameters are bound inside the expression.
        const params = new Set()
        JSON.stringify(estree.body, (key, value) => {
            if (value && /Function/.test(value.type ?? '')) value.params?.forEach((param) => identifiers(param, params))
            return value
        })
        const free = [...identifiers(estree.body)].filter(
            (name) => !declared.has(name) && !GLOBALS.has(name) && !params.has(name)
        )
        if (!free.length) continue
        const statement = estree.body[0]
        if (
            fix &&
            !node.attribute &&
            estree.body.length === 1 &&
            statement.type === 'ExpressionStatement' &&
            isPlaceholder(statement.expression)
        ) {
            offsets.push(node.position.start.offset)
            continue
        }
        problems++
        console.log(`${file}:${node.position.start.line}: {${node.value.trim().slice(0, 60)}} uses ${free.join(', ')}`)
    }
    if (offsets.length) {
        let result = source
        for (const offset of offsets.sort((a, b) => b - a))
            result = `${result.slice(0, offset)}\\${result.slice(offset)}`
        fs.writeFileSync(file, result)
        fixed += offsets.length
    }
}
if (fix) console.log(`escaped ${fixed} placeholder expressions`)
console.log(`\n${problems} expressions with undefined names`)
process.exitCode = problems ? 1 : 0
