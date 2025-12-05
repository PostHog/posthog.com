import path from 'path'
import fs from 'fs'
import { stripFrontmatter } from './utils'
import { dedent } from '../src/utils'

// Webpack alias mappings (from gatsby-node.ts)
const ALIAS_MAPPINGS: Record<string, string> = {
    onboarding: path.resolve(process.cwd(), '.cache', 'gatsby-source-git', 'posthog-main-repo', 'docs', 'onboarding'),
    docs: path.resolve(process.cwd(), '.cache', 'gatsby-source-git', 'posthog-main-repo', 'docs'),
    components: path.resolve(process.cwd(), 'src', 'components'),
}

const FILE_EXTENSIONS = ['.tsx', '.ts', '.mdx', '.md'] as const
const MAX_MATCHES = 1000

const IMPORT_REGEX = /^import\s+(?:(?:\{([^}]+)\}|\w+)\s+from\s+)?['"]([^'"]+)['"];?\s*$/gm
const HAS_EXTENSION_REGEX = /\.(tsx|ts|mdx|md|jsx|js)$/
const DEFAULT_IMPORT_NAME_REGEX = /import\s+(\w+)/
const RETURN_STATEMENT_REGEX = /return\s*(?:\(\s*)?([\s\S]+)/
const RETURN_CONTENT_END_REGEX = /^([\s\S]*?)(?:\s*;?\s*$|\s*;)/

const IMPORT_REMOVAL_FILTERS = [
    { pattern: /^import\s+(?:(?:\{[^}]+\}|\w+)\s+from\s+)?['"]([^'"]+)['"];?\s*\n?/gm, replacement: '' },
] as const

