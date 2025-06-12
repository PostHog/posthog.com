import path from 'path'
import fs from 'fs'

// Function to generate llms.txt file according to spec
const generateLlmsTxt = (pages) => {
    console.log('Generating llms.txt file...')

    // Group pages by their first URL segment
    const pagesBySection = {}

    for (const doc of pages) {
        const { slug } = doc.fields
        const { title } = doc.frontmatter

        // Filter out auto-generated API endpoint pages but allow specific API subdirectories
        const segments = slug.split('/').filter(Boolean)
        if (segments.length > 2 && segments[0] === 'docs' && segments[1] === 'api') {
            // Allow specific API subdirectories
            const allowedApiSubdirs = ['queries', 'flags', 'capture']
            const apiSubdir = segments[2]

            // If it's not an allowed subdirectory, filter it out
            if (!allowedApiSubdirs.includes(apiSubdir)) {
                continue
            }
        }

        // Extract section from slug for docs subsections
        let section = segments.length > 0 ? segments[0] : 'root'

        // Special handling for docs subsections - split by second parameter
        if (section === 'docs' && segments.length > 1) {
            section = `docs-${segments[1]}`
        }

        if (!pagesBySection[section]) {
            pagesBySection[section] = []
        }

        pagesBySection[section].push({
            title,
            slug,
            url: `https://posthog.com${slug}.md`,
        })
    }

    // Sort sections with docs subsections first, then tutorials, then alphabetical
    const sections = Object.keys(pagesBySection).sort((a, b) => {
        // All docs sections come first
        const aIsDocs = a.startsWith('docs')
        const bIsDocs = b.startsWith('docs')

        if (aIsDocs && !bIsDocs) return -1
        if (!aIsDocs && bIsDocs) return 1

        // Among docs sections, prioritize libraries and api first
        if (aIsDocs && bIsDocs) {
            if (a === 'docs-libraries') return -1
            if (b === 'docs-libraries') return 1
            if (a === 'docs-api') return -1
            if (b === 'docs-api') return 1
            return a.localeCompare(b)
        }

        // Tutorials come next
        if (a === 'tutorials') return -1
        if (b === 'tutorials') return 1

        // Everything else alphabetically
        return a.localeCompare(b)
    })

    // Build llms.txt content according to spec
    let llmsTxtContent = `# PostHog

> PostHog is an open-source platform for customer infrastructure. We equip developers with everything they need to build successful products –  product analytics, web analytics, feature flags, session replay, A/B testing, error tracking, surveys, LLM observability, data warehousing, and more.

`

    // Add sections with file lists
    for (const section of sections) {
        let sectionTitle = section.charAt(0).toUpperCase() + section.slice(1)

        // Special handling for docs subsection titles
        if (section.startsWith('docs-')) {
            const subsection = section.replace('docs-', '')
            const formattedSubsection = subsection
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
            sectionTitle = `Docs - ${formattedSubsection}`
        }

        llmsTxtContent += `## ${sectionTitle}\n\n`

        // Sort pages within section by title
        const sortedPages = pagesBySection[section].sort((a, b) => a.title.localeCompare(b.title))

        for (const page of sortedPages) {
            llmsTxtContent += `- [${page.title}](${page.url})\n`
        }

        llmsTxtContent += '\n'
    }

    // Write llms.txt to public directory
    const publicPath = path.resolve(__dirname, '../public')
    const llmsTxtPath = path.join(publicPath, 'llms.txt')

    // Ensure public directory exists
    if (!fs.existsSync(publicPath)) {
        fs.mkdirSync(publicPath, { recursive: true })
    }

    fs.writeFileSync(llmsTxtPath, llmsTxtContent, 'utf8')
    console.log('Generated: llms.txt')
}

