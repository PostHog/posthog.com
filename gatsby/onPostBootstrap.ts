import { GatsbyNode } from 'gatsby'
import { generateDocsMarkdown } from './utils/generateDocsMarkdown'

export const onPostBootstrap: GatsbyNode['onPostBootstrap'] = async () => {
    // Generate markdown docs from MDAST for public/docs/*.md
    // This runs after all source plugins and transformers finish (including MDX processing)
    try {
        generateDocsMarkdown()
    } catch (error) {
        console.error('Failed to generate markdown docs:', error)
    }
}
