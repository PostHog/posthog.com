import fs from 'fs-extra'
import path from 'path'
import * as parser from '@babel/parser'
import traverse from '@babel/traverse'

const INPUT_DIR = './ast-output/mdast'
const OUTPUT_DIR = './public/docs'
const TSX_DIRS = ['./.cache/gatsby-source-git/posthog-main-repo/docs/onboarding']
const SKIP_DIRS = ['_snippets', 'main-repo']

// Caches
const astCache = new Map<string, any>()
const tsxCache = new Map<string, any[]>()
const astIndex = new Map<string, string>()
const tsxIndex = new Map<string, string>()

function buildAstIndex(dir: string, basePath = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        const relativePath = path.join(basePath, entry.name)
        if (entry.isDirectory()) {
            buildAstIndex(fullPath, relativePath)
        } else if (entry.name.endsWith('.json')) {
            const mdxPath = relativePath.replace(/\.json$/, '.mdx')
            const mdPath = relativePath.replace(/\.json$/, '.md')
            astIndex.set(mdxPath, fullPath)
            astIndex.set(mdPath, fullPath)
            astIndex.set(relativePath.replace(/\.json$/, ''), fullPath)
        }
    }
}

function buildTsxIndex(dir: string, basePath = '') {
    if (!fs.existsSync(dir)) return

    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        const relativePath = path.join(basePath, entry.name)
        if (entry.isDirectory()) {
            buildTsxIndex(fullPath, relativePath)
        } else if (entry.name.endsWith('.tsx')) {
            tsxIndex.set(fullPath, fullPath)
            tsxIndex.set(relativePath, fullPath)
            tsxIndex.set(relativePath.replace(/\.tsx$/, ''), fullPath)
            const onboardingMatch = fullPath.match(/onboarding\/(.+)$/)
            if (onboardingMatch) {
                tsxIndex.set(`onboarding/${onboardingMatch[1]}`, fullPath)
                tsxIndex.set(`onboarding/${onboardingMatch[1].replace(/\.tsx$/, '')}`, fullPath)
            }
        }
    }
}

function loadAst(jsonPath: string) {
    if (astCache.has(jsonPath)) return astCache.get(jsonPath)
    try {
        const content = fs.readFileSync(jsonPath, 'utf-8')
        const ast = JSON.parse(content)
        astCache.set(jsonPath, ast)
        return ast
    } catch {
        return null
    }
}

function dedent(str: string): string {
    const lines = str.split('\n')
    const nonEmptyLines = lines.filter((l) => l.trim())
    if (nonEmptyLines.length === 0) return str

    const minIndent = nonEmptyLines.reduce((min, l) => {
        const indent = l.match(/^\s*/)?.[0].length || 0
        return Math.min(min, indent)
    }, Infinity)

    if (minIndent < Infinity && minIndent > 0) {
        return lines
            .map((l) => l.slice(minIndent))
            .join('\n')
            .trim()
    }
    return str.trim()
}

function extractStringValue(node: any): string | null {
    if (!node) return null
    if (node.type === 'StringLiteral') return node.value
    if (node.type === 'TemplateLiteral') return node.quasis.map((q: any) => q.value.raw).join('')
    if (node.type === 'TaggedTemplateExpression' && node.tag?.name === 'dedent') {
        return extractStringValue(node.quasi)
    }
    if (node.type === 'CallExpression' && node.callee?.name === 'dedent') {
        return node.arguments[0] ? extractStringValue(node.arguments[0]) : null
    }
    return null
}

function extractUsedComponents(source: string): Set<string> {
    const components = new Set<string>()
    try {
        const ast = parser.parse(source, { sourceType: 'module', plugins: ['jsx', 'typescript'] })
        traverse(ast, {
            JSXElement(path) {
                const name = path.node.openingElement.name
                if (name.type === 'JSXIdentifier') components.add(name.name)
            },
            JSXExpressionContainer(path) {
                const expr = path.node.expression
                if (expr.type === 'LogicalExpression' && expr.operator === '&&' && expr.left.type === 'Identifier') {
                    components.add(expr.left.name)
                }
            },
        })
    } catch {
        // Ignore parse errors
    }
    return components
}