// Function to generate markdown files for LLMs
export const generateRawMarkdownPages = async (pages) => {
    console.log('Generating markdown files for LLMs and llms.txt...')

    // Filter out any pages with certain slugs
    const excludeTerms = [
        '_snippets',
        '/snippets/',
        '_includes',
        '/thanks/',
        '/notes/test-note',
        '/service-error',
        '/service-message',
        '/services',
        '/request-received',
        '/application-received',
        '/teams/',
        '/hosthog',
        '/startups',
    ]
    const filteredPages = pages.filter((doc) => !excludeTerms.some((term) => doc.fields.slug.includes(term)))

    console.log(`Found ${filteredPages.length} docs to generate markdown for (filtered from ${pages.length} total)`)

    for (const doc of filteredPages) {
        try {
            const { slug, contentWithSnippets } = doc.fields
            const { title } = doc.frontmatter
            const body = contentWithSnippets || doc.rawBody

            // Create the frontmatter, so it always has the page title
            let markdownContent = `---\ntitle: ${title}\nslug: ${slug}\n---\n`

            // Add the content
            if (body) {
                // Process internal links to point to .md equivalents
                let processedBody = body.replace(/\[([^\]]+)\]\(\/([^)]+)\)/g, (match, text, path) => {
                    // Only convert if the path doesn't already end with .md
                    if (!path.endsWith('.md')) {
                        return `[${text}](/${path}.md)`
                    }
                    return match
                })

                markdownContent += processedBody
            }

            // Create the directory structure
            const publicPath = path.resolve(__dirname, '../public')
            const filePath = path.join(publicPath, `${slug}.md`)
            const dirPath = path.dirname(filePath)

            // Ensure directory exists
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true })
            }

            // Write the file
            fs.writeFileSync(filePath, markdownContent, 'utf8')
            console.log(`Generated: ${slug}.md`)
        } catch (error) {
            console.error(`Error generating markdown for ${doc.fields.slug}:`, error)
        }
    }

    // Generate llms.txt file
    generateLlmsTxt(filteredPages)
}

// Function to generate individual API endpoint markdown files
export const generateApiSpecMarkdown = (spec: any) => {
    console.log('Generating API endpoint markdown files...')

    const apiSpecDir = path.join(process.cwd(), 'public', 'docs', 'api-spec')
    if (!fs.existsSync(apiSpecDir)) {
        fs.mkdirSync(apiSpecDir, { recursive: true })
    }

    let totalEndpoints = 0

    // Iterate through all paths in the OpenAPI spec
    Object.entries(spec.paths || {}).forEach(([pathName, pathData]: [string, any]) => {
        // Iterate through all HTTP methods for this path
        Object.entries(pathData).forEach(([method, operation]: [string, any]) => {
            if (typeof operation === 'object' && operation.operationId) {
                totalEndpoints++

                // Create a safe filename from the operation ID
                const filename = `${operation.operationId}.md`
                const filePath = path.join(apiSpecDir, filename)

                // Find all component references in this operation
                const referencedComponents = new Set<string>()
                const findRefs = (obj: any) => {
                    if (typeof obj === 'object' && obj !== null) {
                        if (obj['$ref'] && typeof obj['$ref'] === 'string') {
                            const ref = obj['$ref']
                            if (ref.startsWith('#/components/schemas/')) {
                                const schemaName = ref.replace('#/components/schemas/', '')
                                referencedComponents.add(schemaName)
                            }
                        }
                        Object.values(obj).forEach(findRefs)
                    }
                }
                findRefs(operation)

                // Recursively find nested component references
                const findNestedRefs = (schemaName: string, visited = new Set<string>()) => {
                    if (visited.has(schemaName) || !spec.components?.schemas?.[schemaName]) {
                        return
                    }
                    visited.add(schemaName)

                    const schema = spec.components.schemas[schemaName]
                    findRefs(schema)

                    // Find any new references that were added and recursively process them
                    const newRefs = Array.from(referencedComponents).filter((ref) => !visited.has(ref))
                    newRefs.forEach((ref) => findNestedRefs(ref, visited))
                }

                // Process all initially found references to find their nested references
                const initialRefs = Array.from(referencedComponents)
                initialRefs.forEach((ref) => findNestedRefs(ref))

                // Build components object with only referenced schemas
                const components: any = {}
                if (referencedComponents.size > 0 && spec.components?.schemas) {
                    components.schemas = {}
                    referencedComponents.forEach((schemaName) => {
                        if (spec.components.schemas[schemaName]) {
                            components.schemas[schemaName] = spec.components.schemas[schemaName]
                        }
                    })
                }

                // Create the path structure for this endpoint
                const pathSpec: any = {
                    paths: {
                        [pathName]: {
                            [method]: operation,
                        },
                    },
                }

                // Add components if we have any
                if (Object.keys(components).length > 0) {
                    pathSpec.components = components
                }

                // Convert to formatted JSON
                const jsonContent = JSON.stringify(pathSpec, null, 2)

                // Generate markdown content for this endpoint
                const markdownContent = `# ${operation.operationId}

## OpenAPI

\`\`\`json ${method.toUpperCase()} ${pathName}
${jsonContent}
\`\`\`
`

                // Write the file
                fs.writeFileSync(filePath, markdownContent, 'utf8')
                console.log(`Generated: api-spec/${filename}`)
            }
        })
    })

    console.log(`✅ Generated ${totalEndpoints} API endpoint markdown files in /docs/api-spec/`)
}
