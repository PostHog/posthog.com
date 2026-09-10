import path from 'path'
import fs from 'fs'

/**
 * Scout templates PostHog ships in the app. The `SKILL.md` in the monorepo is the only copy: the
 * app imports it to prefill its create-scout modal, and the pocket guides render the same file, so
 * a guide can never describe a scout the button doesn't create.
 *
 * Keys match the template keys in the monorepo's `aiObservabilityScoutTemplates.ts`, which are also
 * the `#template=` values a guide's CTA links to.
 */
const SCOUT_SKILLS: Record<string, string> = {
    'daily-digest': 'signals-scout-ai-observability-daily-digest',
    'costly-users': 'signals-scout-ai-observability-costly-users',
    'error-patterns': 'signals-scout-ai-observability-error-patterns',
}

const SCOUTS_BASE_URL =
    'https://raw.githubusercontent.com/PostHog/posthog/refs/heads/master/products/ai_observability/backend/scouts'

const FETCH_TIMEOUT_MS = 15000

const FRONTMATTER_BLOCK = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/

export interface ScoutSkill {
    /** Scout name, e.g. `signals-scout-ai-observability-costly-users`. From the file's frontmatter. */
    name: string
    /** The scout's own description, as it appears on the config API. From the frontmatter. */
    description: string
    /** The whole file including frontmatter, so the page shows the file rather than a copy. */
    raw: string
}

export interface ScoutSkillsData {
    /** Keyed by template key, e.g. `costly-users`. Null when the fetch failed. */
    skills: Record<string, ScoutSkill> | null
    error: boolean
}

/**
 * Pulls `name` and `description` out of the frontmatter. Deliberately not a YAML parse: these two
 * scalar fields are the whole contract, and a dependency-free reader can't fail on unrelated keys.
 */
function readFrontmatterFields(raw: string): { name: string; description: string } | null {
    const match = raw.match(FRONTMATTER_BLOCK)
    if (!match) {
        return null
    }
    const name = match[1].match(/^name:\s*(.+)$/m)?.[1]?.trim()
    // `description:` is a folded block scalar, so its text sits on the indented lines under it.
    const description = match[1]
        .match(/^description:\s*>\s*\n((?:[ \t]+.*\n?)+)/m)?.[1]
        ?.split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .join(' ')
    if (!name || !description) {
        return null
    }
    return { name, description }
}

export async function fetchScoutSkills(): Promise<ScoutSkillsData> {
    try {
        const entries = await Promise.all(
            Object.entries(SCOUT_SKILLS).map(async ([key, name]) => {
                const controller = new AbortController()
                const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
                const response = await fetch(`${SCOUTS_BASE_URL}/${name}.md`, {
                    signal: controller.signal as any,
                })
                clearTimeout(timeoutId)

                if (response.status !== 200) {
                    throw new Error(`Failed to fetch scout skill ${name}: ${response.status}`)
                }

                const raw = await response.text()
                const fields = readFrontmatterFields(raw)
                if (!fields) {
                    throw new Error(`Scout skill ${name} is missing name or description in its frontmatter`)
                }
                return [key, { ...fields, raw }] as const
            })
        )

        return { skills: Object.fromEntries(entries), error: false }
    } catch (error) {
        console.error('Error fetching scout skills:', error)
        return { skills: null, error: true }
    }
}

export function writeScoutSkillsToFile(data: ScoutSkillsData): void {
    const scoutSkillsPath = path.resolve(__dirname, '../../src/data/scout-skills.json')
    fs.mkdirSync(path.dirname(scoutSkillsPath), { recursive: true })
    fs.writeFileSync(scoutSkillsPath, JSON.stringify(data, null, 2))
}
