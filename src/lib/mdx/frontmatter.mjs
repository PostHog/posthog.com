// Splits a Markdown/MDX file into its YAML frontmatter and body.
import { parse } from 'yaml'

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

/** @returns {{ data: Record<string, unknown>, rawData: string, body: string }} */
export function splitFrontmatter(contents) {
    const match = contents.match(FRONTMATTER)
    if (!match) return { data: {}, rawData: '', body: contents }
    return { data: parse(match[1]) ?? {}, rawData: match[1], body: contents.slice(match[0].length) }
}