const QUOTE_REMOVAL_FILTERS = [{ pattern: /['"]/g, replacement: '' }] as const

const REGEX_ESCAPE_FILTERS = [{ pattern: /[.*+?^${}()|[\]\\]/g, replacement: '\\$&' }] as const

const COMPONENT_REPLACEMENT_PATTERN = (escapedName: string) =>
    `(<${escapedName}(?:\\s+[^>]*)?\\s*/>)|(<${escapedName}(?:\\s+[^>]*)?>([\\s\\S]*?)<\\/${escapedName}>)`

/**
 * Extracts and resolves content from MDX file
 */
const extractMdxContent = (filePath: string, visited: Set<string>): string => {
    if (!fs.existsSync(filePath)) return ''
    try {
        const content = fs.readFileSync(filePath, 'utf-8')
        const contentWithoutFrontmatter = stripFrontmatter(content)
        const resolved = resolveSnippets(contentWithoutFrontmatter, filePath, visited)
        return applyFilters(resolved, IMPORT_REMOVAL_FILTERS)
    } catch {
        return ''
    }
}

/**
 * Extracts and resolves content from TSX file
 */
const extractTsxContent = (filePath: string, visited: Set<string>): string => {
    if (!fs.existsSync(filePath)) return ''
    try {
        const content = fs.readFileSync(filePath, 'utf-8')
        let jsxContent = extractJsxFromTsx(content)
        if (!jsxContent) return ''

        jsxContent = dedent(jsxContent)
        jsxContent = resolveSnippets(jsxContent, filePath, visited)
        jsxContent = applyFilters(jsxContent, IMPORT_REMOVAL_FILTERS)
        jsxContent = applyFilters(jsxContent, JSX_EXTRACTION_FILTERS)
        return jsxContent.trim()
    } catch {
        return ''
    }
}

/**
 * Resolves snippet imports in MDX content with clean recursion
 * Replaces import statements and component usages with actual snippet content
 */
export function resolveSnippets(content: string, filePath: string, visited: Set<string> = new Set()): string {
    if (!content || !filePath) return content || ''

    try {
        let resolvedContent = applyFilters(content, IMPORT_REMOVAL_FILTERS)
        const imports = collectSnippetImports(content, filePath)

        for (const [resolvedPath, componentNames] of imports.entries()) {
            const normalizedPath = path.resolve(resolvedPath)
            if (visited.has(normalizedPath)) continue
            visited.add(normalizedPath)

            const snippetContent =
                resolvedPath.endsWith('.mdx') || resolvedPath.endsWith('.md')
                    ? extractMdxContent(resolvedPath, visited)
                    : resolvedPath.endsWith('.tsx') || resolvedPath.endsWith('.ts')
                    ? extractTsxContent(resolvedPath, visited)
                    : ''

            if (snippetContent) {
                for (const componentName of componentNames) {
                    if (!componentName?.trim()) continue
                    try {
                        const regex = createComponentRegex(componentName)
                        resolvedContent = resolvedContent.replace(regex, () => {
                            return resolveSnippets(snippetContent, resolvedPath, visited)
                        })
                    } catch {}
                }
            }
        }

        return resolvedContent
    } catch {
        return content
    }
}

/**
 * Skips non-snippet imports (regular component/library imports)
 */
const shouldSkipImport = (importPath: string): boolean =>
    importPath.startsWith('components/') ||
    importPath.startsWith('src/') ||
    importPath.startsWith('~') ||
    importPath.includes('node_modules') ||
    importPath.startsWith('@')

const tryResolveWithExtensions = (basePath: string, hasExtension: boolean): string | null => {
    if (hasExtension && fs.existsSync(basePath)) {
        return basePath
    }

    for (const ext of FILE_EXTENSIONS) {
        const fullPath = basePath + ext
        if (fs.existsSync(fullPath)) {
            return fullPath
        }
    }

    return fs.existsSync(basePath) ? basePath : null
}

/**
 * Resolves import paths, handling webpack aliases and relative paths
 */
const resolveSnippetPath = (importPath: string, baseFilePath: string): string | null => {
    if (!importPath || !baseFilePath) return null

    try {
        const cleanPath = applyFilters(importPath, QUOTE_REMOVAL_FILTERS)
        if (!cleanPath) return null

        const hasExtension = HAS_EXTENSION_REGEX.test(cleanPath)

        // Check webpack alias paths (onboarding/, docs/, components/)
        for (const [alias, aliasPath] of Object.entries(ALIAS_MAPPINGS)) {
            if (cleanPath.startsWith(`${alias}/`)) {
                const relativePath = cleanPath.replace(`${alias}/`, '')
                const resolvedPath = path.resolve(aliasPath, relativePath)
                const result = tryResolveWithExtensions(resolvedPath, hasExtension)
                if (result) return result
            }
        }

        if (cleanPath.startsWith('./') || cleanPath.startsWith('../')) {
            const baseDir = path.dirname(baseFilePath)
            const resolvedPath = path.resolve(baseDir, cleanPath)
            return tryResolveWithExtensions(resolvedPath, hasExtension)
        }

        return null
    } catch {
        return null
    }
}

const findMatchingBrace = (content: string, startIndex: number): number | null => {
    let depth = 1
    let i = startIndex
    while (i < content.length && depth > 0) {
        if (content[i] === '{') depth++
        if (content[i] === '}') depth--
        i++
    }
    return depth === 0 ? i - 1 : null
}

/**
 * Extracts JSX content from a return statement, handling parentheses
 */
const extractReturnContent = (functionBody: string): string | null => {
    const returnMatch = functionBody.match(RETURN_STATEMENT_REGEX)
    if (!returnMatch) return null

    let returnContent = returnMatch[1]

    if (returnContent.trim().startsWith('(')) {
        // Find balanced parentheses
        let depth = 1
        let i = 1
        while (i < returnContent.length && depth > 0) {
            if (returnContent[i] === '(') depth++
            if (returnContent[i] === ')') depth--
            i++
        }
        if (depth === 0) {
            returnContent = returnContent.substring(1, i - 1).trim()
        }
    } else {
        const endMatch = returnContent.match(RETURN_CONTENT_END_REGEX)
        if (endMatch) {
            returnContent = endMatch[1].trim()
        }
    }

    return returnContent || null
}

const extractArrowFunctionBody = (content: string, pattern: RegExp): string | null => {
    const match = content.match(pattern)
    if (!match || match.index === undefined) return null

    const startIndex = match.index + match[0].length
    const endIndex = findMatchingBrace(content, startIndex)
    if (endIndex === null) return null

    return content.substring(startIndex, endIndex)
}

const PATTERN_MATCHERS = [
    // Named export with arrow function (with braces)
    {
        pattern: /export\s+const\s+\w+\s*=\s*(?:\([^)]*\)(?::\s*[^=>]+)?|\(\))\s*=>\s*\{/,
        extractor: extractArrowFunctionBody,
    },
    // Named export with arrow function (single expression)
    {
        pattern: /export\s+const\s+\w+\s*=\s*(?:\([^)]*\)(?::\s*[^=>]+)?|\(\))\s*=>\s*([^;{]+);?\s*$/,
        extractor: (content: string, pattern: RegExp) => {
            const match = content.match(pattern)
            return match ? match[1].trim() : null
        },
    },
    // Named export with function declaration
    {
        pattern: /export\s+function\s+\w+\s*\([^)]*\)\s*\{([\s\S]*?)\}/,
        extractor: (content: string, pattern: RegExp) => {
            const match = content.match(pattern)
            return match ? extractReturnContent(match[1]) : null
        },
    },
    // Default export with arrow function (with braces)
    {
        pattern: /export\s+default\s*(?:\([^)]*\)(?::\s*[^=>]+)?|\(\))\s*=>\s*\{/,
        extractor: extractArrowFunctionBody,
    },
    // Default export with arrow function (single expression)
    {
        pattern: /export\s+default\s*(?:\([^)]*\)(?::\s*[^=>]+)?|\(\))\s*=>\s*([^;{]+);?\s*$/,
        extractor: (content: string, pattern: RegExp) => {
            const match = content.match(pattern)
            return match ? match[1].trim() : null
        },
    },
    // Default export with function declaration
    {
        pattern: /export\s+default\s+function\s*\w*\s*\([^)]*\)\s*\{([\s\S]*?)\}/,
        extractor: (content: string, pattern: RegExp) => {
            const match = content.match(pattern)
            return match ? extractReturnContent(match[1]) : null
        },
    },
    // Const declaration with arrow function (with braces)
    {
        pattern: /const\s+\w+\s*=\s*(?:\([^)]*\)(?::\s*[^=>]+)?|\(\))\s*=>\s*\{/,
        extractor: extractArrowFunctionBody,
    },
    // Const declaration with arrow function (single expression)
    {
        pattern: /const\s+\w+\s*=\s*(?:\([^)]*\)(?::\s*[^=>]+)?|\(\))\s*=>\s*([^;{]+);?\s*$/,
        extractor: (content: string, pattern: RegExp) => {
            const match = content.match(pattern)
            return match ? match[1].trim() : null
        },
    },
    // Function declaration
    {
        pattern: /function\s+\w+\s*\([^)]*\)\s*\{([\s\S]*?)\}/,
        extractor: (content: string, pattern: RegExp) => {
            const match = content.match(pattern)
            return match ? extractReturnContent(match[1]) : null
        },
    },
] as const

