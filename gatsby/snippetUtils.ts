import path from 'path'
import fs from 'fs'
import { stripFrontmatter } from './utils'

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

export function resolveMDXSnippets(rawBody: string, filePath: string | undefined, slug?: string): string {
    if (!rawBody || !filePath) return rawBody || ''

    try {
        const visited = new Set<string>()
        const resolved = resolveMdxImports(filePath, visited)
        if (!resolved) {
            return stripFrontmatter(rawBody)
        }
        return resolved
    } catch (error) {
        console.error(`❌ Error resolving snippets for ${slug || filePath}:`, error)
        return stripFrontmatter(rawBody)
    }
}

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
