import path from 'path'
import fs from 'fs'

// Function to generate markdown files for LLMs
export const generateRawMarkdownPages = async (pages) => {
    console.log('Generating markdown files for LLMs and llms.txt...')

    // Filter out any pages with slugs containing "_snippets"
    const filteredPages = pages.filter((doc) => !doc.fields.slug.includes('_snippets'))

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
}