/**
 * Extracts JSX content from TSX file using pattern matchers for various export styles
 */
const extractJsxFromTsx = (content: string): string | null => {
    for (const { pattern, extractor } of PATTERN_MATCHERS) {
        const result = extractor(content, pattern)
        if (result) {
            const functionBody = typeof result === 'string' ? result : null
            return functionBody ? extractReturnContent(functionBody) : result
        }
    }
    return null
}

const JSX_EXTRACTION_FILTERS = [
    { pattern: /^<OnboardingContentWrapper[^>]*>/, replacement: '' },
    { pattern: /<\/OnboardingContentWrapper>$/, replacement: '' },
    { pattern: /<Markdown[^>]*>([\s\S]*?)<\/Markdown>/g, replacement: '$1' },
    { pattern: /<Blockquote[^>]*>([\s\S]*?)<\/Blockquote>/g, replacement: '$1' },
    { pattern: /\{dedent`([\s\S]*?)`\}/g, replacement: '$1' },
    { pattern: /\{dedent\(`([\s\S]*?)`\)\}/g, replacement: '$1' },
] as const

const applyFilters = (content: string, filters: readonly { pattern: RegExp; replacement: string }[]): string =>
    filters.reduce((acc, { pattern, replacement }) => acc.replace(pattern, replacement), content)

/**
 * Parses import statement and extracts component names (named or default)
 */
const parseImportStatement = (
    match: RegExpMatchArray,
    baseFilePath: string
): { names: string[]; resolvedPath: string } | null => {
    const importPath = match[2]
    if (shouldSkipImport(importPath)) return null

    const resolvedPath = resolveSnippetPath(importPath, baseFilePath)
    if (!resolvedPath) return null

    let names: string[] = []
    if (match[1]) {
        // Named import: import { Name1, Name2 } from "path"
        names = match[1]
            .split(',')
            .map((n) => n.trim())
            .filter(Boolean)
    } else {
        // Default import: import Name from "path"
        const nameMatch = match[0].match(DEFAULT_IMPORT_NAME_REGEX)
        if (nameMatch) {
            names = [nameMatch[1]]
        }
    }

    return names.length > 0 ? { names, resolvedPath } : null
}

const collectSnippetImports = (content: string, baseFilePath: string): Map<string, string[]> => {
    const imports = new Map<string, string[]>()
    let matchCount = 0

    IMPORT_REGEX.lastIndex = 0
    let match: RegExpMatchArray | null

    while ((match = IMPORT_REGEX.exec(content)) !== null && matchCount < MAX_MATCHES) {
        matchCount++
        const parsed = parseImportStatement(match, baseFilePath)
        if (parsed) {
            const existing = imports.get(parsed.resolvedPath) || []
            imports.set(parsed.resolvedPath, [...existing, ...parsed.names])
        }
    }

    return imports
}

const escapeRegex = (str: string): string => applyFilters(str, REGEX_ESCAPE_FILTERS)

const createComponentRegex = (componentName: string): RegExp => {
    const escapedName = escapeRegex(componentName)
    return new RegExp(COMPONENT_REPLACEMENT_PATTERN(escapedName), 'g')
}

const JSX_TO_MARKDOWN_FILTERS = [
    { pattern: /<OnboardingContentWrapper[^>]*>/g, replacement: '' },
    { pattern: /<\/OnboardingContentWrapper>/g, replacement: '' },
    { pattern: /<(?:br|hr)\s*\/?>/g, replacement: '\n' },
    { pattern: /\n\s*\n\s*\n+/g, replacement: '\n\n' },
] as const

export function resolveJsxSnippetsToMarkdown(content: string): string {
    if (!content) return ''
    return applyFilters(content, JSX_TO_MARKDOWN_FILTERS).trim()
}