function extractJsxText(node: any): string {
    if (!node) return ''
    if (node.type === 'JSXText') return node.value
    if (node.type === 'JSXExpressionContainer') {
        return extractStringValue(node.expression) || ''
    }
    if (node.children) {
        return node.children.map((child: any) => extractJsxText(child)).join('')
    }
    return ''
}

function extractTableCell(cell: any): string {
    const parts: string[] = []

    for (const child of cell.children || []) {
        if (child.type === 'JSXText') {
            const text = child.value.trim()
            if (text) parts.push(text)
        } else if (child.type === 'JSXElement') {
            const name = child.openingElement?.name?.name
            if (name === 'code') {
                const codeText = extractJsxText(child).trim()
                if (codeText) parts.push(`\`${codeText}\``)
            } else if (name === 'em') {
                const emText = extractJsxText(child).trim()
                if (emText) parts.push(`*${emText}*`)
            } else if (name === 'strong') {
                const strongText = extractJsxText(child).trim()
                if (strongText) parts.push(`**${strongText}**`)
            } else if (name === 'p') {
                parts.push(extractTableCell(child))
            } else if (name === 'br') {
                // Skip line breaks in table cells
            } else if (name === 'CodeBlock') {
                // Skip code blocks in cells - they'll be extracted separately
            } else {
                const innerText = extractJsxText(child).trim()
                if (innerText) parts.push(innerText)
            }
        }
    }

    return parts.join(' ').replace(/\s+/g, ' ').trim()
}

function extractTable(tableNode: any): { type: string; rows: string[][] } | null {
    const rows: string[][] = []

    const processRow = (row: any) => {
        const cells: string[] = []
        for (const cell of row.children || []) {
            if (cell.type === 'JSXElement') {
                const cellName = cell.openingElement?.name?.name
                if (cellName === 'td' || cellName === 'th') {
                    cells.push(extractTableCell(cell))
                }
            }
        }
        if (cells.length > 0) rows.push(cells)
    }

    for (const child of tableNode.children || []) {
        if (child.type === 'JSXElement') {
            const name = child.openingElement?.name?.name
            if (name === 'thead' || name === 'tbody') {
                for (const row of child.children || []) {
                    if (row.type === 'JSXElement' && row.openingElement?.name?.name === 'tr') {
                        processRow(row)
                    }
                }
            } else if (name === 'tr') {
                processRow(child)
            }
        }
    }

    if (rows.length > 0) return { type: 'table', rows }
    return null
}

function extractTsxContent(source: string): any[] {
    const sections: any[] = []
    try {
        const ast = parser.parse(source, { sourceType: 'module', plugins: ['jsx', 'typescript'] })
        traverse(ast, {
            JSXElement(path) {
                const elementName = path.node.openingElement.name
                if (elementName.type !== 'JSXIdentifier') return

                const name = elementName.name

                if (name === 'Markdown') {
                    for (const child of path.node.children) {
                        if (child.type === 'JSXText') {
                            const content = child.value.trim()
                            if (content) sections.push({ type: 'markdown', content })
                        } else if (child.type === 'JSXExpressionContainer') {
                            const content = extractStringValue(child.expression)
                            if (content) sections.push({ type: 'markdown', content: dedent(content) })
                        }
                    }
                } else if (name === 'CodeBlock') {
                    const attrs = path.node.openingElement.attributes
                    let language = ''
                    let code = ''

                    for (const attr of attrs) {
                        if (attr.type !== 'JSXAttribute' || attr.name.type !== 'JSXIdentifier') continue
                        const attrName = attr.name.name
                        if (attrName === 'language' && attr.value?.type === 'StringLiteral') {
                            language = attr.value.value
                        } else if (attrName === 'code') {
                            if (attr.value?.type === 'StringLiteral') {
                                code = attr.value.value
                            } else if (attr.value?.type === 'JSXExpressionContainer') {
                                code = extractStringValue(attr.value.expression) || ''
                            }
                        }
                    }

                    if (language && code) sections.push({ type: 'code', language, content: dedent(code) })
                } else if (name === 'table') {
                    const table = extractTable(path.node)
                    if (table) sections.push(table)
                    path.skip() // Don't process children (they're already in the table)
                }
            },
        })
    } catch {
        // Ignore parse errors
    }
    return sections
}

