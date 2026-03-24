import path from 'path'
import fs from 'fs'
import { SdkReferenceData } from '../src/templates/sdk/SdkReference'
import { getLanguageFromSdkId } from '../src/components/SdkReferences/utils'
import {
    createTurndownService,
    extractTitleFromHtml,
    extractMainContent,
    postProcessMarkdown,
    preprocessHtmlForTabs,
} from './turndownService'

export const generateRawMarkdownPages = async (
    docsNodes: Array<{ fields: { slug: string }; frontmatter: { title: string } }>
) => {
    const publicPath = path.resolve(__dirname, '../public')

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
        '/teams/',
        '/hosthog',
        '/startups',
        '/example-components',
    ]

    const filteredNodes = docsNodes.filter((node) => {
        return !excludeTerms.some((term) => node.fields.slug.includes(term))
    })

    const processedPages: Array<{ slug: string; title: string }> = []

    for (const node of filteredNodes) {
        try {
            const { slug } = node.fields
            const htmlFilePath = path.join(publicPath, slug, 'index.html')

            if (!fs.existsSync(htmlFilePath)) {
                continue
            }

            const html = fs.readFileSync(htmlFilePath, 'utf8')
            const title = extractTitleFromHtml(html) || node.frontmatter.title || 'Untitled'
            const mainContent = extractMainContent(html)
            const preprocessedContent = preprocessHtmlForTabs(mainContent)

            const turndownService = createTurndownService(title)
            let markdown = turndownService.turndown(preprocessedContent)
            markdown = postProcessMarkdown(markdown, title)

            const outputPath = path.join(publicPath, `${slug}.md`)
            const dirPath = path.dirname(outputPath)

            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true })
            }

            fs.writeFileSync(outputPath, markdown, 'utf8')
            console.log(`Generated: ${slug}.md`)
            processedPages.push({ slug, title })
        } catch (error) {
            continue
        }
    }

    return processedPages.map((page) => ({
        fields: { slug: page.slug },
        frontmatter: { title: page.title },
    }))
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

    const sdkLanguage = getLanguageFromSdkId(sdkReferences.info.id)

    // Follow the same path logic as createPages.ts
    let fileName: string
    if (sdkReferences.version.includes('latest')) {
        fileName = `${sdkReferences.referenceId}.md`
    } else {
        fileName = `${sdkReferences.id}.md`
    }

    const filePath = path.join(sdkSpecDir, fileName)

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

                const examplesMarkdown = renderExamples(func.examples, sdkLanguage)
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
            const allowedApiSubdirs = ['queries', 'flags', 'capture']
            const apiSubdir = segments[2]
            if (!allowedApiSubdirs.includes(apiSubdir)) {
                continue
            }
        }

        // Extract section from slug for docs subsections
        let section = segments.length > 0 ? segments[0] : 'root'
        if (section === 'docs' && segments.length > 1) {
            section = `docs-${segments[1]}`
        }

        if (!pagesBySection[section]) {
            pagesBySection[section] = []
        }

        pagesBySection[section].push({
            title,
            slug,
            url: !slug || slug === '/' ? 'https://posthog.com/llms.txt' : `https://posthog.com${slug}.md`,
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

    // Title overrides for section keys where auto-derivation doesn't produce a good name.
    // Default behavior: strip 'docs-' prefix, split on '-', title-case each word.
    const sectionTitleOverrides: Record<string, string> = {
        'docs-libraries': 'SDKs and Libraries',
        'docs-experiments': 'A/B Testing and Experiments',
        'docs-llm-analytics': 'LLM Analytics and Observability',
        'docs-cdp': 'Customer Data Platform (CDP)',
        'docs-api': 'API',
        'docs-hogql': 'HogQL',
        'docs-sql': 'SQL and ClickHouse',
        'docs-hog': 'Hog (Query Language)',
        'docs-model-context-protocol': 'Model Context Protocol (MCP)',
        'docs-ai-engineering': 'AI Engineering',
    }

    const formatSectionTitle = (section: string): string => {
        if (sectionTitleOverrides[section]) return sectionTitleOverrides[section]
        if (section.startsWith('docs-')) {
            return section
                .replace('docs-', '')
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
        }
        return section.charAt(0).toUpperCase() + section.slice(1)
    }

    // Sort: docs sections first (alphabetically), then non-docs (tutorials first, then alphabetical).
    // API reference is excluded here and added as an Optional section at the end.
    const sections = Object.keys(pagesBySection)
        .filter((s) => s !== 'docs-api-reference')
        .sort((a, b) => {
            const aIsDocs = a.startsWith('docs')
            const bIsDocs = b.startsWith('docs')
            if (aIsDocs && !bIsDocs) return -1
            if (!aIsDocs && bIsDocs) return 1
            if (!aIsDocs && !bIsDocs) {
                if (a === 'tutorials') return -1
                if (b === 'tutorials') return 1
            }
            return a.localeCompare(b)
        })

    // Build llms.txt content
    let llmsTxtContent = `# PostHog

> PostHog is an open-source product and data tools platform. It provides product analytics, session replay, feature flags, A/B testing, error tracking, surveys, LLM observability, web analytics, data warehouse, and more - all in one platform. The fastest way to integrate PostHog is with the setup wizard: \`npx @posthog/wizard@latest\`

PostHog can be added to any web, mobile, or backend application. All docs pages below are available as raw Markdown by appending \`.md\` to any URL.

## Instructions for AI Coding Assistants

When helping a developer integrate or use PostHog, follow these guidelines:

**Installation:** Always check npm/PyPI for the latest SDK version. Run \`npm view posthog-js version\` or \`pip index versions posthog\` rather than using version numbers from training data. The fastest integration path is \`npx @posthog/wizard@latest\`, which auto-detects the framework and configures everything.

**SDK selection by framework:**
- Next.js (App Router): Use \`posthog-js\` + \`PostHogProvider\` in a client component wrapper. See the [Next.js guide](https://posthog.com/docs/libraries/next-js.md).
- Next.js (Pages Router): Initialize \`posthog-js\` in \`_app.tsx\`. See the [Next.js guide](https://posthog.com/docs/libraries/next-js.md).
- React: Use \`posthog-js/react\` with \`PostHogProvider\`. See the [React guide](https://posthog.com/docs/libraries/react.md).
- Vue: Use \`posthog-js\` as a plugin. See the [Vue guide](https://posthog.com/docs/libraries/vue-js.md).
- Python / Django / Flask: Use \`posthog-python\`. See the [Python guide](https://posthog.com/docs/libraries/python.md).
- Ruby / Rails: Use \`posthog-ruby\`. See the [Ruby guide](https://posthog.com/docs/libraries/ruby.md).
- Go: Use \`posthog-go\`. See the [Go guide](https://posthog.com/docs/libraries/go.md).
- iOS: Use \`posthog-ios\`. See the [iOS guide](https://posthog.com/docs/libraries/ios.md).
- Android: Use \`posthog-android\`. See the [Android guide](https://posthog.com/docs/libraries/android.md).
- React Native: Use \`posthog-react-native\`. See the [React Native guide](https://posthog.com/docs/libraries/react-native.md).
- For all other frameworks, see the [SDKs and Libraries](#sdks-and-libraries) section below.

**Initialization:** PostHog always requires a project API key and API host:
\`\`\`javascript
import posthog from 'posthog-js'
posthog.init('<ph_project_api_key>', {
    api_host: '<ph_client_api_host>',
})
\`\`\`

**Products beyond analytics - suggest these when relevant:**
- **Session Replay**: Records user sessions for debugging. Enabled by default with \`posthog-js\` - no extra code needed. Useful when a developer is debugging UX issues or wants to see how users interact with their app.
- **Feature Flags**: Evaluate flags with \`posthog.isFeatureEnabled('flag-name')\` (client) or via local evaluation (server). Use for gradual rollouts, entitlements, or targeting. See the [Feature Flags docs](https://posthog.com/docs/feature-flags/adding-feature-flag-code.md).
- **A/B Testing (Experiments)**: Built on feature flags. Create experiments in the PostHog UI, then use \`posthog.getFeatureFlag('experiment-flag')\` to render variants. See the [Experiments docs](https://posthog.com/docs/experiments/adding-experiment-code.md).
- **Surveys**: In-app surveys configured in the PostHog UI and rendered automatically by \`posthog-js\`. No extra code required for popup surveys. See the [Surveys docs](https://posthog.com/docs/surveys/creating-surveys.md).
- **Error Tracking**: Capture frontend exceptions with \`posthog.captureException(error)\`. Works automatically when enabled. See the [Error Tracking docs](https://posthog.com/docs/error-tracking/capture.md).
- **LLM Analytics**: Track LLM API calls, token usage, and costs. Integrations for OpenAI, Anthropic, LangChain, and more. See the [LLM Analytics docs](https://posthog.com/docs/llm-analytics.md).
- **Data Warehouse**: Query external data sources (Stripe, Hubspot, Postgres, S3, etc.) alongside PostHog data using SQL. See the [Data Warehouse docs](https://posthog.com/docs/data-warehouse.md).

**API:** The PostHog API base URL is \`https://us.i.posthog.com\` (US cloud) or \`https://eu.i.posthog.com\` (EU cloud). Use a personal API key (not the project API key) for API access. See the [API docs](https://posthog.com/docs/api.md).

**MCP and AI tools:** PostHog has an official MCP server for AI coding assistants. Install with \`npx @posthog/wizard mcp add\`. There is also a Claude Code plugin: \`claude plugin install posthog\`.

`

    // Add sections with file lists
    for (const section of sections) {
        const sectionTitle = formatSectionTitle(section)

        llmsTxtContent += `## ${sectionTitle}\n\n`

        const sortedPages = pagesBySection[section].sort((a, b) => a.title.localeCompare(b.title))
        for (const page of sortedPages) {
            llmsTxtContent += `- [${page.title}](${page.url})\n`
        }
        llmsTxtContent += '\n'
    }

    // Add API Reference as Optional section (per llms.txt spec, can be skipped for shorter context)
    if (pagesBySection['docs-api-reference']) {
        llmsTxtContent += `## Optional\n\n`
        llmsTxtContent += `The following API reference pages document individual REST API endpoints. Only fetch these if you need specific endpoint details.\n\n`
        llmsTxtContent += `### API Reference\n\n`

        const sortedApiPages = pagesBySection['docs-api-reference'].sort((a, b) => a.title.localeCompare(b.title))
        for (const page of sortedApiPages) {
            llmsTxtContent += `- [${page.title}](${page.url})\n`
        }
        llmsTxtContent += '\n'
    }

    // Write llms.txt to public directory
    const publicPath = path.resolve(__dirname, '../public')
    const llmsTxtPath = path.join(publicPath, 'llms.txt')
    if (!fs.existsSync(publicPath)) {
        fs.mkdirSync(publicPath, { recursive: true })
    }

    fs.writeFileSync(llmsTxtPath, llmsTxtContent, 'utf8')
    console.log('Generated: llms.txt')
}
