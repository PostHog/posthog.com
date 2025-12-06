import path from 'path'
import fs from 'fs'
import { stripFrontmatter } from './utils'
import { dedent } from '../src/utils'

// ============================================================================
// MDX RESOLUTION (Gatsby onCreateNode)
// ============================================================================

const ALIAS_MAPPINGS: Record<string, string> = {
    onboarding: path.resolve(process.cwd(), '.cache', 'gatsby-source-git', 'posthog-main-repo', 'docs', 'onboarding'),
    docs: path.resolve(process.cwd(), '.cache', 'gatsby-source-git', 'posthog-main-repo', 'docs'),
    components: path.resolve(process.cwd(), 'src', 'components'),
}

const FILE_EXTENSIONS = ['.mdx', '.md'] as const
const IMPORT_REGEX = /^import\s+(?:(?:\{([^}]+)\}|\w+)\s+from\s+)?['"]([^'"]+)['"];?\s*$/gm
const DEFAULT_IMPORT_NAME_REGEX = /import\s+(\w+)/

const normalizeEmptyLines = (content: string): string => {
    return content.replace(/\n{3,}/g, '\n\n')
}

export function resolveMDXSnippets(rawBody: string, filePath: string | undefined, slug?: string): string {
    if (!rawBody || !filePath) return rawBody || ''

    try {
        const visited = new Set<string>()
        const resolved = resolveMdxImports(filePath, visited)
        if (!resolved) {
            return normalizeEmptyLines(stripFrontmatter(rawBody))
        }
        return normalizeEmptyLines(resolved)
    } catch (error) {
        console.error(`❌ Error resolving snippets for ${slug || filePath}:`, error)
        return normalizeEmptyLines(stripFrontmatter(rawBody))
    }
}

/**
 * ============================================================================
 * MDX snippet handling
 * ============================================================================
 */