function parseTsxContent(tsxPath: string) {
    if (tsxCache.has(tsxPath)) return tsxCache.get(tsxPath)
    try {
        const content = fs.readFileSync(tsxPath, 'utf-8')
        const result = extractTsxContent(content)
        tsxCache.set(tsxPath, result)
        return result
    } catch {
        return null
    }
}

function tableToMarkdown(rows: string[][]): string {
    if (rows.length === 0) return ''

    const colCount = Math.max(...rows.map((r) => r.length))
    const lines: string[] = []

    // Header row
    const header = rows[0] || []
    lines.push('| ' + header.map((cell) => cell || '').join(' | ') + ' |')

    // Separator
    lines.push('| ' + Array(colCount).fill('---').join(' | ') + ' |')

    // Data rows
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i]
        const cells = Array(colCount)
            .fill('')
            .map((_, j) => row[j] || '')
        lines.push('| ' + cells.join(' | ') + ' |')
    }

    return lines.join('\n')
}

function tsxSectionsToMarkdown(sections: any[]): string {
    return sections
        .map((section) => {
            if (section.type === 'markdown') return section.content
            if (section.type === 'code') return `\`\`\`${section.language}\n${section.content}\n\`\`\``
            if (section.type === 'table') return tableToMarkdown(section.rows)
            return ''
        })
        .filter(Boolean)
        .join('\n\n')
}

