// Sources that read files in this repo or in the posthog/posthog clone: Tool (src/data/tools),
// AuthorsJson, TestimonialsJson, and AgentSkill.
//
// AuthorsJson.profile_id joins to SqueakProfile.squeakId (it was the `profile` link).
import fg from 'fast-glob'
import fs from 'node:fs'
import path from 'node:path'
import type { Source } from '../index'
import { POSTHOG_REPO_DIR, ROOT } from '../paths'
import type { AgentSkillNode, Author, AuthorsJsonNode, Testimonial, TestimonialsJsonNode, ToolNode } from '../types'
import { tools } from '../../data/tools'

const readJson = <T>(file: string): T => JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'))

export const toolSource: Source = {
    name: 'tools',
    types: ['Tool'],
    async fetch() {
        const nodes: ToolNode[] = tools.map((tool) => ({ ...tool, id: `tool-${tool.handle}` }))
        return { Tool: nodes }
    },
}

export const authorsSource: Source = {
    name: 'authors',
    types: ['AuthorsJson'],
    async fetch() {
        const authors = readJson<Author[]>('src/data/authors.json')
        const nodes: AuthorsJsonNode[] = authors.map((author) => ({ ...author, id: `author-${author.handle}` }))
        return { AuthorsJson: nodes }
    },
}

export const testimonialsSource: Source = {
    name: 'testimonials',
    types: ['TestimonialsJson'],
    async fetch() {
        const testimonials = readJson<Testimonial[]>('src/data/testimonials.json')
        const nodes: TestimonialsJsonNode[] = testimonials.map((testimonial, i) => ({
            ...testimonial,
            id: `testimonial-${i}`,
        }))
        return { TestimonialsJson: nodes }
    },
}

/**
 * A minimal frontmatter reader for SKILL.md files. They carry only `name` and `description`, and the
 * description may be a folded `>-` scalar.
 */
function parseSkillFrontmatter(raw: string): { name?: string; description?: string; body: string } {
    const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/)
    if (!match) return { body: raw }
    const [, frontmatter, body] = match
    const lines = frontmatter.split('\n')
    const fields: Record<string, string> = {}
    for (let i = 0; i < lines.length; i++) {
        const keyMatch = lines[i].match(/^(\w[\w-]*):\s?(.*)$/)
        if (!keyMatch) continue
        const [, key, rawValue] = keyMatch
        let value = rawValue.trim()
        // Folded or literal block scalar (>- > | |-): gather the indented lines below
        if (/^[>|][-+]?$/.test(value) || value === '') {
            const collected: string[] = []
            while (i + 1 < lines.length && (/^\s+\S/.test(lines[i + 1]) || lines[i + 1].trim() === '')) {
                collected.push(lines[i + 1].trim())
                i++
            }
            value = collected.join(' ').trim()
        }
        fields[key] = value.replace(/^['"]|['"]$/g, '')
    }
    return { name: fields.name, description: fields.description, body }
}

/** Agent skills from the posthog/posthog clone: products/<product>/skills/<skill>/SKILL.md. */
export const agentSkillSource: Source = {
    name: 'agent-skills',
    types: ['AgentSkill'],
    async fetch() {
        const files = (await fg('products/*/skills/*/SKILL.md', { cwd: POSTHOG_REPO_DIR })).sort()
        const nodes: AgentSkillNode[] = files.flatMap((file) => {
            const sourcePath = path.posix.dirname(file)
            const [, product, , skillName] = sourcePath.split('/')
            try {
                const { name, description, body } = parseSkillFrontmatter(
                    fs.readFileSync(path.join(POSTHOG_REPO_DIR, file), 'utf8')
                )
                const mcpTools = [...new Set(Array.from(body.matchAll(/posthog:([a-z0-9-]+)/g), (match) => match[1]))]
                return [
                    {
                        id: `agent-skill-${sourcePath}`,
                        product,
                        name: name || skillName,
                        description: description || '',
                        sourcePath,
                        mcpTools,
                    },
                ]
            } catch (error) {
                console.warn(`[data-layer] could not parse agent skill ${file}: ${(error as Error).message}`)
                return []
            }
        })
        return { AgentSkill: nodes }
    },
}

export const localSources: Source[] = [toolSource, authorsSource, testimonialsSource, agentSkillSource]
