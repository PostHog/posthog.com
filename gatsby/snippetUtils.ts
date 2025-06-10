import fs from 'fs'
import path from 'path'
type Snippet = {
    component: string
    path: string
    snippet: string | undefined
}

export const resolveSnippetImports = (body: string, filePath: string): Snippet[] => {
    const regex = /import\s+(.*?)\s+from\s+['"](.*?\/_snippets\/.*?)['"]/g
    const imports: Snippet[] = []
    let match
    while ((match = regex.exec(body)) !== null) {
        const snippetPath = match[2]
        const cleanPath = path.resolve(path.dirname(filePath), snippetPath)
        if (fs.existsSync(cleanPath)) {
            const snippet = fs.readFileSync(cleanPath, 'utf8').trimEnd()
            imports.push({ component: match[1], path: match[2], snippet })
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
