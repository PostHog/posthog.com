/**
 * A pocket guide page can ship a SKILL.md beside its index.mdx – the self-driving volume does it
 * for scouts, the session replay volume for the masking skill. Both are the same convention, so
 * the slug rule that maps one to the other lives here rather than in each consumer.
 */

/** Matches the sourced node for any sibling SKILL.md. Used as the GraphQL filter regex too. */
export const SKILL_SLUG_PATTERN = '//SKILL$/'

/** `/pocket-guides/x/SKILL` -> `/pocket-guides/x`, the page the skill belongs to. */
export function ownerSlug(skillSlug: string): string {
    return skillSlug.replace(/\/SKILL$/, '').replace(/\/$/, '')
}

/** The shape both consumers read off a sourced SKILL.md node. */
export interface SkillNode {
    rawBody?: string
    fields: { slug: string }
    frontmatter?: { name?: string; description?: string }
}

/** Keyed by the page that owns each skill, so a page can look up its own. */
export function skillsByOwner(nodes: SkillNode[] = []): Map<string, SkillNode> {
    return new Map(nodes.map((node) => [ownerSlug(node.fields.slug), node]))
}
