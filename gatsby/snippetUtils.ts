import fs from 'fs'
import path from 'path'
type Snippet = {
    component: string
    path: string
    snippet: string | undefined
}

export const resolveSnippetImports = (
    body: string,
    filePath: string,
    restrictToOnlySnippetsDir: boolean = true
): Snippet[] => {
    const regex = restrictToOnlySnippetsDir
        ? /import\s+(.*?)\s+from\s+['"](.*?\/_snippets\/.*?)['"]/g
        : /import\s+(.*?)\s+from\s+['"](.*?\.(md|mdx))['"]/g
    const imports: Snippet[] = []
    let match
    while ((match = regex.exec(body)) !== null) {
        const snippetPath = match[2]
        const cleanPath = path.resolve(path.dirname(filePath), snippetPath)
        if (fs.existsSync(cleanPath)) {
            let snippet = fs.readFileSync(cleanPath, 'utf8').trimEnd()

            // Recursively resolve nested imports using the snippet's own file path (for relative imports)
            const nestedImports = resolveSnippetImports(snippet, cleanPath, false)
            if (nestedImports.length > 0) {
                snippet = replaceSnippetImports(snippet, nestedImports)
            }

            imports.push({
                component: match[1],
                path: match[2],
                snippet,
            })
        }
    }
    return imports
}

export const replaceSnippetImports = (body: string, imports: Snippet[]): string => {
    let result = body
    imports.forEach(({ component, path, snippet }) => {
        if (snippet) {
            // Replace the component with the snippet
            const componentRegex = new RegExp(`<${component}\\s*/>`, 'g')
            result = result.replace(componentRegex, snippet)

            // Remove the import from the file
            const importRegex = new RegExp(
                `import\\s+${component}\\s+from\\s+['"]${path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]\\s*\\n?`,
                'g'
            )
            result = result.replace(importRegex, '')
        }
    })
    return result
}