function resolveImportPath(importPath: string, currentFile: string) {
    let normalized = importPath.replace(/^['"]|['"]$/g, '').replace(/\.(mdx|md)$/, '')
    if (normalized.startsWith('.')) {
        const currentDir = path.dirname(currentFile)
        normalized = path.normalize(path.join(currentDir, normalized))
    }

    for (const ext of ['', '.mdx', '.md']) {
        const key = normalized + ext
        if (astIndex.has(key)) return { type: 'ast', path: astIndex.get(key)! }
    }

    const parts = normalized.split('/')
    const filename = parts.pop()!
    const snippetPath = [...parts, '_snippets', filename].join('/')
    for (const ext of ['', '.mdx', '.md']) {
        const key = snippetPath + ext
        if (astIndex.has(key)) return { type: 'ast', path: astIndex.get(key)! }
    }

    return null
}

function resolveTsxImportPath(importPath: string): string | null {
    const normalized = importPath.replace(/^['"]|['"]$/g, '')
    if (tsxIndex.has(normalized)) return tsxIndex.get(normalized)!
    if (tsxIndex.has(normalized + '.tsx')) return tsxIndex.get(normalized + '.tsx')!
    if (tsxIndex.has(`onboarding/${normalized}`)) return tsxIndex.get(`onboarding/${normalized}`)!

    for (const [key, value] of tsxIndex.entries()) {
        if (key.includes(normalized) || normalized.includes(path.basename(key, '.tsx'))) return value
    }
    return null
}

function parseImports(importValue: string) {
    const imports: { mdx: Record<string, string>; tsx: Record<string, string> } = { mdx: {}, tsx: {} }
    const regex = /import\s+(?:\{?\s*(\w+)\s*\}?|\*\s+as\s+(\w+)|(\w+))\s+from\s+['"]([^'"]+)['"]/g
    let match
    while ((match = regex.exec(importValue)) !== null) {
        const name = match[1] || match[2] || match[3]
        const importPath = match[4]
        if (name && importPath) {
            if (importPath.endsWith('.mdx') || importPath.endsWith('.md')) {
                imports.mdx[name] = importPath
            } else if (importPath.endsWith('.tsx') || importPath.includes('onboarding/')) {
                imports.tsx[name] = importPath
            }
        }
    }
    return imports
}

function extractAllJsxComponentNames(jsxValue: string): string[] {
    const regex = /<(\w+)(?:\s|\/|>)/g
    const names: string[] = []
    let match
    while ((match = regex.exec(jsxValue)) !== null) names.push(match[1])
    return names
}

function nodeToMarkdown(
    node: any,
    imports: { mdx: Record<string, string>; tsx: Record<string, string> } = { mdx: {}, tsx: {} },
    currentFile = '',
    depth = 0
): string {
    if (!node) return ''

    switch (node.type) {
        case 'root':
            return node.children
                .map((child: any) => nodeToMarkdown(child, imports, currentFile, depth))
                .filter(Boolean)
                .join('\n\n')

        case 'paragraph':
            return node.children.map((child: any) => nodeToMarkdown(child, imports, currentFile, depth)).join('')

        case 'heading': {
            const prefix = '#'.repeat(node.depth)
            const text = node.children.map((c: any) => nodeToMarkdown(c, imports, currentFile, depth)).join('')
            return `${prefix} ${text}`
        }

        case 'text':
            return node.value || ''
        case 'strong':
            return `**${node.children.map((c: any) => nodeToMarkdown(c, imports, currentFile, depth)).join('')}**`
        case 'emphasis':
            return `*${node.children.map((c: any) => nodeToMarkdown(c, imports, currentFile, depth)).join('')}*`
        case 'delete':
            return `~~${node.children.map((c: any) => nodeToMarkdown(c, imports, currentFile, depth)).join('')}~~`
        case 'inlineCode':
            return `\`${node.value}\``

        case 'code': {
            const lang = node.lang || ''
            const meta = node.meta ? ` ${node.meta}` : ''
            return `\`\`\`${lang}${meta}\n${node.value}\n\`\`\``
        }

        case 'link': {
            const text = node.children.map((c: any) => nodeToMarkdown(c, imports, currentFile, depth)).join('')
            const title = node.title ? ` "${node.title}"` : ''
            return `[${text}](${node.url}${title})`
        }

        case 'image': {
            const alt = node.alt || ''
            const title = node.title ? ` "${node.title}"` : ''
            return `![${alt}](${node.url}${title})`
        }

        case 'blockquote': {
            const content = node.children.map((c: any) => nodeToMarkdown(c, imports, currentFile, depth)).join('\n\n')
            return content
                .split('\n')
                .map((line: string) => `> ${line}`)
                .join('\n')
        }

        case 'list':
            return node.children
                .map((child: any, i: number) => {
                    const prefix = node.ordered ? `${(node.start || 1) + i}. ` : '- '
                    return prefix + nodeToMarkdown(child, imports, currentFile, depth + 1)
                })
                .join('\n')

        case 'listItem': {
            const content = node.children.map((c: any) => nodeToMarkdown(c, imports, currentFile, depth)).join('\n')
            const lines = content.split('\n')
            return lines.map((line: string, i: number) => (i === 0 ? line : '  ' + line)).join('\n')
        }

        case 'thematicBreak':
            return '---'
        case 'break':
            return '  \n'
        case 'html':
            return node.value || ''

        case 'table': {
            const rows = node.children.map((row: any) => {
                const cells = row.children.map((cell: any) =>
                    cell.children.map((c: any) => nodeToMarkdown(c, imports, currentFile, depth)).join('')
                )
                return `| ${cells.join(' | ')} |`
            })
            if (rows.length > 0) {
                const headerCells = node.children[0]?.children?.length || 0
                const separator = `| ${Array(headerCells).fill('---').join(' | ')} |`
                rows.splice(1, 0, separator)
            }
            return rows.join('\n')
        }

        case 'tableRow':
        case 'tableCell':
            return ''

        case 'import': {
            const parsed = parseImports(node.value)
            Object.assign(imports.mdx, parsed.mdx)
            Object.assign(imports.tsx, parsed.tsx)
            return ''
        }

        case 'export':
            return ''

        case 'jsx':
        case 'mdxJsxFlowElement':
        case 'mdxJsxTextElement': {
            const jsxValue = node.value || ''
            const componentNames = extractAllJsxComponentNames(jsxValue)
            if (componentNames.length === 0) return ''

            const results: string[] = []

            for (const componentName of componentNames) {
                if (imports.mdx[componentName]) {
                    const resolved = resolveImportPath(imports.mdx[componentName], currentFile)
                    if (resolved?.type === 'ast') {
                        const importedAst = loadAst(resolved.path)
                        if (importedAst) {
                            results.push(nodeToMarkdown(importedAst, { mdx: {}, tsx: {} }, resolved.path, depth))
                        }
                    }
                }

                if (imports.tsx[componentName]) {
                    const tsxPath = resolveTsxImportPath(imports.tsx[componentName])
                    if (tsxPath) {
                        const sections = parseTsxContent(tsxPath)
                        if (sections && sections.length > 0) results.push(tsxSectionsToMarkdown(sections))

                        try {
                            const tsxSource = fs.readFileSync(tsxPath, 'utf-8')
                            const usedComponents = extractUsedComponents(tsxSource)
                            for (const usedName of usedComponents) {
                                if (imports.mdx[usedName]) {
                                    const resolved = resolveImportPath(imports.mdx[usedName], currentFile)
                                    if (resolved?.type === 'ast') {
                                        const snippetAst = loadAst(resolved.path)
                                        if (snippetAst) {
                                            results.push(
                                                nodeToMarkdown(snippetAst, { mdx: {}, tsx: {} }, resolved.path, depth)
                                            )
                                        }
                                    }
                                }
                            }
                        } catch {
                            // Ignore
                        }
                    }
                }
            }

            return results.filter(Boolean).join('\n\n')
        }

        case 'definition':
            return `[${node.identifier}]: ${node.url}${node.title ? ` "${node.title}"` : ''}`
        case 'footnoteDefinition': {
            const content = node.children.map((c: any) => nodeToMarkdown(c, imports, currentFile, depth)).join('')
            return `[^${node.identifier}]: ${content}`
        }
        case 'footnoteReference':
            return `[^${node.identifier}]`

        default:
            if (node.children) {
                return node.children
                    .map((child: any) => nodeToMarkdown(child, imports, currentFile, depth))
                    .filter(Boolean)
                    .join('\n\n')
            }
            return ''
    }
}

function extractFrontmatter(ast: any) {
    for (const node of ast.children || []) {
        if (node.type === 'export' && node.value?.includes('_frontmatter')) {
            try {
                const match = node.value.match(/_frontmatter\s*=\s*(\{[^}]+\})/)
                if (match) return JSON.parse(match[1])
            } catch {
                // Ignore
            }
        }
    }
    return {}
}

function processFile(jsonPath: string, relativePath: string) {
    const ast = loadAst(jsonPath)
    if (!ast) return

    const frontmatter = extractFrontmatter(ast)
    const markdown = nodeToMarkdown(ast, { mdx: {}, tsx: {} }, relativePath)

    let cleaned = markdown.replace(/\n{3,}/g, '\n\n').trim()
    if (frontmatter.title && !cleaned.startsWith('# ')) {
        cleaned = `# ${frontmatter.title}\n\n${cleaned}`
    }

    const outputPath = path.join(OUTPUT_DIR, relativePath.replace(/\.json$/, '.md'))
    fs.ensureDirSync(path.dirname(outputPath))
    fs.writeFileSync(outputPath, cleaned)
}

function processDirectory(dir: string, basePath = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
        if (SKIP_DIRS.includes(entry.name)) continue

        const fullPath = path.join(dir, entry.name)
        const relativePath = path.join(basePath, entry.name)

        if (entry.isDirectory()) {
            processDirectory(fullPath, relativePath)
        } else if (entry.name.endsWith('.json')) {
            processFile(fullPath, relativePath)
        }
    }
}

export function generateDocsMarkdown() {
    console.log('Building AST index...')
    buildAstIndex(INPUT_DIR)
    console.log(`Indexed ${Math.floor(astIndex.size / 3)} AST files`)

    console.log('Building TSX index...')
    for (const tsxDir of TSX_DIRS) {
        buildTsxIndex(tsxDir)
    }
    console.log(`Indexed ${tsxIndex.size} TSX entries`)

    console.log(`Generating markdown docs...`)
    console.log(`Input:  ${INPUT_DIR}`)
    console.log(`Output: ${OUTPUT_DIR}`)
    console.log(`Skipping: ${SKIP_DIRS.join(', ')}`)

    fs.ensureDirSync(OUTPUT_DIR)
    processDirectory(INPUT_DIR)

    console.log('Done! Markdown files generated in public/docs/')
}
