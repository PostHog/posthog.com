import path from 'path'
import fs from 'fs'
import { SdkReferenceData } from '../src/templates/sdk/SdkReference'

// Function to generate raw markdown files
export const generateRawMarkdownPages = async (pages) => {
    console.log('Generating markdown files for LLMs...')

    // Filter out any pages with certain slugs
    const excludeTerms = [
        '/_snippets',
        '/snippets/',
        '/_includes',
        '/thanks',
        '/notes/test-note',
        '/service-error',
        '/service-message',
        '/services',
        '/request-received',
        '/application-received',
        '/teams/',
        '/hosthog',
        '/startups',
        '/example-components',
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

    // Return filtered pages for use in generateLlmsTxt
    return filteredPages
}

// Function to generate individual API endpoint markdown files from the OpenAPI spec
export const generateApiSpecMarkdown = (spec: any) => {
    console.log('Generating API endpoint markdown files...')

    const apiSpecDir = path.join(process.cwd(), 'public', 'docs', 'open-api-spec')
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
                console.log(`Generated: open-api-spec/${filename}`)
            }
        })
    })

    console.log(`✅ Generated ${totalEndpoints} API endpoint markdown files in /docs/open-api-spec/`)
}

export const generateSdkReferencesMarkdown = (sdkReferences: SdkReferenceData) => {
    const sdkSpecDir = path.join(process.cwd(), 'public', 'docs', 'references')
    if (!fs.existsSync(sdkSpecDir)) {
        fs.mkdirSync(sdkSpecDir, { recursive: true })
    }

    const filePath = path.join(sdkSpecDir, `${sdkReferences.info.slugPrefix}.md`)

    const renderTypeAsText = (type: string): string => {
        return type
    }

    const renderParameters = (params: any[]): string => {
        if (!params || params.length === 0) return ''

        const paramLines = params.map((param) => {
            const name = param.isOptional ? `${param.name}?` : param.name
            const type = renderTypeAsText(param.type)
            let paramLine = `- **\`${name}\`** (\`${type}\`)`

            if (param.description) {
                paramLine += ` - ${param.description}`
            }
            return paramLine
        })

        return `### Parameters\n\n${paramLines.join('\n')}`
    }

    const renderReturnType = (returnType: any): string => {
        if (!returnType) return ''

        const typeString = returnType.name
        const isUnionOrIntersection = typeString.includes('|') || typeString.includes('&')

        if (isUnionOrIntersection) {
            const separator = typeString.includes('|') ? '|' : '&'
            const types = typeString.split(separator).map((t: string) => t.trim())
            const label = separator === '|' ? 'Union of' : 'Intersection of'

            const typeLines = types.map((type) => `- \`${renderTypeAsText(type)}\``)
            return `### Returns\n\n**${label}:**\n${typeLines.join('\n')}`
        } else {
            return `### Returns\n\n- \`${renderTypeAsText(typeString)}\``
        }
    }

    const renderExamples = (examples: any[], language: string): string => {
        if (!examples || examples.length === 0) return ''

        if (examples.length === 1) {
            return `### Examples\n\n\`\`\`${language}\n${examples[0].code.trim()}\n\`\`\``
        } else {
            const exampleBlocks = examples.map(
                (example) => `#### ${example.name}\n\n\`\`\`${language}\n${example.code.trim()}\n\`\`\``
            )
            return `### Examples\n\n${exampleBlocks.join('\n\n')}`
        }
    }

    const markdownNodes: string[] = []

    markdownNodes.push(`# ${sdkReferences.info.title}`)
    markdownNodes.push(`**SDK Version:** ${sdkReferences.info.version}`)
    markdownNodes.push(sdkReferences.info.description)

    if (sdkReferences.categories && sdkReferences.categories.length > 0) {
        markdownNodes.push('## Categories')
        markdownNodes.push(sdkReferences.categories.map((cat) => `- ${cat}`).join('\n'))
    }

    sdkReferences.classes.forEach((classData) => {
        markdownNodes.push(`## ${classData.title}`)

        if (classData.description) {
            markdownNodes.push(classData.description)
        }

        const functionsByCategory = new Map<string, any[]>()

        classData.functions.forEach((func) => {
            const category = func.category || 'Other methods'
            if (!functionsByCategory.has(category)) {
                functionsByCategory.set(category, [])
            }
            functionsByCategory.get(category)!.push(func)
        })

        functionsByCategory.forEach((functions, category) => {
            if (category !== 'Other methods') {
                markdownNodes.push(`### ${category} methods`)
            } else {
                markdownNodes.push(`### Other methods`)
            }

            functions.forEach((func) => {
                markdownNodes.push(`#### ${func.title}()`)

                if (func.releaseTag) {
                    markdownNodes.push(`**Release Tag:** ${func.releaseTag}`)
                }

                if (func.description) {
                    markdownNodes.push(func.description)
                }

                if (func.details) {
                    markdownNodes.push(`**Notes:**`)
                    markdownNodes.push(func.details)
                }

                const paramsMarkdown = renderParameters(func.params)
                if (paramsMarkdown) {
                    markdownNodes.push(paramsMarkdown)
                }

                const returnMarkdown = renderReturnType(func.returnType)
                if (returnMarkdown) {
                    markdownNodes.push(returnMarkdown)
                }

                const examplesMarkdown = renderExamples(func.examples, func.language || 'javascript')
                if (examplesMarkdown) {
                    markdownNodes.push(examplesMarkdown)
                }

                markdownNodes.push('---')
            })
        })
    })

    const markdownContent = markdownNodes.join('\n\n')

    fs.writeFileSync(filePath, markdownContent, 'utf8')
}

// Function to generate llms.txt file according to spec
export const generateLlmsTxt = (pages) => {
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

    // Add API spec files to docs-api-reference section
    const apiSpecDir = path.join(process.cwd(), 'public', 'docs', 'open-api-spec')

    if (fs.existsSync(apiSpecDir)) {
        pagesBySection['docs-api-reference'] = []

        const apiSpecFiles = fs.readdirSync(apiSpecDir).filter((file) => file.endsWith('.md'))
        for (const file of apiSpecFiles) {
            const operationId = file.replace('.md', '')
            pagesBySection['docs-api-reference'].push({
                title: `${operationId}`,
                slug: `/docs/open-api-spec/${operationId}`,
                url: `https://posthog.com/docs/open-api-spec/${operationId}.md`,
            })
        }
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
            if (a === 'docs-api-reference') return -1
            if (b === 'docs-api-reference') return 1
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

> PostHog is an open-source platform for customer infrastructure. We equip developers with everything they need to build successful products – product analytics, web analytics, feature flags, session replay, A/B testing, error tracking, surveys, LLM observability, data warehousing, and more.

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
