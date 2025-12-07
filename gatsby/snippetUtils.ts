import path from 'path'
import fs from 'fs'
import { stripFrontmatter } from './utils'
import prettier from 'prettier'

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
const stripImports = (content: string): string => {
    return content.replace(/^import\s+.*?['"].*?['"]\s*;?\s*$/gm, '').trim()
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
    const propsPattern = '(?:\\s+[^>]*)?'
    const selfClosing = `<${escapedName}${propsPattern}\\s*/>`
    const openingClosing = `<${escapedName}${propsPattern}>[\\s\\S]*?<\\/${escapedName}>`
    const conditionalSelfClosing = `\\{${escapedName}\\s+&&\\s*${selfClosing}\\}`
    const conditionalOpeningClosing = `\\{${escapedName}\\s+&&\\s*${openingClosing}\\}`

    return new RegExp(
        `(${conditionalSelfClosing})|(${conditionalOpeningClosing})|(${selfClosing})|(${openingClosing})`,
        'g'
    )
}

const replaceComponentTags = (content: string, componentName: string, replacement: string): string => {
    const regex = createComponentTagRegex(componentName)
    return content.replace(regex, `\n${replacement}\n`)
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

const TSX_FILE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'] as const

const isJsxTsxImport = (importPath: string): boolean => {
    const cleanPath = removeQuotes(importPath)
    return cleanPath.includes('onboarding/') || cleanPath.includes('_snippets/')
}

const hasJsxTsxExtension = (filePath: string): boolean => {
    return /\.(tsx|ts|jsx|js)$/.test(filePath)
}

const extractJsxTsxImportName = (
    importStatement: string,
    namedImport?: string,
    isDefault?: boolean
): { name: string; isDefault: boolean } | null => {
    if (namedImport) {
        const names = namedImport.split(',').map((n) => n.trim())
        if (names.length > 0) {
            return { name: names[0], isDefault: false }
        }
    }

    const match = importStatement.match(DEFAULT_IMPORT_NAME_REGEX)
    if (match) {
        return { name: match[1], isDefault: true }
    }

    return null
}

type JsxTsxImport = {
    readonly name: string
    readonly path: string
    readonly fullMatch: string
    readonly isDefault: boolean
}

const findJsxTsxImports = (content: string): ReadonlyArray<JsxTsxImport> => {
    const imports: JsxTsxImport[] = []

    IMPORT_REGEX.lastIndex = 0
    let match: RegExpMatchArray | null

    while ((match = IMPORT_REGEX.exec(content)) !== null) {
        const importPath = match[2]

        if (!isJsxTsxImport(importPath)) {
            continue
        }

        if (!hasJsxTsxExtension(importPath)) {
            continue
        }

        const importInfo = extractJsxTsxImportName(match[0], match[1])
        if (importInfo) {
            imports.push({
                name: importInfo.name,
                path: importPath,
                fullMatch: match[0],
                isDefault: importInfo.isDefault,
            })
        }
    }

    return imports
}

const resolveJsxTsxPathWithExtensions = (basePath: string, hasExtension: boolean): string | null => {
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

const resolveJsxTsxPath = (importPath: string, baseFilePath: string): string | null => {
    if (!importPath || !baseFilePath) return null

    try {
        const cleanPath = removeQuotes(importPath)
        if (!cleanPath) return null

        const hasExt = hasJsxTsxExtension(cleanPath)

        if (cleanPath.startsWith('onboarding/')) {
            const onboardingPath = ALIAS_MAPPINGS.onboarding
            if (onboardingPath) {
                const relativePath = cleanPath.replace('onboarding/', '')
                const resolvedPath = path.resolve(onboardingPath, relativePath)
                const result = resolveJsxTsxPathWithExtensions(resolvedPath, hasExt)
                if (result) return result
            }
        }

        if (cleanPath.includes('_snippets/')) {
            if (isRelativePath(cleanPath)) {
                const baseDir = path.dirname(baseFilePath)
                const resolvedPath = path.resolve(baseDir, cleanPath)
                const result = resolveJsxTsxPathWithExtensions(resolvedPath, hasExt)
                if (result) return result
            }
        }

        return null
    } catch {
        return null
    }
}

const extractReturnValue = (functionBody: string): string | null => {
    const returnRegex = /\breturn\s+/
    const returnMatch = functionBody.match(returnRegex)
    if (!returnMatch) {
        return null
    }

    const returnIndex = functionBody.indexOf(returnMatch[0]) + returnMatch[0].length
    const returnContent = functionBody.substring(returnIndex)

    let i = 0
    while (i < returnContent.length && /\s/.test(returnContent[i])) {
        i++
    }

    if (i >= returnContent.length) {
        return null
    }

    if (returnContent[i] === '(') {
        let parenCount = 1
        let inString = false
        let stringChar = ''
        i++

        while (i < returnContent.length && parenCount > 0) {
            const char = returnContent[i]

            if (!inString && (char === '"' || char === "'" || char === '`')) {
                inString = true
                stringChar = char
            } else if (inString && char === stringChar && (i === 0 || returnContent[i - 1] !== '\\')) {
                inString = false
            } else if (!inString) {
                if (char === '(') parenCount++
                if (char === ')') parenCount--
            }

            i++
        }

        if (parenCount === 0) {
            const innerContent = returnContent.substring(1, i - 1).trim()
            return innerContent
        }
    } else if (returnContent[i] === '<') {
        let braceCount = 0
        let inString = false
        let stringChar = ''
        let lastBraceIndex = -1

        while (i < returnContent.length) {
            const char = returnContent[i]

            if (!inString && (char === '"' || char === "'" || char === '`')) {
                inString = true
                stringChar = char
            } else if (inString && char === stringChar && (i === 0 || returnContent[i - 1] !== '\\')) {
                inString = false
            } else if (!inString) {
                if (char === '{') braceCount++
                if (char === '}') {
                    braceCount--
                    if (braceCount === 0) {
                        lastBraceIndex = i
                        let j = i + 1
                        while (j < returnContent.length && /\s/.test(returnContent[j])) {
                            j++
                        }
                        if (j >= returnContent.length || returnContent[j] === ';' || returnContent[j] === '\n') {
                            return returnContent.substring(0, lastBraceIndex + 1).trim()
                        }
                    }
                }
            }

            i++
        }

        if (lastBraceIndex !== -1) {
            return returnContent.substring(0, lastBraceIndex + 1).trim()
        }
    }

    return null
}

const extractComponentDefinition = (content: string, componentName: string, isDefault: boolean): string | null => {
    const importRegex = /^import\s+.*?from\s+['"].*?['"];?\s*$/gm
    let cleanedContent = content.replace(importRegex, '')

    if (isDefault) {
        const componentPatterns = [
            new RegExp(`const\\s+${escapeRegex(componentName)}\\s*[=:]`, 'g'),
            new RegExp(`function\\s+${escapeRegex(componentName)}\\s*\\(`, 'g'),
            new RegExp(`export\\s+const\\s+${escapeRegex(componentName)}\\s*[=:]`, 'g'),
            new RegExp(`export\\s+function\\s+${escapeRegex(componentName)}\\s*\\(`, 'g'),
        ]

        let componentStart = -1
        for (const pattern of componentPatterns) {
            const match = cleanedContent.match(pattern)
            if (match) {
                componentStart = cleanedContent.indexOf(match[0])
                break
            }
        }

        if (componentStart === -1) {
            return null
        }

        const exportDefaultRegex = new RegExp(`export\\s+default\\s+${escapeRegex(componentName)}`, 'g')
        const exportDefaultMatch = cleanedContent.match(exportDefaultRegex)
        const exportDefaultIndex = exportDefaultMatch
            ? cleanedContent.indexOf(exportDefaultMatch[0])
            : cleanedContent.length

        let componentCode = cleanedContent.substring(componentStart, exportDefaultIndex)

        const arrowIndex = componentCode.indexOf('=>')
        if (arrowIndex !== -1) {
            let i = arrowIndex + 2
            while (i < componentCode.length && /\s/.test(componentCode[i])) {
                i++
            }

            if (i < componentCode.length && componentCode[i] === '{') {
                let braceCount = 1
                let inString = false
                let stringChar = ''
                i++

                while (i < componentCode.length && braceCount > 0) {
                    const char = componentCode[i]

                    if (!inString && (char === '"' || char === "'" || char === '`')) {
                        inString = true
                        stringChar = char
                    } else if (inString && char === stringChar && (i === 0 || componentCode[i - 1] !== '\\')) {
                        inString = false
                    } else if (!inString) {
                        if (char === '{') braceCount++
                        if (char === '}') braceCount--
                    }

                    i++
                }

                if (braceCount === 0) {
                    return componentCode.substring(0, i).trim()
                }
            }
        } else {
            let i = 0
            while (i < componentCode.length && componentCode[i] !== '{') {
                i++
            }

            if (i < componentCode.length) {
                let braceCount = 1
                let inString = false
                let stringChar = ''
                i++

                while (i < componentCode.length && braceCount > 0) {
                    const char = componentCode[i]

                    if (!inString && (char === '"' || char === "'" || char === '`')) {
                        inString = true
                        stringChar = char
                    } else if (inString && char === stringChar && (i === 0 || componentCode[i - 1] !== '\\')) {
                        inString = false
                    } else if (!inString) {
                        if (char === '{') braceCount++
                        if (char === '}') braceCount--
                    }

                    i++
                }

                if (braceCount === 0) {
                    const bodyStart = componentCode.indexOf('{') + 1
                    const bodyEnd = i - 1
                    const functionBody = componentCode.substring(bodyStart, bodyEnd)
                    const returnValue = extractReturnValue(functionBody)
                    return returnValue || functionBody.trim()
                }
            }
        }

        const returnValue = extractReturnValue(componentCode)
        return returnValue || componentCode.trim()
    } else {
        const namedExportRegex = new RegExp(`export\\s+(const|function)\\s+${escapeRegex(componentName)}\\s*[=:(]`, 'g')

        const match = cleanedContent.match(namedExportRegex)
        if (!match) {
            return null
        }

        const startIndex = cleanedContent.indexOf(match[0])
        const componentCode = cleanedContent.substring(startIndex)

        const arrowIndex = componentCode.indexOf('=>')
        if (arrowIndex !== -1) {
            let i = arrowIndex + 2
            while (i < componentCode.length && /\s/.test(componentCode[i])) {
                i++
            }

            if (i < componentCode.length && componentCode[i] === '{') {
                const braceStart = i
                let braceCount = 1
                let inString = false
                let stringChar = ''
                i++

                while (i < componentCode.length && braceCount > 0) {
                    const char = componentCode[i]

                    if (!inString && (char === '"' || char === "'" || char === '`')) {
                        inString = true
                        stringChar = char
                    } else if (inString && char === stringChar && (i === 0 || componentCode[i - 1] !== '\\')) {
                        inString = false
                    } else if (!inString) {
                        if (char === '{') braceCount++
                        if (char === '}') braceCount--
                    }

                    i++
                }

                if (braceCount === 0) {
                    const bodyStart = braceStart + 1
                    const bodyEnd = i - 1
                    const functionBody = componentCode.substring(bodyStart, bodyEnd)
                    const returnValue = extractReturnValue(functionBody)
                    return returnValue || functionBody.trim()
                }
            }
        } else {
            let i = 0
            while (i < componentCode.length && componentCode[i] !== '{') {
                i++
            }

            if (i < componentCode.length) {
                const braceStart = i
                let braceCount = 1
                let inString = false
                let stringChar = ''
                i++

                while (i < componentCode.length && braceCount > 0) {
                    const char = componentCode[i]

                    if (!inString && (char === '"' || char === "'" || char === '`')) {
                        inString = true
                        stringChar = char
                    } else if (inString && char === stringChar && (i === 0 || componentCode[i - 1] !== '\\')) {
                        inString = false
                    } else if (!inString) {
                        if (char === '{') braceCount++
                        if (char === '}') braceCount--
                    }

                    i++
                }

                if (braceCount === 0) {
                    const bodyStart = braceStart + 1
                    const bodyEnd = i - 1
                    const functionBody = componentCode.substring(bodyStart, bodyEnd)
                    const returnValue = extractReturnValue(functionBody)
                    return returnValue || functionBody.trim()
                }
            }
        }

        const returnValue = extractReturnValue(componentCode)
        return returnValue || componentCode.trim()
    }
}

const findComponentUsage = (componentName: string): RegExp => {
    const escapedName = escapeRegex(componentName)
    const propsPattern = '(?:\\s+[^>]*)?'
    const selfClosing = `<${escapedName}${propsPattern}\\s*/>`
    const openingClosing = `<${escapedName}${propsPattern}>[\\s\\S]*?<\\/${escapedName}>`
    const conditionalSelfClosing = `\\{${escapedName}\\s+&&\\s*${selfClosing}\\}`
    const conditionalOpeningClosing = `\\{${escapedName}\\s+&&\\s*${openingClosing}\\}`

    return new RegExp(
        `(${conditionalSelfClosing})|(${conditionalOpeningClosing})|(${selfClosing})|(${openingClosing})`,
        'g'
    )
}

const replaceComponentUsage = (content: string, componentName: string, replacement: string): string => {
    const regex = findComponentUsage(componentName)
    return content.replace(regex, `\n${extractJSXReturn(replacement)}\n`)
}

const removeJsxTsxImportStatements = (content: string, imports: ReadonlyArray<JsxTsxImport>): string => {
    return imports.reduce((acc, imp) => {
        const importLine = imp.fullMatch.replace(/\n$/, '')
        return acc.replace(new RegExp(escapeRegex(importLine) + '\\s*\\n?', 'g'), '')
    }, content)
}

const resolveJsxTsxImportsFromFile = (filePath: string, visited: ReadonlySet<string> = new Set()): string => {
    const normalizedPath = path.resolve(filePath)

    if (visited.has(normalizedPath)) {
        return ''
    }

    const newVisited = new Set(visited).add(normalizedPath)

    if (!fs.existsSync(filePath)) {
        return ''
    }

    const content = fs.readFileSync(filePath, 'utf-8')
    return resolveJsxTsxImports(content, filePath, newVisited)
}

const resolveJsxTsxImports = (
    content: string,
    baseFilePath: string,
    visited: ReadonlySet<string> = new Set()
): string => {
    const imports = findJsxTsxImports(content)

    let resolvedContent = removeJsxTsxImportStatements(content, imports)

    resolvedContent = imports.reduce((acc, imp) => {
        const resolvedPath = resolveJsxTsxPath(imp.path, baseFilePath)
        if (!resolvedPath) {
            return acc
        }

        const importedFileContent = resolveJsxTsxImportsFromFile(resolvedPath, visited)
        const originalFileContent = fs.readFileSync(resolvedPath, 'utf-8')
        const componentDef = extractComponentDefinition(originalFileContent, imp.name, imp.isDefault)

        if (componentDef) {
            const tempDir = path.dirname(resolvedPath)
            const tempFilePath = path.join(tempDir, `__temp_${imp.name}.tsx`)

            try {
                fs.writeFileSync(tempFilePath, componentDef, 'utf-8')
                const resolvedComponentDef = resolveJsxTsxImports(componentDef, tempFilePath, visited)
                fs.unlinkSync(tempFilePath)

                return replaceComponentUsage(acc, imp.name, resolvedComponentDef || componentDef)
            } catch (error) {
                try {
                    const resolvedComponentDef = resolveJsxTsxImports(componentDef, resolvedPath, visited)
                    return replaceComponentUsage(acc, imp.name, resolvedComponentDef || componentDef)
                } catch {
                    return replaceComponentUsage(acc, imp.name, componentDef)
                }
            }
        }

        return acc
    }, resolvedContent)

    const remainingImports = findJsxTsxImports(resolvedContent)
    return removeJsxTsxImportStatements(resolvedContent, remainingImports)
}

const resolveMdxComponentUsages = (content: string, baseFilePath: string): string => {
    const mdxImportRegex = /^import\s+(\w+)\s+from\s+['"]([^'"]*\/_snippets\/[^'"]*\.mdx)['"]\s*;?\s*$/gm
    const imports: Array<{ name: string; path: string; fullMatch: string }> = []

    let match
    while ((match = mdxImportRegex.exec(content)) !== null) {
        imports.push({
            name: match[1],
            path: match[2],
            fullMatch: match[0],
        })
    }

    if (imports.length === 0) return content

    let resolved = content

    for (const imp of imports) {
        const mdxPath = resolveMdxPath(imp.path, baseFilePath)
        if (!mdxPath || !fs.existsSync(mdxPath)) continue

        const mdxContent = fs.readFileSync(mdxPath, 'utf-8')
        const strippedContent = stripFrontmatter(mdxContent)
        // Only strip MDX imports, preserve TSX imports for later resolution
        const mdxOnlyImportRegex = /^import\s+.*?from\s+['"].*?\.mdx?['"]\s*;?\s*$/gm
        const cleanContent = strippedContent.replace(mdxOnlyImportRegex, '').trim()

        if (cleanContent) {
            resolved = replaceComponentTags(resolved, imp.name, cleanContent)
        }

        resolved = resolved.replace(new RegExp(escapeRegex(imp.fullMatch) + '\\s*\\n?', 'g'), '')
    }

    return resolved
}

export function resolveJsxSnippets(content: string, filePath: string, slug?: string): string {
    if (!content || !filePath) return content || ''

    try {
        const visited = new Set<string>()

        let resolved = resolveJsxTsxImports(content, filePath, visited)
        if (!resolved) {
            return normalizeEmptyLines(content)
        }

        resolved = resolveMdxComponentUsages(resolved, filePath)

        resolved = resolveJsxTsxImports(resolved, filePath, visited)

        resolved = stripImports(resolved)

        // Call prettier to format the resolved content
        resolved = prettier.format(resolved, {
            parser: 'babel',
            printWidth: 120,
            tabWidth: 2,
            useTabs: false,
        })

        return normalizeEmptyLines(resolved)
    } catch (error) {
        console.error(`❌ Error resolving JSX snippets for ${slug || filePath}:`, error)
        return normalizeEmptyLines(content)
    }
}

// Stuff to deal with JSX snippet return content

function extractJSXReturn(code) {
    const cleaned = removeComments(code)
    const returnContent = findReturnContent(cleaned)
    return returnContent
}

function removeComments(code) {
    let result = '',
        i = 0,
        inString = false,
        stringChar = '',
        inTemplate = false
    while (i < code.length) {
        if (code[i] === '`' && !inString) {
            inTemplate = !inTemplate
            result += code[i++]
            continue
        }
        if ((code[i] === '"' || code[i] === "'") && !inTemplate) {
            if (!inString) {
                inString = true
                stringChar = code[i]
            } else if (code[i] === stringChar && code[i - 1] !== '\\') inString = false
            result += code[i++]
            continue
        }
        if (!inString && !inTemplate) {
            if (code[i] === '/' && code[i + 1] === '/') {
                while (i < code.length && code[i] !== '\n') i++
                continue
            }
            if (code[i] === '/' && code[i + 1] === '*') {
                i += 2
                while (i < code.length - 1 && !(code[i] === '*' && code[i + 1] === '/')) i++
                i += 2
                continue
            }
        }
        result += code[i++]
    }
    return result
}

function findReturnContent(code) {
    const explicit = findExplicitReturn(code)
    if (explicit) return explicit
    const implicit = findImplicitArrowReturn(code)
    if (implicit) return implicit
    return null
}

function findExplicitReturn(code) {
    let candidates = [],
        i = 0
    while (i < code.length) {
        if (code.substring(i, i + 6) === 'return') {
            const before = i === 0 ? ' ' : code[i - 1]
            const after = code[i + 6] || ' '
            if (/[\s{;(]/.test(before) && /[\s(<{]/.test(after)) {
                let j = i + 6
                while (j < code.length && /\s/.test(code[j])) j++
                const content = extractJSXFromPosition(code, j)
                if (content?.trim() && (content.trim().startsWith('<') || content.trim().startsWith('(')))
                    candidates.push(content)
                i = j + (content?.length || 0)
                continue
            }
        }
        i++
    }
    if (candidates.length > 0) {
        const jsx = candidates.filter((c) => c.trim().startsWith('<') || c.trim().startsWith('('))
        return jsx.length > 0 ? jsx.reduce((a, b) => (a.length > b.length ? a : b)) : candidates[candidates.length - 1]
    }
    return null
}

function findImplicitArrowReturn(code) {
    const match = code.match(/=>\s*(\(?\s*<)/)
    if (match) {
        const beforeJsx = code.substring(code.indexOf(match[0]) + 2).trim()
        if (beforeJsx.startsWith('(')) return extractParenContent(code, code.indexOf('(', code.indexOf('=>')))
        return extractJSXFromPosition(code, code.indexOf(match[0]) + match[0].length - 1)
    }
    return null
}

function extractJSXFromPosition(code, startIndex) {
    let i = startIndex
    while (i < code.length && /\s/.test(code[i])) i++
    if (i >= code.length) return null
    if (code[i] === '(') return extractParenContent(code, i)
    if (code[i] === '<') return extractJSXElement(code, i)
    return null
}

function extractParenContent(code, startIndex) {
    let depth = 0,
        content = '',
        i = startIndex,
        started = false
    while (i < code.length) {
        if (code[i] === '(') {
            depth++
            if (started) content += code[i]
            started = true
        } else if (code[i] === ')') {
            depth--
            if (depth === 0) return content.trim()
            content += code[i]
        } else if (started) content += code[i]
        i++
    }
    return content.trim()
}

function extractJSXElement(code, startIndex) {
    let i = startIndex,
        result = '',
        depth = 0,
        inString = false,
        stringChar = '',
        inExpr = 0
    while (i < code.length) {
        const char = code[i],
            next = code[i + 1] || ''
        if ((char === '"' || char === "'" || char === '`') && inExpr === 0) {
            if (!inString) {
                inString = true
                stringChar = char
            } else if (char === stringChar && code[i - 1] !== '\\') inString = false
            result += char
            i++
            continue
        }
        if (char === '{' && !inString) {
            inExpr++
            result += char
            i++
            continue
        }
        if (char === '}' && !inString) {
            inExpr--
            result += char
            i++
            continue
        }
        if (!inString && inExpr === 0) {
            if (char === '<') {
                if (next === '/') {
                    result += char
                    i++
                    while (i < code.length && code[i] !== '>') {
                        result += code[i]
                        i++
                    }
                    if (i < code.length) {
                        result += '>'
                        depth--
                        i++
                        if (depth === 0) return result
                    }
                    continue
                } else if (/[a-zA-Z]/.test(next) || next === '>') depth++
            }
            if (char === '/' && next === '>') {
                depth--
                result += '/>'
                i += 2
                if (depth === 0) return result
                continue
            }
            if (char === '>' && result.length > 0) {
                result += char
                i++
                continue
            }
        }
        result += char
        i++
    }
    return result
}
