/**
 * Builds the searchable document for a small team from its SqueakTeam node
 * (plus the team's MDX page body when one exists in `contents/teams/`).
 * Shared by gatsby/algoliaConfig.js (Algolia records) and
 * gatsby/onPostBuild.ts (markdown pages for LLM/Inkeep ingestion), so both
 * engines index the same text. Plain CommonJS because algoliaConfig.js is
 * required from gatsby-config.js where TypeScript imports aren't available.
 */

// MDX raw bodies start with frontmatter and import statements that aren't
// useful search text
const cleanMdxBody = (rawBody) =>
    (rawBody || '')
        .replace(/^---[\s\S]*?---\n/, '')
        .replace(/^(import|export) .*$/gm, '')
        .trim()

const teamSearchDoc = (team, mdxRawBody) => {
    const { name, tagline, description, profiles, roadmaps } = team

    const title = `${name} team`
    const excerpt = description || tagline || ''

    const parts = [`# ${title}`, '']
    if (tagline) parts.push(tagline, '')
    if (description) parts.push(description, '')

    const members = (profiles?.data || [])
        .map(({ attributes }) => {
            if (!attributes?.firstName) return null
            const memberName = [attributes.firstName, attributes.lastName].filter(Boolean).join(' ')
            return attributes.companyRole ? `- ${memberName}, ${attributes.companyRole}` : `- ${memberName}`
        })
        .filter(Boolean)
    if (members.length > 0) {
        parts.push('## Members', '', ...members, '')
    }

    const inProgress = (roadmaps || []).filter((roadmap) => !roadmap.complete)
    const shipped = (roadmaps || []).filter((roadmap) => roadmap.complete)
    const roadmapLines = (items) =>
        items.map(({ title: roadmapTitle, description: roadmapDescription }) =>
            roadmapDescription ? `- **${roadmapTitle}**: ${roadmapDescription}` : `- **${roadmapTitle}**`
        )
    if (inProgress.length > 0) {
        parts.push('## What we’re building', '', ...roadmapLines(inProgress), '')
    }
    if (shipped.length > 0) {
        parts.push('## Recently shipped', '', ...roadmapLines(shipped), '')
    }

    const mdxBody = cleanMdxBody(mdxRawBody)
    if (mdxBody) {
        parts.push(mdxBody, '')
    }

    return {
        title,
        excerpt,
        markdown: parts.join('\n'),
    }
}

module.exports = { teamSearchDoc }