const removeQuotes = (str: string): string => str.replace(/['"]/g, '')
const hasFileExtension = (filePath: string): boolean => /\.(mdx|md)$/.test(filePath)
const isRelativePath = (filePath: string): boolean => filePath.startsWith('./') || filePath.startsWith('../')
const isComponentImport = (filePath: string): boolean =>
    filePath.startsWith('components/') || filePath.startsWith('src/')
const isMdxImport = (filePath: string): boolean => filePath.endsWith('.mdx') || filePath.endsWith('.md')

const extractImportName = (importStatement: string, namedImport?: string): string | null => {
    if (namedImport) {
        return namedImport.trim() || null
    }
    const match = importStatement.match(DEFAULT_IMPORT_NAME_REGEX)
    return match ? match[1] : null
}

const escapeRegex = (str: string): string => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const createComponentTagRegex = (componentName: string): RegExp => {
    const escapedName = escapeRegex(componentName)
    return new RegExp(
        `(<${escapedName}(?:\\s+[^>]*)?\\s*/>)|(<${escapedName}(?:\\s+[^>]*)?>([\\s\\S]*?)<\\/${escapedName}>)`,
        'g'
    )
}

const replaceComponentTags = (content: string, componentName: string, replacement: string): string => {
    const regex = createComponentTagRegex(componentName)
    return content.replace(regex, replacement)
}

const removeImportStatements = (content: string, imports: ReadonlyArray<{ fullMatch: string }>): string => {
    return imports.reduce((acc, imp) => acc.replace(imp.fullMatch, ''), content)
}

const resolvePathWithExtensions = (basePath: string, hasExtension: boolean): string | null => {
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

const resolveMdxPath = (importPath: string, baseFilePath: string): string | null => {
    if (!importPath || !baseFilePath) return null

    try {
        const cleanPath = removeQuotes(importPath)
        if (!cleanPath) return null

        const hasExt = hasFileExtension(cleanPath)

        for (const [alias, aliasPath] of Object.entries(ALIAS_MAPPINGS)) {
            if (cleanPath.startsWith(`${alias}/`)) {
                const relativePath = cleanPath.replace(`${alias}/`, '')
                const resolvedPath = path.resolve(aliasPath, relativePath)
                const result = resolvePathWithExtensions(resolvedPath, hasExt)
                if (result) return result
            }
        }

        if (isRelativePath(cleanPath)) {
            const baseDir = path.dirname(baseFilePath)
            const resolvedPath = path.resolve(baseDir, cleanPath)
            const result = resolvePathWithExtensions(resolvedPath, hasExt)
            if (result) return result
        }

        return null
    } catch {
        return null
    }
}

type MdxImport = {
    readonly name: string
    readonly path: string
    readonly fullMatch: string
}

const findMdxImports = (content: string): ReadonlyArray<MdxImport> => {
    const imports: MdxImport[] = []

    IMPORT_REGEX.lastIndex = 0
    let match: RegExpMatchArray | null

    while ((match = IMPORT_REGEX.exec(content)) !== null) {
        const importPath = match[2]

        if (!isMdxImport(importPath)) {
            continue
        }

        if (isComponentImport(importPath)) {
            continue
        }

        const name = extractImportName(match[0], match[1])
        if (name) {
            imports.push({
                name,
                path: importPath,
                fullMatch: match[0],
            })
        }
    }

    return imports
}

const resolveMdxImports = (filePath: string, visited: ReadonlySet<string> = new Set()): string => {
    const normalizedPath = path.resolve(filePath)

    if (visited.has(normalizedPath)) {
        return ''
    }

    const newVisited = new Set(visited).add(normalizedPath)

    if (!fs.existsSync(filePath)) {
        return ''
    }

    const content = fs.readFileSync(filePath, 'utf-8')
    const contentWithoutFrontmatter = stripFrontmatter(content)
    const imports = findMdxImports(contentWithoutFrontmatter)

    let resolvedContent = removeImportStatements(contentWithoutFrontmatter, imports)

    resolvedContent = imports.reduce((acc, imp) => {
        const resolvedPath = resolveMdxPath(imp.path, filePath)
        if (!resolvedPath) {
            return acc
        }

        const importedContent = resolveMdxImports(resolvedPath, newVisited)

        if (importedContent) {
            return replaceComponentTags(acc, imp.name, importedContent)
        }

        return acc
    }, resolvedContent)

    const remainingImports = findMdxImports(resolvedContent)
    return removeImportStatements(resolvedContent, remainingImports)
}

/**
 * ============================================================================
 * JSX/TSX snippet handling
 * ============================================================================
 */

const TSX_FILE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'] as const

const getIndentationLevel = (content: string, componentName: string): number => {
    const escapedName = escapeRegex(componentName)
    const selfClosingPattern = new RegExp(`^\\s*<${escapedName}(?:\\s+[^>]*)?\\s*/>`, 'm')
    const openingPattern = new RegExp(`^\\s*<${escapedName}(?:\\s+[^>]*)?>`, 'm')

    const lines = content.split('\n')

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if (selfClosingPattern.test(line) || openingPattern.test(line)) {
            const match = line.match(/^(\s*)/)
            return match ? match[1].length : 0
        }
    }

    return 0
}

const dedentToLevel = (content: string, targetLevel: number): string => {
    if (!content || !content.trim()) return content

    const lines = content.split('\n')
    if (lines.length === 0) return content

    const line0 = lines[0].trimStart()
    const line1Indent = lines.length > 1 && lines[1].trim() ? lines[1].match(/^(\s*)/)?.[1]?.length || 0 : 0

    const restLines = lines.slice(1).map((line) => {
        if (!line.trim()) return ''
        const currentIndent = line.match(/^(\s*)/)?.[1]?.length || 0
        const relativeIndent = currentIndent - line1Indent
        const lineContent = line.trimStart()
        return relativeIndent >= 0 ? ' '.repeat(relativeIndent) + lineContent : lineContent
    })

    const result = [line0, ...restLines].join('\n')

    if (targetLevel === 0) return result

    const indent = ' '.repeat(targetLevel)
    return result
        .split('\n')
        .map((line) => (line.trim() ? `${indent}${line}` : ''))
        .join('\n')
}

const preserveIndentationAndInsert = (
    originalContent: string,
    componentName: string,
    replacementContent: string
): string => {
    const indentLevel = getIndentationLevel(originalContent, componentName)
    const dedentedReplacement = dedentToLevel(replacementContent, indentLevel)

    const regex = createComponentTagRegex(componentName)
    return originalContent.replace(regex, dedentedReplacement)
}

export function resolveJsxSnippets(content: string, filePath: string | undefined, slug?: string): string {
    if (!content || !filePath) return content || ''

    const logFile = path.resolve(process.cwd(), 'test_bench', 'logs', 'jsx-resolution.log')
    const logFn = (message: string) => {
        const timestamp = new Date().toISOString()
        const logMessage = `[${timestamp}] ${message}\n`
        fs.appendFileSync(logFile, logMessage)
    }

    try {
        logFn(`\n${'='.repeat(60)}`)
        logFn(`Resolving JSX snippets for: ${slug || filePath}`)
        logFn(`${'='.repeat(60)}\n`)

        const visited = new Set<string>()
        const resolved = resolveJsxImportsInContent(content, filePath, visited, logFn)

        logFn(`\n✓ Resolved content (${resolved.length} chars)`)

        return normalizeEmptyLines(resolved)
    } catch (error) {
        const errorMsg = `❌ Error resolving JSX snippets for ${slug || filePath}: ${error}`
        console.error(errorMsg)
        fs.appendFileSync(logFile, `[${new Date().toISOString()}] ${errorMsg}\n`)
        return normalizeEmptyLines(content)
    }
}

const isJsxImport = (filePath: string): boolean =>
    filePath.endsWith('.tsx') || filePath.endsWith('.jsx') || filePath.endsWith('.ts') || filePath.endsWith('.js')

const isOnboardingOrDocsImport = (filePath: string): boolean =>
    filePath.startsWith('onboarding/') || filePath.startsWith('docs/')

type JsxImport = {
    readonly name: string
    readonly path: string
    readonly fullMatch: string
}

const findJsxImports = (content: string): ReadonlyArray<JsxImport> => {
    const imports: JsxImport[] = []

    IMPORT_REGEX.lastIndex = 0
    let match: RegExpMatchArray | null

    while ((match = IMPORT_REGEX.exec(content)) !== null) {
        const importPath = match[2]

        if (!isJsxImport(importPath)) {
            continue
        }

        if (!isOnboardingOrDocsImport(importPath)) {
            continue
        }

        if (isComponentImport(importPath)) {
            continue
        }

        const name = extractImportName(match[0], match[1])
        if (name) {
            imports.push({
                name,
                path: importPath,
                fullMatch: match[0],
            })
        }
    }

    return imports
}

const resolveTsxPathWithExtensions = (basePath: string, hasExtension: boolean): string | null => {
    if (hasExtension && fs.existsSync(basePath)) {
        return basePath
    }

    for (const ext of TSX_FILE_EXTENSIONS) {
        const fullPath = basePath + ext
        if (fs.existsSync(fullPath)) {
            return fullPath
        }
    }

    return fs.existsSync(basePath) ? basePath : null
}

const resolveTsxPath = (importPath: string, baseFilePath: string): string | null => {
    if (!importPath || !baseFilePath) return null

    try {
        const cleanPath = removeQuotes(importPath)
        if (!cleanPath) return null

        const hasExt = isJsxImport(cleanPath)

        for (const [alias, aliasPath] of Object.entries(ALIAS_MAPPINGS)) {
            if (cleanPath.startsWith(`${alias}/`)) {
                const relativePath = cleanPath.replace(`${alias}/`, '')
                const resolvedPath = path.resolve(aliasPath, relativePath)
                const result = resolveTsxPathWithExtensions(resolvedPath, hasExt)
                if (result) return result
            }
        }

        if (isRelativePath(cleanPath)) {
            const baseDir = path.dirname(baseFilePath)
            const resolvedPath = path.resolve(baseDir, cleanPath)
            const result = resolveTsxPathWithExtensions(resolvedPath, hasExt)
            if (result) return result
        }

        return null
    } catch {
        return null
    }
}

const extractJsxContent = (
    filePath: string,
    componentName: string,
    logFn?: (message: string) => void
): string | null => {
    if (!fs.existsSync(filePath)) {
        logFn?.(`      ❌ File does not exist: ${filePath}`)
        return null
    }

    try {
        const content = fs.readFileSync(filePath, 'utf-8')
        logFn?.(`      Reading file (${content.length} chars)`)

        const exportPattern = new RegExp(
            `export\\s+(?:const|function)\\s+${escapeRegex(
                componentName
            )}\\s*[=:]\\s*(?:\\([^)]*\\)\\s*[:=]\\s*)?(?:JSX\\.Element|React\\.Element|React\\.ReactElement)?\\s*=>\\s*\\{`,
            's'
        )

        const exportMatch = content.match(exportPattern)
        if (!exportMatch) {
            logFn?.(`      ❌ Export pattern not found for ${componentName}`)
            return null
        }

        logFn?.(`      ✓ Export pattern found at index ${exportMatch.index}`)

        const functionStart = exportMatch.index! + exportMatch[0].length

        const returnPattern = /return\s+(?:\(|<>)?/s
        const returnMatch = content.substring(functionStart).match(returnPattern)
        if (!returnMatch) {
            logFn?.(`      ❌ Return statement not found`)
            return null
        }

        logFn?.(`      ✓ Return statement found`)

        const returnStart = functionStart + returnMatch.index! + returnMatch[0].length
        let returnContent = content.substring(returnStart).trim()

        logFn?.(`      Return content starts with: ${returnContent.substring(0, 50)}...`)

        if (returnContent.startsWith('(')) {
            logFn?.(`      Extracting from parenthesis`)
            let depth = 1
            let i = 1
            let inString = false
            let stringChar = ''
            let inTemplate = false

            while (i < returnContent.length && depth > 0) {
                const char = returnContent[i]

                if (!inString && !inTemplate) {
                    if (char === '(') {
                        depth++
                    } else if (char === ')') {
                        depth--
                    } else if (char === '"' || char === "'") {
                        inString = true
                        stringChar = char
                    } else if (char === '`') {
                        inTemplate = true
                    }
                } else if (inString) {
                    if (char === stringChar && (i === 0 || returnContent[i - 1] !== '\\')) {
                        inString = false
                    }
                } else if (inTemplate) {
                    if (char === '`' && (i === 0 || returnContent[i - 1] !== '\\')) {
                        inTemplate = false
                    }
                }

                i++
            }

            if (depth === 0) {
                returnContent = returnContent.substring(1, i - 1).trim()
                logFn?.(`      ✓ Extracted JSX content (${returnContent.length} chars)`)
                return returnContent
            } else {
                logFn?.(`      ❌ Parenthesis depth mismatch (depth: ${depth})`)
                return null
            }
        } else if (returnContent.startsWith('<>')) {
            logFn?.(`      Extracting from fragment`)
            const fragmentEnd = returnContent.lastIndexOf('</>')
            if (fragmentEnd === -1) {
                logFn?.(`      ❌ Could not find closing fragment tag`)
                return null
            }

            returnContent = returnContent.substring(2, fragmentEnd).trim()
            logFn?.(`      ✓ Extracted JSX content (${returnContent.length} chars)`)
            return returnContent
        } else {
            logFn?.(`      ❌ Return content does not start with ( or <>`)
            return null
        }
    } catch (error) {
        logFn?.(`      ❌ Error extracting JSX: ${error}`)
        return null
    }
}

const resolveJsxImportsInContent = (
    content: string,
    baseFilePath: string,
    visited: ReadonlySet<string> = new Set(),
    logFn?: (message: string) => void
): string => {
    const imports = findJsxImports(content)

    if (imports.length === 0) {
        return content
    }

    logFn?.(`  Found ${imports.length} JSX import(s)`)

    let resolvedContent = content

    resolvedContent = imports.reduce((acc, imp) => {
        logFn?.(`  Resolving import: ${imp.name} from ${imp.path}`)

        const resolvedPath = resolveTsxPath(imp.path, baseFilePath)
        if (!resolvedPath) {
            logFn?.(`    ❌ Could not resolve path: ${imp.path}`)
            return acc
        }

        const normalizedPath = path.resolve(resolvedPath)

        if (visited.has(normalizedPath)) {
            logFn?.(`    ⚠️  Already visited, skipping to prevent infinite loop: ${resolvedPath}`)
            return acc
        }

        const newVisited = new Set(visited).add(normalizedPath)

        logFn?.(`    → Resolved to: ${resolvedPath}`)

        if (!fs.existsSync(resolvedPath)) {
            logFn?.(`    ❌ File not found: ${resolvedPath}`)
            return acc
        }

        const tsxContent = fs.readFileSync(resolvedPath, 'utf-8')
        const nestedResolved = resolveJsxImportsInContent(tsxContent, resolvedPath, newVisited, logFn)

        const extractedJsx = extractJsxContent(resolvedPath, imp.name, logFn)
        if (extractedJsx) {
            const finalJsx = resolveJsxImportsInContent(extractedJsx, resolvedPath, newVisited, logFn)
            logFn?.(`    ✓ Extracted and resolved JSX content (${finalJsx.length} chars)`)
            return preserveIndentationAndInsert(acc, imp.name, finalJsx)
        } else {
            logFn?.(`    ⚠️  Could not extract JSX content for ${imp.name}`)
        }

        return acc
    }, resolvedContent)

    const remainingImports = findJsxImports(resolvedContent)
    return removeImportStatements(resolvedContent, remainingImports)
}
